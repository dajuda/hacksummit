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
		this.lock = false;

		this.loadView = function( container ) {
			self._score = 100;
			self._parent.background_music.pause();
			
			newQuestion( container );
		};

		this.loadTemplate = function( container ) {
			require(['hbs!../templates/play'], function( template ) {
				$(container).html(template(self.templateData));

				$('#back_button').on('click', goBack);
				$('#help_btn').on('click', openHelp);
				$('#btn_skip').on('click', skipQuestion);
				$('#btn_confirm').on('click', confirmQuestion);
				$('#btn_finish').on('click', gameover);

				$('.btn-close-help').on('click', closeHelpModal);

				$('.play-content .seleciona-img').on('click', selectImage);
				$('.img-row').slideDown();


				self.play_music = $('#play_music')[0];
				self.wrong_music = $('#miss_music')[0];
				self.correct_music = $('#correct_music')[0];

				self.play_music.volume = 0.1;
				self.wrong_music.volume = 0.2;
				self.correct_music.volume = 0.2;

				self.play_music.play();

				setTimeout(function(){
					$('.question-field').removeClass('in'); 
					$('.img-row').addClass('in');
				}, 500);
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
			self.lock = false;

		}

		function goBack( event ) {
			event.preventDefault();
			self._parent.loadView('index');
		}

		function selectImage( event ) {
			if( self.lock )
				return;
			event.preventDefault();
			$('.play-content .seleciona-img').removeClass('selected');
			$(this).addClass('selected');
		}

		function openHelp( event ) {
			if( self.lock )
				return;
			event.preventDefault();
			$('#help_modal').modal();
			console.log("Help wanted");
		}

		function skipQuestion( event ) {
			event.preventDefault();
			if( self.lock )
				return;
			self._score += self.scoreChange.skip;
			continuePlaying( true );
		}

		function closeHelpModal( event ) {
			event.preventDefault();
			$('#help_modal').modal('hide');
		}

		function confirmQuestion( event ) {
			event.preventDefault();
			if( self.lock )
				return;
			var selected = getSelectedAnswer();
			if ( selected !== undefined){
				console.log( selected, self.correct_gif.name );
				if ( selected == self.correct_gif.name )
					showResult('correct');
				else
					showResult('wrong');
			}else{
				window.alert('Please select an answer');
			}
		}

		function getSelectedAnswer( ) {
			return $('.seleciona-img.selected').data('id');
		}

		function showResult( type ) {
			$('#question_result, #answer_'+type).fadeIn(500).delay(1000).fadeOut(400);
			self[type+'_music'].play();
			self.lock = true;
			self._score += self.scoreChange[type];
			continuePlaying();
		}

		function continuePlaying( skipping ) {
			if ( self._score <= 0 ) {
				gameover();
				return;
			}
			skipping = skipping || false;
			$('.question-field').addClass('out');
			$('.img-row').removeClass('in');
			setTimeout(function(){newQuestion('#main-content');}, skipping? 1000 : 2000);
		}

		function gameover(){
			self._parent.gamescore = self._score;
			self._parent.loadView('gameover');
		}

	}

	return {
		createPlay: function( parent ) {
			console.log('createPlay', parent);
			return new Play( parent );
		},
	};

});
