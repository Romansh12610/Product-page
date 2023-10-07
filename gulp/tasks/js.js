export const js = () => {
    return app.gulp.src(app.path.src.js)
        .pipe(app.plugins.sourcemaps.init())
            .pipe(app.plugins.babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(app.plugins.terser())
            .pipe(app.plugins.rename({
                extname: '.min.js',
            }))
        .pipe(app.plugins.sourcemaps.write('./'))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}