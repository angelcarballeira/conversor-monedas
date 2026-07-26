import { useState } from "react";
import "./App.css";
import { useExchangeRate } from "./useExchangeRate";
import type { CurrencyOption } from "./types";

const CURRENCIES: CurrencyOption[] = [
  { code: "USD", label: "Dólar estadounidense" },
  { code: "EUR", label: "Euro" },
  { code: "ARS", label: "Peso argentino" },
  { code: "CLP", label: "Peso chileno" },
  { code: "BRL", label: "Real brasileño" },
  { code: "GBP", label: "Libra esterlina" },
  { code: "JPY", label: "Yen japonés" },
];

function App() {
  const [amount, setAmount] = useState<string>("1");
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("EUR");

  const { rate, loading, error } = useExchangeRate(from, to);

  const numericAmount = Math.max(0, Number(amount) || 0);
  const result = rate !== null ? numericAmount * rate : null;

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="converter">
      <h1>Conversor de Monedas</h1>

      <div className="field">
        <label htmlFor="amount">Monto</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />
      </div>

      <div className="selectors">
        <div className="field">
          <label htmlFor="from">De</label>
          <select
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="swap-button"
          onClick={handleSwap}
          aria-label="Intercambiar monedas"
        >
          ⇄
        </button>

        <div className="field">
          <label htmlFor="to">A</label>
          <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="result" aria-live="polite">
        {loading && <p>Cargando tasa de cambio...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && result !== null && (
          <p>
            <strong>
              {numericAmount} {from} = {result.toFixed(2)} {to}
            </strong>
            {rate !== null && from !== to && (
              <span className="rate-info">
                {" "}
                (1 {from} = {rate.toFixed(4)} {to})
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;