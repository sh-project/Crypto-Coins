$(document).ready(function () {

    // get the home-page content (from index_page.js)
    $('#index-content').html(index_content());
    $('#home-nav').addClass('active')
    // get all coins
    get_Coins("https://api.coingecko.com/api/v3/coins/list");

    // Rotating Text - Morphtext
    $("#js-rotating").Morphext({
        animation: "fadeIn",
        separator: ",",
        speed: 2000,
        complete: function () {
        }
    });

    //Prevent href=“#” Going to Top of Page
    $('.no-top').click(function (e) {
        e.preventDefault();
    });

    //search-click
    $('#search-click').click(function () {
        document.getElementById("search-coin").focus();
    });

    ///// nav /////
    //home
    $('#home-nav').click(function () {
        $('#page-content').html('');
        $('#index-content').show();

        $(this).addClass('active')
        $('#livereports-nav').removeClass('active')
        $('#about-nav').removeClass('active')

        clearInterval(chart_setInterval)
    });

    //livereports
    $('#livereports-nav').click(function () {
        checked_coins = JSON.parse(localStorage.getItem('checked_coins'));

        if (checked_coins.length > 0) {
            $('#index-content').hide();
            $('#page-content').html('');
            // get the livereports-page content (from livereports_page.js)
            $('#page-content').html(report_content());

            $(this).addClass('active')
            $('#home-nav').removeClass('active')
            $('#about-nav').removeClass('active')

            let coins_to_chart = ""
            get_data_api(checked_coins, 0)
            google.charts.load('current', { 'packages': ['line'] });

        }
        else {
            modal_error('No coins were selected', 'To view the <strong>Live Report</strong>, you must select at least one currency');
        }

    });

    //about
    $('#about-nav').click(function () {
        $('#index-content').hide();
        $('#page-content').html('');
        // get the about-page content (from about_page.js)
        $('#page-content').html(about_content());

        $(this).addClass('active')
        $('#home-nav').removeClass('active')
        $('#livereports-nav').removeClass('active')
    });

});

/////////////////// get and append all coins ///////////////////
function get_Coins(url) {
    $('.load-coins').fadeIn('500');
    $('#result').html("");

    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        error: function () {
            alert("Sorry, we're having trouble getting the information from the server");
        }
    })
        .done(function (data) {
            localStorage.setItem('allCoins', JSON.stringify(data));
            let shown_coins = {
                from: 0,
                to: 51
            }
            localStorage.setItem('shown_coins', JSON.stringify(shown_coins));
            let checked_coins = [];
            localStorage.setItem('checked_coins', JSON.stringify(checked_coins));
            draw_coins(data, 0, 51);
        });
}

function draw_coins(data, from, to) {
    let coins_str = '';
    for (let i = from; i < to; i++) {
        let checked_coins = JSON.parse(localStorage.getItem('checked_coins'));
        let checked_coin = ''
        if (checked_coins.find(x => x.id === data[i].id)) {
            checked_coin = 'checked'
        }
        let searchid = ""
        coins_str += append_coin(data[i], checked_coin, searchid)
    }
    coins_str += '<div class="row"><a id="load-more-coins" class="btn-outline-lg no-top mt-2 mb-5" href="#aaa"><i class="fas fa-chevron-down"></i>&nbsp;&nbsp;&nbsp;LOAD MORE COINS</a>';

    setTimeout(function () {
        $('.load-coins').fadeOut('500');
        $('#result').append(coins_str);
    }, 500);
};

function append_coin(coin, checked_coin, searchid) {
    return `
    <div id="coin-card-${coin.symbol}" class="coin-card scale-up-center ${checked_coin} ${searchid}">
        <div class="card m-3">
            <div class="card-header d-flex justify-content-between">
                <div> ${coin.name}</div>
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="switch-checkbox switch-checkbox-coin custom-control-input" ${checked_coin} coinid="${coin.id}" symbol="${coin.symbol}" name="${coin.name}" id="${coin.id}">
                    <label class="custom-control-label" for="${coin.id}"></label>
                </div>
            </div>
            <div class="card-body">
                <h4 class="card-title"> ${coin.symbol.toUpperCase()} </h4>
                <button id="button-${coin.id}" class="btn btn-secondary" type="button" onclick="get_Coin('${coin.id}')" data-toggle="collapse" data-target="#collapse-${coin.id}" aria-expanded="false" aria-controls="collapse-${coin.id}">
                    More Info
                </button>
            </div>
            <div class="collapse" id="collapse-${coin.id}">
                <div id="load-moer-info-${coin.id}">
                    <!-- load bar -->
                    <div class="load-bar">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div><!-- end of load bar -->
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
                    
                </div>
                <div id="moreinfo-${coin.id}"></div>
            </div>
        </div>
    </div>`
};

