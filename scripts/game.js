define([ 'jquery', 'app/modules/Play', 'app/modules/Library', 'app/modules/About', 'app/modules/Gameover', 'odometer' ], 
function( $, Play, Library, About, Gameover ) {

	var self = {};

	// Only to group initializing actions
	function run() {
		
		defineViews();
		startAudio();
		loadIndex();

	}

	function defineViews( ) {
		self.dataView = {
			'play': Play.createPlay( self ),
			'library': Library.createLibrary( self ),
			'about': About.createAbout( self ),
			'gameover' : Gameover.createGameover( self ),
			'index': {
				loadView: loadIndex,
			}
		};
	}

	function startAudio( ) {
		self.background_music = $('#background_music')[0];
		self.background_music.volume = 0.05;
		self.background_music.play();
	}

	self.loadView = function( page ) {
		self.dataView[page].loadView('#main-content', 'index');
	}

	function loadIndex( container ) {
		require(['hbs!../templates/index'], function( template ) {
			$(container).html(template({}));
			$('.main-menu-itens li').on('click', function( event ) {
				event.preventDefault();
				self.loadView($(this).attr('id'));
			});
			self.background_music.play();
		});
	}

	run();

	return self;
});
