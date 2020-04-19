# Crypto-Coins

jQuery-AJAX API Project<br>
JavaScript Learning Summary Project - jQuery<br>
At John Bryce College in Haifa, with the teacher Gad Shor<br>
03/2020

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

https://sh-project.github.io/Crypto-Coins/

The following topics were practiced in the project:<br>
HTML and CSS:<br>
HTML5 (with New HTML5 tags)<br>
CSS3 media queries and advanced selectors<br>
Dynamic page layouts<br>
Bootstrap & flex<br>
JavaScript:<br>
Objects<br>
jQuery<br>
Single Page Application foundations<br>
Events<br>
Ajax (RESTful API)<br>
Documentation<br>
External APIs<br>
