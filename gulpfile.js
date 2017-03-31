//Packages
// ======================================================
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    imagemin = require('gulp-imagemin'),
    fontmin = require('gulp-fontmin'),
    // use this only if you need to convert templates into html
    php2html = require('gulp-php2html'),
    php = require('gulp-connect-php');

var reload = browserSync.reload;

//Build In
var rawPaths = {
    scss: './build/scss/**/*.scss*',
    includes: './build/includes/**/*.php',
    index: './build/*.php',
    php: './build/includes/*.php',
    image: './build/images/**/*.{svg,png,jpeg,jpg,gif}',
    js: './build/js/*.js',
    fonts: './build/fonts/**/*.{eot,ttf,woff,woff2,svg}',
    vendor: './build/vendor/js/**/*.js'
};

// Build Out 
var buildOut = {
    cssOut: './build/css',
    js: './build/js/',
    compressed_images_build: './build/images/'

};

// dist out 
var distOut = {
    index: './dist/', // for php2html conversion
    scss: './dist/css/',
    js: './dist/js/',
    compressed_images_dist: './dist/images/',
    fonts_compressed: './dist/fonts/'
}

var gulp_options = {
    browsers: [
        'last 2 versions',
        '> 5%',
        'Firefox ESR',
        'safari 5',
        'ie 8',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4'
    ],
    image_min: {
        'interlaced': true,
        'progressive': true,
        'optimizationLevel': 5,
        'svgoPlugins': [{ removeViewBox: true }]
    }
};

// Browser-sync config
gulp.task('php', function() {
    php.server({
        base: 'build',
        port: 8080,
        keepalive: true
    });
});
gulp.task('browser-sync', ['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8080',
        port: 8080,
        open: true,
        notify: false
    });
});

// SCSS
gulp.task('sass', function() {
    return gulp.src(rawPaths.scss)
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(autoprefixer(gulp_options.browsers))
        .pipe(gulp.dest(buildOut.cssOut))
        // dist assets
        .pipe(gulp.dest(distOut.scss));

});

// Uglify JS
gulp.task('uglify', function() {
    return gulp.src(rawPaths.js)
        .pipe(uglify())
        // .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(buildOut.js))
        // dist assets
        .pipe(gulp.dest(distOut.js));

});

// Imagemin 
gulp.task('imagemin', function() {
    return gulp.src(rawPaths.image)
        .pipe(imagemin(gulp_options.image_min))
        .pipe(gulp.dest(distOut.compressed_images_dist)) // dist 
        .pipe(gulp.dest(buildOut.compressed_images_build)); //build
});

// PHP to html Dist
gulp.task('php2html', function() {
    return gulp.src(rawPaths.index)
        .pipe(php2html())
        .pipe(gulp.dest(distOut.index));
});


// Minify Fonts
gulp.task('fontmin', function() {
    return gulp.src(rawPaths.fonts)
        .pipe(fontmin())
        .pipe(gulp.dest(distOut.fonts_compressed));
});


gulp.task('watch', function() {
    gulp.watch(rawPaths.php).on('change', browserSync.reload);
    gulp.watch(rawPaths.includes).on('change', browserSync.reload);
    gulp.watch(rawPaths.scss, ['sass']).on('change', browserSync.reload);
    gulp.watch(rawPaths.js).on('change', browserSync.reload);
    gulp.watch(rawPaths.index).on('change', browserSync.reload);
});

// Dist Build System
gulp.task('dist', ['php2html', 'imagemin', 'fontmin', 'sass', 'uglify']);
// Build System
gulp.task('default', ['browser-sync', 'sass', 'watch']);