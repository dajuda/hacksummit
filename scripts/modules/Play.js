define( [ 'jquery', 'app/modules/Sign' ], function( $, Sign ){

	function Play( parent ) {

		var self = this;
		this._parent = parent;
		this.templateData = {};

		this.templateLoaded = function( ) {
			console.log('Play template Loaded');
		};

		this.loadView = function( container ) {
			self.templateData.gifs = Sign.getRandomGifs(3);
			self.templateData.question = Sign.getRandomQuestion();
			for( i in self.templateData.gifs ) {
				Sign.loadImage(gifs[i].url);
			}
			self.loadTemplate( container );
		};

		this.loadTemplate = function( container ) {
			require(['hbs!../templates/play'], function( template ) {
				console.log(self.templateData);
				$('#main-content').html(template(self.templateData));
				$('#back_button').on('click', function( event ) {
					event.preventDefault();
					self._parent.loadView('index');
				});
				$('#help_btn').on('click', function( event ) {
					event.preventDefault();
                    $('#helpModal').show()
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
