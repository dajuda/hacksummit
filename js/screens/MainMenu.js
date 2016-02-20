game.MainMenuScreen = me.ScreenObject.extend({

	init: function( ) {
		this._super(me.ScreenObject, 'init');
	},

	onResetEvent: function( ) {
		console.log('Main menu reset args', arguments);
		me.game.world.addChild(new me.ImageLayer(0, 0, { image: 'main_background' }));
	},

	onDestroyEvent: function( ) {
		me.game.world.removeChild();
	},
});