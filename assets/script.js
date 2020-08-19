

//This function generates the forecast
function generateForecast(cityName){
    
    console.log('Searching now for ' + cityName);

    //saving last searched to local storage for recall on page load
    localStorage.setItem('lastSearched', cityName);

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

        var URL = "https://api.openweathermap.org/data/2.5/onecall?"
                    + "lat=" + lat
                    + "&lon=" + long
                    + '&appid=' + APIKey;
        
        $.ajax({
            url: URL,
            method: "GET"
            }).then(function(response) {
                $('input:text').val(' ');   
                $('#current').empty();
                $('#forecast').empty();

                //Pulling Time, Conditions Icon, Temperature, Humidity, Wind Speed
                
                var currDate = new Date((response.current.dt)*1000)
                    var weekDay = currDate.getDay();
                    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var currDay = daysOfWeek[weekDay];
                
                var icon = response.current.weather[0].icon;
                var temp = Math.round((response.current.temp - 273.15)*9/5+32);
                var humid = response.current.humidity;
                var windSpeed = response.current.wind_speed;
                var uvi = response.current.uvi;

                var currentCard = $('<div>');
                currentCard.addClass('currentCard');

                var citySpot = $('<h4>');
                citySpot.text(cityName);

                var timeSpot = $('<h5>');
                timeSpot.text(currDay);
                
                //http://openweathermap.org/img/wn/10d@2x.png
                var iconSpot = $('<img>');
                iconSpot.attr('src','http://openweathermap.org/img/wn/' + icon + '@2x.png');
                  
                var tempSpot = $('<div>');
                tempSpot.text(temp + '\xB0' + 'F');
                tempSpot.attr('id', 'temp');

                var humidSpot = $('<div>');
                humidSpot.text('Relative Humidity:  ' + humid + '%');

                var windSpeedSpot = $('<div>');
                windSpeedSpot.text('Wind Speed:  ' + windSpeed);

                var uviSpot = $('<div>');
                uviSpot.text('UV Index:    ' + uvi);
                    if(uvi >= 11){
                        uviSpot.attr('id', 'extremelyHighUV');
                    }
                    else if(uvi >= 8){
                        uviSpot.attr('id', 'veryHighUV');
                    }
                    else if(uvi >= 6){
                        uviSpot.attr('id', 'highUV');
                    }
                    else if(uvi >= 3){
                        uviSpot.attr('id', 'mediumUV');
                    }
                    else if(uvi >= 1){
                        uviSpot.attr('id', 'lowUV');
                    }
                

                $(currentCard).append(citySpot);
                $(currentCard).append(timeSpot);
                $(currentCard).append(iconSpot);
                $(currentCard).append(tempSpot);
                $(currentCard).append(humidSpot);
                $(currentCard).append(windSpeedSpot);
                $(currentCard).append(uviSpot);

                $('#current').append(currentCard);



                //Pull forecast data
                for(var i = 1; i < 6; i++){

                    var fcstDate = new Date((response.daily[i].dt)*1000)
                        var weekDay = fcstDate.getDay();
                    var fcstDay = daysOfWeek[weekDay];
                    var fcstIcon = response.daily[i].weather[0].icon;
                    var fcstTemp = Math.round((response.daily[i].temp.day - 273.15)*9/5+32);
                    var fcstHumid = response.daily[i].humidity;

                    var forecastCard = $('<div>');
                    forecastCard.addClass('forecastCard');

                    var fcstTimeSpot = $('<h4>');
                    fcstTimeSpot.text(fcstDay);

                    //http://openweathermap.org/img/wn/10d@2x.png
                    var fcstIconSpot = $('<img>');
                    fcstIconSpot.attr('src','http://openweathermap.org/img/wn/' + fcstIcon + '@2x.png');

                    var fcstTempSpot = $('<div>');
                    fcstTempSpot.text(fcstTemp + '\xB0' + 'F');
                    fcstTempSpot.attr('id', 'temp');

                    var fcstHumidSpot = $('<div>');
                    fcstHumidSpot.text('Humidity:  ' + fcstHumid + '%');

                    $(forecastCard).append(fcstTimeSpot);
                    $(forecastCard).append(fcstIconSpot);
                    $(forecastCard).append(fcstTempSpot);
                    $(forecastCard).append(fcstHumidSpot);

                    $('#forecast').append(forecastCard)
                    
                }
                
            });


     })
}

//Page will load with Indianpolis Data (would like to change this to the location of the user)
var cityName = localStorage.getItem('lastSearched') || 'Indianapolis';
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
    
    //Put city in local storage
    var storedCities = JSON.parse(localStorage.getItem('storedCities')) || [];
    storedCities.push(cityName);
    localStorage.setItem('storedCities',JSON.stringify(storedCities));


    //Send Back to Generate New Forecast
    generateForecast(cityName);
})

//Listen for new cities
$(document).on('click', '.cityButton',function(event){
    var cityName = $(this).attr('data-city');
    console.log('Recalling Forecast for ' + cityName);
    generateForecast(cityName);
});

//function to put buttons for all recalled cities from local storage
function recallCities() {
    var storedCities = JSON.parse(localStorage.getItem('storedCities')) || [];

    for (var i = 0; i<storedCities.length; i++){
        cityName = storedCities[i];
        var cityButton = $('<button>');
        cityButton.addClass('cityButton');
        cityButton.attr('data-city', cityName);
        cityButton.text(cityName);
        $('#cities').append(cityButton);
    }
    
}
recallCities();










 