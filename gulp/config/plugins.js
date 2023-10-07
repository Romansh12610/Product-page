// html & server
import htmlMinifier from 'gulp-html-minifier-terser';
import browsersync from 'browser-sync';
// scss 
import * as sass from 'sass';
import gulpsass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import pxtorem from 'postcss-pxtorem';
import rename from 'gulp-rename';
// js
import babel from 'gulp-babel';
import terser from 'gulp-terser';
// img
import newer from 'gulp-newer';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const plugins = {
    htmlMinifier,
    browsersync: browsersync.create(),
    sass: gulpsass(sass),
    postcss,
    postcssPlugins: [
        autoprefixer(),
        pxtorem({
            propList: ['*', '!letter-spacing']
        }),
        cssnano()
    ],
    sourcemaps,
    rename,
    babel,
    terser,
    newer,
    webp,
    imagemin
};