define([ 'jquery', 'app/modules/Play' ], function( $, Play ){

	var self = {};

	// Only to group initializing actions
	function run() {

		self.Play = Play.createPlay();
		
		defineViews();
		console.log('game');
		loadIndex();
	}

	function defineViews( ) {
		self.dataView = {
			'play': Play.createPlay(),
			//'timeattack': TimeAttack.createAttack(),
			//'about': About.createAbout(),
			'index': {
				loadView: loadIndex,
			}
		};
	}

	function loadView( page ) {
		self.dataView[page].loadView('#main-content');
	}

	function loadIndex( container ) {
		require(['hbs!../templates/index'], function( template ) {
			$(container).html(template({}));
			$('.main-menu-itens li').on('click', function( event ) {
				event.preventDefault();
				loadView($(this).attr('id'));
			});
		});
	}

	run();

	return self;
});