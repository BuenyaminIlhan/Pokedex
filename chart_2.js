let CONFIG_BG_COLOR = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
]

let CONFIG_BORDER_COLOR = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

const CONFIG_CHART_OPTIONS = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

//let chartInstance = null;

function renderChart(responsAsJson,index,) {
    // if (chartInstance) {
    //     chartInstance.destroy();
    // }
    const hp = responsAsJson['stats'][0]['stat']['name'];
    const attack = responsAsJson['stats'][1]['stat']['name'];
    const defense = responsAsJson['stats'][2]['stat']['name'];
    const specialAttack = responsAsJson['stats'][3]['stat']['name'];
    const specialdefense = responsAsJson['stats'][4]['stat']['name'];
    const speed = responsAsJson['stats'][5]['stat']['name'];
    const hpStat = responsAsJson['stats'][0]['base_stat'];

    let ctx = document.getElementById(`poke-stata${index}`);

   new Chart(ctx, {
        type: 'bar',
        data: {
            labels:[ hp, attack, defense, specialAttack, specialdefense, speed],
            datasets: [{
                label: '',
                data: [hpStat, 19, 3, 5, 2, 3], 
                backgroundColor: CONFIG_BG_COLOR,
                borderColor: CONFIG_BORDER_COLOR,
                borderWidth: 1
            }]
        },
        options: CONFIG_CHART_OPTIONS
    });
}