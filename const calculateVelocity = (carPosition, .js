const CONFIG = {
  ANGLE_UNITS: 'rad',
  TIME_TARGET: 1.00,
  LAP_LENGTH_HINT: 4200,
  LOOKAHEAD_MIN: 10,
  LOOKAHEAD_MAX: 130,
  WHEELBASE: 20,
  MAX_STEER_RAD: Math.PI * 0.3,
  STEER_GAIN: 1.0,
  MAX_STEER_RATE: 2.5,
  MAX_SPEED: 11.0, //VELOCIDAD BASE
  MAX_SPEED_SUPER: 14.0, //VELOCIDAD MAXIMA
  MIN_SPEED: 3,//VELOCIDAD MINIMA
  CURVATURE_SPEED_COEFF: 2,//FRENO EN LAS CURVAS
  CTE_REF: 38,
  STRAIGHT_MIN_FACTOR: 0.70,
  STRAIGHT_SLOPE: 0.14,
  INSIDE_MIN_FACTOR: 0.80,
  INSIDE_SLOPE: 0.25,
  OUTSIDE_MIN_FACTOR: 0.52,
  OUTSIDE_SLOPE: 0.60,
  STEER_SPEED_COEFF: 0.1,//FRENO AL GIRAR
  FEEDFORWARD_CTE_GAIN: 0.0022,
  HAIRPIN_KAPPA: 0.12,
  HAIRPIN_LA_SCALE_MIN: 0.45,
  HAIRPIN_LA_SCALE_MAX: 0.58,
  HAIRPIN_SPEED_CAP: 6,//VELOCIDAD EN CURVAS CERRADAS
  HAIRPIN_FF_GAIN: 0.0030,
  SAT_START: 0.70,
  SAT_HARD: 0.92,
  SAT_SOFT_COEFF: 1.2,
  SAT_HARD_FACTOR: 0.40,
  RECOVERY_CTE_RATIO: 0.95,
  RECOVERY_SPEED: 2.4,
  RECOVERY_LA: 12,
  SAFETY_SPEED_AT_CTE1: 4.0,
  SAFETY_SPEED_AT_CTE2: 2.6,
};

let __last = { t: 0, steer: 0 };
let __lap = {
  startedAt: null,
  pathS: 0,
  lapLength: CONFIG.LAP_LENGTH_HINT,
  boot: true
};

const calculateVelocity = (carPosition, nearPoints, shortestDistance) => {
  if (!carPosition || !Array.isArray(nearPoints) || nearPoints.length === 0) {
    return { angle: 0, speed: CONFIG.MIN_SPEED };
  }
  const { x, y, angle: heading } = carPosition;
  const cte = Number.isFinite(shortestDistance) ? shortestDistance : 0;
  const hv = { x: Math.cos(heading), y: Math.sin(heading) };
  const ann = nearPoints.map(p => {
    const dx = p.x - x, dy = p.y - y;
    return { x: p.x, y: p.y, d: Math.hypot(dx, dy), fwd: dx * hv.x + dy * hv.y };
  });
  let ahead = ann.filter(p => p.fwd > 0);
  if (ahead.length < 3) ahead = ann.slice();
  ahead.sort((a, b) => a.d - b.d);
  const now = perfNow();
  if (__lap.boot) {
    __lap.startedAt = now;
    __lap.pathS = 0;
    __lap.boot = false;
  }
  const turnSign = estimateTurnSignFromAhead(ahead, { x, y, heading });
  const kappaLocal = Math.abs(estimateCurvatureFrom3(ahead));
  const cteMag = Math.abs(cte);
  if (cteMag > CONFIG.CTE_REF * CONFIG.RECOVERY_CTE_RATIO) {
    const target = ahead[0] || ann.reduce((a, b) => a.d < b.d ? a : b);
    const alpha = normalizeAngle(Math.atan2(target.y - y, target.x - x) - heading);
    const L = Math.max(target.d, 1e-6);
    const kappa = (2 * Math.sin(alpha)) / L;
    let steering = Math.atan(CONFIG.WHEELBASE * kappa) * CONFIG.STEER_GAIN + 0.0018 * cte;
    steering = clamp(steering, -CONFIG.MAX_STEER_RAD, CONFIG.MAX_STEER_RAD);
    const dt = Math.max((now - __last.t) / 1000, 1 / 120);
    const maxDelta = CONFIG.MAX_STEER_RATE * dt;
    const steerSmooth = clamp(steering - __last.steer, -maxDelta, maxDelta) + __last.steer;
    __last = { t: now, steer: steerSmooth };
    let speed = CONFIG.RECOVERY_SPEED;
    if (cteMag > CONFIG.CTE_REF * 1.5) speed = Math.min(speed, CONFIG.SAFETY_SPEED_AT_CTE2);
    return { angle: steerSmooth, speed };
  }
  let laScaleMin = 1 + 1.2 / (1 + kappaLocal * 80);
  let laScaleMax = 1 + 1.6 / (1 + kappaLocal * 80);
  const inHairpin = kappaLocal > CONFIG.HAIRPIN_KAPPA;
  if (inHairpin) {
    laScaleMin = CONFIG.HAIRPIN_LA_SCALE_MIN;
    laScaleMax = CONFIG.HAIRPIN_LA_SCALE_MAX;
  }
  const LAmin = CONFIG.LOOKAHEAD_MIN * laScaleMin;
  const LAmax = CONFIG.LOOKAHEAD_MAX * laScaleMax;
  const look = getLookaheadPoint({ x, y, heading }, nearPoints, LAmin, LAmax);
  const alpha = normalizeAngle(Math.atan2(look.y - y, look.x - x) - heading);
  const L = Math.max(look.d, 1e-6);
  const kappa = (2 * Math.sin(alpha)) / L;
  let steering = Math.atan(CONFIG.WHEELBASE * kappa) * CONFIG.STEER_GAIN;
  steering += (inHairpin ? CONFIG.HAIRPIN_FF_GAIN : CONFIG.FEEDFORWARD_CTE_GAIN) * cte;
  steering = clamp(steering, -CONFIG.MAX_STEER_RAD, CONFIG.MAX_STEER_RAD);
  const dt = Math.max((now - __last.t) / 1000, 1 / 120);
  const maxDelta = CONFIG.MAX_STEER_RATE * dt;
  const steerSmooth = clamp(steering - __last.steer, -maxDelta, maxDelta) + __last.steer;
  __last = { t: now, steer: steerSmooth };
  let speed = CONFIG.MAX_SPEED / (1 + CONFIG.CURVATURE_SPEED_COEFF * Math.abs(kappa));
  if (inHairpin) speed = Math.min(speed, CONFIG.HAIRPIN_SPEED_CAP);
  speed = clamp(speed, CONFIG.MIN_SPEED, CONFIG.MAX_SPEED_SUPER);
  const isLeft = turnSign > 0.05;
  const isRight = turnSign < -0.05;
  const outside = (isLeft && cte > 0) || (isRight && cte < 0);
  const cteRatio = Math.min(cteMag / Math.max(CONFIG.CTE_REF, 1e-6), 1);
  let cteFactor;
  if (isLeft || isRight) {
    const minF = outside ? CONFIG.OUTSIDE_MIN_FACTOR : CONFIG.INSIDE_MIN_FACTOR;
    const slope = outside ? CONFIG.OUTSIDE_SLOPE : CONFIG.INSIDE_SLOPE;
    cteFactor = clamp(1 - slope * cteRatio, minF, 1);
  } else {
    cteFactor = clamp(1 - CONFIG.STRAIGHT_SLOPE * cteRatio, CONFIG.STRAIGHT_MIN_FACTOR, 1);
  }
  speed *= cteFactor;
  const sat = Math.abs(steerSmooth) / CONFIG.MAX_STEER_RAD;
  if (sat > CONFIG.SAT_START) {
    if (sat > CONFIG.SAT_HARD) {
      speed *= CONFIG.SAT_HARD_FACTOR;
    } else {
      const xSat = (sat - CONFIG.SAT_START) / (CONFIG.SAT_HARD - CONFIG.SAT_START);
      const soft = 1 / (1 + CONFIG.SAT_SOFT_COEFF * xSat * xSat);
      speed *= soft;
    }
  }
  const gain = estimateForwardGain(ahead, hv);
  __lap.pathS += Math.max(0, gain) * 0.9;
  if (__lap.pathS > __lap.lapLength * 0.7) {
    __lap.lapLength = Math.max(__lap.lapLength, __lap.pathS * 1.15);
  }
  const elapsed = (now - __lap.startedAt) / 1000;
  const remainingS = Math.max(0, __lap.lapLength - __lap.pathS);
  const remainingT = Math.max(0.001, CONFIG.TIME_TARGET - elapsed);
  const vReq = remainingS / remainingT;
  const push = clamp(vReq, 0, CONFIG.MAX_SPEED_SUPER);
  speed = Math.max(speed, push * 0.80);
  if (cteMag > CONFIG.CTE_REF) {
    speed = Math.min(speed, CONFIG.SAFETY_SPEED_AT_CTE1);
  }
  if (cteMag > CONFIG.CTE_REF * 1.5) {
    speed = Math.min(speed, CONFIG.SAFETY_SPEED_AT_CTE2);
  }
  speed = clamp(speed, CONFIG.MIN_SPEED, CONFIG.MAX_SPEED_SUPER);
  return { angle: steerSmooth, speed };
};

const estimateCurvatureFrom3 = (ordered) => {
  if (ordered.length < 3) return 0;
  const A = ordered[0];
  const C = ordered[ordered.length - 1];
  const B = ordered[(ordered.length / 2) | 0];
  const a = Math.hypot(B.x - C.x, B.y - C.y);
  const b = Math.hypot(A.x - C.x, A.y - C.y);
  const c = Math.hypot(A.x - B.x, A.y - B.y);
  const area2 = Math.abs((B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x));
  const denom = a * b * c;
  if (denom < 1e-6) return 0;
  return (2 * area2) / denom;
};

const estimateTurnSignFromAhead = (ahead, car) => {
  if (ahead.length < 3) return 0;
  const A = ahead[0], B = ahead[(ahead.length / 2) | 0], C = ahead[ahead.length - 1];
  const cross = (B.x - A.x) * (C.y - B.y) - (B.y - A.y) * (C.x - B.x);
  const scale = (Math.hypot(B.x - A.x, B.y - A.y) + Math.hypot(C.x - B.x, C.y - B.y)) || 1;
  return cross / (scale * scale);
};

const getLookaheadPoint = (car, points, lookMin, lookMax) => {
  const hv = { x: Math.cos(car.heading), y: Math.sin(car.heading) };
  const ann = points.map(p => {
    const dx = p.x - car.x, dy = p.y - car.y;
    return { x: p.x, y: p.y, d: Math.hypot(dx, dy), fwd: dx * hv.x + dy * hv.y };
  });
  let ahead = ann.filter(p => p.fwd > 0);
  if (ahead.length === 0) ahead = ann.slice();
  ahead.sort((a, b) => a.d - b.d);
  let cand = ahead.find(p => p.d >= lookMin) || ahead[ahead.length - 1];
  if (cand.d > lookMax) {
    cand = ahead.reduce((best, p) => {
      const db = Math.abs(best.d - lookMax);
      const dp = Math.abs(p.d - lookMax);
      return dp < db ? p : best;
    }, cand);
  }
  return cand;
};

const estimateForwardGain = (ahead, hv) => {
  if (ahead.length < 2) return 0;
  const P = ahead[Math.min(2, ahead.length - 1)];
  return Math.max(0, P.fwd);
};

const clamp = (v, min, max) => v < min ? min : (v > max ? max : v);
const normalizeAngle = (a) => {
  while (a <= -Math.PI) a += 2 * Math.PI;
  while (a > Math.PI) a -= 2 * Math.PI;
  return a;
};
const perfNow = () => (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();