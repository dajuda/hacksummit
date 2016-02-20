game.MainMenuScreen = me.ScreenObject.extend({

	init: function( ) {
		this._super(me.ScreenObject, 'init');
		this.images = {
			'play_button' : new me.ImageLayer(400, 350, { image: 'play_button', repeat: 'no-repeat' }),
			'background': new me.ImageLayer(0, 0, { image: 'main_background' }),
		};
	},

	onResetEvent: function( ) {
		console.log('Main menu reset args', arguments);
		me.game.world.addChild(this.images.background);
		me.game.world.addChild(this.images.play_button);
	},

	onDestroyEvent: function( ) {
		me.game.world.removeChild();
	},
});