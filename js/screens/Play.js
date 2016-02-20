game.PlayScreen = me.ScreenObject.extend({

	init: function( ) {
        me.audio.stopTrack('theme');
		this._super(me.ScreenObject, 'init');
		this.images = {
			'background': new me.ImageLayer(0, 0, { image: 'main_background' }),
			'stage1_label' : new me.ImageLayer(me.game.viewport.width/2-94.5, 50, { image: 'stage1_label', repeat: 'no-repeat'}),
        }
	},

	onResetEvent: function( type ) {
		console.log('Play', type);
		me.game.world.addChild(this.images.stage1_label);
	},
});
