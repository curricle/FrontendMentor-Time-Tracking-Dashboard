const cardsNode = document.getElementById("cards");
var cardTemplate = document.createElement("section");
cardTemplate.innerHTML(`<section class="card">
      <section class="card__header">
      </section>
      <section class="card__info">
        <h2 class="card__title"></h2>
        <section class="card__stats">
          <span class="card__current_stat"></span> <!-- daily -->
          <span class="card__previous_stat"></span> <!-- daily -->
        </section>
      </section>
    </section>`);

async function getData(timescale) {
    console.log(`getting ${timescale} data`);
    try {
        const response = await fetch('data.json');
        if(!response.ok) {
            throw new Error(`HTTP error: ${response}`)
        }
        const data = await response.json();
        console.log(data);
        populateCards(data, timescale);
    }
    catch(error) {
        console.error(`Could not get data: ${error}`)
    }  
}

function populateCards(data, timescale) {
    clearCards();
    for(entry of data) {
        console.log(entry.title);
        cardsNode.insertAdjacentHTML("beforeend",
            `<section class="card">
      <section class="card__header" id="${entry.title}-header">
      </section>
      <section class="card__info">
        <h2 class="card__title">${entry.title}</h2>
        <section class="card__stats">
          <span class="card__current_stat">${entry.timeframes[timescale].current}hrs</span>
          <span class="card__previous_stat">${entry.timeframes[timescale].previous}hrs</span>
        </section>
      </section>
    </section>`
        );
    }
}

function clearCards() {
    cardsNode.innerHTML = "";
}