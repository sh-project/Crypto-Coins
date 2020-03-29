function report_content() {
    let report_content = `
    <!-- Header -->
    <header id="header" class="ex-header">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1>Live Reports</h1>
                </div> <!-- end of col -->
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </header> <!-- end of ex-header -->
    <!-- end of header -->

    <div class="ex-basic-1"></div> 

    <div>
    <div class="load-chart">
        <!-- load bar -->
        <div class="load-bar mt-1">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div><!-- end of load bar -->

    </div><!-- end of load coins -->
    </div>
    
    <!-- Terms Content -->
    <div class="ex-basic-3 pt-5 pb-5">
        <div class="container">
            <div class="live-chart row justify-content-center">
                <div id="line_top_x"></div>
            </div> <!-- end of row -->
        </div> <!-- end of container -->
    </div> <!-- end of ex-basic -->
    `
    return report_content
}