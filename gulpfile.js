var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var del = require('del');
var uglify = require('gulp-uglify');

var paths = {
    styles: {
        src: 'styles/*.scss',
        dest: 'build/css',
        main: 'styles/style.scss',
        maps: './maps'
    },
    scripts: {
        src: 'javascript/*.js',
        dest: 'build/js'
    },
    html: {
        src: './*.html',
        dest: 'build/'
    }
}

// Stylesheets task
gulp.task('sass', function () {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        //.pipe(sass({ outputStyle: 'compressed' })
        //.on('error', sass.logError))
        .pipe(sourcemaps.write(paths.styles.maps))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Scripts task - compiling javascript
gulp.task('scripts', function () {
    return gulp.src(paths.scripts.src)
        // Minify the file
        .pipe(uglify())
        // Output
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Html task
gulp.task('html', function () {
    gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Browser-sync server task
gulp.task('server', function () {
    browserSync.init({
        server: 'build',
        index: 'index.html'
    });
});

// Cleaning previous build 
gulp.task('clean',
    function () {
        return del.sync('build');
    });

// File watcher
gulp.task('watch', function () {
    gulp.watch(paths.scripts.src, ['scripts']);
    gulp.watch(paths.styles.src, ['sass']);
    gulp.watch(paths.html.src, ['html']);
});

// gulp.task('default', ['clean', 'sass', 'scripts']); // Disable 'watch'
// gulp.task('w', ['clean', 'sass', 'watch']); // Enable 'watch'
gulp.task('default', ['clean', 'sass', 'scripts', 'html', 'server', 'watch']); // If you fancy Browsersync