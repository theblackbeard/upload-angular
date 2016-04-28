(function(){
    angular.module('bb-upload')
    .factory('FilesIn', function() {
        var uploadedFiles = [];
        function set(data) {
            uploadedFiles = data;
        }
        function get() {
            return uploadedFiles;
        }

        return {
            set: set,
            get: get
        }

    });
});