game.MainMenuScreen = me.ScreenObject.extend({

	init: function( ) {
        me.audio.play('theme', true);
		this._super(me.ScreenObject, 'init');
		this.selectedMenu = 0;
		this.images = {
			'background': new me.ImageLayer(0, 0, { image: 'main_background' }),
			'title_label' : new me.ImageLayer((me.game.viewport.width/2)-297.5, 125, { image: 'title_label', repeat: 'no-repeat' }),
			'play_button' : new me.ImageLayer((me.game.viewport.width/2)-31.5, 325, { image: 'play_button', repeat: 'no-repeat' }),
			'attack_button' : new me.ImageLayer(me.game.viewport.width/2-97.5, 375, { image: 'attack_button', repeat: 'no-repeat' }),
			'about_button' : new me.ImageLayer(me.game.viewport.width/2-45, 425, { image: 'about_button', repeat: 'no-repeat' }),
		};
		this.titleArrow = new TitleArrow(me.game.viewport.width/2-150, 325);
		// Order in which the menu items appear
		this.menuItemKeys = [ 'play', 'timeattack', 'about'];
		
	},

	onResetEvent: function( ) {
		console.log('Main menu reset args', arguments);

		me.game.world.addChild(this.images.background);
		
		me.game.world.addChild(this.images.title_label);
		
		me.game.world.addChild(this.images.play_button);
		me.game.world.addChild(this.images.attack_button);
		me.game.world.addChild(this.images.about_button);
		me.game.world.addChild(this.titleArrow);
		game.data.menuOP = 0;

        me.input.bindKey(me.input.KEY.DOWN, 'down');
        me.input.bindKey(me.input.KEY.UP, 'up');
        me.input.bindKey(me.input.KEY.ENTER, 'enter');

        me.input.bindKey(me.input.KEY.P, 'play');
        me.input.bindKey(me.input.KEY.T, 'timeattack');
        me.input.bindKey(me.input.KEY.A, 'about');
		
		var self = this;
		this.handler = me.event.subscribe(me.event.KEYDOWN, function(){
			self.menuKeyHandler.apply(self, arguments);
		});

	},

	menuKeyHandler: function( action ) {
		switch(action){
			case 'enter':
				this.menuKeyHandler( this.menuItemKeys[ game.data.menuOP ] );
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
		};
	},

	onUpdate : function() {
		for ( i in this.images ) {
			this.images[i].draw(me.video.renderer);
		}
	},

	onDestroyEvent: function( ) {
        me.audio.stopTrack('theme');

        me.input.unbindKey(me.input.KEY.DOWN);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.ENTER);

        me.input.unbindKey(me.input.KEY.P);
        me.input.unbindKey(me.input.KEY.T);
        me.input.unbindKey(me.input.KEY.A);
	},
});