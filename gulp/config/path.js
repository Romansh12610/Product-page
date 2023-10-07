import * as nodePath from 'path';
const rootFolder  = nodePath.basename(nodePath.resolve())

const buildFolder =  './dist';
const srcFolder = './src';

export const path = {
    build: {
        images: `${buildFolder}/img/`,
        js: `${buildFolder}/js/`,
        scss: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
    },
    src: {
        images: `${srcFolder}/img/*.{jpg,jpeg,png,gif,webp}`, 
        svg: `${srcFolder}/img/*.svg`,
        js: `${srcFolder}/js/main.js`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
    },
    watch: {
        images: `${srcFolder}/img/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        js: `${srcFolder}/js/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/*.html`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
}