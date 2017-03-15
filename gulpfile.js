//Packages
// ======================================================
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),

    // use this only if you need to convert templates into html
    // php2html = require('gulp-php2html'),
    php = require('gulp-connect-php');

var reload = browserSync.reload;

var rawPaths = {
    scss: './build/scss/**/*.scss*',
    includes: './build/includes/**/*.php',
    index: './build/*.php',
    php: './build/includes/*.php',
    js: './build/js/*.js'
};

var out = {
    cssOut: './build/css',
    // index: './build/', // for php2html conversion
    js: './build/js/'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Browser-sync config
gulp.task('php', function() {
    php.server({
        base: 'build',
        port: 8080,
        keepalive: true
    });
});

// Browser-sync
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
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(out.cssOut));
});

// Uglify JS
gulp.task('uglify', function() {
    return gulp.src(rawPaths.js)
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest(out.js));
});


// PHP to html
// gulp.task('php2html', function() {
//     return gulp.src(rawPaths.index)
//         .pipe(php2html())
//         .pipe(gulp.dest(out.index));
// });


gulp.task('watch', function() {
    gulp.watch(rawPaths.php).on('change', browserSync.reload);
    gulp.watch(rawPaths.includes).on('change', browserSync.reload);
    gulp.watch(rawPaths.scss, ['sass']).on('change', browserSync.reload);
    gulp.watch(rawPaths.js).on('change', browserSync.reload);
    gulp.watch(rawPaths.index).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'sass', 'watch']);