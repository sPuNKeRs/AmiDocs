;(function(A){
    'use strict';

    A.module('Core')
        .service('BufferStorage', 
            ['$log', 
             '$rootScope', BufferStorage]); 

    //--------//
    
    function BufferStorage($log, $rootScope){
        this.document = {};
        this.user = {};

        this.clear = function(){
        	this.document = {};
            this.user = {};
        };
    }   
})(this.angular);