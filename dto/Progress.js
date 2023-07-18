class Progress {
    constructor(attempt, ano, mes, dia, hora, minuto, segundo) {
        this.attempt = attempt;
        this.timestamp = new Date(ano, mes - 1, dia, hora, minuto, segundo).getTime() + "";
    }
    
}

module.exports = { Progress }