/////////////////// load more coins /////////////////// 
$(document).on('click', '#load-more-coins', function () {
    $('#load-more-coins').html('<i class="fas fa-spinner"></i>&nbsp;&nbsp;&nbsp;LOAD...');
    let localStorage_all_coins = JSON.parse(localStorage.getItem('allCoins'));
    let shown_coins = JSON.parse(localStorage.getItem('shown_coins'));
    let from = shown_coins.to;
    let to = 0;

    if (localStorage_all_coins.length > (from + 51)) {
        to = from + 51;
    }
    else {
        to = localStorage_all_coins.length;
    }

    if (from >= localStorage_all_coins.length) {
        $('#load-more-coins').html('Hi, well done, No more coins')
    }
    else {
        draw_coins(localStorage_all_coins, from, to);
        setTimeout(function () {
            $('#load-more-coins').remove();
        }, 500);
    }

    shown_coins = {
        from: from,
        to: to
    }
    localStorage.setItem('shown_coins', JSON.stringify(shown_coins));
});


/////////////////// Get more info for coin /////////////////// 
function get_Coin(id) {
    if (localStorage.getItem(id) != null) {
        //saved in local
        let localStorage_coin = JSON.parse(localStorage.getItem(id));

        if ((Date.now() - localStorage_coin.time_open) < 120000) {
            //no 2 minutes passed
            draw_coin(localStorage_coin.coin)
        }
        else {
            //Calling server that less than 2 minutes
            get_Coin_from_api(id)
        }
    }
    else {
        //Calling server that - Is not reserved locall
        get_Coin_from_api(id)
    }
}

function get_Coin_from_api(id) {
    let load_moer_info_Id = '#load-moer-info-' + id;
    $(load_moer_info_Id).show();
    let moreinfo_Id = '#moreinfo-' + id;
    $(moreinfo_Id).html('');

    let url = `https://api.coingecko.com/api/v3/coins/${id}`
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        error: function () {
            alert("Sorry, we're having trouble getting the information from the server");
        }
    })
        .done(function (data) {
            //set the open coin in local storage
            let coin = {
                time_open: Date.now(),
                id: data.id,
                name: data.name,
                symbol: data.symbol,
                usd: data.market_data.current_price.usd,
                eur: data.market_data.current_price.eur,
                ils: data.market_data.current_price.ils,
                image: data.image.large,
                coin: data
            }
            localStorage.setItem(data.id, JSON.stringify(coin));

            draw_coin(data);
        });
}

function draw_coin(data) {
    let load_moer_info_Id = '#load-moer-info-' + data.id;
    let moreinfo_Id = '#moreinfo-' + data.id;
    $(moreinfo_Id).html('');

    let html_str = "";
    html_str += `
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${data.market_data.current_price.usd} <i class="fas fa-dollar-sign"></i></li>
            <li class="list-group-item">${data.market_data.current_price.eur} <i class="fas fa-euro-sign"></i></li>
            <li class="list-group-item">${data.market_data.current_price.ils} <i class="fas fa-shekel-sign"></i></li>
        </ul>
        <img class="card-img" src= ${data.image.large} alt="Card image cap">
    </div>`

    $(load_moer_info_Id).hide();
    $(moreinfo_Id).append(html_str);

    let buttonId = '#button-' + data.id
    $(buttonId).attr("onclick", "LessInfo('" + data.id + "')");
    $(buttonId).html(' less info ');
}

function LessInfo(id) {
    setTimeout(function () {
        let buttonId = '#button-' + id
        $(buttonId).attr("onclick", "get_Coin('" + id + "')");
        $(buttonId).html('more info');
    }, 100);
}



