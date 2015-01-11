;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('uploadImage',function($upload){

    function uploadToS3(filesArray,userID,fileName,cb){
      var file = filesArray[0];
      var numID = userID.match(/[0-9]+/);

      $upload.upload({
        url: 'https://rescuemeimages.s3.amazonaws.com',
        method: 'POST',
        data: {
          'Content-Type': file.type,
          key: numID + '/' + fileName,
          acl: 'public-read',
          awsaccesskeyid: 'AKIAIMC5Y5S4NKCKEMVQ',
          policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQwMDowMDowMFoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJyZXNjdWVtZWltYWdlcyJ9LHsiYWNsIjogInB1YmxpYy1yZWFkIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCIiXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdXX0=",
        signature: "oiRkj3Tri/V5D6WSJ0kJ6B4evSQ="
        },
        file: file
      })
      .success(function(data,status,headers,config){
        var filelink ='https://s3-us-west-2.amazonaws.com/rescuemeimages/' + numID + '/' + config.file.name; 
        cb(filelink);
      })
      .error(function(err){
        console.log('upload to S3 error: ' + err);
      })
    }

  function setThumbnail(file,cb){
    _imageToBase64(file,function(base64){
      var fileName = file.name;
      cb(fileName,base64)
    })
  }

  function _imageToBase64(file,cb){
    if(file && file.type.indexOf('image') > -1){
      var fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = function(e){
        cb(e.target.result);
      }
    }
  }

  return {
    uploadToS3: uploadToS3,
    setThumbnail: setThumbnail,
    };
  });
})();
