
const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  pug = require('gulp-pug'),
  sass = require('gulp-sass')(require('sass')),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber')

const app = 'app/',
  dist = 'dist/';

const config = {
  app: {
    html:app+'pug/*.pug',
    pages:app+'pug/sections/*.pug',
    style: app + 'scss/**/*.scss',
    img:app + 'img/**/*.*',
    js:app+'js/main.js'
  },
  dist: {
    html:dist,
    pages:dist+'sections/',
    style: dist + 'css/',
    img:dist + 'img/',
    js:dist + 'js/'
  },
  watch: {
    html:app+'pug/**/*.pug',
    pages:app+'pug/sections/',
    style: app + 'scss/**/*.scss',
    img:app + 'img/**/*.*',
    js:app+'js/main.js'
  }
}

const webServer = () => {
  browserSync.init({
    server: {
      baseDir: dist
    },
    port: 9000,
    host: 'localhost',
    notify: true
  })
}

const watchFiles = () => {
  gulp.watch([config.watch.html], gulp.series(pugTask));
  gulp.watch([config.watch.pages], gulp.series(pagesTask));
  gulp.watch([config.watch.style], gulp.series(scssTask));
  gulp.watch([config.watch.img], gulp.series(imgTask));
  gulp.watch([config.watch.js], gulp.series(jsTask));
}

const pugTask=()=>{
  return gulp.src(config.app.html)
  .pipe(plumber({
    errorHandler: notify.onError(function (error) {
      return {
        title: 'PUG',
        message: error.message
      }
    })
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(config.dist.html))
  .pipe(browserSync.reload({
    stream: true
  }))
}
const pagesTask=()=>{
  return gulp.src(config.app.pages)
  .pipe(plumber({
    errorHandler: notify.onError(function (error) {
      return {
        title: 'PUG',
        message: error.message
      }
    })
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(config.dist.pages))
  .pipe(browserSync.reload({
    stream: true
  }))
}

const scssTask = () => {
  return gulp.src(config.app.style)
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'Style',
          message: error.message
        }
      })
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.dist.style))
    .pipe(browserSync.reload({
      stream: true
    }))
}
const imgTask = () => {
  return gulp.src(config.app.img)
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'IMG',
          message: error.message
        }
      })
    }))
    .pipe(gulp.dest(config.dist.img))
    .pipe(browserSync.reload({
      stream: true
    }))
}
const jsTask = () => {
  return gulp.src(config.app.js)
    .pipe(plumber({
      errorHandler: notify.onError(function (error) {
        return {
          title: 'JS',
          message: error.message
        }
      })
    }))
    .pipe(gulp.dest(config.dist.js))
    .pipe(browserSync.reload({
      stream: true
    }))
}

const start = gulp.series(pugTask, pagesTask, scssTask, imgTask, jsTask);
exports.default = gulp.parallel(start, watchFiles, webServer)
