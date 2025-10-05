"use client"

import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import ExchangeInfo from "@/internal/exchange-info";
import "@/app/currency-exchange/currency-exchange-form.css";

export default function CurrencyExchangeForm(props) {
    // props:
    //  - exchangeData - сериализованные данные о валютах для конвертации

    if (!("exchangeData" in props)) {
        throw new Error("exchangeData was not provided");
    }

    // Восстанавливаем экземпляр класса ExchangeInfo из plain object
    const exchangeInfo = useMemo(() => 
        ExchangeInfo.fromJSON(props.exchangeData), 
        [props.exchangeData]
    );

    const [fromCode, setFromCode] = useState("RUB");
    const [fromValue, setFromValue] = useState(1);
    const [toCode, setToCode] = useState("USD");
    const [toValue, setToValue] = useState(() => {
        const currencies = exchangeInfo.supportedCurrencies();
        const initialToCode = currencies.includes("USD") ? "USD" : currencies[0];
        return exchangeInfo.convert("RUB", initialToCode, 1);
    });

    // Пересчитываем значение при обновлении курсов
    useEffect(() => {
        const newToValue = exchangeInfo.convert(fromCode, toCode, fromValue);
        setToValue(newToValue);
    }, [exchangeInfo, fromCode, toCode, fromValue]);

    // Обработчик изменения исходной валюты
    const handleFromCodeChange = (e) => {
        const newFromCode = e.target.value;
        setFromCode(newFromCode);
        const newToValue = exchangeInfo.convert(newFromCode, toCode, fromValue);
        setToValue(newToValue);
    };

    // Обработчик изменения суммы исходной валюты
    const handleFromValueChange = (e) => {
        const newFromValue = parseFloat(e.target.value) || 0;
        setFromValue(newFromValue);
        const newToValue = exchangeInfo.convert(fromCode, toCode, newFromValue);
        setToValue(newToValue);
    };

    // Обработчик изменения целевой валюты
    const handleToCodeChange = (e) => {
        const newToCode = e.target.value;
        setToCode(newToCode);
        const newToValue = exchangeInfo.convert(fromCode, newToCode, fromValue);
        setToValue(newToValue);
    };

    // Обработчик изменения суммы целевой валюты
    const handleToValueChange = (e) => {
        const newToValue = parseFloat(e.target.value) || 0;
        setToValue(newToValue);
        const newFromValue = exchangeInfo.convert(toCode, fromCode, newToValue);
        setFromValue(newFromValue);
    };

    return (
        <div className="currency-exchange-form">
            <h2>Currency from:</h2>
            <div>
                <select 
                    value={fromCode} 
                    onChange={handleFromCodeChange}
                >{
                    exchangeInfo.supportedCurrencies().map((code, index) => {
                        return <option key={'currency-from-'+index} value={code}>{code}</option>
                    })
                }</select>
                <input 
                    type="number" 
                    value={fromValue} 
                    onChange={handleFromValueChange}
                />
            </div>
            
            <h2>Currency to:</h2>
            <div>
                <select 
                    value={toCode} 
                    onChange={handleToCodeChange}
                >{
                    exchangeInfo.supportedCurrencies().map((code, index) => {
                        return <option key={'currency-to-'+index} value={code}>{code}</option>
                    })
                }</select>
                <input 
                    type="number" 
                    value={toValue} 
                    onChange={handleToValueChange}
                />
            </div>
        </div>
    );
}

CurrencyExchangeForm.propTypes = {
    exchangeData: PropTypes.object.isRequired
};