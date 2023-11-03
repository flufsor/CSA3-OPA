class Drink {
  constructor(name, price, isAlcoholic) {
    this.name = name;
    this.price = price;
    this.isAlcoholic = isAlcoholic;
  }
}

const DrinkTypes = {
  "Champagne": new Drink("Champagne", 50.00, true),
  "Fristi": new Drink("Fristi", 2.50, false),
  "Hoegaarden": new Drink("Hoegaarden", 3.50, true),
}

class BarTab {
  constructor() {
    this._drinks = [];
  }

  addDrink(drink) {
    this._drinks.push(drink);
  }

  get Tab() {
    return this._drinks;
  }
}

module.exports = { Drink, DrinkTypes, BarTab }