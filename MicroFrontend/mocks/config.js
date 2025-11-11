module.exports = {
    port: process.env.PORT || 3000,
    SECRET_TOKEN: '011011c4rd1f000200',
    tokenName: 'stone',
    durationToken: 120,
    durationDes: 'minutes',
    formatDate: 'DD-MM-YYYY hh:mm',
    configCors: {
        'Access-Control-Allow-Headers': 'Content-Type,Stone',
        'Access-Control-Expose-Headers': 'Stone'
    }
}
