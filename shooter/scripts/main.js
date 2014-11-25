require.config({
    baseUrl: '/scripts',
    paths: {
    	scene: 'scene',
        resources: 'resources',
        controle: 'controle',
        player: 'player',
        shooter: 'shooter',
        bullet: 'bullet'
    }
});

require(['shooter']);