/////////////////// checked coin ///////////////////
$(document).on('change', '.switch-checkbox-coin', function () {
    let checked_coins = [];
    if (localStorage.getItem('checked_coins') != null) {
        checked_coins = JSON.parse(localStorage.getItem('checked_coins'));
    }

    if (this.checked) {
        if (checked_coins.length > 4) {
            let new_checked_coin = {
                name: $(this).attr('name'),
                id: $(this).attr('id'),
                symbol: $(this).attr('symbol'),
                coinid: $(this).attr('coinid')
            }
            modal_coins(checked_coins, new_checked_coin);
            this.checked = false;
        }
        else {
            let checked_coin = {
                name: $(this).attr('name'),
                id: $(this).attr('id'),
                symbol: $(this).attr('symbol'),
                coinid: $(this).attr('coinid')
            }
            checked_coins.push(checked_coin);
            localStorage.setItem('checked_coins', JSON.stringify(checked_coins));
        }
    }
    else {
        for (let i = 0; i < checked_coins.length; i++) {
            if (checked_coins[i].id === $(this).attr('id')) {
                checked_coins.splice(i, 1);
                localStorage.setItem('checked_coins', JSON.stringify(checked_coins));
            };
        };
    }
});

//modal if check more then 5 coins
function modal_coins(checked_coins, new_checked_coin) {
    checked_coins = JSON.parse(localStorage.getItem('checked_coins'));
    let modal_str = `
    <div class="modal fade" id="modal-coins" tabindex="-1" role="dialog" aria-labelledby="modal-coins-Title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content  bg-secondary border-dark">
       
        <div class="card-body text-center">
            <h5 class="card-title">Up to 5 coins can be selected</h5>
            <p class="card-text">If you want to check the coin <strong class="text-primary">"${new_checked_coin.symbol}"</strong></br>You must uncheck one of the coins</p>
        </div>
        <ul class="list-group m-2">`


    for (let i = 0; i < checked_coins.length; i++) {
        //לשנות לפור אחר
        modal_str += `
            <li class="list-group-item d-flex justify-content-between">
               <div> ${checked_coins[i].symbol}</div>
                <div class="custom-control custom-switch">
                    <input type="checkbox" checked class="modal-coin-checkbox custom-control-input" coinid="${checked_coins[i].coinid}" symbol="${checked_coins[i].symbol}" name="${checked_coins[i].name}" id="modal-switch-${checked_coins[i].coinid}">
                    <label class="custom-control-label" for="modal-switch-${checked_coins[i].coinid}"></label>
                </div>
            </li>`
    }

    modal_str += `
        </ul>
            <div class="modal-footer">
            <button type="button" id="Save-modal-changes" class="btn btn-primary">Done</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
    </div>`

    let modal_coins_changes = [];

    $(document).on('change', '.modal-coin-checkbox', function () {
        if (this.checked) {
            for (let i = 0; i < modal_coins_changes.length; i++) {
                if (modal_coins_changes[i].symbol === $(this).attr('symbol')) {
                    modal_coins_changes.splice(i, 1);
                };
            };


        }
        else {
            let modal_coin_checked = {
                name: $(this).attr('name'),
                id: $(this).attr('id'),
                symbol: $(this).attr('symbol'),
                coinid: $(this).attr('coinid')
            }
            modal_coins_changes.push(modal_coin_checked);
        }

    });

    $(document).on('click', '#Save-modal-changes', function () {
        if (modal_coins_changes.length == 0) {
            alert(`If you want to check coin "${new_checked_coin.symbol}". You must uncheck one of the coins`)
        }
        else {
            $('#modal-coins').modal('toggle');
            for (let i = 0; i < modal_coins_changes.length; i++) {
                let switch_id = "#" + modal_coins_changes[i].coinid;
                $(switch_id).prop("checked", false)

                for (let x = 0; x < checked_coins.length; x++)
                    if (checked_coins[x].symbol == modal_coins_changes[i].symbol) {
                        checked_coins.splice(x, 1);
                    };
            };

            let new_checked_coin_id = "#" + new_checked_coin.id;
            $(new_checked_coin_id).prop("checked", true)
            checked_coins.push(new_checked_coin);
            localStorage.setItem('checked_coins', JSON.stringify(checked_coins));
        }

    });


    $('#modal-coins').remove();
    $('body').append(modal_str);
    $('#modal-coins').modal('show');
}


////////////////////// search //////////////////////
$(document).on('change', '#search-coin', function () {
    search();
});

