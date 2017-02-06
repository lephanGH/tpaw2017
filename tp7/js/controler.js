var meteoControllers = angular.module('meteoControllers', []);
meteoControllers.controller('MainController', ['$scope', '$http',
    function($scope, $http) {
        $scope.recherche = function() {
            /* appel AJAX à l’API openweathermap */
            $http.get('https://demo.bilelz.fr/owmap/forecast/?q=' + $scope.city + '&units=metric&appid=b19148c8359295d9bc466fc825a6800d')
                .success(function(data) {
                    /* on met dans l’objet meteoles données retournées
                    par openweathermap */
                    $scope.forecast = data;
                    Display5Days($scope.forecast);
                }).error(function(data) {
                    /* en cas d’erreur */
                    $scope.errorMsg = "Hum. Error... please retry.";
                });
        }
        $scope.gps = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                $scope.errorMsg = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            var latlon = position.coords.latitude + "," + position.coords.longitude;

            var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=14&size=400x300&sensor=false";
            //document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";
            //document.getElementById("city").value = latlon;

            $http.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=metric&appid=b19148c8359295d9bc466fc825a6800d')
                .success(function(data) {
                    /* on met dans l’objet meteoles données retournées
                    par openweathermap */
                    $scope.forecast = data;
                    Display5Days($scope.forecast);
                }).error(function(data) {
                    /* en cas d’erreur */
                    $scope.errorMsg = "Hum. Error... please retry.";
                });
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.errorMsg = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.errorMsg = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.errorMsg = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.errorMsg = "An unknown error occurred."
                    break;
            }
        }

        function Display5Days(forecast) {
            var x = "";
            var i;
            for (i = 1; i <= (forecast.cnt - 2); i++) {
                x = x + "<h3>" + forecast.list[i].dt_txt + '<img src="https://openweathermap.org/img/w/' +
                    forecast.list[i].weather[0].icon + '.png"> </img>' + forecast.list[i].main.temp.toFixed(1) + "°C" + "</h3>";
            }
            document.getElementById("FiveDays").innerHTML = x;
        }
    }
]);