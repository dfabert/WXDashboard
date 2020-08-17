

//This function generates the forecast
function generateForecast(cityname){

    console.log('Searching now for ' + cityName);

    var APIKey =  'd457bca459c78269087e34938cc72c1d';

    var URL = "https://api.openweathermap.org/data/2.5/weather?"
            + "q=" + cityName
            + '&appid=' + APIKey;
  
  $.ajax({
       url: URL,
       method: "GET"
     }).then(function(response) {
        var lat = response.coord.lat;
        var long = response.coord.lon;

        console.log(lat, long);

        var URL = "https://api.openweathermap.org/data/2.5/onecall?"
                    + "lat=" + lat
                    + "&lon=" + long
                    + '&appid=' + APIKey;
        
        $.ajax({
            url: URL,
            method: "GET"
            }).then(function(response) {

                //Pulling City, Conditions Icon, Temperature, Humidity, Wind Speed
                var icon = response.current.weather[0].icon;
                var temp = response.current.temp;
                var humid = response.current.humidity;
                var windSpeed = response.current.wind_speed;
                var uvi = response.current.uvi;

                var currentCard = $('<div>');
                currentCard.addClass('currentCard');

                var citySpot = $('<h4>');
                citySpot.text(cityName);
                
                var iconSpot = $('<div>');
                iconSpot.text(icon);

                var tempSpot = $('<div>');
                tempSpot.text('Temperature:  ' + temp);

                var humidSpot = $('<div>');
                humidSpot.text('Relative Humidity:  ' + humid);

                var windSpeedSpot = $('<div>');
                windSpeedSpot.text('Wind Speed:  ' + windSpeed);

                var uviSpot = $('<div>');
                uviSpot.text('UV Index:    ' + uvi);

                $(currentCard).append(citySpot);
                $(currentCard).append(iconSpot);
                $(currentCard).append(tempSpot);
                $(currentCard).append(humidSpot);
                $(currentCard).append(windSpeedSpot);
                $(currentCard).append(uviSpot);

                $('#current').append(currentCard);

                //Pull forecast data
                for(var i = 1; i < 6; i++){
                    var fcstIcon = response.daily[i].weather[0].icon;
                    var fcstTemp = response.daily[i].temp.day;
                    var fcstHumid = response.daily[i].humidity;

                    var forecastCard = $('<div>');
                    currentCard.addClass('forecastCard');

                    var fcstIconSpot = $('<div>');
                    fcstIconSpot.text(fcstIcon);

                    var fcstTempSpot = $('<div>');
                    fcstTempSpot.text('Temperature:  ' + fcstTemp);

                    var fcstHumidSpot = $('<div>');
                    fcstHumidSpot.text('Relative Humidity:  ' + fcstHumid);

                    $(forecastCard).append(fcstIconSpot);
                    $(forecastCard).append(fcstTempSpot);
                    $(forecastCard).append(fcstHumidSpot);

                    $('#forecast').append(forecastCard)
                    
                }
                
            });


     })
}

//Page will load with Indianpolis Data (would like to change this to the location of the user)
var cityName = 'Indianapolis';
$(document).ready(generateForecast('Indianapolis'));

//Listen for new city
$('button').on('click', function(event,){
    event.preventDefault();
    var cityName = document.getElementById('cityName').value;
    console.log('Adding ' + cityName + ' to City list');

    //Create new button
    var cityButton = $('<button>');
    cityButton.addClass('cityButton');
    cityButton.text(cityName);
    $('#cities').append(cityButton);

    //Clear section for new information
    $('#current').empty();
    $('#forecast').empty();

    //Send Back to Generate New Forecast
    generateForecast(cityName);
});
 