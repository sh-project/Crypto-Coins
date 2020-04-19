/////////////////// document ready scripts ///////////////////
//nav scripts and load coins
$(document).ready(function () {

    // get the home-page content (from index_page.js)
    $('#index-content').html(indexContent());
    $('#home-nav').addClass('active')
    // get all coins
    getCoins("https://api.coingecko.com/api/v3/coins/list");

    // Rotating Text - Morphtext
    $("#js-rotating").Morphext({
        animation: "fadeIn",
        separator: ",",
        speed: 2000
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

        clearInterval(chartSetInterval)
    });

    //livereports
    $('#livereports-nav').click(function () {
        checkedCoins = JSON.parse(localStorage.getItem('checkedCoins'));

        if (checkedCoins.length > 0) {
            $('#index-content').hide();
            $('#page-content').html('');
            // get the livereports-page content (from livereports_page.js)
            $('#page-content').html(reportContent());

            $(this).addClass('active')
            $('#home-nav').removeClass('active')
            $('#about-nav').removeClass('active')

            let coinsToChart = ""
            getDataApi(checkedCoins, 0)
            google.charts.load('current', { 'packages': ['line'] });

        }
        else {
            modalError('No coins were selected', 'To view the <strong>Live Report</strong>, you must select at least one currency');
        }

    });

    //about
    $('#about-nav').click(function () {
        $('#index-content').hide();
        $('#page-content').html('');
        // get the about-page content (from about_page.js)
        $('#page-content').html(aboutContent());

        $(this).addClass('active')
        $('#home-nav').removeClass('active')
        $('#livereports-nav').removeClass('active')
    });

});

/////////////////// get and append all coins ///////////////////
function getCoins(url) {
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
            let shownCoins = {
                from: 0,
                to: 51
            }
            localStorage.setItem('shownCoins', JSON.stringify(shownCoins));
            let checkedCoins = [];
            localStorage.setItem('checkedCoins', JSON.stringify(checkedCoins));
            drawCoins(data, 0, 51);
        });
}

function drawCoins(data, from, to) {
    let coinsStr = '';
    for (let i = from; i < to; i++) {
        let checkedCoins = JSON.parse(localStorage.getItem('checkedCoins'));
        let checkedCoin = ''
        if (checkedCoins.find(x => x.id === data[i].id)) {
            checkedCoin = 'checked'
        }
        let searchid = ""
        coinsStr += appendCoin(data[i], checkedCoin, searchid)
    }
    coinsStr += '<div class="row"><a id="load-more-coins" class="btn-outline-lg no-top mt-2 mb-5" href="#aaa"><i class="fas fa-chevron-down"></i>&nbsp;&nbsp;&nbsp;LOAD MORE COINS</a>';

    setTimeout(function () {
        $('.load-coins').fadeOut('500');
        $('#result').append(coinsStr);
    }, 500);
};

