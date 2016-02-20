game.MainMenuScreen = me.ScreenObject.extend({

	init: function( ) {
        me.audio.play('theme', true);
		this._super(me.ScreenObject, 'init');
		this.selectedMenu = 0;
		this.images = {
			'title_label' : new me.ImageLayer((me.game.viewport.width/2)-297.5, 150, { image: 'title_label', repeat: 'no-repeat' }),
			'play_button' : new me.ImageLayer((me.game.viewport.width/2)-31.5, 350, { image: 'play_button', repeat: 'no-repeat' }),
			'attack_button' : new me.ImageLayer(me.game.viewport.width/2-97.5, 400, { image: 'attack_button', repeat: 'no-repeat' }),
			'about_button' : new me.ImageLayer(me.game.viewport.width/2-45, 450, { image: 'about_button', repeat: 'no-repeat' }),
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

        me.input.bindKey(me.input.KEY.DOWN, 'down', true);
        me.input.bindKey(me.input.KEY.UP, 'up', true);

        me.input.bindKey(me.input.KEY.P, 'play', true);
        me.input.bindKey(me.input.KEY.T, 'timeattack', true);
        me.input.bindKey(me.input.KEY.A, 'about', true);
		
		this.handler = me.event.subscribe(me.event.KEYDOWN, this.menuKeyHandler);

	},

	menuKeyHandler: function( action, keyCode, edge ) {
		switch(action){
			case 'up':
				this.selectedMenu = this.selectedMenu == 0 ? 2 : this.selectedMenu - 1;
				break;
			case 'down':
				this.selectedMenu = this.selectedMenu == 2 ? 0 : this.selectedMenu + 1;
				break;
			case 'play':
				me.state.change(me.state.PLAY, 'play');
				break;
			case 'timeattack':
				me.state.change(me.state.PLAY, 'timeattack');
				break;
			case 'about':
				me.state.change(me.state.CREDITS);
				break;
		}
	},

	onDestroyEvent: function( ) {
        me.audio.stopTrack('theme');
		me.game.world.removeChild();
	},

	play_button_click: function( event ) {
		console.log('Playbutton click');
		console.log(arguments);
	},
});