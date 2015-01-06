;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('filterDogsFactory',function($http,requestURL){

    function addKeyFilters(keys,mainCB){
      var formattedFilters = _formatFilters(keys);
      var apiKey = _addToExistingKeys(formattedFilters);
      _getShelterDogs(apiKey,mainCB,function(mainCB,dogs){
        _getShelterOrgs(mainCB,dogs,function(mainCB,dogs,orgs){
          _addContactInfo(mainCB,dogs,orgs,function(mainCB,dogs){
            _postDogsToFirebase(mainCB,dogs);
          });
        });
      });
    }

    function _formatFilters(keys){
      var filters = [];
      _.forOwn(keys, function(key,filter){
        if(filter === 'sex'){
          var apiKey = {
            'fieldName':'animalSex',
            'operation':'equals',
            'criteria':key
          };
         filters.push(apiKey);
        }
        if(filter === 'size'){
          var apiKey = {
            'fieldName':'animalSize',
            'operation':'equal',
            'criteria':key
          };
         filters.push(apiKey);
        }
        if(filter === 'altered'){
          var apiKey = {
            'fieldName':'animalAltered',
            'operation':'equal',
            'criteria':key
          };
         filters.push(apiKey);
        }
        if(filter === 'generalAge'){
          var apiKey = {
            'fieldName':'animalGeneralAge',
            'operation':'equal',
            'criteria':key
          };
         filters.push(apiKey);
        }
        if(filter === 'animalLocation'){
          var apiKey = {
            'fieldName':'animalLocation',
            'operation':'equals',
            'criteria':key
          };
          filters.push(apiKey);
        }
        if(filter === 'animalLocationDistance'){
          var apiKey = {
            'fieldName':'animalLocationDistance',
            'operation':'radius',
            'criteria': key
          };
         filters.push(apiKey);
        }
      });
      console.log(filters)
      return filters;
    }

    function _addToExistingKeys(newFilters){
      var keys ={
        'apikey':'pkF6l2hC',
        'objectType':'animals',
        'objectAction':'publicSearch',
        'search':{
          'calcFoundRows': 'Yes',
          'resultStart':0,
          'resultLimit':500,
          'resultSort':'animalID',
          'fields': [
            'animalID','animalPictures','animalSizeCurrent','animalBreed','animalThumbnailUrl','animalLocation','animalName', 'animalSummary','animalSex','animalKillDate','animalAltered','animalUptodate','animalFence','animalProtective','animalDescriptionPlain','animalUpdatedDate' 
          ],
          'filters':[
            {
              'fieldName':'animalStatus',
              'operation':'equals',
              'criteria':'Available'
            },
            {
              'fieldName':'animalSpecies',
              'operation':'equal',
              'criteria':'Dog'
            },
            {
            'fieldName':'animalNeedsFoster',
            'operation':'equal',
            'criteria': 'yes'
            }
          ]
        }
      };

      _.forOwn(newFilters,function(filter){
        keys.search.filters.push(filter);
      })
      return keys;
    }

    function _getShelterDogs(keys,mainCB,cb){
      var encodedKeys = JSON.stringify(keys);
      var url = 'https://api.rescuegroups.org/http/json/?data=' + encodedKeys + '&callback=JSON_CALLBACK';

      $http.jsonp(url)
      .success(function(shelterDogs){
        console.log('shelter dogs api done');
        console.log(shelterDogs)
        cb(mainCB,shelterDogs.data);
      })
      .error(function(err){
        console.log('you got an error: ' + err);
      });

    }

    return {
      addKeyFilters: addKeyFilters
    };

    function _getShelterOrgs(mainCB,dogs,cb){
      console.log('get shelter orgs');
      var keys = {
        'apikey': 'pkF6l2hC',
        'objectType': 'orgs',
        'objectAction': 'publicSearch',
        'search': {
          'resultStart' : 0,
          'resultLimit' : 500,
          'resultSort': 'orgID',
          'resultOrder' : 'asc',
          'calcFoundRows': 'Yes',
          'fields': [
          'orgID','orgLocation','orgName', 'orgAddress', 'orgCity','orgPhone','orgEmail','orgWebsiteUrl','orgState'
          ],
          'filters':[
            {
              'fieldName':'orgID',
              'operation':'notblank',
            }
          ]
        }
      };
      var encodedKeys = JSON.stringify(keys);
      var url = 'https://api.rescuegroups.org/http/json/?data=' + encodedKeys + '&callback=JSON_CALLBACK';

      $http.jsonp(url)
      .success(function(shelterOrgs){
        console.log('shelter orgs api done');
        cb(mainCB,dogs,shelterOrgs.data);
      })
      .error(function(err){
        console.log('you got an error: ' + err);
      });
    }

    function _addContactInfo(mainCB,dogs,orgs,cb){
      console.log('addContactInfo');
      for(var dog in dogs){
        var dogId = dogs[dog].animalOrgID;
        var dogShelter = (_.filter(orgs,{'orgID':dogId}));
        if(dogShelter.length !== 0){
          dogs[dog].shelterName = dogShelter[0].orgName || '';
          dogs[dog].shelterEmail = dogShelter[0].orgEmail || '';
          dogs[dog].shelterAddress = dogShelter[0].orgAddress || '';
          dogs[dog].shelterCity = dogShelter[0].orgCity || '';
          dogs[dog].shelterPhone = dogShelter[0].orgPhone || '';
          dogs[dog].shelterWebsite = dogShelter[0].orgWebsiteUrl || '';
          dogs[dog].shelterState = dogShelter[0].orgState || '';
        } else {
          delete dogs[dog];
        }
      }
      console.log(dogs);
      cb(mainCB,dogs);
    }

    function _postDogsToFirebase(cb,dogs){
      var url = requestURL.url('shelterDogs');
      var jsonData = angular.toJson(dogs);
      $http.put(url,jsonData)
      .success(function(filterDogs){
        console.log('filterDogs pushed to firebase');
        cb(filterDogs);
      })
      .error(function(err){
        console.log('firebase filterDogs error: ' + err);
      });
    }


  });
})();
