define( [ 'jquery', 'odometer'], function( $, odom ){

	function GameOver( parent ) {

		var self = this;
		this._parent = parent;
		this.templateData = {};

		this.loadView = function( container ) {
			require(['hbs!../templates/gameover'], function( template ) {
				self.templateData.finalgamescore = self._parent.gamescore > 0;
				$(container).html(template(self.templateData));
				if ( $('#final_score')[0] !== undefined ){
					var od = new odom({
						el: $('#final_score')[0],
						value: 0,
						theme: 'default',
					});
					od.render();	
				}
				setTimeout(function( ) {
					$('.odometer').html(self._parent.gamescore);
				}, 500);
				$('#again_button').on('click', function( ) {
					self._parent.loadView('play');
				});
				$('#library_button').on('click', function( ) {
					self._parent.loadView('library');
				});
				$('#back_button').on('click', goBack);
				self._parent.background_music.play();
			});
		};

		function goBack( event ) {
			event.preventDefault();
			self.untilLearnCard = 2;
			self.play_music.pause();
			self._parent.loadView('index');
		}
	}

	return {
		createGameover: function( parent ) {
			return new GameOver( parent );
		}
	}
});