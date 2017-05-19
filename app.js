var app = angular.module("airlineApp", []);

app.controller("searchCtrl", function ($scope, $http) { 
	$scope.isTwoWay = false,
	$scope.showRightSection = false;
	$http.get('data/data.json').then(function(response) {
				      $scope.totalData = response.data;
	});


	$scope.filterSearch = function (totalData, searchLocation) { 
		 $scope.totalData = totalData;
		 $scope.searchLocation = searchLocation;
		 var searchableData = searchableData
				for (var i=0; i< $scope.totalData.length ; i++){
				searchableData = $scope.totalData[i];
				if((searchableData.origin.toLowerCase() == $scope.searchLocation.origin.toLowerCase()) &&
				 (searchableData.destination.toLowerCase() == $scope.searchLocation.destination.toLowerCase())) {
					$scope.roundTripsFirstHop.push(searchableData);	
				}
				if((searchableData.origin.toLowerCase() == $scope.searchLocation.destination.toLowerCase()) &&
				 (searchableData.destination.toLowerCase() == $scope.searchLocation.origin.toLowerCase())) {
					$scope.roundTripsSecondHop.push(searchableData);	
				}
					}
	}
	$scope.searchFunc = function() { 
		$scope.showRightSection = true;
		$scope.searchedFlights = $scope.totalData;
		    var searchableData;
		    $scope.roundTripsFirstHop = [], $scope.roundTripsSecondHop = [];
		    $scope.filterSearch($scope.totalData, $scope.searchLocation);
		if($scope.isTwoWay) {
			 $scope.roundTripsFirstHop = [], $scope.roundTripsSecondHop = [];
			for (var i=0; i< $scope.totalData.length ; i++){
				searchableData = $scope.totalData[i];
				if((searchableData.origin.toLowerCase() == $scope.searchLocation.origin.toLowerCase()) &&
				 (searchableData.destination.toLowerCase() == $scope.searchLocation.destination.toLowerCase())) {
					$scope.roundTripsFirstHop.push(searchableData);	
				}
				if((searchableData.origin.toLowerCase() == $scope.searchLocation.destination.toLowerCase()) &&
				 (searchableData.destination.toLowerCase() == $scope.searchLocation.origin.toLowerCase())) {
					$scope.roundTripsSecondHop.push(searchableData);	
				}
					}
		}
	
		$scope.portLocations = $scope.searchLocation.origin.toUpperCase() + " > " + $scope.searchLocation.destination.toUpperCase();

	};
	$scope.twoWayFlight = function() {
		$scope.isTwoWay = true;
		$scope.showRightSection = false;
	}
	$scope.oneWayFlight = function() {
		$scope.isTwoWay = false;
	}

/*	creation of round trip result set*/
	$scope.roundTripResultSet = {};
	var indexVal = 0;
	$scope.createRoundTripResultSet = function (roundTripsFirstHop, roundTripsSecondHop){ 		
		for (var i=0; i<roundTripsFirstHop.length ; i++) {
			for (var j=0; i<roundTripsSecondHop.length ; j++) {
				$scope.roundTripResultSet[indexVal].roundTripsFirstHop =roundTripsFirstHop[i];
				$scope.roundTripResultSet[indexVal].roundTripsSecondHop = roundTripsSecondHop[j];
				indexVal++;
			}
		}
	};
	 
});

app.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "dd-mm-yy",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});

app.filter('num', function() {
    return function(input) {
      return parseInt(input);
    };
});