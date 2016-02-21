define( [ 'jquery', 'app/modules/Sign' ], function( $, Sign ){

	function Play( parent ) {

		var self = this;
		this._parent = parent;
		this.templateData = {};

		this.templateLoaded = function( ) {
			console.log('Play template Loaded');
		};

		this.loadView = function( container ) {
			var gifs = Sign.getRandomGifs(3);
			self.loadTemplate( container );
		};

		this.loadTemplate = function( container ) {
			require(['hbs!../templates/play'], function( template ) {
				$('#main-content').html(template(this.templateData));
				console.log(self._parent);
				$('#back_button').on('click', function( event ) {
					event.preventDefault();
					self._parent.loadView('index');
				});
				$('#help_btn').on('click', function( event ) {
					event.preventDefault();
					console.log("Help wanted");
				});
				$('.play-content .seleciona-img').on('click', function( event ) {
					console.log('seleciona img');
					event.preventDefault();
					$('.play-content .seleciona-img').removeClass('selected');
					$(this).addClass('selected');
				});
			});
		};

	}

	return {
		createPlay: function( parent ) {
			console.log('createPlay', parent);
			return new Play( parent );
		},
	};

});