define( [ 'app/modules/Sign' ], function( Sign ){

	function Play( ) {

		this.templateData = {};

		this.templateLoaded = function( ) {
			console.log('Play template Loaded');
		};

		this.loadView = function( container ) {
			var gifs = Sign.getRandomGifs(3);
			this.loadTemplate( container );
		};

		this.loadTemplate = function( container ) {
			require(['hbs!../templates/play'], function( template ) {
				$('#main-content').html(template(this.templateData));
				//this.templateLoaded();
			});
		};

	}

	return {
		createPlay: function( ) {
			return new Play();
		},
	};

});