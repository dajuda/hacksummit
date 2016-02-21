define( [ 'app/modules/Gifs' ], function( Gifs ) {

	var self = {};
	self.imageCount = {};

	self.getRandomGifs = function( n ) {
		console.log(Gifs);
		return self.chooseRandomN( n, Gifs );
	};

	self.chooseRandomN = function( n, array ) {
		var itens = [],
			pushedIndexes = [],
			random;
		
		if( n > array.length ){
			console.error("Tried getting more than there was in the array");
			return array;
		}

		for ( var i = array.length; i >= 0; i-- ) {

			random = Math.floor(Math.random()*array.length);

			if( pushedIndexes.indexOf(random) === -1 ) {

				pushedIndexes.push(random);
				itens.push(array[random]);

				if(itens.length == n)
					break;
			}
		}
		return itens;
	};

	self.loadImage = function( url, callback, id ) {
		id = id || 'any';
		var img = new Image();
		img.onload = function( ) {
			
			if( !self.imageCount.hasOwnProperty(id))
				self.imageCount[id] = 0;
			self.imageCount[id]++;

			if( typeof( callback ) === 'function')
				callback(Image);
		}
		img.scr = url;
		return img;
	}

	return self;
});