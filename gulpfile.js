const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const kit = require('gulp-kit')
const concat = require('gulp-concat')
const clean = require('gulp-clean')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	jsMain:['./src/js/scrollSpy.js', './src/js/navbarToggler.js', './src/js/footerYear.js'],
	jsOffers:['./src/js/footerYear.js'],
	jsContact:['./src/js/contactFormValid.js','./src/js/footerYear.js'],
	img: './src/img/*',
	dist: './dist',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
}

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest))
	done()
}

// Fixed errors - divided JavaScript into several files, but only one for single page

function javaScriptMain(done) {
	src(paths.jsMain)
		.pipe(concat('main.js'))
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest))
	done()
}

function javaScriptOffers(done) {
	src(paths.jsOffers)
		.pipe(concat('offers.js'))
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest))
	done()
}

function javaScriptContact(done) {
	src(paths.jsContact)
		.pipe(concat('contact.js'))
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest))
	done()
}

function convertImages(done) {
	src(paths.img)
		.pipe(imagemin())
		// .pipe(rename({ suffix: '_c' }))
		.pipe(dest(paths.imgDest))
	done()
}

function handleKits(done) {
	src(paths.html).pipe(kit()).pipe(dest('./'))
	done()
}

function cleanStuff(done) {
	src(paths.dist, { read: false }).pipe(clean())
	// cleaning files - deletes dist folder
	done()
}

function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})
	done()
}

function watchForChanges(done) {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass, paths.js], parallel(handleKits, sassCompiler, javaScriptMain, javaScriptOffers, javaScriptContact)).on('change', reload)
	watch(paths.img, convertImages).on('change', reload)
	done()
}

const mainFunctions = parallel(handleKits, sassCompiler, javaScriptMain, javaScriptOffers, javaScriptContact, convertImages)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)
