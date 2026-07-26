import { useEffect, useState } from "react";
import type { ExchangeRateResponse } from "./types";

interface UseExchangeRateResult {
  rate: number | null;
  loading: boolean;
  error: string | null;
}

export function useExchangeRate(
  from: string,
  to: string
): UseExchangeRateResult {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si origen y destino son iguales, la tasa es 1 directamente
    if (from === to) {
      setRate(1);
      return;
    }

    const controller = new AbortController();

    async function fetchRate() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/${from}/${to}`,
          { signal: controller.signal }
        );


        if (!response.ok) {
          if (response.status === 404 || response.status === 422) {
            throw new Error(`No hay datos para ${from} → ${to}`);
          }
          throw new Error("No se pudo conectar con el servicio de tasas");
        }

        const data: ExchangeRateResponse = await response.json();
        setRate(data.rate ?? null);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRate();

    return () => controller.abort();
  }, [from, to]);

  return { rate, loading, error };
}