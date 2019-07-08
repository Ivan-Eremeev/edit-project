// Команды
// "gulp" - запуск gulp.
// "gulp min" - сжатие css и js (создает минимизированные файлы style.min.css и scripts.min.js).

const gulp                = require('gulp'),
      cleanCSS            = require('gulp-clean-css'),
      browserSync         = require('browser-sync'),
      uglify              = require('gulp-uglify'),
      rename              = require("gulp-rename");

gulp.task('browser-sync', function() {
  browserSync({
    server: {
        baseDir: './'
    },
    notify: true
  });
});

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
});

gulp.task('css-min', function () {
  return gulp.src('./css/style.css')
  .pipe(cleanCSS({
    level : 2
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('js-min', function () {
    return gulp.src('./js/scripts.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
  gulp.watch('./*.html', ['reload']);
  gulp.watch('./css/style.css', ['reload']);
  gulp.watch('./js/*.js', ['reload']);
});

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('min', ['css-min', 'js-min']);