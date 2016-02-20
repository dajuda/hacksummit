var game = {
    data: {
        score : 0,
        steps : 0,
        start : false,
        newHiScore : false
    },

    "onload": function() {
        if(!me.video.init(900, 600, {
                         wrapper : "game-container",
                         renderer : me.video.CANVAS,
                         scale : "auto",
                         scaleMethod : "flex-height",
                         doubleBuffering: true,
                        }))
        {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
    
        //me.audio.init("mp3,ogg");

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
       // me.state.set(me.state.TITLE, new game.TitleScreen());
        me.state.set(me.state.MAINMENU, new game.MainMenuScreen());
        //me.state.set(me.state.TIME_ATTACK, new game.AttackSrceen());
        //me.state.set(me.state.ABOUT, new game.AboutSrceen());

        //set input below
        //

        me.game.viewport.setBounds(0, 0, 900, 600);
        me.state.change(me.state.MAINMENU);
    },
};