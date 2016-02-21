define( [ 'jquery', 'app/modules/Sign', 'bootstrap' ], function( $, Sign ){

	function Library( parent ) {

		this._parent = parent;
		this.templateData = {};

		var self = this;

		this.loadView = function( container ) {
            loadLibrary( container );
			require(['hbs!../templates/library'], function( template ) {
                console.log(self.templateData);
				$(container).html(template(self.templateData));
				$('#back_button').on('click', goBack);
			});
		};

		function loadLibrary( container ) {
			self.templateData.gifs = Sign.getAllGifs( );
		    
			for( i in self.templateData.gifs ) {
				Sign.loadImage(gifs[i].url);
			}

		}

		function goBack( event ) {
			event.preventDefault();
			self._parent.loadView('index');
		}
	}

	return {
		createLibrary: function( parent ) {
			return new Library( parent );
		}
	}
});
