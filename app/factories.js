//Factories
"use strict";

const url = 'http://localhost:8080/';

app.factory('SponsorFactory', function ($resource) {
    return $resource(url + 'sponsorzy/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });
});

app.factory('KibicFactory', function ($resource) {
    return $resource(url + 'kibice/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });
});

app.factory('TeamFactory', function ($resource) {
    return $resource(url + 'druzyny/:id', {id: '@id'}, {
        'update': {method: 'PUT'}
    });
});

app.factory('PlayerFactory', function ($resource) {
    return $resource(url + 'pilkarze/:id/', {id: '@id'}, {
        'update': {method: 'PUT'}
    });
});
