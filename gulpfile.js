'use strict';

var gulp     = require('gulp');
var clean    = require('gulp-clean');
var htmlmin  = require('gulp-htmlmin');
var sequence = require('gulp-sequence');
var uglify   = require('gulp-uglify');
var path     = require('path');

var src  = path.join(__dirname, 'src');
var dest = path.join(__dirname, 'dest');

var uglifyOptions = {
    beautify: false,
    compress: {
        dead_code:     true,
        drop_console:  true,
        drop_debugger: true,
        screw_ie8:     true
    },
    mangle:   {
        screw_ie8: true
    },
    output:   {
        quote_style: 3
    },
    stats:    true,
    verbose:  true
};

var htmlminOptions = {
    removeComments:                true,
    removeCommentsFromCDATA:       true,
    removeCDATASectionsFromCDATA:  true,
    collapseWhitespace:            true,
    collapseBooleanAttributes:     true,
    removeScriptTypeAttributes:    true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash:              true,
    minifyJS:                      uglifyOptions
};

gulp.task('minify:html', function () {
    return gulp.src(path.join(src, 'test.html'))
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest(dest));
});

gulp.task('minify:js', function () {
    return gulp.src(path.join(src, 'test.js'))
        .pipe(uglify(uglifyOptions))
        .pipe(gulp.dest(dest));
});

gulp.task('clean', function () {
    return gulp.src(path.join(dest, '*'), { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('fail',    sequence('clean', 'minify:html', 'minify:js'));

gulp.task('succeed', sequence('clean', 'minify:js',   'minify:html'));

gulp.task('default', ['fail']);
