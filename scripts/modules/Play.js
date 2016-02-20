define( [ 'app/modules/Sign' ], function( Sign ){

	function Play( ) {

		this.templateLoaded = function( ) {
			console.log('Play template Loaded');
		};

		this.loadView = function( container ) {
			var gifs = Sign.getRandomGifs(1);
			if( gifs.length !== undefined ){
				console.log(gifs);
			}else{
				gifs.then(function( data ) {
					console.log('gifs data', data);
					gifs = self.chooseRandomN( n, data);
				}, function( error) {
					console.log('gifs error', error);
				});
			}
		};

		this.loadTemplate = function( container ) {
			require(['hbs!../templates/play'], function( template ) {
				$('#main-content').html(template(this.templateData));
				this.templateLoaded();
			});
		};

	}

	return {
		createPlay: function( ) {
			return new Play();
		},
	};

});