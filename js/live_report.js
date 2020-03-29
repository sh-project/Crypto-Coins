function get_data_api(checked_coins_array, setInterval_counter) {
    //$('.load-chart').fadeIn('500');
    let coins_to_url = ''
    for (let i = 0; i < checked_coins_array.length; i++) {
        coins_to_url += checked_coins_array[i].symbol
        if ((i + 1) < checked_coins_array.length) {
            coins_to_url += ','
        }
    }
    let url = `https://min-api.cryptocompare.com/data/pricemulti?relaxedValidation=true&fsyms=${coins_to_url}&tsyms=USD`

    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        error: function () {
            alert("Sorry, we're having trouble getting the information from the server");
        }
    })
        .done(function (data) {
            coins_to_chart = data;
            if (coins_to_chart.Response === "Error") {

                $('#livereports-nav').removeClass('active')
                $('#home-nav').addClass('active')
                $('#about-nav').removeClass('active')

                clearInterval(chart_setInterval)
                alert("Sorry, the currency you selected does not exist in the api of the coins to display in the graph.");
                $('#page-content').html('');
                $('#index-content').show();
                setInterval_counter = 1

            }
            if (setInterval_counter == 0) {
                google.charts.setOnLoadCallback(drawChart);

            }

        });
}


function addrow() {
    get_data_api(checked_coins, 1)

    let date_now = new Date($.now());
    var time_now = date_now.getMinutes() + ":" + date_now.getSeconds();

    let row = [time_now];
    for (let key in coins_to_chart) {
        if (coins_to_chart.hasOwnProperty(key)) {
            row.push(coins_to_chart[key]["USD"])
        }
    }
    return row;
}

let chart_setInterval;
function drawChart() {
    let data = ""
    let rows = []
    let counter = 0

    create_data()
    function create_data() {
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Time');
        for (let key in coins_to_chart) {
            if (coins_to_chart.hasOwnProperty(key)) {
                data.addColumn('number', key + ' - ' + coins_to_chart[key]["USD"]);
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


    chart_setInterval = setInterval(function () {
        create_data()
        chart.draw(data, google.charts.Line.convertOptions(options));
        if (counter == 0) {
            $('.load-chart').html('');
            counter = 1;
        }
    }, 2000);
}