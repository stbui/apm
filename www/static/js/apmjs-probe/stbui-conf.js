stbui.match(/^\/src\/(.*)$/i, {
    release: '$1',
    optimizer: stbui.plugin('uglify-js'),
})

stbui.media('dev')
    .match('**.js', {
        optimizer: null,
        useHash: true
    })
    .match('src/*.js', {
        deploy: [
            stbui.plugin('local-deliver', {
                to: './dist'
            })
        ]
    });
;

stbui.media('prod')
    .match('src/*.js', {
        deploy: [
            stbui.plugin('local-deliver', {
                to: '../'
            })
        ]
    });