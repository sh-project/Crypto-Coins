//<div id="about"></div>
function aboutContent() {
    let aboutContent = `
        <!-- Header -->
        <header id="header" class="ex-header">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>About</h1>
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        </header> <!-- end of ex-header -->
        <!-- end of header -->


        <div class="ex-basic-1"></div> 
        
        <!-- Terms Content -->
        <div class="ex-basic-2 pt-5 pb-0 tabs">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 ">
                        <div class="card-image">
                            <img class="card-image" src="images/me.jpg" alt="alternative">
                        </div>
                        <h2 class="mt-3 mb-0 p-0">Shmuel Shtemer</h2>
                        <h3 >שמוליק שטמר</h3>
                        <div class="p-heading p-large mb-4">
                            Graphic Designer,</br>Project Manager for Institutions and Organizations.</br>
                            Riki's Libi's Hershi's and Chaim's father.</br>
                            Love carbs and programming.</br>
                            burekas don't eat because hungry, burekas eat because there are burekas.
                        </div>
                    
                        <div class="mb-5 text-center">
                            <span class="fa-stack">
                                <a href="https://www.facebook.com/people/Shmuel-Shtemer/100016570385012" target="_blank">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-facebook-f fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="mailto:shsh654@gmail.com" target="_blank">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fas fa-at fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="https://www.instagram.com/sh_shte" target="_blank">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-instagram fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack" target="_blank">
                                <a href="https://www.linkedin.com/in/shmuel-shtemer-45127314a/" target="_blank">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-linkedin-in fa-stack-1x"></i>
                                </a>
                            </span>
                            <span class="fa-stack">
                                <a href="https://github.com/sh-project">
                                    <i class="fas fa-circle fa-stack-2x"></i>
                                    <i class="fab fa-github fa-stack-1x"></i>
                                </a>
                            </span>
                        </div>
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->

            
            <div class="slider-2 pt-5 pb-5">
                <div class="container">
                    <div class="p-2">
                        <div class="text-container">
                            <h3>Full Stack Web Developer</br>
                            jQuery-AJAX API Project</h3>
                            <p class="p-large mb-4">JavaScript Learning Summary Project - jQuery</br>At John Bryce College in Haifa, with the special teacher Gad Shor</br>03/2020</p>
                            <ul class="list-unstyled li-space-lg indent">
                                <div class="row justify-content-center">
                                    <div class="project-col p-4">
                                        <li class="media">
                                            <div><h5><stopng>HTML and CSS</stopng></h5></div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">HTML5 (with New HTML5 tags)</div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">CSS3 media queries and advanced selectors</div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">Dynamic page layouts</div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">Bootstrap & flex</div>
                                        </li>
                                    </div>

                                    <div class="project-col p-4">
                                        <li class="media">
                                            <div><h5><stopng>JavaScript</stopng></h5></div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">Objects</div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">jQuery</div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">Single Page Application foundations</div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">Events</div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">Ajax (RESTful API)</div>
                                        </li>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">Documentation</div>
                                        <li class="media">
                                            <i class="fas fa-square"></i>
                                            <div class="media-body">External API’s</div>
                                        </li>
                                    </div>
                                </div>


                            </ul>
                            <div class="text-left">
                                <p class="text-left">The goal of the project is to display crypto coins that come in AJAX from api from api.coingecko.com<br>
                                At first load, only the currency names are pulled from the server, And by clicking more info, call to the server - is loaded the virtual currency value, relative to 3 currencies.<br>
                                Clicking again for more info updates the currency value - pulling new information from the server - but only if it is 2 minutes from the last call to the server - for that currency.</p>

                                <p class="text-left">Up to 5 coins can be selected for comparison in a data graph.<br>
                                Only the selected coins can be filtered, as well as deselected coins.</p>

                                <p class="text-left">You can search and mark a coin, including coins loaded from the server, but not yet displayed (each click on more load at the bottom of the screen, pulls from the local-storge and displays another 50 coins).</p>

                                <p class="text-left">live report:<br>
                                Compares the value of the selected currencies<br>
                                The value of the coins comes in AJAX from api from the min-api.cryptocompare.com<br>
                                In the data graph I used "google charts"<br>
                                The graph is updated every 2 seconds - pulling data from the server.<br>
                                Each time you enter the report page, the graph is updated again.</p>

                                <p class="text-left">Load pages on a dynamic DOM site. Into the main page.</p>
                            </div>
                        </div> <!-- end of text-container -->
                    </div>
                </div> <!-- end of container -->
            </div> <!-- end of slider -->
        </div> <!-- end of ex-basic -->
    `
    return aboutContent
}