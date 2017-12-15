var url = 'http://localhost:8080/';

var app = angular.module('myApp', ['ngResource', 'ui.grid', 'ngTouch', 'ngRoute']);

app.factory('TeamFactory', function ($resource) {
    return $resource(url + 'druzyny/:id', {id: '@id'});
});

app.factory('PlayerFactory', function ($resource) {
    return $resource(url + 'pilkarze/:id', {id: '@id'});
});

//Controlers
app.controller('indexCtrl', function ($scope, $rootScope, $route) {
    var reloadView = 'data/empty.html';
    $scope.view = reloadView;

    $scope.reload = function () {
        console.log('Reload indexCtrl !');
        var view = $scope.view;
        $scope.view = reloadView;
        $scope.view = view;
        $route.reload();
    };

    $scope.updateView = function (src) {
        $scope.view = src;
    };
});

app.controller('teamCtrl', function ($scope, TeamFactory) {
    $scope.team = {id: 0, nazwa: ''};
    $scope.teamFactory = new TeamFactory();

    var allTeams = {id: 0, nazwa: ''};
    var data = [
        {id: 0, nazwa: 'Empty'},
        {id: 1, nazwa: 'Empty1'}
    ];

    allTeams = TeamFactory.query();

    $scope.teamGrid = {
        enableSorting: true,
        enableCellSelection: true,
        enableCellEditOnFocus: true,
        columnDefs: [
            {name: 'id'},
            {name: 'nazwa', enableCellEdit: true},
            {
                name: 'edit',
                displayName: 'Edit',
                cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.edit(row.entity)" >Edit</button> '
            },
            {
                name: 'delete',
                displayName: 'Delete',
                cellTemplate: '<button id="deleteBtn" type="button" class="btn-small" ng-click="grid.appScope.delete(row.entity)" >Delete</button> '
            }
        ],
        data: allTeams
    };

    $scope.maxId = function () {
        var max = 0;
        allTeams.forEach(function (team) {
            max = (max > team.id) ? max : team.id;
        });
        return max + 1;
    };

    $scope.add = function (team) {
        var id = $scope.maxId();
        var json = angular.toJson({id: id, nazwa: team.nazwa});
        TeamFactory.save(json);
        $scope.teamGrid.data.push({id: id, nazwa: team.nazwa});
    };

    $scope.edit = function (row) {
        //todo wymyslic co sie stanie po kliknieciu edytuj'a
        // var id = row.id;
        // var nazwa = row.nazwa;
        // TeamFactory.save(angualr.toJson({id:id,nazwa:nazwa}));
    };

    $scope.delete = function (row) {
        // console.log('trying to delete key: '+ row.id);
        TeamFactory.delete(row, function () {
            console.log('deleted: ' + row.id);
            for (i = 0; i < $scope.teamGrid.data.length; ++i) {
                if ($scope.teamGrid.data[i].id === row.id) $scope.teamGrid.data.splice(i, 1);
            }
        }, function () {
            console.log('cannot delete: ' + row.id)
        });
    };

    $scope.teamId = 1;

    $scope.teamInfo = function (team) {
        if (angular.isDefined(team.id))
            return team.id + ' ' + team.nazwa;
        else return 'Brak druzyny';
    };

    $scope.updateTeam = function () {
        console.log($scope.newTeam.nazwa);
        var id = $scope.teamId;
        var nazwa = $scope.newTeam.nazwa;
        var json = angular.toJson({'id': id, 'nazwa': nazwa});
        console.log(json);
        TeamFactory.save(json);
        allTeams = TeamFactory.query();
    };

    $scope.alert = function (team) {
        alert('Team ' + $scope.teamInfo(team) + '!');
    };

});

app.controller('playerCtrl', function ($scope, PlayerFactory) {
    var playersTemplate = {id:0,pesel:'',imie:'',nazwisko:''};
    var players = PlayerFactory.query();

    $scope.grid = {
        columndDefs:[
            {name: 'id'},
            {name: 'pesel'},
            {name: 'imie'},
            {name: 'nazwisko'},
            {
                name: 'edit',
                displayName: 'Edytuj',
                cellTemplate: '<button id="editBtn" type="button" class="btn-small" ng-click="grid.appScope.edit(row.entity)" >Edytuj</button> '
            },
            {
                name: 'delete',
                displayName: 'Usun',
                cellTemplate: '<button id="deleteBtn" type="button" class="btn-small" ng-click="grid.appScope.delete(row.entity)" >Usun</button> '
            }
        ],
        data: players
    };

    $scope.edit = function (row) {
        console.log(row.id);
    };

    $scope.delete = function (row) {
        console.log(row.id);
    };

    $scope.add = function (player) {
        console.log(player.id);
    }
});