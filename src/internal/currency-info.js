
// CurrencyInfo - описание данных о валюте в обеменнике
export default class CurrencyInfo {
    constructor(code, name, exchangeRate) {
        this.code = code;
        this.name = name;
        this.exchangeRate = exchangeRate;
    }
}
