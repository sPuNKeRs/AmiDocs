module.exports = function(grunt) {
  // Подключаем зависимости
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-supervisor');
  grunt.loadNpmTasks('grunt-reload');

  // Конфигурация проекта
  grunt.initConfig({
    supervisor:{
    	target:{
    		script: 'server.js',
    		options:{
    			watch: ['server.js', 'app', 'config'],
    			ignore: ['public', 'scripts'],
    			forceSync: true
    		}    		
    	}
    },    
    watch: {
      // При изменении любого из этих файлов запустить задачу 'reload'
      css:{
      	files: 'public/**/*.css',
      	options: {
                livereload: true
            }
      },
      js:{
      	files: 'public/**/*.js',
      	options: {
                livereload: true
            }
      },
      html:{
      	files: 'public/**/*.html',
      	options: {
                livereload: true
            }
      }          
    }
  });

  // Запускаем приложенрие  
  grunt.registerTask('default', ['supervisor', 'watch']);
};  