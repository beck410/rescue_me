;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('filterDogsFactory',function($http){

    function addKeyFilters(keys,cb){
      var formattedFilters = _formatFilters(keys);
      var apiKey = _addToExistingKeys(formattedFilters);
      _getShelterDogs(apiKey,cb);
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
      });
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
          'animalID','animalAge', 'animalName', 'animalSpecies','animalPic1', 'animalBreed', 'animalThumbnailUrl', 'animalSummary', 'animalSex', 'animalNeedsFoster', 'animalKillDate', 'animalDogs', 'animalCats', 'animalKids', 'animalHousetrained','animalSpecialNeeds', 'animalAltered', 'animalUptodate', 'locationZipcode','animalOkwithAdults','animalEneryLevel','animalGroomingNeeds','yardRequired','animalFence', 'animalLeashTrained', 'animalCrateTrained','animalProtective','animalHasallergies','animalSpecialDiet','animalOngoingMedical', 'animalPic2', 'animalPic3'
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

    function _getShelterDogs(keys,cb){
      var encodedKeys = JSON.stringify(keys);
      var url = 'https://api.rescuegroups.org/http/json/?data=' + encodedKeys + '&callback=JSON_CALLBACK';

      $http.jsonp(url)
      .success(function(shelterDogs){
        console.log('shelter dogs api done');
        cb(shelterDogs);
      })
      .error(function(err){
        console.log('you got an error: ' + err);
      });

    }

    return {
      addKeyFilters: addKeyFilters
    };
  });
})();
