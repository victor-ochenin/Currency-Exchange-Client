import _ from "@/app/currency-exchange/currencies-table.css";

// CurrenciesTable - компонент для отображения данных ExchangeInfo
export default function CurrenciesTable(props) {
    // props:
    //  - exchangeData - сериализованные данные о валютах для конвертации

    if (!("exchangeData" in props)) {
        throw new Error("exchangeData was not provided");
    }

    return (
        <table className="currencies-table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Rate</th>
                </tr>
            </thead>
            <tbody>{
                Object.values(props.exchangeData.currenciesByCode).map((currencyInfo, index) => {
                    return (
                        <tr key={'currency-row-' + index}>
                            <td>{currencyInfo.code}</td>
                            <td>{currencyInfo.name}</td>
                            <td>{currencyInfo.exchangeRate}</td>
                        </tr>
                    );
                })
            }</tbody>
        </table>
    );
}