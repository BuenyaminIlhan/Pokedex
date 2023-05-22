let end = 30;                                              // bei Änderung muss in den functionen loadPokemon und getApi angepasst werden
let currentIndex = 1;

function init() {
  getApi();
}

function loadPokemon() {
  end += 30;
  getApi();
}

async function getApi() {

  for (let i = end - 29; i <= end; i++) {                   // so wird immer sicher gestellt das i = end + 1 hat, nachdem sich i erhöht wird. 
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    await response(url, i);
  }
}

async function response(url, index) {
  let response = await fetch(url);
  let responsAsJson = await response.json();
  renderPokemon(responsAsJson, index, url);
}

function renderPokemon(responsAsJson, index, url) {
  let content = document.getElementById('content');

  if (responsAsJson) {
    const sprite = responsAsJson['sprites']['front_default'];
    const name = responsAsJson['name'];
    const type = responsAsJson['types'][0]['type']['name'];
    let type2 = '';

    if (responsAsJson['types'][1]) {
      type2 = `<span style="background-color:${colors[type]['secondColor']}; id="card-text2${index}" class="card-text padding">${responsAsJson['types'][1]['type']['name']}</span>`;
    }

    const pokemonCard = generateHTML(index, sprite, name, type, type2, responsAsJson, url);
    const pokemonElement = document.createElement('div');                     //div wird erstellt.
    pokemonElement.innerHTML = pokemonCard;                                   //div wird ins generateHTML() also zum id content hinzugefügt

    content.appendChild(pokemonElement);                                      // wird als kind Element zum div content hinzugefügt. 
    generateStyle(index, type)
    renderChart(responsAsJson, index);
  }
}

function generateHTML(index, sprite, name, type, type2, responsAsJson, url) {
  return `
  
     <div onclick="dNone(${index})" id="card${index}" class="card" style="width: 15rem;">
          <span class="id"><b># ${index}</b></span>
          <h5 class="card-title">${name}</h5>
        <div class="img-container">
        <div class="card-body">
        <p id="card-text${index}" class="card-text">${type}</p>
        ${type2}<!--  Hier wird der zweitert typ eingefügt, wenn vorhanden -->
      </div>
          <img class="pokemon-img" src="${sprite}" class="card-img-top" alt="...">
        </div>  

     </div>
    ${showPokeCard(index, sprite, name, type, type2, responsAsJson, url)}
    `;
}

function generateStyle(index, type) {
  document.getElementById(`card${index}`).style.background = colors[type]['primaryColor'];
  document.getElementById(`card-text${index}`).style.background = colors[type]['secondColor'];
}

function dNone(index) {

  if (null) {
    document.getElementById(`search-result`).innerHTML = `big-img${index}`
  }
  document.getElementById(`big-img${index}`).classList.add('d-add');
}

function dNoneRemove(index) {
  document.getElementById(`big-img${index}`).classList.remove('d-add');
}
function showSmall(event, index) {
  let div = document.getElementById(`big-img${index}`);
  if (event.target.id !== `big-img${index}`) {
    return;
  }
  div.classList.remove('d-add');
}


//----------------------------------------Pokemon Galerie-----------------------------------------------

function showPokeCard(index, sprite2, name, type, type2, responsAsJson) {
  let primaryColor = colors[type] ? colors[type]['primaryColor'] : '';
  let secondColor = colors[type] ? colors[type]['secondColor'] : '';
  let sprite = responsAsJson['sprites']['other']['official-artwork']['front_default']
  return `
      <div onclick="showSmall(event, ${index})" id="big-img${index}" class="big-img-container">
        <img class="arrow-left" onclick="previousPokemon(${index})" src="img/arrow-left.png">
        <div>
          <div class="poke-card" style="background-color:${primaryColor}">
            <h5 class="headline-pokecard">${name}</h5>
            <p class="poke-card-text" style="background-color:${secondColor}">${type}</p>
            <div class="type2-pokecard">${type2}</div>
            <img id="poke-card-img${index}" class="pokemon-img-show" src="${sprite}" alt="">
          </div>
          <div class="poke-stats">
            <h5>Pokemon Stats</h5>
            <canvas id="poke-stats${index}"></canvas>
          </div>
        </div>
        <img class="arrow-right" onclick="nextPokemon('${index}')" src="img/arrow-right.png">
      </div>`;
}

function nextPokemon(index) {
  if (index < end) {
    dNoneRemove(index);
    index++;
    dNone(index);
  } else {
    dNoneRemove(index);
    index = 1;
    dNone(index);
  }
}

function previousPokemon(index) {
  if (index > 1) {
    dNoneRemove(index);
    index--;
    dNone(index);
  } else {
    dNoneRemove(index);
    index = end;
    dNone(index);
  }
}


//--------------------------------------Search----------------------------------------------------- 

async function createSearchArray() {
  let searchResults = document.getElementById('search-result');
  searchResults.innerHTML = '';
  let foundPokemons = [];                                           //gefundene werden hier gelagert um doppelt zu vermeiden

  for (let i = 1; i < 1011; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    let response = await fetch(url);
    response = await response.json();
    searchPokemon(response, searchResults, foundPokemons, i);
  }
}



function searchPokemon(response, searchResults, foundPokemons, index) {
  let name = response['name'];
  let picture = response['sprites']['front_shiny'];
  let type = response['types'][0]['type']['name'];

  let search = document.getElementById('search').value;
  search = search.toLowerCase();

  if (name.toLowerCase().includes(search) && !foundPokemons.includes(name)) {
    foundPokemons.push(name);
    if (search.length > 0) {
      document.getElementById('found-info').innerHTML = `Es gab ${foundPokemons.length} treffer`
    }
    searchResults.innerHTML += `
    <div onclick="dNone(${index})" id="card${index}" class="card" style="width: 15rem;">
    <span class="id"><b># ${index}</b></span>
    <h5 class="card-title">${name}</h5>
  <div class="img-container">
  <div class="card-body">
  <p id="card-text${index}" class="card-text">${type}</p>
</div>
    <img class="pokemon-img" src="${picture}" class="card-img-top" alt="...">
  </div>  

</div>
`;
    generateStyle(index, type)
  }
  console.log(foundPokemons.length)
}