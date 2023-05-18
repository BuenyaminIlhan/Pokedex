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


let chartInstance = null;

function renderChart() {
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    const ctx = document.getElementById('poke-stats');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '',
                data: [12, 19, 3, 5, 2, 3], 
                backgroundColor: CONFIG_BG_COLOR,
                borderColor: CONFIG_BORDER_COLOR,
                borderWidth: 1
            }]
        },
        options: CONFIG_CHART_OPTIONS
    });
}
