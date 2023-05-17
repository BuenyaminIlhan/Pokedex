let colors = {
    'normal': 'gray',
    'fire': '#cc1616',
    'water': 'blue',
    'electric': '#e0e013',
    'grass': 'green',
    'ice': 'lightblue',
    'fighting': 'brown',
    'poison': 'purple',
    'ground': 'orange',
    'flying': 'skyblue',
    'psychic': 'pink',
    'bug': '#54d954',
    'rock': 'brown',
    'ghost': 'indigo',
    'dragon': 'darkblue',
    'dark': 'black',
    'steel': 'silver',
    'fairy': 'magenta'
}

let end = 40;

function init() {
    renderApi()
}

function loadPokemon() {
    end += 20;
    renderApi();
}


async function renderApi() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 1; i <= end; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        await response(url, i);
    }
}

async function response(url, index) {
    let response = await fetch(url);
    let responsAsJson = await response.json();

    renderPokemon(responsAsJson, index);
}

function renderPokemon(responsAsJson, index) {
    let content = document.getElementById('content');

    if (responsAsJson) {

        const sprite = responsAsJson['sprites']['other']['official-artwork']['front_default'];
        const name = responsAsJson['name'];
        const type = responsAsJson['types'][0]['type']['name'];
        let type2 = '';

        if (responsAsJson['types'][1]) {
            type2 = `<p class="card-text">${responsAsJson['types'][1]['type']['name']}</p>`;
        }
        content.innerHTML += genrateHTML(index, sprite, name, type, type2)
        document.getElementById(`card${index}`).style.background = colors[type];
    };
}
function genrateHTML(index, sprite, name, type, type2) {
    return `
    <div onclick="showImg()" id="card${index}" class="card" style="width: 11rem;">
    <span class="id"># ${index}</span>
    <div class="img-container">
      <img class="pokemon-img" src="${sprite}" class="card-img-top" alt="...">
    </div>  
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${type}</p>
        ${type2} <!-- Hier wird der Wert von zweitert typ eingefügt, wenn vorhanden -->
      </div>
    </div>
    <div onclick="showSmall(event)" id="big-img" class="big-img-container">
    <img src="${sprite}" alt="">
  </div>
    `;
}


function showImg() {
    document.getElementById('big-img').classList.add('d-add');
}

function showSmall(event) {
    if (event.target.tagName.toLowerCase() !== 'div') {
        // Klick auf das Bild - Funktion wird nicht ausgeführt
        return;
    }
    document.getElementById('big-img').classList.remove('d-add');
}
/*
let end = 35;

function init() {
  renderApi();
}

function loadPokemon() {
  end += 20;
  renderApi();
}

async function renderApi() {
    let content = document.getElementById('content');
    content.innerHTML = '';
  for (let i = 1; i <= end; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let responsAsJson = await response(url, i);
    renderPokemon(responsAsJson, i);
  }
}

async function response(url) {
  let response = await fetch(url);
  let responsAsJson = await response.json();
  return responsAsJson;
}

function renderPokemon(responsAsJson, index) {
  let content = document.getElementById('content');

  if (responsAsJson) {
    const sprite = responsAsJson['sprites']['other']['official-artwork']['front_default'];
    const name = responsAsJson['name'];
    const type = responsAsJson['types'][0]['type']['name'];
    let type2 = '';

    if (responsAsJson['types'][1]) {
      type2 = `<div class="card-text">${responsAsJson['types'][1]['type']['name']}</div>`;
    }

    let pokemonElement = createPokemonElement(index, sprite, name, type, type2);
    content.appendChild(pokemonElement);
    document.getElementById(`card${index}`).style.background = colors[type];
  }
}

function createPokemonElement(index, sprite, name, type, type2) {
    // Erzeuge den HTML-Code für das Pokemon-Element
    let pokemonHTML = `
      <div onclick="showImg()" id="card${index}" class="card" style="width: 11rem;">
        <span class="id"># ${index}</span>
        <div class="img-container">
          <img class="pokemon-img" src="${sprite}" class="card-img-top" alt="...">
        </div>  
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <div class="card-text">${type}</div>
          ${type2}
        </div>
      </div>
    `;
  
    // Erzeuge ein temporäres <div>-Element und setze den generierten HTML-Code über innerHTML ein
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = pokemonHTML;
  
    // Das fertige Pokemon-Element ist das erste Kind des temporären <div>-Elements
    let pokemonElement = tempDiv.firstElementChild;
  
    // Gib das fertige Pokemon-Element zurück
    return pokemonElement;
  }
*/