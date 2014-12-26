;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('shelterFactory',function($rootScope, $http,FIREBASE_URL){

    function getShelterDogs(mainCB){
      var url = FIREBASE_URL + 'shelterDogs/.json';
      $http.get(url)
        .success(function(data){
          var dataToArray = _objectToArray(data);
          _addShelterContactDetails(dataToArray, mainCB,
            function(orgs,dogs,mainCB){
              var configuredData = _addShelterContactInfo(dogs,orgs);
              $rootScope.shelterDogs = configuredData;
              mainCB(configuredData);
            });
        })
        .error(function(err){
          console.log('get shelterDogs error:' + err);
       });
    }

    function getShelterDogDetails(id, cb){
      var dog = $rootScope.shelterDogs[id];
      cb(dog);
    }

    function addToPotentialList(id,cb){
      // _postDog();
      // _deleteDog();
      cb();
    }

    //PRIVATE FUNCTIONS

    function _deleteDog(url,cb){
      $http.delete(url)
      .success(function(){
        if(cb){
          cb();
        }
        console.log('dog deleted');
      })
      .error(function(err){
        console.log('delete dog error: ' + err);
      });
    }

    function _postDog(url,cb,dog){
      $http.post(url,dog)
        .success(function(){
          if(cb){
            cb();
          }
          console.log('post dog to potential db');
        })
        .error(function(err){
          console.log('post dog error: ' + err);
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
          dog.shelterState = dogShelter[0].orgState || '';
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
      getShelterDogDetails: getShelterDogDetails,
      addToPotentialList: addToPotentialList
    };
  });
})();
