

//This function generates the forecast
function generateForecast(cityName){
    
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

                $('#current').empty();
                $('#forecast').empty();

                //Pulling City, Conditions Icon, Temperature, Humidity, Wind Speed
                var icon = response.current.weather[0].icon;
                var temp = Math.round(100-(response.current.temp - 273.15)*9/5+32);
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
                tempSpot.text('Temperature:  ' + temp + '\xB0' + 'F');

                var humidSpot = $('<div>');
                humidSpot.text('Relative Humidity:  ' + humid + '%');

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
                    var fcstTemp = Math.round(100-(response.daily[i].temp.day - 273.15)*9/5+32);
                    var fcstHumid = response.daily[i].humidity;

                    var forecastCard = $('<div>');
                    currentCard.addClass('forecastCard');

                    var fcstIconSpot = $('<div>');
                    fcstIconSpot.text(fcstIcon);

                    var fcstTempSpot = $('<div>');
                    fcstTempSpot.text('Temperature:  ' + fcstTemp + '\xB0' + 'F');

                    var fcstHumidSpot = $('<div>');
                    fcstHumidSpot.text('Relative Humidity:  ' + fcstHumid + '%');

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
$(document).ready(generateForecast(cityName));

//Listen for new city
$('#addCity').on('click', function(event)  {
    event.preventDefault();
    var cityName = $('#cityInput').val();
    console.log('You have added ' + cityName);

    //Create new button
    var cityButton = $('<button>');
    cityButton.addClass('cityButton');
    cityButton.attr('data-city', cityName);
    cityButton.text(cityName);
    $('#cities').append(cityButton);
    
    
    //Send Back to Generate New Forecast
    generateForecast(cityName);
})

//Listen for previous cities
$(document).on('click', '.cityButton',function(event){
    var cityName = $(this).attr('data-city');
    console.log('Recalling Forecast for ' + cityName);
    generateForecast(cityName);
});











 