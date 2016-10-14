

var gulp = require('gulp');
var sass = require('gulp-sass');

var $ = require( 'gulp-load-plugins')();
var browserSync = require("browser-sync").create('wiwo');

var p = require('./package.json')

var CONFIG = {
	target: './tmp/',
  paths: {
    sass: {
        src: ['./css/**/*.scss'],
        srcMain: ['./css/main.scss'],
        filename: 'bemit.css',
        dest: './.tmp/'
    },
    sass_standalone: {
        src: ['./css/**/*.scss'],
        srcMain: ['./css/standalone.scss'],
        filename: 'standalone.css',
        dest: './.tmp/'
    }    
  }
};


gulp.task('serve', function(){
  
    browserSync.init({
        server: ['./html','./js','./.tmp',],
        port: 3000,
        startPath: '/'
    });  
  
	  gulp.watch(CONFIG.paths.sass.src, ['sass:compile']);
    gulp.watch(CONFIG.paths.sass_standalone.src, ['sass_standalone:compile']);
    gulp.watch(
      [
          CONFIG.paths.sass.dest + CONFIG.paths.sass.filename,
          CONFIG.paths.sass_standalone.dest + CONFIG.paths.sass_standalone.filename
      ]).on('change', browserSync.reload);  
    gulp.watch('./html/*.html').on('change', browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
});




gulp.task('sass:compile', function () {
  return gulp.src(CONFIG.paths.sass.srcMain)
    .pipe(sass().on('error', sass.logError))
    //.pipe($.cssnano()) //OPTIONAL
    .pipe($.concat(CONFIG.paths.sass.filename))
    .pipe(gulp.dest(CONFIG.paths.sass.dest));
    //.pipe(browserSync.stream());
});

gulp.task('sass_standalone:compile', function () {
  return gulp.src(CONFIG.paths.sass_standalone.srcMain)
    .pipe($.using())
    .pipe(sass().on('error', sass.logError))
    //.pipe($.cssnano()) //OPTIONAL
    .pipe($.concat(CONFIG.paths.sass_standalone.filename))
    .pipe(gulp.dest(CONFIG.paths.sass_standalone.dest));
    //.pipe(browserSync.stream());
});

gulp.task('sass', ['sass:compile', 'sass_standalone:compile']);

gulp.task('default', ['sass','serve']);



gulp.task('deploy', function(){
  //TODO 
  // - app\base\css\bemit.css
});



var FTP_ARVATO = {
  target: 'dienste.vhb.de/dev/hackathon/flasnia', 
  user: 'vhbadmin',
  pass: process.env.vhbadmin,
  host: '91.105.243.13'
};

//copy html and js to tmp folder
gulp.task( 'deploy_copyjs',function() {
  return gulp.src('./js/**/*.js')
  .pipe(gulp.dest('./.tmp'));
});

gulp.task( 'deploy_html',function() {
  return gulp.src('./html/*.html')
    .pipe($.replace('***version***', p.version))
    .pipe(gulp.dest('./.tmp'));
});

gulp.task( 'deploy_sftp', ['sass', 'deploy_copyjs', 'deploy_html'], function() {
    var globs = [
      './.tmp/**/*.*'
    ];  
    return gulp.src(globs, { base: './.tmp', buffer: false })
        .pipe($.sftp({
            host: FTP_ARVATO.host,
            user: FTP_ARVATO.user,
            pass: FTP_ARVATO.pass,
            remotePath: FTP_ARVATO.target + '/' + p.name
        }));   
});


gulp.task('ci', ['deploy_sftp'], function(){
  var text = "\nDeployment to \n" + FTP_ARVATO.target + "/" + 
                                    p.name + "/ \nJS Host done.\n\n";
  process.stdout.write(text);
});