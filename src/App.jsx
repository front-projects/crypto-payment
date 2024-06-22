import Input from "@mui/joy/Input";
import CryptoSelect from "./components/CryptoSelect";
import { Button } from "@mui/joy";
import { submitForm } from "./util/submitForm";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

function App() {
  const [email, setEmail] = useState();
  const [amount, setAmount] = useState();
  const [crypto, setCrypto] = useState();
  const [isLoading, setIsLoading] = useState();
  const submittingForm = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      amount: amount,
      crypto: crypto,
    };

    setIsLoading(true);
    const url = await submitForm(data);
    window.location.href = url;
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {isLoading ? (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="purple"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <form
          className="shadow-xl w-full rounded-xl h-full px-4 py-10 flex items-center justify-between flex-col lg:h-2/3 lg:w-[740px]"
          onSubmit={submittingForm}
        >
          <div className="w-full flex flex-col gap-4">
            <Input
              placeholder="Email"
              size="lg"
              className="w-full"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <CryptoSelect changeCrypto={(crypto) => setCrypto(crypto)} />

            <Input
              placeholder="Amount"
              size="lg"
              className="w-full"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button className="w-full" sx={{ fontSize: "20px" }} type="submit">
            Continue
          </Button>
        </form>
      )}
    </div>
  );
}

export default App;
