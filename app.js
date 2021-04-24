const API_KEY = 'aGUSPEKg68Y2yKb_fdQh';

var myChartObject = document.getElementById("myChart");
var chart;
let dates = [];
let values = [];

async function loadCourse() {

    getDates();
    console.log(dates);
    let startDate = dates[0];
    let endDate = dates[27];
    //let url = `https://www.quandl.com/api/v3/datasets/BITFINEX/BTCJPY?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

    let url = `https://www.quandl.com/api/v3/datasets/BITSTAMP/USD?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

    let response = await fetch(url);
    let responseAsJson = await response.json();
    getValues(responseAsJson);
    showBitcoinToday(responseAsJson);
    console.log(responseAsJson);

    chart = new Chart(myChartObject, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Bitcoin-Kurs',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: values
            }]
        },
    });
}

function getDates() {
    for (let index = 28; index > 0; index--) {
        let day = new Date;
        day.setDate(new Date().getDate() - index);
        let dayOfIndex = day.toISOString().split('T')[0];
        dates.push(dayOfIndex);
    }
}

function getValues(responseAsJson) {
    let value = responseAsJson.dataset.data;
    for (let index = 27; index > -1; index--) {
        let valueOfIndex = value[index][3];
        values.push(valueOfIndex);
    }
    console.log(values);
}

function showBitcoinToday(responseAsJson) {
    let bitcoinToday = responseAsJson.dataset.data[0][3];
    let dateToday = dates[27];
    document.getElementById("bitcoin").innerHTML = bitcoinToday;
    document.getElementById("date").innerHTML = dateToday;

}