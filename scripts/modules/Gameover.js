define( [], function(){

	function GameOver( parent ) {

		var self = this;
		this._parent = parent;
		this.templateData = {};


		this.loadView = function( container ) {
			require(['hbs!../templates/gameover'], function( template ) {
				$(container).html(template(self.templateData));
			});
		};
	}

	return {
		createLibrary: function( parent ) {
			return new GameOver( parent );
		}
	}
});