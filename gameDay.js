// Utilidad para calcular la distancia entre dos puntos
const calculateDistance = (point1, point2) => {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

// Calcula el ángulo entre dos puntos en radianes
const calculateAngle = (from, to) => {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

// Normaliza un ángulo para estar entre -π y π
const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
}

// Encuentra el punto de referencia óptimo basado en la posición del carro
const findOptimalTargetPoint = (carPosition, nearPoints) => {
  if (!nearPoints || nearPoints.length === 0) return null;
  
  // Buscar el punto más adelante en la dirección del movimiento
  let bestPoint = nearPoints[0];
  let maxProjection = -Infinity;
  
  const carDirection = { x: Math.cos(carPosition.angle), y: Math.sin(carPosition.angle) };
  
  nearPoints.forEach(point => {
    const toPoint = { x: point.x - carPosition.x, y: point.y - carPosition.y };
    const projection = toPoint.x * carDirection.x + toPoint.y * carDirection.y;
    
    if (projection > maxProjection) {
      maxProjection = projection;
      bestPoint = point;
    }
  });
  
  return bestPoint;
}

// Calcula la curvatura del camino para ajustar la velocidad
const calculatePathCurvature = (nearPoints) => {
  if (nearPoints.length < 3) return 0;
  
  let totalCurvature = 0;
  for (let i = 1; i < nearPoints.length - 1; i++) {
    const p1 = nearPoints[i - 1];
    const p2 = nearPoints[i];
    const p3 = nearPoints[i + 1];
    
    const angle1 = calculateAngle(p1, p2);
    const angle2 = calculateAngle(p2, p3);
    const angleDiff = Math.abs(normalizeAngle(angle2 - angle1));
    
    totalCurvature += angleDiff;
  }
  
  return totalCurvature / (nearPoints.length - 2);
}

const calculateVelocity = (carPosition, nearPoints, shortestDistance) => {
  // Este es un código de prueba
  // Debes mantener la función calculateVelocity
  // Fuera de esta función, puedes construir tus propias funciones.
  
  // Validación de entrada
  if (!carPosition || !nearPoints || nearPoints.length === 0) {
    return templateFunction();
  }
  
  // Encontrar el punto objetivo óptimo
  const targetPoint = findOptimalTargetPoint(carPosition, nearPoints);
  if (!targetPoint) {
    return templateFunction();
  }
  
  // Calcular el ángulo deseado hacia el punto objetivo
  const desiredAngle = calculateAngle(carPosition, targetPoint);
  const currentAngle = carPosition.angle;
  
  // Calcular la diferencia angular y normalizarla
  let angleDifference = normalizeAngle(desiredAngle - currentAngle);
  
  // Suavizar la corrección angular usando un factor de suavizado
  const steeringStrength = 0.3;
  const correctionAngle = angleDifference * steeringStrength;
  
  // Calcular la curvatura del camino para ajustar velocidad
  const pathCurvature = calculatePathCurvature(nearPoints);
  
  // Base speed - más rápido en rectas, más lento en curvas
  let baseSpeed = 1.0;
  
  // Reducir velocidad basado en la curvatura del camino
  if (pathCurvature > 0.1) {
    baseSpeed *= Math.max(0.4, 1.0 - (pathCurvature * 2));
  }
  
  // Reducir velocidad si estamos muy desviados del camino
  if (shortestDistance > 20) {
    baseSpeed *= Math.max(0.3, 1.0 - (shortestDistance / 100));
  }
  
  // Reducir velocidad para giros cerrados
  const angleMagnitude = Math.abs(angleDifference);
  if (angleMagnitude > Math.PI / 4) {
    baseSpeed *= Math.max(0.5, 1.0 - (angleMagnitude / Math.PI));
  }
  
  // Aplicar límites de velocidad realistas
  baseSpeed = Math.max(0.2, Math.min(1.2, baseSpeed));
  
  const delta = {
    angle: correctionAngle,
    speed: baseSpeed,
  };
  
  return delta;
}

const templateFunction = () => {
  return {
    angle: 0,
    speed: 1,
  }
}

// Configuración adicional para debugging y ajustes finos
const CONFIG = {
  MAX_SPEED: 1.2,
  MIN_SPEED: 0.2,
  STEERING_SENSITIVITY: 0.3,
  CURVE_SPEED_REDUCTION: 2.0,
  DISTANCE_PENALTY_THRESHOLD: 20,
  SHARP_TURN_THRESHOLD: Math.PI / 4
};

carPosition = {
  x: Number,
  y: Number,
  angle: Number,
}

nearPoints = [
  { x: Number, y:Number }(x5)
]

shortestDistance: Number