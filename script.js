function init() {
    response();
    renderPokemon();
}


async function response() {
    let url = 'https://pokeapi.co/api/v2/pokemon/1/'
    let response = await fetch(url)
    let responsAsJson = await response.json();

    console.log(responsAsJson)
    renderPokemon(responsAsJson)
}

function renderPokemon(responsAsJson) {

    let content = document.getElementById('content');
    content.innerHTML = '';

    if (responsAsJson) {                                        //wird nur ausgeführt wenn die Variable API geldaen hat, dient um fehler zu vermeiden.

        content.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${responsAsJson['name']}</h5>
        <p class="card-text"></p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"></li>
        <li class="list-group-item"></li>
        <li class="list-group-item"></li>
    </ul>
    <div class="card-body">
        <a href="#" class="card-link"></a>
        <a href="#" class="card-link"></a>
    </div>
    </div>
    `;
    }

}