var url = 'http://localhost:8080/druzyny';

var app = angular.module('myApp', []);

app.factory('TeamFactory', function ($resource) {
    return $resource('http://localhost:8080/druzyny/:id', {id: '@id'});
});


