import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';
import svgo from 'gulp-svgmin';
import squoosh from 'gulp-libsquoosh';
import webp from 'gulp-webp';
import csso from 'gulp-csso';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', {sourcemaps: true})
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest('build/css', {sourcemaps: '.'}))
    .pipe(browser.stream());
}

export const js = () => {
  return gulp.src('source/js/**')
    .pipe(gulp.dest('build/js'))
}

export const fonts = () => {
  return gulp.src('source/fonts/**')
    .pipe(gulp.dest('build/fonts'))
}

export const manifest = () => {
  return gulp.src('source/manifest.webmanifest')
    .pipe(gulp.dest('build'))
}

export const favicon = () => {
  return gulp.src('source/favicon.ico')
    .pipe(gulp.dest('build'))
}

// Server

export const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

export const html = () => {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'))
}

export const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
}

export const images = () => {
  return gulp.src('source/img/**')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

export const webpjpg = () => {
  return gulp.src('source/img/desktop-img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('build/img/desktop-img'))
}
// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

export default gulp.series(
  styles, js, fonts, manifest, favicon, server, html, sprite, images, webpjpg, watcher
);
