export class CustomMath {
  static round10(value, exp) {
    return this.decimalAdjust("round", value, exp);
  }

  static floor10(value, exp) {
    return this.decimalAdjust("floor", value, exp);
  }

  static ceil10(value, exp) {
    return this.decimalAdjust("ceil", value, exp);
  }

  static decimalAdjust(type, value, exp) {
    if (typeof exp === "undefined" || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
      return NaN;
    }

    value = value.toString().split("e");
    value = Math[type](+(value[0] + "e" + (value[1] ? (+value[1] - exp) : -exp)));

    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? (+value[1] + exp) : exp));
  }
}
