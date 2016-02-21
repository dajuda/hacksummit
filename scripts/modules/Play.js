define( [ 'jquery', 'app/modules/Sign', 'bootstrap' ], function( $, Sign ){

	function Play( parent ) {

		var self = this;
		this._parent = parent;
		this.templateData = {};
		this.nGifs = 3;
		this.scoreChange = {
			'correct' : 5,
			'wrong': -20,
			'skip': -10,
		};

		this.templateLoaded = function( ) {
			console.log('Play template Loaded');
		};

		this.loadView = function( container ) {
			self._score = 100;
			newQuestion( container );
		};

		this.loadTemplate = function( container ) {
			require(['hbs!../templates/play'], function( template ) {
				$(container).html(template(self.templateData));

				$('#back_button').on('click', goBack);
				$('#help_btn').on('click', openHelp);
				$('#btn_skip').on('click', skipQuestion);
				$('#btn_confirm').on('click', confirmQuestion);

				$('.btn-close-help').on('click', closeHelpModal);

				$('.play-content .seleciona-img').on('click', selectImage);
			});
		};

		function newQuestion( container ) {
			self.templateData.gamescore = self._score;
			self.templateData.question = Sign.getRandomQuestion();
			self.templateData.gifs = Sign.getRandomGifs(2, self.templateData.question.correct);
			
			self.correct_gif = { name: self.templateData.question.correct, url: self.templateData.question.url };

			var rPos = Math.floor(Math.random() * self.nGifs);
			self.templateData.gifs.splice( rPos, 0, self.correct_gif);

			for( i in self.templateData.gifs ) {
				Sign.loadImage(gifs[i].url);
			}
			self.loadTemplate( container );
		}

		function goBack( event ) {
			event.preventDefault();
			self._parent.loadView('index');
		}

		function selectImage( event ) {
			event.preventDefault();
			$('.play-content .seleciona-img').removeClass('selected');
			$(this).addClass('selected');
		}

		function openHelp( event ) {
			event.preventDefault();
			//$('#help_modal').modal('show');
			$('#help_modal').modal();
			console.log("Help wanted");
		}

		function skipQuestion( event ) {
			event.preventDefault();
			self._score += self.scoreChange.skip;
			newQuestion('#main-content');
		}

		function closeHelpModal( event ) {
			event.preventDefault();
			$('#help_modal').modal('hide');
		}

		function confirmQuestion( event ) {
			event.preventDefault();
			var selected = getSelectedAnswer();
			if ( selected !== undefined){
				if ( selected == self.correct_gif.name )
					showResult('correct_lbl');
				else
					showResult('wrong_lbl');
			}else{
				window.alert('Please select an answer');
			}
		}

		function getSelectedAnswer( ) {
			return $('.seleciona-img.selected').data('id');
		}

		function showResult( type ) {
		}

	}

	return {
		createPlay: function( parent ) {
			console.log('createPlay', parent);
			return new Play( parent );
		},
	};

});
