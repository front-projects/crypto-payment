import Select from "react-select";
import LabelForInput from "./LabelForInput";
import { Btc } from "./Icons";

export default function CryptoSelect({ changeCrypto }) {
  const options = [
    { value: "usdt", label: <LabelForInput icon={<Btc />} label="USDT" /> },
    { value: "dash", label: <LabelForInput icon={<Btc />} label="Dash" /> },
    { value: "btc", label: <LabelForInput icon={<Btc />} label="BTC" /> },
    { value: "bnb", label: <LabelForInput icon={<Btc />} label="BNB" /> },
    { value: "eth", label: <LabelForInput icon={<Btc />} label="ETH" /> },
    { value: "ton", label: <LabelForInput icon={<Btc />} label="TON" /> },
  ];
  return (
    <Select
      options={options}
      placeholder="Select crypto"
      onChange={(e) => changeCrypto(e.value)}
    />
  );
}
