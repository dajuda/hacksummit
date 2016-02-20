game.PlayScreen = me.ScreenObject.extend({

	init: function( ) {
        me.audio.stopTrack('theme');
		this._super(me.ScreenObject, 'init');
		this.images = {
			'background': new me.ImageLayer(0, 0, { image: 'main_background' }),
			'stage1_label' : new me.ImageLayer(me.game.viewport.width/2-94.5, 50, { image: 'stage1_label', repeat: 'no-repeat'}),
			'model_option1' : new me.ImageLayer(me.game.viewport.width/2-393.5, 300, { image: 'model_option', repeat: 'no-repeat'}),
			'model_option2' : new me.ImageLayer(me.game.viewport.width/2-114.5, 300, { image: 'model_option', repeat: 'no-repeat'}),
			'model_option3' : new me.ImageLayer(me.game.viewport.width/2+164.5, 300, { image: 'model_option', repeat: 'no-repeat'}),
        }
	},

	onResetEvent: function( type ) {
		console.log('Play', type);
		me.game.world.addChild(this.images.background);
		me.game.world.addChild(this.images.stage1_label);
		me.game.world.addChild(this.images.model_option1);
		me.game.world.addChild(this.images.model_option2);
		me.game.world.addChild(this.images.model_option3);
	},
});
