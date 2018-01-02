//Controllers
"use strict";

const isNumber = function (val) {
    return (val === parseInt(val, 10));
};

app.controller('indexCtrl', function ($scope, $filter, $route, $window) {

    $scope.strony = $filter('orderBy')([
        {name: 'Druzyny', url: 'data/teams.html', hidden: false},
        {name: 'Zawodnicy', url: 'data/players.html', hidden: false},
        {name: 'Kibice', url: 'data/kibice.html', hidden: false},
        {name: 'Sponsorzy', url: 'data/sponsors.html', hidden: false},
    ], 'name');

    $scope.updateView = function (src) {
        $scope.view = src;
    };

    const alert = function (msg) {
        $window.alert(msg);
    }
});

app.controller('teamCtrl', function ($scope, $filter, TeamService) {
    const Factory = TeamService.Factory;
    let data = TeamService.data;
    const empty = function () {
        return {id: 0, nazwa: ''}
    };


    $scope.showEdit = false; //musi
    $scope.entry = empty();//musi
    $scope.edited = empty();//musi

    const reload = function () {
        data = Factory.query(function () {
            $scope.grid.data = $filter('orderBy')(data, 'id');
        }, function (r) {
            alert(r);
        });
    };

    reload();

    $scope.grid = { //musi
        enableFiltering: true,
        enableSorting: true,
        enableCellSelection: true,
        enableCellEditOnFocus: true,
        columnDefs: TeamService.columns,
        data: data
    };

    //CRUD
    $scope.add = function (row) {//musi
        row.id = 0;
        addF(row, Factory, reload);
        $scope.entry = empty();
    };

    $scope.edit = function (row) {//musi
        $scope.showEdit = true;
        $scope.edited = copyOf(row);
    };

    $scope.delete = function (row) {//musi
        deleteF(row, Factory, reload);
    };

    $scope.update = function (row) {//musi
        updateF(row, Factory, reload);
        $scope.showEdit = false;
        $scope.edited = empty();
    };

});

app.controller('playerCtrl', function ($scope, $filter, PlayerService, TeamService) {
    const Factory = PlayerService.Factory;
    let data = PlayerService.data;
    const empty = function () {
        return {
            id: 0,
            imie: '',
            nazwisko: '',
            pesel: '',
            numer: '',
            pozycja: '',
            druzyna: ''
        };
        // PlayerService.pozycje.ge
    };

    let druzynyLet = TeamService.Factory.query(function () {
        $scope.druzyny = $filter('orderBy')(druzynyLet, 'id');
    });

    $scope.pozycje = {
        lista: [
            {id: 'BRAK', nazwa: '--Brak--'},
            {id: 'NAPASTNIK', nazwa: 'Napastnik'},
            {id: 'POMOCNIK', nazwa: 'Pomocnik'},
            {id: 'OBRONCA', nazwa: 'Obronca'},
            {id: 'BRAMKARZ', nazwa: 'Bramkarz'}
        ],
    };

    $scope.showEdit = false; //musi
    $scope.entry = empty();//musi

    $scope.edited = empty();//musi

    const reload = function () {
        data = Factory.query(function () {
            $scope.grid.data = data;
        }, function (r) {
            alert(r);
        });
    };

    reload();


    $scope.grid = { //musi
        enableFiltering: true,
        enableSorting: true,
        enableCellSelection: true,
        enableCellEditOnFocus: true,
        columnDefs: PlayerService.columns,
        data: data
    };

    $scope.getDruzyna = function (druzyna) {
        if (isNumber(druzyna)) {
            druzyna = $scope.druzyny[druzyna-1];
        }
        return druzyna.nazwa;
    };

    $scope.getPozycja = function (pozycja) {
        // console.log('Getting pozycja for: '+ pozycja);
        for (let i = 0; i < $scope.pozycje.lista.length; ++i) {
            // console.log($scope.pozycje.lista[i].id+' - '+pozycja);
            if ($scope.pozycje.lista[i].id === pozycja) return $scope.pozycje.lista[i].nazwa;
        }
    };

    //CRUD
    $scope.add = function (row) {//musi
        row.druzyna = $scope.druzyny[row.druzyna - 1];
        addF(row, Factory, reload);
        // PlayerService.Factory.save(angular.toJson(row), function () {
        //     reload();
        // }, function (r) {
        //     alert(r);
        // });
        $scope.entry = empty();
        $scope.entry.pozycja = $scope.pozycje[0];
    };

    $scope.edit = function (row) {//musi
        $scope.showEdit = true;
        $scope.edited = copyOf(row);
        let id = 0;
        for (let i = 0; i < $scope.druzyny.length; ++i) {
            id = ($scope.druzyny[i].id === $scope.edited.druzyna.id) ? i : id;
        }
        $scope.druzyny.selected = $scope.druzyny[id];
    };

    $scope.delete = function (row) {//musi
        deleteF(row, Factory, reload);
    };

    $scope.update = function (row) {//musi
        row.druzyna = $scope.druzyny.selected;
        row.druzyna.pilkarze = null;
        updateF(row, Factory, reload);
        // row = copyOf(row);
        // const json = angular.toJson(row);
        // PlayerService.Factory.update({id: row.id}, json, function () {
        //     reload();
        // }, function (r) {
        //     alert(r);
        // });

        $scope.showEdit = false;
        $scope.edited = empty();
    };

    $scope.entry.pozycja = $scope.pozycje[0];
});

