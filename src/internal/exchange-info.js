
// ExchangeInfo - информация об обменных курсах для конвертации валют
export default class ExchangeInfo {
    constructor(baseCurrencyCode, currenciesByCode) {
        this.baseCurrencyCode = baseCurrencyCode; // базовая валюта это валюту с курсом 1
        this.currenciesByCode = currenciesByCode;
    }

    // supportedCurrencies - получение списка кодов поддерживаемых валют
    supportedCurrencies() {
        return Object.keys(this.currenciesByCode);
    }

    // convert - конвертация 
    // вход: коды исходной и целевой валют и значение для конвертации
    // выход: сконвертированное значение
    convert(fromCode, toCode, value) {
        if (!(fromCode in this.currenciesByCode)) {
            throw new Error(`unsupported code '${fromCode}'`);
        }
        if (!(toCode in this.currenciesByCode)) {
            throw new Error(`unsupported code '${toCode}'`);
        }
        return value * this.currenciesByCode[fromCode].exchangeRate / this.currenciesByCode[toCode].exchangeRate;
    }

    // toJSON - сериализация для передачи между серверным и клиентским компонентами
    toJSON() {
        return {
            baseCurrencyCode: this.baseCurrencyCode,
            currenciesByCode: this.currenciesByCode
        };
    }

    // fromJSON - статический метод для восстановления экземпляра класса из plain object
    static fromJSON(data) {
        return new ExchangeInfo(data.baseCurrencyCode, data.currenciesByCode);
    }
}
