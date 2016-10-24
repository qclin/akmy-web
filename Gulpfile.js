var gulp = require('gulp');
    sass = require('gulp-sass');
    jade = require('gulp-jade'),
    livereload  = require('gulp-livereload'),

gulp.task('styles', function() {
    gulp.src('assets/stylesheets/**/*.scss')
        .pipe(sass({
          includePaths:['assets/stylesheets'],
          errLogToConsole: true
        })
        .pipe(gulp.dest('./css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});
