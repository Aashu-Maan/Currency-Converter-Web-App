/*
let convert = document.getElementById("convert");
let firstcountry = document.getElementById("firstcountry");
let secondcountry = document.getElementById("secondcountry");
let result = document.getElementById("result");

let link = "https://api.currencyapi.com/v3/latest?apikey=cur_live_umystqNNXPGR4u6Ed6LqNwkkl8AHNVwY3OvUExgk&currencies=";

  
  async function createOptions(url) {
    try {
    let response = await fetch(url);
    let data = await response.json();
    let keys = Object.keys(data.data);
    keys.forEach((key) => {
      let option1 = document.createElement("option");
      option1.innerText = key;
      option1.value = key;
      let option2 = document.createElement("option");
      option2.innerText = key;
      option2.value = key;
      firstcountry.appendChild(option1);
      secondcountry.appendChild(option2)
    })
    } catch (error) {
      console.error(error)
    }
  }
  
  
  createOptions(link)


convert.addEventListener("click", () => {
    let amountbox = parseFloat(document.getElementById("amount").value); // Get value inside event

    fetch(link)
      .then(response => response.json()) 
      .then(data => {
          let first = firstcountry.value; // Get selected currency
          let second = secondcountry.value; // Get selected currency

          let firstValue = data.data[first]?.value; // Get exchange rate value
          let secondValue = data.data[second]?.value;

          if (firstValue && secondValue && amountbox) {
              let convertedAmount = (amountbox / firstValue) * secondValue;
              console.log(`Converted Amount: ${convertedAmount}`);
              result.innerText = `Converted Amount: ${convertedAmount}`;
          } else {
              console.error("Invalid input or currency selection");
          }
      })
      .catch(error => console.error("Error fetching data:", error));
});
*/

let convert = document.getElementById("convert");
let firstcountry = document.getElementById("firstcountry");
let secondcountry = document.getElementById("secondcountry");
let result = document.getElementById("result");

let link = "https://api.currencyapi.com/v3/latest?apikey=cur_live_umystqNNXPGR4u6Ed6LqNwkkl8AHNVwY3OvUExgk&currencies=";

let currencyData = {}; // Store API response globally

// Fetch once and store data
async function fetchCurrencyData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        currencyData = data.data; // Store globally

        let keys = Object.keys(currencyData);
        keys.forEach((key) => {
            let option1 = document.createElement("option");
            option1.innerText = key;
            option1.value = key;
            let option2 = document.createElement("option");
            option2.innerText = key;
            option2.value = key;
            firstcountry.appendChild(option1);
            secondcountry.appendChild(option2);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call function once
fetchCurrencyData(link);

convert.addEventListener("click", () => {
    let amountbox = parseFloat(document.getElementById("amount").value);
    
    let first = firstcountry.value; // Get selected currency
    let second = secondcountry.value; // Get selected currency

    let firstValue = currencyData[first]?.value; // Get exchange rate value
    let secondValue = currencyData[second]?.value;

    if (firstValue && secondValue && amountbox) {
        let convertedAmount = (amountbox / firstValue) * secondValue;
        console.log(`Converted Amount: ${convertedAmount}`);
        result.innerText = `${amountbox}${first} = ${convertedAmount} ${second}`;
    } else {
        console.error("Invalid input or currency selection");
    }
});