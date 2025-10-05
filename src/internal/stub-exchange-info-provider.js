import CurrencyInfo from "@/internal/currency-info";
import ExchangeInfo from "@/internal/exchange-info";


export default function getExchangeInfoStub() {
    const currencies = {
        "RUB": new CurrencyInfo("RUB", "Российский рубль", 1),
        "USD": new CurrencyInfo("USD", "Американский доллар", 83),
        "EUR": new CurrencyInfo("EUR", "Евро", 97),
        "KZT": new CurrencyInfo("KZT", "Казахский тенге", 0.15)
    };
    return new ExchangeInfo("RUB", currencies);
}
