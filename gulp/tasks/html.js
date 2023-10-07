export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.htmlMinifier({
            collapseWhitespace: true,
            removeAttributeQuotes: true,
        }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
};