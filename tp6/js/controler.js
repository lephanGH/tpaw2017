var meteoControllers = angular.module('meteoControllers', []);
meteoControllers.controller('MainController', ['$scope', '$http',
    function($scope, $http) {
        $scope.recherche = function() {
            /* appel AJAX à l’API openweathermap */
            $http.get('https://demo.bilelz.fr/owmap/?q=' + $scope.city + '&units=metric&appid=b19148c8359295d9bc466fc825a6800d')
                .success(function(data) {
                    /* on met dans l’objet meteoles données retournées
                    par openweathermap */
                    $scope.meteo = data;
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

            $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=b19148c8359295d9bc466fc825a6800d')
                .success(function(data) {
                    /* on met dans l’objet meteoles données retournées
                    par openweathermap */
                    $scope.meteo = data;
                }).error(function(data) {
                    /* en cas d’erreur */
                    $scope.errorMsg = "Hum. Error... please retry.";
                });
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    x.innerHTML = "An unknown error occurred."
                    break;
            }
        }
    }
]);