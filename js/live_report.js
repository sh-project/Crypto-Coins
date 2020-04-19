function getDataApi(checkedCoinsArray, setIntervalCounter) {
    //$('.load-chart').fadeIn('500');
    let coinsToUrl = ''
    for (let i = 0; i < checkedCoinsArray.length; i++) {
        coinsToUrl += checkedCoinsArray[i].symbol
        if ((i + 1) < checkedCoinsArray.length) {
            coinsToUrl += ','
        }
    }
    let url = `https://min-api.cryptocompare.com/data/pricemulti?relaxedValidation=true&fsyms=${coinsToUrl}&tsyms=USD`

    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        error: function () {
            alert("Sorry, we're having trouble getting the information from the server");
        }
    })
        .done(function (data) {
            coinsToChart = data;
            if (coinsToChart.Response === "Error") {

                $('#livereports-nav').removeClass('active')
                $('#home-nav').addClass('active')
                $('#about-nav').removeClass('active')

                clearInterval(chartSetInterval)
                alert("Sorry, the currency you selected does not exist in the api of the coins to display in the graph.");
                $('#page-content').html('');
                $('#index-content').show();
                setIntervalCounter = 1

            }
            if (setIntervalCounter == 0) {
                google.charts.setOnLoadCallback(drawChart);

            }
        });
}


function addrow() {
    getDataApi(checkedCoins, 1)

    let dateNow = new Date($.now());
    var timeNow = dateNow.getMinutes() + ":" + dateNow.getSeconds();

    let row = [timeNow];
    for (let key in coinsToChart) {
        if (coinsToChart.hasOwnProperty(key)) {
            row.push(coinsToChart[key]["USD"])
        }
    }
    return row;
}

let chartSetInterval;
function drawChart() {
    let data = ""
    let rows = []
    let counter = 0

    createData()
    function createData() {
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Time');
        for (let key in coinsToChart) {
            if (coinsToChart.hasOwnProperty(key)) {
                data.addColumn('number', key + ' - ' + coinsToChart[key]["USD"]);
            }
        }

        rows.push(addrow());
        data.addRows(rows);
    }

    let options = {
        chart: {
            title: 'Live Crypto Currency Reports (in 100 of dollars USD)',
            subtitle: 'Updated every 2 seconds',
        },
        height: 500,
        axes: {
            x: {
                0: { side: 'top' }
            }
        }
    };

    let chart = new google.charts.Line(document.getElementById('line_top_x'));

    chart.draw(data, google.charts.Line.convertOptions(options));


    chartSetInterval = setInterval(function () {
        createData()
        chart.draw(data, google.charts.Line.convertOptions(options));
        if (counter == 0) {
            $('.load-chart').html('');
            counter = 1;
        }
    }, 2000);
}