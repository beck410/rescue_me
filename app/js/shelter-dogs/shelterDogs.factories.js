;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('shelterFactory',function($http,FIREBASE_URL){

    function getShelterDogs(mainCB){
      var url = FIREBASE_URL + 'shelterDogs/.json';
      $http.get(url)
        .success(function(data){
          var dataToArray = _objectToArray(data);
          _addShelterContactDetails(dataToArray, mainCB,
            function(orgs,dogs,mainCB){
              var configuredData = _addShelterContactInfo(dogs,orgs);
              mainCB(configuredData);
            });
        })
        .error(function(err){
          console.log('get shelterDogs error:' + err);
       });
    }

    //http://plnkr.co/edit/HZzR5ILFq4F7lFu6OlGr
    function _addShelterContactInfo(dogs, orgs){
      var newShelterDogArray = [];
      dogs.forEach(function(dog){
        var dogId = dog.animalOrgID;
        var dogShelter = _.filter(orgs,{'orgID':dogId});
        if(dogShelter.length !== 0){
          dog.shelterName = dogShelter[0].orgName || '';
          dog.shelterEmail = dogShelter[0].orgEmail || '';
          dog.shelterAddress = dogShelter[0].orgAddress || '';
          dog.shelterCity = dogShelter[0].orgCity || '';
          dog.shelterPhone = dogShelter[0].orgPhone || '';
          dog.shelterWebsite = dogShelter[0].orgWebsiteUrl || '';
          newShelterDogArray.push(dog);
        }
      });
      return newShelterDogArray;
    }

    function _objectToArray(data){
      var dataArray = [];
      for(var key in data){
        dataArray.push(data[key]);
      }
      return dataArray;
    }

    function _addShelterContactDetails(dogs, mainCB, configureCB){
      var url = FIREBASE_URL + 'shelterOrgs/.json';
      $http.get(url)
      .success(function(data){
        var dataToArray = _objectToArray(data);
        configureCB(dataToArray, dogs, mainCB);
      })
      .error(function(err){
        console.log('get shelterOrgs error: ' + err);
      });
    }

    return {
      getShelterDogs: getShelterDogs,
    };
  });
})();