function appendCoin(coin, checkedCoin, searchid) {
    return `
    <div id="coin-card-${coin.symbol}" class="coin-card scale-up-center ${checkedCoin} ${searchid}">
        <div class="card m-3">
            <div class="card-header d-flex justify-content-between">
                <div> ${coin.name}</div>
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="switch-checkbox switch-checkbox-coin custom-control-input" ${checkedCoin} coinid="${coin.id}" symbol="${coin.symbol}" name="${coin.name}" id="${coin.id}">
                    <label class="custom-control-label" for="${coin.id}"></label>
                </div>
            </div>
            <div class="card-body">
                <h4 class="card-title"> ${coin.symbol.toUpperCase()} </h4>
                <button id="button-${coin.id}" class="btn btn-secondary" type="button" onclick="getCoin('${coin.id}')" data-toggle="collapse" data-target="#collapse-${coin.id}" aria-expanded="false" aria-controls="collapse-${coin.id}">
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
    let localStorageAllCoins = JSON.parse(localStorage.getItem('allCoins'));
    let shownCoins = JSON.parse(localStorage.getItem('shownCoins'));
    let from = shownCoins.to;
    let to = 0;

    if (localStorageAllCoins.length > (from + 51)) {
        to = from + 51;
    }
    else {
        to = localStorageAllCoins.length;
    }

    if (from >= localStorageAllCoins.length) {
        $('#load-more-coins').html('Hi, well done, No more coins')
    }
    else {
        drawCoins(localStorageAllCoins, from, to);
        setTimeout(function () {
            $('#load-more-coins').remove();
        }, 500);
    }

    shownCoins = {
        from: from,
        to: to
    }
    localStorage.setItem('shownCoins', JSON.stringify(shownCoins));
});


/////////////////// Get more info for coin /////////////////// 
function getCoin(id) {
    if (localStorage.getItem(id) != null) {
        //saved in local
        let localStorageCoin = JSON.parse(localStorage.getItem(id));

        if ((Date.now() - localStorageCoin.timeOpen) < 120000) {
            //no 2 minutes passed
            drawCoin(localStorageCoin.coin)
        }
        else {
            //Calling server that less than 2 minutes
            getCoinFromApi(id)
        }
    }
    else {
        //Calling server that - Is not reserved locall
        getCoinFromApi(id)
    }
}

function getCoinFromApi(id) {
    let loadMoreInfoId = '#load-moer-info-' + id;
    $(loadMoreInfoId).show();
    let moreInfoId = '#moreinfo-' + id;
    $(moreInfoId).html('');

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
                timeOpen: Date.now(),
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

            drawCoin(data);
        });
}

function drawCoin(data) {
    let loadMoreInfoId = '#load-moer-info-' + data.id;
    let moreInfoId = '#moreinfo-' + data.id;
    $(moreInfoId).html('');

    let htmlStr = "";
    htmlStr += `
    <div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${data.market_data.current_price.usd} <i class="fas fa-dollar-sign"></i></li>
            <li class="list-group-item">${data.market_data.current_price.eur} <i class="fas fa-euro-sign"></i></li>
            <li class="list-group-item">${data.market_data.current_price.ils} <i class="fas fa-shekel-sign"></i></li>
        </ul>
        <img class="card-img" src= ${data.image.large} alt="Card image cap">
    </div>`

    $(loadMoreInfoId).hide();
    $(moreInfoId).append(htmlStr);

    let buttonId = '#button-' + data.id
    $(buttonId).attr("onclick", "LessInfo('" + data.id + "')");
    $(buttonId).html(' less info ');
}

function LessInfo(id) {
    setTimeout(function () {
        let buttonId = '#button-' + id
        $(buttonId).attr("onclick", "getCoin('" + id + "')");
        $(buttonId).html('more info');
    }, 100);
}



/////////////////// checked coin ///////////////////
$(document).on('change', '.switch-checkbox-coin', function () {
    let checkedCoins = [];
    if (localStorage.getItem('checkedCoins') != null) {
        checkedCoins = JSON.parse(localStorage.getItem('checkedCoins'));
    }

    if (this.checked) {
        if (checkedCoins.length > 4) {
            let newCheckedCoin = {
                name: $(this).attr('name'),
                id: $(this).attr('id'),
                symbol: $(this).attr('symbol'),
                coinid: $(this).attr('coinid')
            }
            modalCoins(checkedCoins, newCheckedCoin);
            this.checked = false;
        }
        else {
            let checkedCoin = {
                name: $(this).attr('name'),
                id: $(this).attr('id'),
                symbol: $(this).attr('symbol'),
                coinid: $(this).attr('coinid')
            }
            checkedCoins.push(checkedCoin);
            localStorage.setItem('checkedCoins', JSON.stringify(checkedCoins));
        }
    }
    else {
        for (let i = 0; i < checkedCoins.length; i++) {
            if (checkedCoins[i].id === $(this).attr('id')) {
                checkedCoins.splice(i, 1);
                localStorage.setItem('checkedCoins', JSON.stringify(checkedCoins));
            };
        };
    }
});

//modal if check more then 5 coins
function modalCoins(checkedCoins, newCheckedCoin) {
    checkedCoins = JSON.parse(localStorage.getItem('checkedCoins'));
    let modalStr = `
    <div class="modal fade" id="modal-coins" tabindex="-1" role="dialog" aria-labelledby="modal-coins-Title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content  bg-secondary border-dark">
       
        <div class="card-body text-center">
            <h5 class="card-title">Up to 5 coins can be selected</h5>
            <p class="card-text">If you want to check the coin <strong class="text-primary">"${newCheckedCoin.symbol}"</strong></br>You must uncheck one of the coins</p>
        </div>
        <ul class="list-group m-2">`


    for (let i = 0; i < checkedCoins.length; i++) {
        modalStr += `
            <li class="list-group-item d-flex justify-content-between">
               <div> ${checkedCoins[i].symbol}</div>
                <div class="custom-control custom-switch">
                    <input type="checkbox" checked class="modal-coin-checkbox custom-control-input" coinid="${checkedCoins[i].coinid}" symbol="${checkedCoins[i].symbol}" name="${checkedCoins[i].name}" id="modal-switch-${checkedCoins[i].coinid}">
                    <label class="custom-control-label" for="modal-switch-${checkedCoins[i].coinid}"></label>
                </div>
            </li>`
    }

    modalStr += `
        </ul>
            <div class="modal-footer">
            <button type="button" id="Save-modal-changes" class="btn btn-primary">Done</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
    </div>`

    let modalCoinsChanges = [];

    $(document).on('change', '.modal-coin-checkbox', function () {
        if (this.checked) {
            for (let i = 0; i < modalCoinsChanges.length; i++) {
                if (modalCoinsChanges[i].symbol === $(this).attr('symbol')) {
                    modalCoinsChanges.splice(i, 1);
                };
            };


        }
        else {
            let modalCoinChecked = {
                name: $(this).attr('name'),
                id: $(this).attr('id'),
                symbol: $(this).attr('symbol'),
                coinid: $(this).attr('coinid')
            }
            modalCoinsChanges.push(modalCoinChecked);
        }

    });

    $(document).on('click', '#Save-modal-changes', function () {
        if (modalCoinsChanges.length == 0) {
            alert(`If you want to check coin "${newCheckedCoin.symbol}". You must uncheck one of the coins`)
        }
        else {
            $('#modal-coins').modal('toggle');
            for (let i = 0; i < modalCoinsChanges.length; i++) {
                let switchId = "#" + modalCoinsChanges[i].coinid;
                $(switchId).prop("checked", false)

                for (let x = 0; x < checkedCoins.length; x++)
                    if (checkedCoins[x].symbol == modalCoinsChanges[i].symbol) {
                        checkedCoins.splice(x, 1);
                    };
            };

            let newCheckedCoinId = "#" + newCheckedCoin.id;
            $(newCheckedCoinId).prop("checked", true)
            checkedCoins.push(newCheckedCoin);
            localStorage.setItem('checkedCoins', JSON.stringify(checkedCoins));
        }

    });


    $('#modal-coins').remove();
    $('body').append(modalStr);
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
            modalError('not match any currency', 'Please note: search the currency symbol (BTC for BITCOIN) in capital letters');
            document.getElementById("search-coin").focus();
        }
        else {
            coinCardId = "#coin-card-" + searchCoin.symbol;
            $('.coin-card').hide();
            $('#load-more-coins').hide();
            if (document.getElementById("coin-card-" + searchCoin.symbol) === null) {
                0
                let checkedCoin = ''
                let checkedCoins = JSON.parse(localStorage.getItem('checkedCoins'));
                if (checkedCoins.find(x => x.id === searchCoin.id)) {
                    checkedCoin = 'checked';
                }
                $('#result').append(appendCoin(searchCoin, checkedCoin, 'from-search'));
            }
            else {
                $(coinCardId).show();
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
    let checkedCoins = JSON.parse(localStorage.getItem('checkedCoins'));
    if (checkedCoins.length > 0) {
        filterSelectedCoins($(this).is(':checked'), checkedCoins);
    }
    else {
        $('#selectedCoins').prop('checked', false);
        modalError('No coins were selected', 'To view the <strong>Selected Coins</strong>, you must select at least one currency');
    }
});

function filterSelectedCoins(checked, checkedCoins) {
    if (checked) {
        document.getElementById("search-coin").value = ""
        $("#searchBtn").html('<i class="fas fa-search fa-stack-1x"></i>');
        $("#searchBtn").attr('class', 'btn-search');
        search();

        $('.coin-card').hide();
        for (let i = 0; i < checkedCoins.length; i++) {
            if (document.getElementById("coin-card-" + checkedCoins[i].symbol) === null) {
                let checkedCoin = ''
                if (checkedCoins.find(x => x.id === checkedCoins[i].id)) {
                    checkedCoin = 'checked';
                }
                $('#result').append(appendCoin(checkedCoins[i], checkedCoin, 'from-search'));
            }
            else {
                coinCardId = "#coin-card-" + checkedCoins[i].symbol;
                $(coinCardId).show();
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
    let checkedCoins = JSON.parse(localStorage.getItem('checkedCoins'));
    if (checkedCoins.length > 0) {
        for (let x = 0; x < checkedCoins.length; x++) {
            let currentCoinId = "#" + checkedCoins[x].id;
            $(currentCoinId).prop("checked", false)
        };
        checkedCoins = [];
        localStorage.setItem('checkedCoins', JSON.stringify(checkedCoins));
        if ($('#selectedCoins').is(':checked')) {
            $('.coin-card').show();
            $('.from-search').remove();
            $('#load-more-coins').show();
            $('#selectedCoins').prop("checked", false)
        };
    }
    else {
        modalError('No coins were selected', 'Hey, Uncheck is impossible, For something that you haven\'t yet checked :)');
    }
});

////////////////////// alert modal //////////////////////
function modalError(title, msg) {
    $('#modal-error').remove();
    let modalErrorStr = `
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
    $('body').append(modalErrorStr);
    $('#modal-error').modal('show');
}