define([ 'jquery', 'app/modules/Play' ], function( $, Play ) {

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
			//'about': About.createAbout(),
			'index': {
				loadView: loadIndex,
			}
		};
	}

	function startAudio( ) {
		self.background_music = $('#background_music')[0];
		self.background_music.volume = 0.1;
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
		});
	}

	run();

	return self;
});
