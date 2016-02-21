requirejs.config({
    baseUrl: 'lib',
    paths: {
        'app'		: '../scripts/',
        //'jquery'	: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min',
        //'bootstrap'	: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
        'jquery'    : 'jquery-2.2.0/jquery-2.2.0.min',
        'bootstrap' : 'bootstrap-3.3.6-dist/js/bootstrap.min',
        'hbs'		: 'require-handlebars-plugin/hbs',
        'handlebars': 'require-handlebars-plugin/hbs/handlebars.runtime',
        'odometer'  : 'odometer/odometer.min',
    },
    hbs: { // optional
        helpers: false,						// default: true
        templateExtension: 'html',			// default: 'hbs'
        handlebarsPath: 'handlebars',
        helpersDirectory: '../templates/helpers',
        partialsUrl: '../templates/partials',
    },
    shim: {
    	'bootstrap' : { 
            'deps' : ['jquery'],
        },
        'odometer' : {
            'deps' : [ 'jquery' ],
            'exports' : 'Odometer',
        }
    },
    waitSeconds: 25,
});

requirejs(['app/game']);
