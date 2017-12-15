var url = 'http://localhost:8080/druzyny';

var app = angular.module('teamApp', ['ngResource', 'ngTable','ui.grid']);

app.factory('TeamFactory', function ($resource) {
    return $resource('http://localhost:8080/druzyny/:id', {id: '@id'});
});

app.controller('teamCtrl', function ($scope, TeamFactory, NgTableParams) {
    $scope.oneTeam = TeamFactory.get({id: 1});
    $scope.allTeams = TeamFactory.query();


    $scope.tableTeams = new NgTableParams({
        sorting: {id: "asc"}
    }, {
        dataset: $scope.allTeams
    });
    $scope.tableTeams.reload();
    $scope.teamId = 1;

    $scope.initFirst = function () {
        $scope.allTeams = TeamFactory.query();
    };
    // $scope.max = $scope.allTeams.length;
    // console.log($scope.allTeams.length)

    $scope.updateActual = function (id) {
        var calkowita = parseInt(id);
        $scope.teamId = calkowita;
        $scope.oneTeam = TeamFactory.get({id: calkowita});
    };

    $scope.teamInfo = function (team) {
        if (angular.isDefined(team.id))
            return team.id + ' ' + team.nazwa;
        else return 'Brak druzyny';
    };

    $scope.setCustomTeam = function (team) {
        $scope.oneTeam = team;
        $scope.teamId = team.id;
        $scope.newTeam.nazwa = team.nazwa;
    };

    $scope.updateTeam = function () {
        console.log($scope.newTeam.nazwa);
        var id = $scope.teamId;
        var nazwa = $scope.newTeam.nazwa;
        var json = angular.toJson({'id': id, 'nazwa': nazwa});

        console.log(json);
        TeamFactory.save(json);
        $scope.allTeams = TeamFactory.query();
        // TeamFactory.save(json, function () {
        //     var saved = false;
        //     for (index = 0; index < $scope.allTeams.length; ++index)
        //         if ($scope.allTeams[index].id === id)
        //             $scope.allTeams.nazwa = nazwa;
        //     // if (!saved)
        //     //     $scope.allTeams.append(json);
        //     console.log('Success');
        // });
        // $scope.$apply();
        $scope.initFirst();
    };

    $scope.teamFactory = new TeamFactory();

    $scope.alert = function (team) {
        alert('Team ' + $scope.teamInfo(team) + '!');
    };

    $scope.newTeam = function (nazwa) {
        $scope.teamId = $scope.allTeams.length + 1;
        $scope.newTeam.nazwa = name;
        var id = $scope.allTeams.length + 1;
        var json = angular.toJson({'id': id, 'nazwa': nazwa});
        TeamFactory.save(json)
        $scope.allTeams = TeamFactory.query();
    };

    $scope.refreshTable = function () {
        $scope.tableTeams.reload();
    }

});

