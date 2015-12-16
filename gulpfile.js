var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    server =require('gulp-develop-server'),
    bs = require('browser-sync'),
    livereload = require('gulp-livereload'),
    nodeInspector = require('gulp-node-inspector');
    

// Настройка

var options = {

    serverOptions: {
        path: './server.js'
    },
    bs:{
        proxy: '10.0.0.66:3000',
        port: 3001
    }    
};

var serverJsFiles = [
    './app/**/*.js',
    './config/**/*.js'
];

var clientJsFiles = [
    './public/*.js', 
    './public/modules/**/*.js'
];


var clientFiles = [
    './public/*.js', 
    './public/modules/**/*.js',
    './public/**/*.html'
];

//  Задания

// Запуск сервера
gulp.task('server:start', function(){
    server.listen( options.serverOptions, function(error){
        if(!error){
            bs( options.bs );
            livereload.listen();
        }
    } );
});

// Перезапуск сервера
gulp.task('server:restart', function(){
    return server.restart();
});

// Проверка JS Server
gulp.task('jshint_server', function(){
    return gulp.src( serverJsFiles )
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Проверка JS Front
gulp.task('jshint_front', function(){
    return gulp.src( clientJsFiles )
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Следить за изменением JS
gulp.task('watch', function(){
    // Следим за серверной стороной
    gulp.watch(serverJsFiles, ['jshint_server' , 'server:restart']);

    //Следим за клиентской стороной
    gulp.watch('public/**/*.*', ['jshint_front']);
    gulp.watch( clientFiles ).on( 'change', function(file){
        livereload.changed( file.path )
    });
});



// По умолчанию
gulp.task('default', ['watch' , 'server:start'], function(){


    
});