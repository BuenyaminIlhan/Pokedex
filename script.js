async function init() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 1; i <= 40; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        await response(url);
    }
}

async function response(url) {
    let response = await fetch(url);
    let responsAsJson = await response.json();

    renderPokemon(responsAsJson);

}


function renderPokemon(responsAsJson) {
    let content = document.getElementById('content');

    if (responsAsJson) {                    //überprüft ob es vorhanden ist und führt auch nur dann aus.

        const sprite = responsAsJson['sprites']['other']['official-artwork']['front_default'];
        const name = responsAsJson['name'];
        const type = responsAsJson['types'][0]['type']['name'];
        let attack = '';

        // Überprüft, ob das Element in der Bedingung besteht. Wenn ja, dann weist ihn der Variablen attack zu.
        if (responsAsJson['types'][1]) {
            attack = `<p class="card-text">ATTACK: ${responsAsJson['types'][1]['type']['name']}</p>`;
          }
          

        content.innerHTML += `
      <div class="card" style="width: 11rem;">
        <img class="pokemon-img" src="${sprite}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">TYP: ${type}</p>
          ${attack} <!-- Hier wird der Wert von attack (Angriff) eingefügt, wenn vorhanden -->
        </div>
      </div>
      `;
    }
};