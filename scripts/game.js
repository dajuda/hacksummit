define([ 'jquery' ], function( $ ){

	var self = {};

	self.dataView = {
		'play': {

		},
		'timeattack': {

		},
		'about': {

		},
	}

	// Only to group initializing actions
	function run() {
		
		console.log('game');
		$('.main-menu-itens li').on('click', function( event ) {
			event.preventDefault();
			loadView($(this).attr('id'));
		})
	}

	function loadView( template ) {
		console.log(template);
		require(['hbs!../templates/'+template], function( template ) {
			$('#main-content').html(template(self.dataView[template]));
		})
	}

	run();

	return self;
});