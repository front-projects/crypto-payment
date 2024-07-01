import CryptoSelect from "./components/CryptoSelect";
import { Button } from "@mui/joy";
import { submitForm } from "./util/submitForm";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { InputElement } from "./components/CustomInput";
import { IoIosCloseCircle } from "react-icons/io";
import WebApp from "@twa-dev/sdk";

import { IoIosCheckmarkCircle } from "react-icons/io";

function App() {
  const [email, setEmail] = useState();
  const [amount, setAmount] = useState();
  const [crypto, setCrypto] = useState();
  const [adress, setAdress] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState([]);
  const [mode, setMode] = useState("deposit");
  const [isError, setIsError] = useState(false);
  const [balance, setBalance] = useState();
  const [id, setId] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    WebApp.BackButton.show();
    const queryParams = new URLSearchParams(window.location.search);
    const modeParam = queryParams.get("mode");
    const idParam = queryParams.get("data");
    const balanceParam = queryParams.get("balance");
    setBalance(balanceParam);
    setMode(modeParam);
    setId(idParam);
  }, []);

  if (isError) {
    return (
      <div className="w-screen h-screen flex items-center justify-center flex-col text-2xl font-semibold px-10 text-center gap-4">
        Something went wrong, please try again later
        <IoIosCloseCircle className="text-[300%] text-red-600" />
      </div>
    );
  }

  const submittingForm = async (e) => {
    e.preventDefault();

    let data;
    mode !== "withdraw"
      ? (data = {
          login: id,
          email: email,
          transactionAmount: amount,
          currencyCode: crypto.toUpperCase(),
        })
      : (data = {
          login: id,
          email: email,
          transactionAmount: amount,
          currency: crypto.toUpperCase(),
          cryptoAddress: adress,
          description: description,
        });

    const errors = [];

    if (!email || email.trim() === "") {
      errors.push("email");
    }
    if ((!amount || amount <= 0) && mode == "withdraw") {
      errors.push("amount");
    }
    if (!crypto) {
      errors.push("crypto");
    }
    if (!adress && mode == "withdraw") {
      errors.push("adress");
    }

    setError(errors);
    if (errors.length == 0) {
      setIsLoading(true);
      const url = await submitForm(data, mode ? mode : "deposit", id);
      const submiting = () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        setIsSubmitting(true);
      };

      if (url) {
        mode !== "withdraw" ? (window.location.href = url) : submiting();
      } else {
        setIsError(true);
      }
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  return (
    <div className="w-screen flex items-center justify-center">
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center">
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
        </div>
      ) : (
        <form
          className="relative shadow-xl w-full min-h-screen rounded-xl px-4 py-6 flex items-center justify-between flex-col lg:h-2/3 lg:w-[740px] lg:mt-4"
          onSubmit={submittingForm}
        >
          <div className="w-full flex flex-col gap-2 mb-20">
            <div className="w-full text-center font-semibold text-xl bg-[#9c27b0] rounded-md py-2 text-white">
              {mode == "withdraw" ? (
                <div>MONEY WITHDRAW</div>
              ) : (
                <div>MONEY DEPOSIT</div>
              )}
            </div>
            <div className="font-semibold text-xl text-center border-b-2 p-2 mb-4">
              Pay via preferable crypto
              <div className="text-sm text-[#9c27b0]">
                ~from whale project devs~
              </div>
            </div>
            {isSubmitting ? (
              <div className="w-full flex items-center text-center pt-4 px-2 font-semibold text-xl flex-col gap-4">
                Everything has been successfully completed. Please close the
                browser and return to the whales. Your withdrawal request is
                currently being processed and should be completed shortly.
                <IoIosCheckmarkCircle className="text-[400%] text-[#9c27b0]" />
              </div>
            ) : (
              <>
                <h3
                  className={`font-semibold p-1 ${error.includes("email") ? "text-red-600" : "text-gray-700 "}`}
                >
                  Enter a valid email
                </h3>
                <InputElement
                  required
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <h3
                  className={`font-semibold p-1 ${error.includes("crypto") ? "text-red-600" : "text-gray-700 "}`}
                >
                  Select a crypto
                </h3>
                <CryptoSelect changeCrypto={(crypto) => setCrypto(crypto)} />

                {mode == "withdraw" && (
                  <>
                    <h3
                      className={`font-semibold p-1 ${error.includes("amount") ? "text-red-600" : "text-gray-700 "}`}
                    >
                      Enter an amount
                    </h3>
                    <InputElement
                      required
                      type="number"
                      max={balance ? balance : 9999}
                      step="0.0001"
                      min={0}
                      placeholder="Amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <h3
                      className={`font-semibold p-1 ${error.includes("adress") ? "text-red-600" : "text-gray-700 "}`}
                    >
                      Enter a crypto adress
                    </h3>
                    <InputElement
                      required
                      type="text"
                      placeholder="Crypto adress"
                      onChange={(e) => setAdress(e.target.value)}
                    />
                    <h3
                      className={`font-semibold p-1 ${error.includes("description") ? "text-red-600" : "text-gray-700 "}`}
                    >
                      Description
                    </h3>
                    <InputElement
                      type="text"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {!isSubmitting && (
            <div className="w-full fixed left-[5%] bottom-4 lg:w-1/2 lg:left-[27.5%]">
              {" "}
              <ColorButton
                sx={{ fontSize: "20px", width: "90%" }}
                type="submit"
              >
                Continue
              </ColorButton>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default App;