app.controller('kibicCtrl', function ($scope, $filter, KibicService) {
    const Factory = KibicService.Factory;
    let data = KibicService.data;

    const empty = function () {
        return {
            id: 0,
            nazwa: '',
            rodzaj: '',
            druzyna: '',
        }
    };

    $scope.showEdit = false;
    $scope.entry = empty();
    $scope.edited = empty();

    const reload = function () {
        data = Factory.query(function () {
            $scope.grid.data = $filter('orderBy')(data, 'id');
        }, function (response) {
            alerty(response);
        });
    };

    reload();

    $scope.grid = {
        enableFiltering: true,
        enableSorting: true,
        enableCellSelection: true,
        enableCellEditOnFocus: true,
        columnDefs: KibicService.columns,
        data: data
    };

    $scope.add = function (row) {//musi
        addF(row, Factory, reload);
        $scope.entry = empty();
    };

    $scope.edit = function (row) {//musi
        $scope.showEdit = true;
        $scope.edited = copyOf(row);
    };

    $scope.delete = function (row) {//musi
        deleteF(row, Factory, reload);
    };

    $scope.update = function (row) {//musi
        updateF(row, Factory, reload);
        $scope.showEdit = false;
        $scope.edited = empty();
    };

});

app.controller('sponsorCtrl', function ($scope, $filter, SponsorService, TeamService) {
    const Factory = SponsorService.Factory;
    let data = SponsorService.data;
    $scope.druzyny = [{}];
    let druzynyLet = (TeamService.Factory.query(function () {
        $scope.druzyny = $filter('orderBy')(druzynyLet, 'id');
    }));

    $scope.getDruzyna = function (druzyna) {
        if (isNumber(druzyna)) {
            druzyna = $scope.druzyny[druzyna-1];
        }
        return druzyna.nazwa;
    };


    const empty = function () {
        return {
            id: 0,
            nazwa: '',
            rodzaj: '',
            druzyna: '',
        }
    };

    $scope.showEdit = false;
    $scope.entry = empty();
    $scope.edited = empty();

    const reload = function () {
        data = Factory.query(function () {
            $scope.grid.data = $filter('orderBy')(data, 'id');
        }, function (response) {
            alerty(response);
        });
    };

    reload();

    $scope.grid = {
        enableFiltering: true,
        enableSorting: true,
        enableCellSelection: true,
        enableCellEditOnFocus: true,
        columnDefs: SponsorService.columns,
        data: data
    };

    $scope.add = function (row) {//musi
        row.druzyna = $scope.druzyny[row.druzyna - 1];
        addF(row, Factory, reload);
        $scope.entry = empty();
    };

    $scope.edit = function (row) {//musi
        $scope.showEdit = true;
        $scope.edited = copyOf(row);
        let id = 0;
        for (let i = 0; i < $scope.druzyny.length; ++i) {
            id = ($scope.druzyny[i].id === $scope.edited.druzyna.id) ? i : id;
        }
        $scope.druzyny.selected = $scope.druzyny[id];
    };

    $scope.delete = function (row) {//musi
        deleteF(row, Factory, reload);
    };

    $scope.update = function (row) {//musi
        row.druzyna = $scope.druzyny.selected;
        row.druzyna.pilkarze = null;
        updateF(row, Factory, reload);
        $scope.showEdit = false;
        $scope.edited = empty();
    };

});