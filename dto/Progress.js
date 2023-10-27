class Progress {
    constructor(validated) {
        this.attempt = validated.attempt;
        this.timestamp = new Date(validated.ano, validated.mes - 1, validated.dia, validated.hora + 3, validated.minuto, validated.segundo).getTime() + "";
    }
    
}

module.exports = { Progress }