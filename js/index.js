window.onReady( function onReady() {
    game.onload();
    if ( me.device.isMobile && !navigator.isCocoonJS ) {
        window.document.addEventListener('touchmove', function ( e ) {
            e.preventDefault()/
            window.scroll( 0, 0 );
            return false;
        }, false);
        (function( ) {
            window.scrollTo( 0, 1 );
            me.video.onresize( null );
        }).defer();
        me.event.subscribe( me.event.WINDOW_ONRESIZE, function( e ) {
            window.scrollTo( 0, 1 );
        });
    }
});