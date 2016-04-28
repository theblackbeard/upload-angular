(function(){
    angular.module('bb-upload')



        .controller('imageCtrl', ['$scope', 'ngDialog', 'FileUploader','FilesIn',
            function($scope, ngDialog,FileUploader, FilesIn){
                var url = [];


                $scope.upload = function(){
                    ngDialog.open({template: 'uploader.html', className: 'ngdialog-theme-default', scope: $scope})
                }



                var uploader = $scope.uploader = new FileUploader({
                    url: 'upload.php'
                });

                uploader.filters.push({
                    name: 'customFilter',
                    fn: function(item /*{File|FileLikeObject}*/, options) {
                        return this.queue.length < 10;
                    }
                });


                uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                    //console.info('onWhenAddingFileFailed', item, filter, options);
                };
                uploader.onAfterAddingFile = function(fileItem) {
                    //console.info('onAfterAddingFile', fileItem);
                };
                uploader.onAfterAddingAll = function(addedFileItems) {
                   // console.info('onAfterAddingAll', addedFileItems);
                };
                uploader.onBeforeUploadItem = function(item) {
                   // console.info('onBeforeUploadItem', item);
                    item.file.name = generator(item.file.name, 30)
                };
                uploader.onProgressItem = function(fileItem, progress) {
                    //console.info('onProgressItem', fileItem, progress);
                    //tem.fileItem.name = "teste.jpg";
                };
                uploader.onProgressAll = function(progress) {
                    //console.info('onProgressAll', progress);

                };
                uploader.onSuccessItem = function(fileItem, response, status, headers) {
                    //console.info('onSuccessItem', fileItem, response, status, headers);
                };
                uploader.onErrorItem = function(fileItem, response, status, headers) {

                   // console.info('onErrorItem', fileItem, response, status, headers);
                };
                uploader.onCancelItem = function(fileItem, response, status, headers) {
                    //console.info('onCancelItem', fileItem, response, status, headers);
                };
                uploader.onCompleteItem = function(fileItem, response, status, headers) {
                    //console.info('onCompleteItem', fileItem, response, status, headers);
                   url.push(fileItem.file.name);
                };
                uploader.onCompleteAll = function() {
                    //console.info('onCompleteAll');
                    FilesIn.set(url)

                };


                //console.info('uploader', uploader);
            }])

        .controller('teste', ['$scope', 'FilesIn',
            function($scope, FilesIn){
                $scope.url = FilesIn.get();
            }])

            var generator = function(imageName, size){
                var newImage = imageName.split('.');
                console.log(newImage[0].toLowerCase());
                var hash = '';
                var range = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
                for (var i = 0; i < size; i++) {
                    var rnum = Math.floor(Math.random() * range.length);
                    hash += range.substring(rnum, rnum + 1);
                }
                newImage[0] = hash;
                return newImage.join('.').toLowerCase()
            }

})();