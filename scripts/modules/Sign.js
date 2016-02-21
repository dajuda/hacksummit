define( [ 'app/modules/Gifs', 'app/modules/Questions' ], function( Gifs, Questions ) {

	var self = {};
	self.imageCount = {};

	self.getAllGifs = function( ) {
		console.log(Gifs);
		return Gifs;
	};

	self.getRandomGifs = function( n, except ) {
		console.log(Gifs);
		return self.chooseRandomN( n, Gifs, except );
	};

	self.getRandomQuestion = function( ){
		console.log(Questions);
		return self.chooseRandomN( 1, Questions )[0];
	}

	self.chooseRandomN = function( n, array, except ) {
		var itens = [],
			pushedIndexes = [],
			random;
		
		if( n > array.length ){
			console.error("Tried getting more than there was in the array");
			return array;
		}

		for ( var i = array.length; i >= 0; i-- ) {

			random = Math.floor(Math.random()*array.length);

			if ( except !== undefined ){
				if( array[random].name === except )
					continue;
			}

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
