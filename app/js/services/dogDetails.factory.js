;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('dogDetailsFactory',function($http, FIREBASE_URL,requestURL){

    function getDogDetails(dogDB,rescueName,id,cb){
      var url = requestURL.url(dogDB,rescueName,id);
      $http.get(url)
      .success(function(dog){
        cb(dog);
      })
      .error(function(err){
        console.log('get shelter dog error: ',err);
      });
    }

    function getFullSizeImages(imageArray,cb){
      var fullImageArray = [];
      imageArray.forEach(function(image){
        fullImageArray.push(image.urlSecureThumbnail);
      });

      cb(fullImageArray);
    }

    function getThumbnailImages(imageArray,cb){
      var thumbnailArray = [];
      imageArray.forEach(function(image){
        thumbnailArray.push(image.urlSecureThumbnail);
      });
      cb(thumbnailArray);
    }

    return {
      getDogDetails: getDogDetails,
      getFullSizeImages: getFullSizeImages,
      getThumbnailImages: getThumbnailImages
    };
  });
})();
