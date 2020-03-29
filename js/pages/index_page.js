function index_content() {
    let index_content = `
    <!-- Header -->
    <header id="header" class="header">
        <div class="header-content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="text-container">
                            <h1>Crypto Currency <br>is <span id="js-rotating">Modern :), Nice :), Fun :)</span></h1>
                            <p class="p-large">Here you can see the value of all virtual currencies, and compare currencies to each other</p>
                            <a id="search-click" class="btn-solid-lg no-top" href="#"><i class="fab fa-sistrix"></i> Search Coin</a>
                        </div>
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </div> <!-- end of header-content -->
    </header> <!-- end of header -->


    <div id="coins-wrapper" class="coins-wrapper">

        <!-- search -->
        <div class="breadcrumb sticky p-2">
            <div class="container">
            <div class="row justify-content-between">
                <div>
                    <input class="search-coin-input" id="search-coin" type="text" placeholder="search coin (Enter coin symbol)" id="inputLarge">
                    <!-- <span class="1social-icons"> -->
                    <span class="fa-stack">
                        <a  class="no-top" href="#">
                            <i class="fas fa-circle fa-stack-2x"></i>
                            <span id="searchBtn" class="btn-search">
                                <i class="fas fa-search fa-stack-1x"></i>
                            </span>
                        </a>
                    </span>
                    <!-- </span> -->
                </div>
                <div class="row justify-content-between">
                    <div class="selected-coins-wrapper custom-control custom-switch ml-3">
                        <input type="checkbox" class="switch-checkbox custom-control-input" name="selectedCoins" id="selectedCoins">
                        <label class="custom-control-label" for="selectedCoins">Selected Coins</label>
                    </div>
                    <a id="uncheckCoins" class="btn-outline-lg no-top p-3 ml-3" href="#n">Uncheck all</a>
                </div>
            </div>
        </div>
        </div>
        
        <!-- load coins -->
        <div>
            <div class="load-coins">
                
                <!-- Preloader -->
                <div class="spinner">
                    <h3>load coins</h3>
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div><!-- end of preloader -->
                
                <!-- load bar -->
                <div class="load-bar">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div><!-- end of load bar -->

        </div><!-- end of load coins -->
        </div>
        
        <!-- coins -->
        <div class="coins-container container">
            <div id="result" class="row justify-content-around mt-1"></div>
        </div><!-- end of coins -->

    </div><!-- end of coins wrapper -->
    `
    return index_content
}