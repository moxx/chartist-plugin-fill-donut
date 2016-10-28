var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    umd = require('gulp-umd')
    path = require('path');

var umdSettings = {
    namespace: function(file) {
        return 'Chartist.plugins.fillDonut';
    },
    exports: function(file) {
        return 'Chartist.plugins.fillDonut';
    },
    dependencies: function(file) {
        return [{
            name: 'Chartist',
            amd: 'chartist',
            cjs: 'chartist',
            global: 'Chartist',
            param: 'Chartist'
        }];
    },
    template: path.join(__dirname, 'returnExports.js')
};


gulp.task('js', function(file){
    return gulp.src( 'src/scripts/chartist-plugin-fill-donut.js' )
        .pipe(sourcemaps.init())
        .pipe(umd(umdSettings))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/') );
});

gulp.task('js-min', function(){
    return gulp.src( 'src/scripts/chartist-plugin-fill-donut.js' )
        .pipe(sourcemaps.init())
        .pipe(umd(umdSettings))
        .pipe(uglify() ).on('error', function (error) {
            console.error('' + error);
            this.emit('end');
        })
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/') )
        .pipe(gulp.dest('examples/js/') );
});

//run default gulp tasks
gulp.task('default', ['js', 'js-min']);

gulp.task('watch', ['js', 'js-min'], function(){
    gulp.watch('./src/scripts/**', ['js', 'js-min']);
});
