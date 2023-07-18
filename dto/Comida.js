class Comida {
    constructor(nome, quantidade, carb, protl, proth, fat, img) {
        this.nome = nome;
        this.carb = carb/quantidade;
        this.protl = protl/quantidade;
        this.proth = proth/quantidade;
        this.fat = fat/quantidade;
        this.img = img;
    }
}

module.exports = { Comida }