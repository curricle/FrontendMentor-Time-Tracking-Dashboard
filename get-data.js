const cardsNode = document.getElementById("cards");
const dailyButton = document.getElementById("daily");
const weeklyButton = document.getElementById("weekly");
const monthlyButton = document.getElementById("monthly");
const buttons = [dailyButton, weeklyButton, monthlyButton]

let timeframeIndicator;

//get default readout so page isn't empty on initialization
document.addEventListener("DOMContentLoaded", () =>
  getData("weekly"));

async function getData(timescale) {
    console.log(`getting ${timescale} data`);
    setTimeframeIndicator(timescale);
    try {
        const response = await fetch('data.json');
        if(!response.ok) {
            throw new Error(`HTTP error: ${response}`)
        }
        const data = await response.json();
        populateCards(data, timescale);
    }
    catch(error) {
        console.error(`Could not get data: ${error}`)
    }  
}

function toggleActiveClass(activeElement) {
  for(let button of buttons) {
    button.classList.remove("active");
  }
  activeElement.classList.add("active");
}

function setTimeframeIndicator(timescale) {
  switch(timescale) {
    case "daily":
      timeframeIndicator = "Yesterday";
      toggleActiveClass(dailyButton);
      break;
    case "weekly":
      timeframeIndicator = "Last Week";
      toggleActiveClass(weeklyButton);
      break;
    case "monthly":
      timeframeIndicator = "Last Month";
      toggleActiveClass(monthlyButton);
      break;
    default:
      console.log("Select a timeframe");
  }
}

function calculateIconMargin(icon) {
  let currentIcon = new Image();
  currentIcon.src = icon;
  return currentIcon.naturalHeight/6;
}

function populateCards(data, timescale) {
    clearCards();

    for(let entry of data) {

      let strippedEntryTitle = entry.title.replace(/\s+/g, "-").toLowerCase();

      cardsNode.insertAdjacentHTML("beforeend",
        `<section class="card">
          <section class="card__header" id="${entry.title.replace(/\s+/g, "-").toLowerCase()}-header">
            <img class="card__header-image" src="images/icon-${strippedEntryTitle}.svg" style='margin-top: -${calculateIconMargin(`images/icon-${strippedEntryTitle}.svg`)}px'" />
          </section>
          <section class="card__info">
            <section class="card__menu">
              <h2 class="card__title">${entry.title}</h2>
              <img src="images/icon-ellipsis.svg" />
            </section>
            <section class="card__stats">
              <span class="card__current-stat">${entry.timeframes[timescale].current}hrs</span>
              <span class="card__previous-stat">${timeframeIndicator} - ${entry.timeframes[timescale].previous}hrs</span>
            </section>
          </section>
        </section>`
        );
    }
}

function clearCards() {
    cardsNode.innerHTML = "";
}