//Services
"use strict";

app.service('KibicService', function (KibicFactory) {
    this.Factory = KibicFactory;
    this.columns = [
        {
            field: 'id',
            displayName: 'Id',
            width: "*",
            enableFiltering: false
        },
        {
            field: 'imie',
            displayName: 'Imie',
            width: "*",
        },
        {
            field: 'nazwisko',
            displayName: 'Nazwisko',
            width: "*"
        },
        {
            field: 'pesel',
            displayName: 'Pesel',
            width: "*"
        },
        {
            field: 'znizka',
            displayName: 'Znizka',
            width: '*'
        },
        editTemplate,
        delTemplate
    ];

    const empty = function () {
        return {
            id: 0,
            imie: '',
            nazwisko: '',
            pesel: '',
            znizka: false
        }
    };

    this.data = [empty()];

});

app.service('SponsorService', function (TeamFactory, SponsorFactory) {
    this.Factory = SponsorFactory;

    let teamOptions = [{value: '1', label: '-'}];




    this.columns = [
        {
            field: 'id',
            displayName: 'Id',
            width: "*",
            enableFiltering: false
        },
        {
            field: 'nazwa',
            displayName: 'Nazwa',
            width: '*'
        },
        {
            field: 'rodzaj',
            displayName: 'Rodzaj',
            width: '*'
        },
        {
            field: 'druzyna.nazwa',
            displayName: 'Druzyna',
            width: '*',
        },
        editTemplate,
        delTemplate
    ];

    const empty = function () {
        return {
            id: 0,
            nazwa: '',
            rodzaj: '',
            druzyna: '',
        }
    };

    this.data = [empty()];

});

app.service('TeamService', function (TeamFactory) {
    this.Factory = TeamFactory;
    this.columns = [
        {
            name: 'id',
            width: '6%',
            enableFiltering: false
        },
        {
            name: 'nazwa',
            enableCellEdit: true,
            enableFiltering: true
        },
        editTemplate,
        delTemplate
    ];

    const empty = function () {
        return {id: 0, nazwa: ''}
    };

    this.data = [empty()];
});

app.service('PlayerService', function (PlayerFactory) {
    this.Factory = PlayerFactory;
    this.columns = [
        {
            field: 'id',
            displayName: 'Id',
            width: "*",
            enableFiltering: false
        },
        {
            field: 'imie',
            displayName: 'Imie',
            width: "*",
        },
        {
            field: 'nazwisko',
            displayName: 'Nazwisko',
            width: "*"
        },
        {
            field: 'pesel',
            displayName: 'Pesel',
            width: "*"
        },
        {
            field: 'numer',
            displayName: 'Numer',
            width: '*'
        },
        {
            name: 'pozycja',
            displayName: 'Pozycja',
            cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.getPozycja(row.entity.pozycja)}}</div>'
        },
        {
            field: 'druzyna.nazwa',
            displayName: 'Druzyna',
            width: '*'
        },
        editTemplate,
        delTemplate
    ];
    this.pozycje = [
        {id: 'NAPASTNIK', name: 'Napastnik'},
        {id: 'POMOCNIK', name: 'Pomocnik'},
        {id: 'OBRONCA', name: 'Obronca'},
        {id: 'BRAMKARZ', name: 'Bramkarz'}
    ];

    const empty = function () {
        return {
            id: 0,
            imie: '',
            nazwisko: '',
            pesel: '',
            numer: '',
            pozycja: '',
            druzyna: ''
        }
    };

    this.data = [empty()];
});
