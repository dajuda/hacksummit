var game = {
    data: {
        score : 0,
        start : false,
        newHiScore : false,
        menuOP: 0,
    },

    "onload": function() {
        if(!me.video.init(900, 600, {
                         wrapper : "game-container",
                         renderer : me.video.CANVAS,
                         scale : "auto",
                         scaleMethod : "fit",
                         doubleBuffering: true,
                        }))
        {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
    
        if(!me.audio.init("mp3,ogg")){
            alert("Sorry but yout browser does not support html 5 audio!");
            return;
        }

        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.resources);
        me.state.change(me.state.LOADING);

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash.match("debug")) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }
    },

    "loaded": function() {
        me.state.set(me.state.MENU, new game.MainMenuScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.CREDITS, new game.AboutScreen());

        //set input below

        me.pool.register("titleArrow", TitleArrow);

        me.game.viewport.setBounds(0, 0, 900, 600);
        me.state.change(me.state.MENU);
    },
};
