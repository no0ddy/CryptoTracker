"use strict";
const divEL = document.getElementById("outer");
const srch = document.getElementById("srch");
const sort = document.getElementById("sort");

//Function for displaying data
const innerDiv = function (arr) {
  //Removing old data for chnage event
  while (divEL.firstChild) {
    divEL.removeChild(divEL.firstChild);
  }
  //Loop for creating element for each data element
  arr.forEach((element, i) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("inner");
    newDiv.id = `inner${i}`;
    newDiv.innerHTML += `<div><img src='${
      element.image
    }'> <span class = "nam" value ="${element.name}">${
      element.name
    }</span></div>
    <div class="sym">${element.symbol}</div>
    <div>$${element.current_price}</div>
    <div>$${element.total_volume}</div>
    <div class=${element.price_change_percentage_24h > 0 ? "up" : "down"}>${
      element.price_change_percentage_24h
    }% ${element.price_change_percentage_24h > 0 ? "👍" : "👎"}</div>
    <div>Mkt Cap: $${element.market_cap}</div>`;
    divEL.appendChild(newDiv);
  });
};

//Getting data from API
const getJSON = function () {
  const sort1 = document.getElementById("sort");
  return fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  )
    .then((resp) => resp.json())
    .then((data) => {
      let arr = [...data].reverse();
      console.log(arr);
      console.log(data);
      if (sort1.value == "asc") {
        return innerDiv(arr);
      } else if (sort1.value == "desc") {
        return innerDiv(data);
      }
    })
    .catch((err) =>
      divEL.insertAdjacentText(
        "beforeend",
        `Something went wrong 💥💥💥 ${err.message} . Try again!`
      )
    );
};
window.addEventListener("load", getJSON);

//Search event
srch.addEventListener("input", function () {
  const inpt = srch.value.toLowerCase();
  console.log(inpt);
  const text = document.getElementsByClassName("nam");

  const symb = document.getElementsByClassName("sym");
  let i = 0;
  while (i < text.length) {
    let textValue = text[i].textContent.toLowerCase();
    // console.log(textValue);
    let symbValue = symb[i].textContent.toLowerCase();
    // console.log(symbValue);
    if (!textValue.includes(inpt) && !symbValue.includes(inpt)) {
      document.getElementById(`inner${i}`).classList.add("hidden");
    } else {
      document.getElementById(`inner${i}`).classList.remove("hidden");
    }
    i++;
  }
});
