class Comida {
    constructor(validated) {
        this.nome = validated.nome;
        this.carb = validated.carb/validated.quantidade;
        this.protl = validated.protl/validated.quantidade;
        this.proth = validated.proth/validated.quantidade;
        this.fat = validated.fat/validated.quantidade;
        this.img = validated.img;
    }
}

module.exports = { Comida }