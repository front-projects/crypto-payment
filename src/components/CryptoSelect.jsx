import { useState } from "react";
import CryptoItem from "./CryptoItem";

export default function CryptoSelect({ changeCrypto }) {
  const [activeCrypto, setActiveCrypto] = useState();

  const updateCrypto = (crypto) => {
    setActiveCrypto(crypto);
    changeCrypto(crypto);
  };

  return (
    <div className="flex flex-col w-full gap-2 p-[4px]">
      <CryptoItem
        icon="/usdt.webp"
        active={activeCrypto == "usdttrc"}
        onClick={() => updateCrypto("usdttrc")}
      >
        USDT
      </CryptoItem>
      <CryptoItem
        icon="/dash.webp"
        active={activeCrypto == "dash"}
        onClick={() => updateCrypto("dash")}
      >
        Dash
      </CryptoItem>
      <CryptoItem
        icon="/btc.webp"
        active={activeCrypto == "btc"}
        onClick={() => updateCrypto("btc")}
      >
        BTC
      </CryptoItem>
      <CryptoItem
        icon="/bnb.webp"
        active={activeCrypto == "bnb20"}
        onClick={() => updateCrypto("bnb20")}
      >
        BNB
      </CryptoItem>
      <CryptoItem
        icon="/eth.webp"
        active={activeCrypto == "eth"}
        onClick={() => updateCrypto("eth")}
      >
        ETH
      </CryptoItem>
      <CryptoItem
        icon="/ton.webp"
        active={activeCrypto == "ton"}
        onClick={() => updateCrypto("ton")}
      >
        TON
      </CryptoItem>
    </div>
  );
}
