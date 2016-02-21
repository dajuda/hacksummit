define( [], function(){

	function About( parent ) {

		var self = this;
		this._parent = parent;
		this.templateData = {};


		this.loadView = function( container ) {
			require(['hbs!../templates/about'], function( template ) {
				$(container).html(template(self.templateData));
				$('#back_button').on('click', goBack);
			});
		};
		
		function goBack( event ) {
			event.preventDefault();
			self._parent.loadView('index');
		}
	}

	return {
		createAbout: function( parent ) {
			return new About( parent );
		}
	}
});