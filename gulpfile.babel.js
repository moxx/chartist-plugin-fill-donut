import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import umd from 'gulp-umd';
import path from 'path';
import del from 'del';

var umdSettings = {
    namespace: function (file) {
        return 'Chartist.plugins.fillDonut';
    },
    exports: function (file) {
        return 'Chartist.plugins.fillDonut';
    },
    dependencies: function (file) {
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

/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
export const clean = () => del(['./dist/*', './examples/js/*', './examples/css/*']);


export function js(file) {
    return gulp.src('src/scripts/chartist-plugin-fill-donut.js')
        .pipe(babel())
        .pipe(sourcemaps.init())
        .pipe(umd(umdSettings))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
        .pipe(gulp.dest('examples/js/'));
}

export function jsMin() {
    return gulp.src('src/scripts/chartist-plugin-fill-donut.js')
        .pipe(babel())
        .pipe(sourcemaps.init())
        .pipe(umd(umdSettings))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
        .pipe(gulp.dest('examples/js/'));
}

function copyExampleJSDeps() {
    return gulp.src([
        'node_modules/chartist/dist/chartist.min.js',
        'node_modules/chartist/dist/chartist.js'
    ]).pipe(gulp.dest('examples/js'));
}

function copyExampleCSSDeps() {
    return gulp.src([
        'node_modules/chartist/dist/chartist.min.css',
        'node_modules/chartist/dist/chartist.css'
    ]).pipe(gulp.dest('examples/css'));
}

export var copydeps =  gulp.parallel(copyExampleJSDeps, copyExampleCSSDeps);
    
    

//run default gulp tasks
const build = gulp.series(clean, gulp.parallel(js, jsMin, copyExampleJSDeps, copyExampleCSSDeps));

function watchFiles() {
    gulp.watch('./src/scripts/**', gulp.parallel(js, jsMin));
}
export { watchFiles as watch };


/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;