var game = {
    data: {
        score : 0,
        steps : 0,
        start : false,
        newHiScore : false
    },

    "onload": function() {
        if(!me.video.init(900, 600, {
                         wrapper : "screen",
                         renderer : me.video.CANVAS,
                         scale : "auto",
                         scaleMethod : "fit"
                        }))
        {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
    
        //me.audio.init("mp3,ogg");

        me.loader.onload = this.loaded.bind(this);
        me.loader.preload(game.resources);
        me.state.change(me.state.LOADING);
    }

    "loaded": function() {
        me.state.set(me.state.MENU, new game.TitleSrceen());
        me.state.set(me.state.TIME_ATTACK, new game.AttackSrceen());
        me.state.set(me.state.ABOUT, new game.AboutSrceen());

        //set input below
        //

        me.game.viewport.setBounds(0, 0, 900, 600);
        me.state.change(me.state.MENU);
}
