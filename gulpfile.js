const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

const postcssOption = [autoprefixer];
const browserSyncOption = {
  server: "./"
};

gulp.task("sass", () => {
  return gulp
    .src("sass/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss(postcssOption))
    .pipe(gulp.dest("./css"));
})

gulp.task("serve", done => {
  browserSync.init(browserSyncOption);
  done();
})

gulp.task("watch", (done) => {
  const browserReload = (done) => {
    browserSync.reload();
    done();
  }
  gulp.watch("sass/**/*.scss", gulp.series("sass"));
  gulp.watch("./", browserReload);
})

gulp.task("default", gulp.series("serve", "watch"));