define( [ ], function(){

	function Play( ) {

		this.templateLoaded = function(){
			console.log('Play template Loaded');
		};

		this.loadView = function( container ) {
			require(['hbs!../templates/play'], function( template ) {
				$('#main-content').html(template(this.templateData));
			});
		}

	}

	return {
		createPlay: function( ) {
			return new Play();
		},
	};

});