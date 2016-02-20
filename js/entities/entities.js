var TitleArrow = me.Entity.extend({
	init: function( x, y ) {
		var settings = {};
		settings.image = this.image = 'arrow';
		settings.width = 24;
		settings.height = 31;
		settings.frameWidth = 24;
		settings.frameHeight = 31;

		this._super( me.Entity, 'init', [ x, y, settings ] );
		this.alwaysUpdate = true;
		this.type = 'arrow';
	},

	update: function( dt ) {
		this.pos = { x : me.game.viewport.width/2-150, y : 325 + (50 * game.data.menuOP ) };
	}
});