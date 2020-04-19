# Crypto-Coins

jQuery-AJAX API Project
JavaScript Learning Summary Project - jQuery
At John Bryce College in Haifa, with the teacher Gad Shor
03/2020

The goal of the project is to display crypto coins that come in AJAX from api from api.coingecko.com
At first load, only the currency names are pulled from the server,
And by clicking more info, call to the server - is loaded the virtual currency value, relative to 3 currencies.
Clicking again for more info updates the currency value - pulling new information from the server - but only if it is 2 minutes from the last call to the server - for that currency.

Up to 5 coins can be selected for comparison in a data graph.
Only the selected coins can be filtered, as well as deselected coins.

You can search and mark a coin, including coins loaded from the server, but not yet displayed (each click on more load at the bottom of the screen, pulls from the local-storge and displays another 50 coins).

live report
Compares the value of the selected currencies
The value of the coins comes in AJAX from api from the min-api.cryptocompare.com 
In the data graph I used "google charts"
The graph is updated every 2 seconds - pulling data from the server.
Each time you enter the report page, the graph is updated again.

Load pages on a dynamic DOM site. Into the main page.

The following topics were practiced in the project:
HTML and CSS:
HTML5 (with New HTML5 tags)
CSS3 media queries and advanced selectors
Dynamic page layouts
Bootstrap & flex
JavaScript:
Objects
jQuery
Single Page Application foundations
Events
Ajax (RESTful API)
Documentation
External APIs
