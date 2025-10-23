const cardsNode = document.getElementById("cards");
var timeframeIndicator;

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

function setTimeframeIndicator(timescale) {
  switch(timescale) {
    case "daily":
      timeframeIndicator = "Yesterday";
      break;
    case "weekly":
      timeframeIndicator = "Last Week";
      break;
    case "monthly":
      timeframeIndicator = "Last Month";
      break;
    default:
      console.log("Select a timeframe");
  }
}

function populateCards(data, timescale) {
    clearCards();

    for(entry of data) {
        cardsNode.insertAdjacentHTML("beforeend",
            `<section class="card">
      <section class="card__header" id="${entry.title}-header">
      </section>
      <section class="card__info">
        <section class="card__menu">
          <h2 class="card__title">${entry.title}</h2>
          <img src="images/icon-ellipsis.svg" />
        </section>
        <section class="card__stats">
          <span class="card__current_stat">${entry.timeframes[timescale].current}hrs</span>
          <span class="card__previous_stat">${timeframeIndicator} - ${entry.timeframes[timescale].previous}hrs</span>
        </section>
      </section>
    </section>`
        );
    }
}

function clearCards() {
    cardsNode.innerHTML = "";
}