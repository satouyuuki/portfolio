const {lastRun, src, dest, task, watch, series, parallel} = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
// linter系
const htmlhint = require("gulp-htmlhint");
const scsslint = require("gulp-scss-lint");
const eslint = require("gulp-eslint");
// const gulpStylelint = require('gulp-stylelint');
// const reporter = require('postcss-reporter');

const styleSRC = "./app/css/**/*.scss";
const styleURL = "./dist/css/";
const htmlSRC = "./app/**/*.html";
const htmlURL = "./dist/";
const jsSRC = "./app/js/*.js";
const jsURL = "./dist/js/";
const imgSRC = "./app/assets/images/**/*";
const imgURL = "./dist/assets/images/";
const fontsSRC = "./app/assets/fonts/**/*";
const fontsURL = "./dist/assets/fonts/";

const imageminOption = [
  pngquant({
    quality: [0.7, 0.85],
  }),
  mozjpeg({
    quality: 85,
  }),
  imagemin.gifsicle(),
  imagemin.optipng(),
  imagemin.svgo({
    removeViewBox: false,
  }),
];

// const styleSRC = "./app/css/**/*.scss";
// const imgSRC = "./app/assets/images/**/*.*";
// const fontsSRC = "./app/assets/fonts/**/*.*";
// const htmlSRC = "./app/*.html";
// const jsSRC = "./app/js/*.js";

function browser_sync() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
};

function reload (done) {
  browserSync.reload();
  done();
}

function htmlLint(done) {
  src(htmlSRC)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
  done();
}

function sassLint(done) {
  src(styleSRC).pipe(
    scsslint({
      config: "scss-lint.yml"
    })
  );
  done();
}

function esLint(done) {
  src(jsSRC)
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  done();
}

function js(done) {
  src(jsSRC)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(plumber())
    .pipe(dest(jsURL));
  done();
}

function css(done) {
  src(styleSRC)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: "expanded"
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer())
    .pipe(dest(styleURL))
    .pipe(browserSync.stream());

  done();
};

function triggerPlumber(src_file, url_file) {
  return src(src_file)
    .pipe(plumber())
    .pipe(dest(url_file));
};

function images(done) {
  src(imgSRC, {
    since: lastRun(images),
  })
    .pipe(imagemin(imageminOption))
    .pipe(dest(imgURL));
  done();
}

function fonts() {
  return triggerPlumber(fontsSRC, fontsURL);
}

function html() {
  return triggerPlumber(htmlSRC, htmlURL);
}


function watch_files() {
  watch(styleSRC, series(css, reload));
  watch(jsSRC, series(js, reload));
  watch(imgSRC, series(images, reload));
  watch(fontsSRC, series(fonts, reload));
  watch(htmlSRC, series(html, reload));
}

task("css", css);
task("js", js);
task("images", images);
task("fonts", fonts);
task("html", html);
//lint
task("html-lint", htmlLint);
task("sass-lint", sassLint);
task("eslint", esLint);

task("default", parallel(css, js, images, fonts, html));

task("watch", parallel(browser_sync, watch_files));