import { useEffect, useRef, useState } from "react";

const COINS = [
  "BTC-USD", "ETH-USD", "BNB-USD", "ADA-USD", "SOL-USD",
  "XRP-USD", "DOT-USD", "DOGE-USD", "SHIB-USD", "USDT-USD"
];

export function useCryptoPrices() {
  const [prices, setPrices] = useState({});
  const [volume, setVolume] = useState({});
  const latestPrices = useRef({});
  const latestVolume = useRef({});

  useEffect(() => {
    const ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "subscribe",
        channels: [{ name: "ticker", product_ids: COINS }]
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ticker" && COINS.includes(data.product_id)) {
        latestPrices.current[data.product_id] = Number(data.price);
        latestVolume.current[data.product_id] = Number(data.volume_24h);
      }
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("WebSocket closed");

    const interval = setInterval(() => {
      setPrices({...latestPrices.current});
      setVolume({...latestVolume.current});
    }, 100);

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  return { prices, volume, coins: COINS };
}