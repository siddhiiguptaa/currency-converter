// Key features: 
// 1. Used flag API to showcase flags of different countries 
// 2. Used currency API to convert currency of one country to another 
// 3. Handled empty or negative values of amount 


// From here, we will create the actual endpoint URL and fetch details. 
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";


const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// what we are doing here: 
// creating the list of options of currCode to select from
// the countryList of code.js is accessible here without an import/link as it has global scope 
for(let select of dropdown){
    for(currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        // changing the selected currency using these conditions 
        if(select.name == "from" && currCode === "USD"){
            newOption.selected = "selected";
        }

        if(select.name === "to" && currCode === "INR")
        {
            newOption.selected = "selected";
        }

        // appending the option element to our select dropdown 
        select.append(newOption);
    }

    // if the value of select input changes, we call this function to change the flag 
    select.addEventListener("change", (ev) => {
        updateFlag(ev.target);
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    // to check if the amount entered is valid or not 
    if(amtVal === "" || amtVal < 1)
    {
        amtVal = 1;
        amount.value = "1";
    }

    // url to fetch the details 
    const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
    console.log(URL);
    let response = await fetch(URL);

    // if fetch request is successful or not 
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate)
    let finalAmount = amtVal*rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (ev)=>{
    ev.preventDefault(); // to prevent default behaviour of refreshing
    updateExchangeRate();
})

window.addEventListener("load", ()=>{
    updateExchangeRate();
})
