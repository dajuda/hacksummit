define( [ 'jquery', 'app/modules/Sign', 'bootstrap', 'odometer' ], function( $, Sign, bs, odom ){

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
		this.untilLearnCard = 2;
		this.learnData = {};
		console.log('odom', odom);

		this.loadView = function( container ) {
			self._score = 100;
			self.lastScore = 100;

			self.play_music = $('#play_music')[0];
			self.wrong_music = $('#miss_music')[0];
			self.correct_music = $('#correct_music')[0];

			self.play_music.volume = 0.1;
			self.wrong_music.volume = 0.2;
			self.correct_music.volume = 0.2;

			self._parent.background_music.pause();
			if ( self.play_music.paused )
				self.play_music.play();
			
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

				var od = new odom({
					el: $('.odometer')[0],
					value: self.lastScore,
					theme: 'default'
				});
				od.render();

				setTimeout(function(){
					$('.question-field').removeClass('in'); 
					$('.img-row').addClass('in');
					$('.instruction-row').removeClass('out');
					$('.odometer').html(self._score);
					self.lastScore = self._score;
				}, 500);
			});
		};

		function newQuestion( container ) {
			if ( self._score <= 0 ) {
				gameover();
				return;
			}

			if( self.untilLearnCard >= 0 ){
				self.untilLearnCard--;
			}else{
				newLearnCard( container );
				return;
			}

			self.templateData.gamescore = self.lastScore;
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
			self.untilLearnCard = 2;
			self.play_music.pause();
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
			$('#question_result, #answer_'+type).delay(300).fadeIn(200).delay(900).fadeOut(200);
			$('.instruction-row').addClass('out');
			self[type+'_music'].play();
			self.lock = true;
			self._score += self.scoreChange[type];
			continuePlaying();
		}

		function continuePlaying( skipping ) {
			skipping = skipping || false;
			$('.question-field').addClass('out');
			$('.img-row').removeClass('in');
			setTimeout(function(){newQuestion('#main-content');}, skipping? 1000 : 2000);
		}

		function gameover(){
			self.untilLearnCard = 2;
			self._parent.gamescore = self._score;
			self.play_music.pause();
			self._parent.loadView('gameover');
		}

		function newLearnCard( container ) {
			self.learnData = Sign.getRandomGifs(1)[0];
			self.untilLearnCard = 2;
			require(['hbs!../templates/learnCard'], function( template ) {
				$(container).html(template(self.learnData));
				$('#continue_btn').on('click', function( event ){
					newQuestion( container );
				});
			});
		}

	}

	return {
		createPlay: function( parent ) {
			console.log('createPlay', parent);
			return new Play( parent );
		},
	};

});
