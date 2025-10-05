"use client"

import { useState, useEffect } from "react";

import CurrenciesTable from "@/app/currency-exchange/currencies-table";
import CurrencyExchangeForm from "@/app/currency-exchange/currency-exchange-form";

import getCbrExchangeInfo from "@/internal/cbr-exchange-info-provider";



// CurrencyExchange - компонент обменника валют (конвертер валют)
export default function CurrencyExchange() {

    const [exchangeData, setExchangeData] = useState(null);
    const [error, setError] = useState(null);

    const loadExchangeRates = async () => {
        setError(null);
        try {
            const exchangeInfo = await getCbrExchangeInfo();
            const data = exchangeInfo.toJSON();
            setExchangeData(data);
        } catch (err) {
            setError(err.message || "Ошибка загрузки курсов валют");
            console.error("Error loading exchange rates:", err);
        }
    };

    useEffect(() => {
        loadExchangeRates();
    }, []);

    const handleRefresh = () => {
        loadExchangeRates();
        alert("Обновление курса валют выполнено!");
    };

    if (!exchangeData && error) {
        return (
            <div>
                <p>Ошибка: {error}</p>
                <button onClick={handleRefresh}>Попробовать снова</button>
            </div>
        );
    }

    if (!exchangeData) {
        return <div>Нет данных</div>;
    }

    return (
        <div style={{ display: "flex", gap: "30px", padding: "20px" }}>
            <div style={{ flex: "0 0 400px" }}>
                <CurrencyExchangeForm exchangeData={exchangeData} />
                <button 
                    onClick={handleRefresh}
                    style={{
                        width: "100%",
                        padding: "12px 20px",
                        fontSize: "16px",
                        backgroundColor: "#0070f3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "10px"
                    }}
                >
                    Обновить курс
                </button>
                {error && (
                    <div style={{ marginTop: "10px", color: "red", fontSize: "14px" }}>
                        Ошибка обновления: {error}
                    </div>
                )}
            </div>
            <div style={{ flex: "1" }}>
                <CurrenciesTable exchangeData={exchangeData} />
            </div>
        </div>
    );
}