function search() {
    let searchvalue = document.getElementById('search-coin').value;

    if (searchvalue.length > 0) {
        let CoinsArray = JSON.parse(localStorage.getItem('allCoins'));
        let searchCoin = CoinsArray.find(x => x.symbol.toUpperCase() === searchvalue);

        if (!searchCoin) {
            modal_error('not match any currency', 'Please note: search the currency symbol (BTC for BITCOIN) in capital letters');
            document.getElementById("search-coin").focus();
        }
        else {
            coin_card_id = "#coin-card-" + searchCoin.symbol;
            $('.coin-card').hide();
            $('#load-more-coins').hide();
            if (document.getElementById("coin-card-" + searchCoin.symbol) === null) {
                0
                let checked_coin = ''
                let checked_coins = JSON.parse(localStorage.getItem('checked_coins'));
                if (checked_coins.find(x => x.id === searchCoin.id)) {
                    checked_coin = 'checked';
                }
                $('#result').append(append_coin(searchCoin, checked_coin, 'from-search'));
            }
            else {
                $(coin_card_id).show();
            }
            $("#searchBtn").html('<i class="fas fa-times fa-stack-1x"></i>');
            $("#searchBtn").attr('class', 'btn-times');

            $('#selectedCoins').prop('checked', false);
        }
    }
    else {
        $('.coin-card').show();
        $('.from-search').remove();
        $('#load-more-coins').show();
        $("#searchBtn").html('<i class="fas fa-search fa-stack-1x"></i>');
        $("#searchBtn").attr('class', 'btn-search');
    }
}

//search-btn
$(document).on('click', '#searchBtn', function () {
    if ($(this).attr('class') == 'btn-times') {
        document.getElementById("search-coin").value = ""
        $("#searchBtn").html('<i class="fas fa-search fa-stack-1x"></i>');
        $("#searchBtn").attr('class', 'btn-search');
        search();
    }
    else {
        document.getElementById("search-coin").focus();
    }
});

////////////////////// filter selected coins //////////////////////
$(document).on('change', '#selectedCoins', function () {
    let checked_coins = JSON.parse(localStorage.getItem('checked_coins'));
    if (checked_coins.length > 0) {
        filter_selected_coins($(this).is(':checked'), checked_coins);
    }
    else {
        $('#selectedCoins').prop('checked', false);
        modal_error('No coins were selected', 'To view the <strong>Selected Coins</strong>, you must select at least one currency');
    }
});

function filter_selected_coins(checked, checked_coins) {
    if (checked) {
        document.getElementById("search-coin").value = ""
        $("#searchBtn").html('<i class="fas fa-search fa-stack-1x"></i>');
        $("#searchBtn").attr('class', 'btn-search');
        search();

        $('.coin-card').hide();
        for (let i = 0; i < checked_coins.length; i++) {
            if (document.getElementById("coin-card-" + checked_coins[i].symbol) === null) {
                let checked_coin = ''
                if (checked_coins.find(x => x.id === checked_coins[i].id)) {
                    checked_coin = 'checked';
                }
                $('#result').append(append_coin(checked_coins[i], checked_coin, 'from-search'));
            }
            else {
                coin_card_id = "#coin-card-" + checked_coins[i].symbol;
                $(coin_card_id).show();
            }
        }
        $('#load-more-coins').hide();
    }
    else {
        $('.coin-card').show();
        $('.from-search').remove();
        $('#load-more-coins').show();
    }
}

////////////////////// Uncheck all Coins //////////////////////
$(document).on('click', '#uncheckCoins', function () {
    let checked_coins = JSON.parse(localStorage.getItem('checked_coins'));
    if (checked_coins.length > 0) {
        for (let x = 0; x < checked_coins.length; x++) {
            let current_coin_id = "#" + checked_coins[x].id;
            $(current_coin_id).prop("checked", false)
        };
        checked_coins = [];
        localStorage.setItem('checked_coins', JSON.stringify(checked_coins));
        if ($('#selectedCoins').is(':checked')) {
            $('.coin-card').show();
            $('.from-search').remove();
            $('#load-more-coins').show();
            $('#selectedCoins').prop("checked", false)
        };
    }
    else {
        modal_error('No coins were selected', 'Hey, Uncheck is impossible, For something that you haven\'t yet checked :)');
    }
});

////////////////////// alert modal //////////////////////
function modal_error(title, msg) {
    $('#modal-error').remove();
    let modal_error_str = `
    <div id="modal-error" class="modal fade">
        <div class="modal-dialog " role="document">
            <div class="modal-content border-primary">
                <div class="modal-header text-center">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${msg}</p>
                </div>
            </div>
        </div>
    </div>
    `
    $('body').append(modal_error_str);
    $('#modal-error').modal('show');
}