define([ 'jquery', 'app/modules/Play' ], function( $, Play ){

	var self = {};

	// Only to group initializing actions
	function run() {
		
		defineViews();

		loadIndex();

	}

	function defineViews( ) {
		self.dataView = {
			'play': Play.createPlay( self ),
			//'timeattack': TimeAttack.createAttack(),
			//'about': About.createAbout(),
			'index': {
				loadView: loadIndex,
			}
		};
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