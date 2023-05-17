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

function init() {
    renderApi()
}

async function renderApi() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 1; i <= 30; i++) {
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

    if (responsAsJson) {                    //überprüft ob es vorhanden ist und führt auch nur dann aus.

        const sprite = responsAsJson['sprites']['other']['official-artwork']['front_default'];
        const name = responsAsJson['name'];
        const type = responsAsJson['types'][0]['type']['name'];
        let type2 = '';

        // Überprüft, ob das Element in der Bedingung besteht. Wenn ja, dann weist ihn der Variablen attack zu.
        if (responsAsJson['types'][1]) {
            type2 = `<p class="card-text">${responsAsJson['types'][1]['type']['name']}</p>`;
        }

        content.innerHTML += `
      <div id="card${index}" class="card" style="width: 11rem;">
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
      `;
      document.getElementById(`card${index}`).style.background = colors[type];
    }
};
