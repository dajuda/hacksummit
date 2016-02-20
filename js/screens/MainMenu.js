game.MainMenuScreen = me.ScreenObject.extend({

	init: function( ) {
        me.audio.play('theme', true);
		this._super(me.ScreenObject, 'init');
		this.images = {
			'title_label' : new me.ImageLayer((me.game.viewport.width/2)-297.5, 125, { image: 'title_label', repeat: 'no-repeat' }),
			'play_button' : new me.ImageLayer((me.game.viewport.width/2)-31.5, 325, { image: 'play_button', repeat: 'no-repeat' }),
			'attack_button' : new me.ImageLayer(me.game.viewport.width/2-97.5, 375, { image: 'attack_button', repeat: 'no-repeat' }),
			'about_button' : new me.ImageLayer(me.game.viewport.width/2-45, 425, { image: 'about_button', repeat: 'no-repeat' }),
			'background': new me.ImageLayer(0, 0, { image: 'main_background' }),
		};
	},

	onResetEvent: function( ) {
		console.log('Main menu reset args', arguments);
		me.game.world.addChild(this.images.background);
		me.game.world.addChild(this.images.title_label);
		me.game.world.addChild(this.images.play_button);
		me.game.world.addChild(this.images.attack_button);
		me.game.world.addChild(this.images.about_button);
	},

	onDestroyEvent: function( ) {
        me.audio.stopTrack('theme');
		me.game.world.removeChild();
	},
});
