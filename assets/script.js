var APIKey =  'd457bca459c78269087e34938cc72c1d';
var cityName = 'london';
var lat = 0;
var long = 0;

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key} //



var URL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689"
            + '&appid=' + APIKey;
  console.log(URL);
  
  $.ajax({
       url: URL,
       method: "GET"
     }).then(function(response) {
        console.log(response);

        //Pulling City, Conditions Icon, Temperature, Humidity, Wind Speed
        var icon = response.current.weather[0].icon;
        var temp = response.current.temp;
        var humid = response.current.humidity;
        var windSpeed = response.current.wind_speed;
        var uvi = response.current.uvi;

        var currentCard = $('<div>');
        currentCard.addClass('currentCard');

        var citySpot = $('<h4>');
        citySpot.text('Indianapolis');
        
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

 