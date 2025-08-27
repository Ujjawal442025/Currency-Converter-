// Updated base URL
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".exchange");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapBtn = document.querySelector(".swap")

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  
  // Updated URL structure
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; 
  
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
  
});

const swapCurrencies = () => {
    const fromValue = fromCurr.value;
    const toValue = toCurr.value;
            
    fromCurr.value = toValue;
    toCurr.value = fromValue;
            
    updateFlag(fromCurr);
    updateFlag(toCurr);
            
    updateExchangeRate();
};
swapBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    swapCurrencies(); // Simply call the swap function
});
window.addEventListener("load", () => {
  updateExchangeRate();
});

