// angular.module('playerApp',['ngResource']);
var app = angular.module('playerApp', []);

app.controller('playerCtrl', function ($scope, $http) {
    $http.get("http://localhost:8080/pilkarze")
        .then(function (response) {
            $scope.players = response.data;
        });
    $scope.getPlayerById = function (id) {
        if (id === '') {
            console.log('brak id');
        } else {
            $http.get('http://localhost:8080/pilkarze/' + id)
                .then(function (resp) {
                    $scope.pilkarz = resp.data;
                });
        }
    };
    $scope.info = function (pilkarz) {
        if (pilkarz === '') return 'Brak takiego pilkarza!';
        return pilkarz.imie + ' ' + pilkarz.nazwisko;
    }
    // PlayerService.getById(1).then(function (playerInfo) {
    //     $scope.pilkarz = playerInfo;
    // })

});
