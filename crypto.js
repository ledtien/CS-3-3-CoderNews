const cryptoURL =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=3&convert=USD&CMC_PRO_API_KEY=1073584a-be8d-46ec-8853-2cf30c51c52b"

let myChart;
let coin;

chartColors = [
    {
        borderColor: "rgba(247, 202, 24, 1)",
        backgroundColor: "rgba(247, 202, 24, 1)",
    },
    {
        borderColor: "rgba(150, 40, 27, 1)",
        backgroundColor: "rgba(150, 40, 27, 1)",
    },
    {
        borderColor: "rgba(34, 49, 63, 1)",
        backgroundColor: "rgba(34, 49, 63, 1)",
    }
]

async function getCryptoPrices() {
    const response = await fetch(cryptoURL);
    const jsonData = await response.json();
    coin = jsonData.data;

    console.log(coin)
    renderLineGraph(coin);
}
getCryptoPrices();

function getHistoricPrices(prices) {
    const {
        percent_change_90d,
        percent_change_60d,
        percent_change_30d,
        percent_change_7d,
        percent_change_24h,
        percent_change_1h,
        price,
    } = prices;

    const ninetyAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_90d
    );
    const sixtyAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_60d
    );
    const thirtyAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_30d
    );
    const sevenAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_7d
    );
    const dayAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_24h
    );
    const hourAgoPrice = calculatePriceFromPercentageChange(
        price,
        percent_change_1h
    );

    return [
        ninetyAgoPrice,
        sixtyAgoPrice,
        thirtyAgoPrice,
        sevenAgoPrice,
        dayAgoPrice,
        hourAgoPrice,
        price,
    ];
}


function calculatePriceFromPercentageChange(currentPrice, percentageChange) {
    let denominator;
    let historicPrice;
    if (percentageChange >= 100) {
        percentageChange = percentageChange + 100;
        denominator = percentageChange * 0.01;
        historicPrice = currentPrice / denominator;
    }

    if (percentageChange < 100 && percentageChange > 0) {
        denominator = 1 + percentageChange / 100;
        historicPrice = currentPrice / denominator;
    }

    if (percentageChange < 0) {
        const original = (currentPrice / (100 + percentageChange)) * 100;
        historicPrice = original;
    }
    return historicPrice;
}


function renderLineGraph() {
    const ctx = document.getElementById("myChart");
    const price = coin[0].quote.USD.price;
    const [ninetyAgoPrice] = getHistoricPrices(coin[0]);
    const timeAgo = ["90d", "60d", "30d", "7d", "24h", "1h", "Current"];
    myChart = new Chart(ctx, {
        type: "line",

        data: {
            labels: timeAgo,
            datasets: [
                {
                    label: "Bitcoin",
                    borderWidth: 1,
                    data: getHistoricPrices(coin[0].quote.USD),
                    ...chartColors[0],
                },
                {
                    borderWidth: 1,
                    label: "Etherium",
                    data: getHistoricPrices(coin[1].quote.USD),
                    ...chartColors[1]
                },
                {
                    label: "Binance",
                    borderWidth: 1,
                    data: getHistoricPrices(coin[2].quote.USD),
                    ...chartColors[2]
                },
            ],
        },
        options: {
            tooltips: {
                enabled: true,
                mode: "nearest",

            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: price,
                            suggestedMin: ninetyAgoPrice,

                        },
                    },
                ],
            },
        },
    });
}



function changeColor() {
    var randomColor = function (RGBA) {
        RGBA = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + RGBA;
    }
    chartColors[0].borderColor = randomColor
    chartColors[0].backgroundColor = chartColors[0].borderColor;
    chartColors[1].borderColor = randomColor
    chartColors[1].backgroundColor = chartColors[1].borderColor;
    chartColors[2].borderColor = randomColor
    chartColors[2].backgroundColor = chartColors[2].borderColor;
    myChart.destroy();
    renderLineGraph();
}


// //   function changeColor() {
// //     const chartColor = myChart.data.datasets;



// //     for ( i = 0; i < chartColor; i++) {
// //         chartColor[i].backgroundColor = randomColor;
// //         chartColor[i].borderColor = chartColor[i].backgroundColor;
// //     }
// }

var randomColor = function (RGBA) {
    RGBA = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + RGBA;
}


