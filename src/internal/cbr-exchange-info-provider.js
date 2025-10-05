import axios from "axios"
import ExchangeInfo from "./exchange-info";
import CurrencyInfo from "./currency-info";

// getCbrExchangeInfo - функция для получения данных об обменных курсах с ресурса https://www.cbr-xml-daily.ru/daily_json.js
// вход: -
// выход: собранный из результатов http-ответа объект ExchangeInfo
export default async function getCbrExchangeInfo() {
    const uri = "https://www.cbr-xml-daily.ru/daily_json.js";
    const response = await axios.get(uri);
    const currenciesByCode = {
        "RUB": new CurrencyInfo("RUB", "Российский рубль", 1)
    };
    for (let code in response.data.Valute) {
        const currency = response.data.Valute[code];
        currenciesByCode[code] = new CurrencyInfo(
            code,
            currency.Name,
            currency.Value / currency.Nominal
        );
    }
 
    return new ExchangeInfo("RUB", currenciesByCode);
}
