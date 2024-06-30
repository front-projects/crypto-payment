import { API_URL } from "./config.js";

export const submitForm = async (data, mode, tgid) => {
  console.log(mode);
  console.log(data);
  // mode !== "withdraw"
  //   ? (data = {
  //     login: id,
  //     email: email,
  //     amount: amount,
  //     crypto: crypto,
  //   })
  //   : (data = {
  //     tgid: id,
  //     email: email,
  //     amount: amount,
  //     crypto: crypto,
  //     adress: adress,
  //     description: description,
  //   });

  if (mode === "withdraw") {
    console.log(API_URL + "/withdraws/" + tgid);
    try {
      const response = await fetch(API_URL + "/withdraws/" + tgid, {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);
      return "https://whalesfederation.tech";
      // console.log(responseData)
    } catch (error) {
      console.error("Error:", error);
      // throw error; // Propagate the error so the calling code can handle it
      return false;
    }
  } else if (mode === "deposit") {
    try {
      const response = await fetch(API_URL + "/deposits/getlink", {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);
      return responseData.url;
      // console.log(responseData)
    } catch (error) {
      return false;
      // console.error("Error:", error);
      // throw error; // Propagate the error so the calling code can handle it
    }
  }
  // mode = deposit, withdraw
  // id= ?data= from url
  // return "https://www.google.com/";
};
