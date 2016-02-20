define( [ ], function(){

	var self = {};

	self.cache = {};
	self.imageCount = {};

	self.getRandomGifs = function( n ) {
		if( self.cache.hasOwnProperty('gifs') ){
			return chooseRandomN( n, self.cache.gifs );
		}else{
			return $.ajax({
				url: '/gifs.json',
				type: 'GET',
				local: true,
				cache: true,
				success: function(data){
					console.log('getRandomGifs ajax', data);
					self.cache.gifs = gifs;
				}
			});
		}
	};

	self.chooseRandomN = function( n, array ) {
		var itens = [];
		for ( var i = n; i > 0; i-- ) {
			itens.push(array[Math.floor(Math.random()*array.length)]);
		}
		if( n != itens.length )
			console.error('chooseRandomN escolhendo numero errado de itens');
		return itens;
	};

	self.loadImage = function( url, callback, id ) {
		id = id || 'any';
		var Image = new Image();
		Image.onload = function( ) {
			
			if( !self.imageCount.hasOwnProperty(id))
				self.imageCount[id] = 0;
			self.imageCount[id]++;

			if( typeof( callback ) === 'function')
				callback();
		}
		Image.scr = url;
		return $('<img src="'+url+'" />');
	}

	return self;
});