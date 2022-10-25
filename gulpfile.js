const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
 
function clean() {
    if (!fs.existsSync(path.join(__dirname, 'dist'))) {
        fs.mkdirSync(path.join(__dirname, 'dist'));
        return
    }

    fs.readdirSync(path.join(__dirname, 'dist')).forEach(item => {
        // remove all files and folders in dist
        fs.unlinkSync(path.join(__dirname, 'dist', item));
    })
    return
}

gulp.task('default', () => {
    clean()
    gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat(`${packageJson.name}.js`))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))

    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat(`${packageJson.name}.min.js`))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});