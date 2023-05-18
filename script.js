let colors = {
  'normal': {
    'primaryColor': 'gray',
    'secondColor': '#504949',
  },
  'fire': {
    'primaryColor': '#cc1616',
    'secondColor': '#9c0f0f',
  },
  'water': {
    'primaryColor': 'blue',
    'secondColor': '#0d0d7a',
  },
  'electric': {
    'primaryColor': '#e0e013',
    'secondColor': '#88860a',
  },
  'grass': {
    'primaryColor': 'green',
    'secondColor': '#0a550a',
  },
  'ice': {
    'primaryColor': 'lightblue',
    'secondColor': '#0a3e3e',
  },
  'fighting': {
    'primaryColor': 'brown',
    'secondColor': '#5f3d3d',
  },
  'poison': {
    'primaryColor': 'purple',
    'secondColor': '#3d1d3d',
  },
  'ground': {
    'primaryColor': 'orange',
    'secondColor': '#7a490d',
  },
  'flying': {
    'primaryColor': 'skyblue',
    'secondColor': '#1d3d3d',
  },
  'psychic': {
    'primaryColor': 'pink',
    'secondColor': '#7a0d0d',
  },
  'bug': {
    'primaryColor': '#54d954',
    'secondColor': '#3d7a3d',
  },
  'rock': {
    'primaryColor': 'brown',
    'secondColor': '#3d2a2a',
  },
  'ghost': {
    'primaryColor': 'indigo',
    'secondColor': '#2a1a2a',
  },
  'dragon': {
    'primaryColor': 'darkblue',
    'secondColor': '#0d0d4c',
  },
  'dark': {
    'primaryColor': 'black',
    'secondColor': '#2a2a2a',
  },
  'steel': {
    'primaryColor': 'silver',
    'secondColor': '#4c4c4c',
  },
  'fairy': {
    'primaryColor': 'magenta',
    'secondColor': '#3d1a3d',
  }
};


let end = 40;

function init() {
  renderApi()
}

function loadPokemon() {
  end += 15;
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
      type2 = `<p id="card-text2${index} class="card-text">${responsAsJson['types'][1]['type']['name']}</p>`;
    }
    content.innerHTML += genrateHTML(index, sprite, name, type, type2)
    document.getElementById(`card${index}`).style.background = colors[type]['primaryColor'];
    document.getElementById(`card-text${index}`).style.background = colors[type]['secondColor'];
    
  };
}
function genrateHTML(index, sprite, name, type, type2) {
  return `
    <div onclick="showImg(${index})" id="card${index}" class="card" style="width: 11rem;">
    <span class="id"><b># ${index}</b></span>
    <div class="img-container">
      <img class="pokemon-img" src="${sprite}" class="card-img-top" alt="...">
    </div>  
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p id="card-text${index}" class="card-text">${type}</p>
        ${type2} <!-- Hier wird der Wert von zweitert typ eingefügt, wenn vorhanden -->
      </div>
    </div>
    <div onclick="showSmall(event, ${index})" id="big-img${index}" class="big-img-container">
    <img class="arrow-left" onclick="previousPokemon()" src="img/arrow-left.png">
    <img class="pokemon-img-show" src="${sprite}" alt="">
    <img class="arrow-right" onclick="nextPokemon()" src="img/arrow-right.png">
  </div>
    `;
}


function showImg(index) {
  document.getElementById(`big-img${index}`).classList.add('d-add');
}

function showSmall(event, index) {
  if (event.target.tagName.toLowerCase() !== 'div') {
    // Klick auf das Bild - Funktion wird nicht ausgeführt
    return;
  }
  document.getElementById(`big-img${index}`).classList.remove('d-add');
}

function nextPokemon() {
  console.log('rechts')
  genrateHTML();
}

function previousPokemon() {
  console.log('links')
  genrateHTML();
}