game.PlayScreen = me.ScreenObject.extend({

	init: function( ) {
		this._super(me.ScreenObject, 'init');
	},

	onResetEvent: function( type ) {
		console.log('Play', type);
	},
});