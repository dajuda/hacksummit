var TitleArrow = me.Entity.extend({
	init: function( x, y ) {
		var settings = {};
		settings.image = this.image = me.loader.getImage('arrow');;
		settings.width = 24;
		settings.height = 31;
		settings.frameWidth = 24;
		settings.frameHeight = 31;
		x = y = 0;
		settings.z = 400;

		this._super( me.Entity, 'init', [ x, y, settings ] );
		this.alwaysUpdate = true;
		this.menuItemKeys = [ 'play', 'timeattack', 'about'];
		this.last_dt = -1;
		this.moving = false;
	},

	update: function( dt ) {
		this.last_dt += dt;
		if(!this.moving){
			if( me.input.isKeyPressed('up')) {
				game.data.menuOP = game.data.menuOP == 0 ? this.menuItemKeys.length -1 : game.data.menuOP - 1;
				this.moving = true;
			} else if ( me.input.isKeyPressed('down')) {
				game.data.menuOP = game.data.menuOP == this.menuItemKeys.length-1 ? 0 : game.data.menuOP + 1;
				this.moving = true;
			}
			this.last_dt = 0;
		}else if( this.last_dt > 150) {
			this.moving = false;
		}

		this.pos = { x : me.game.viewport.width/2-150, y : 325 + (50 * game.data.menuOP ) };
		this._super(me.Entity, 'update', [ dt ]);
		this.draw(me.video.renderer);
	}

});