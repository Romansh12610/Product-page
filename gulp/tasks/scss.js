export const scss = () => {
    return app.gulp.src(app.path.src.scss)
        .pipe(app.plugins.sourcemaps.init())
            .pipe(app.plugins.sass.sync({outputStyle: 'compressed'}).on('error', app.plugins.sass.logError))
            .pipe(app.plugins.postcss(app.plugins.postcssPlugins))
            .pipe(app.plugins.rename({
                extname: '.min.css',
            }))
        .pipe(app.plugins.sourcemaps.write('./'))
        .pipe(app.gulp.dest(app.path.build.scss))
        .pipe(app.plugins.browsersync.stream());
};