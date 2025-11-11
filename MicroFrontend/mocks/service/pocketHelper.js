let pockets = []

function addPocket(pocket) {
    pockets.push(pocket);
}

function getPockets() {
    return pockets;
}

function generateAllPockets(totalPockets = 15, withSpecialAccount = false) {
    if (pockets.length === 0) {
        for (let i = 0; i < totalPockets; i++) {
            pockets.push(generatePocket(i + 1, Math.ceil((i + 1) / 3), withSpecialAccount));
        }
    }
}

function reset() {
    pockets = [];
}

function rand(min, max, step) {
    let delta,
        range,
        rand;
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }
    if (!step) {
        step = 1;
    }
    delta = max - min;
    range = delta / step;
    rand = Math.random();
    rand *= range;
    rand = Math.floor(rand);
    rand *= step;
    rand += min;
    return rand;
}

function getPocketDetail(id) {
    const resPocketDetail = require('../responses/pockets/pocket_detail.json');
    return pockets[id - 1] || resPocketDetail;
}

function updatePocket(pocketId, body) {
    if (pocketId >= 0 && pocketId < pockets.length) {
        let pocketToUpdate = pockets[pocketId]
        if (body["changeStatus"] !== undefined && body["changeStatus"] === true) {
            pocketToUpdate["status"] = body["status"] || pocketToUpdate["status"]
        } else {
            const goal = toFixedNumber(body["goal"], 2);
            const quotaAmount = toFixedNumber(body["quota"], 2);
            const amountSaved = pocketToUpdate["amountSaved"];
            pocketToUpdate["description"] = body["name"];
            pocketToUpdate["goal"] = goal;
            pocketToUpdate["period"] = body["period"];
            pocketToUpdate["pocketCategory"] = body["pocketCategory"];
            pocketToUpdate["instalmentAmount"] = quotaAmount;
            const newNumberQuotas = Math.ceil((goal-amountSaved)/quotaAmount);
            const progress = Math.floor((amountSaved*100)/goal);
            pocketToUpdate["totalInstalments"] = newNumberQuotas.toString();
            pocketToUpdate["remainingInstalments"] = newNumberQuotas;
            pocketToUpdate["progress"] = progress.toString();
            const currentStatus=pocketToUpdate["status"];
            if(currentStatus===5)
                pocketToUpdate["status"] = 1;
        }
    }
}

function deletePocket(pocketId) {
    if (pocketId >= 0 && pocketId < pockets.length) {
        pockets.splice(pocketId, 1);
    }
}

function generatePocket(id, status, specialAccount) {
    const moment = require("moment-timezone");
    moment.tz.setDefault("America/Bogota");
    const offset = moment().utcOffset();
    const accounts = ['008939626', '4208939626', '4708939626'];
    const accountIds = [3, 21, 22];
    const periodicity = ['Semanal', 'Quincenal', 'Mensual']
    const minGoalValue = 15000000
    const maxGoalValue = 30500000
    const goalIncrement = 500000
    const minQuotaValue = 1000000
    const maxQuotaValue = 2100000
    const quotaIncrement = 100000
    const goal = rand(minGoalValue, maxGoalValue, goalIncrement);
    const progress = status === 5 ? 100 : rand(5, 51);
    const quotaAmount = rand(minQuotaValue, maxQuotaValue, quotaIncrement)
    const amountSaved = goal * (progress / 100);
    const period = periodicity[periodicity.length * Math.random() | 0];
    const totalQuotas = Math.ceil(goal / quotaAmount);
    const quotasUsed = Math.floor(amountSaved / quotaAmount);
    const pendingQuotas = status === 5 ? 0 : totalQuotas - quotasUsed;
    const pocketCategory = rand(1, 11);
    let startDate;
    if (period === 'Semanal') {
        startDate = moment().subtract(quotasUsed * 7, 'days');
    } else if (period === 'Quincenal') {
        startDate = startDate = moment().subtract(quotasUsed * 15, 'days');
    } else {
        startDate = startDate = moment().subtract(quotasUsed, 'months');
    }
    let elapsedDays = moment().diff(startDate, 'days');
    let account = "008939626";
    let accountId = 3;
    let pocketName = `Test pocket ${id}`;
    if (specialAccount) {
        const index = (id % 3) - 1
        if (index === 0) {
            account = accounts[0];
            accountId = accountIds[0];
        } else if (index === 1) {
            account = accounts[1];
            accountId = accountIds[1];
            pocketName = `pocket ${id}`;
        } else {
            account = accounts[2];
            accountId = accountIds[2];
            pocketName = `pocket ${id}`;
        }
    }
    return {
        "type": "SPA",
        "typeName": "Bolsillo de Ahorro",
        "numberProduct": id.toString(),
        "description": pocketName,
        "progress": progress.toString(),
        "startDate": startDate.utc(offset).format("DD/MM/YYYY"),
        "goal": toFixedNumber(goal, 2),
        "timeElapsed": null,
        "targetDate": null,
        "amountSaved": toFixedNumber(amountSaved, 2),
        "period": period,
        "pocketCategory": pocketCategory,
        "instalmentAmount": toFixedNumber(quotaAmount, 2),
        "totalInstalments": totalQuotas.toString(),
        "productTypeParent": "SDA",
        "productTypeParentDesc": "Cuenta de Ahorros",
        "productIdParent": accountId,
        "productNumberParent": account,
        "status": status,
        "elapsedDays": elapsedDays,
        "remainingInstalments": pendingQuotas
    }
}

function toFixedNumber(num, digits, base) {
    const pow = Math.pow(base || 10, digits);
    return Math.round(num * pow) / pow;
}

module.exports = {addPocket, getPockets, reset, getPocketDetail, generateAllPockets, updatePocket, deletePocket}
