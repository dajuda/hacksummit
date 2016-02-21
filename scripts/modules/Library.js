define( [], function(){

	function Library( parent ) {

		this._parent = parent;
		this.templateData = {};

		var self = this;

		this.loadView = function( container ) {
			require(['hbs!../templates/library'], function( template ) {
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
		createLibrary: function( parent ) {
			return new Library( parent );
		}
	}
});