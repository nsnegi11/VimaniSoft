angular.module('userApp').controller('galleryController',function($scope,$http) {

	$scope.imageArr = [];
	$scope.columnCount = 5;
	$scope.showBigImage = false;
	$http.get('/assests/img/images.json').success(function(data) {
		$scope.imageData = data;
		var count = 0;
		for(var i=0; i<data.length/$scope.columnCount; i++) {
			$scope.imageArr[i] = new Array();
			for(var j=0; j<$scope.columnCount; j++) {
				$scope.imageArr[i][j] = data[count];
				count++;
			}
		}
	});
	$scope.showImage = function(image) {
		$scope.showBigImage = true;
		$scope.currImage = image;
	}
	$scope.showPrevious = function() {
		var indexOfCurrImage = $scope.imageData.indexOf($scope.currImage)
		if(indexOfCurrImage > 0)
			$scope.currImage = $scope.imageData[--indexOfCurrImage];
	}
	$scope.showNext = function() {
		var indexOfCurrImage = $scope.imageData.indexOf($scope.currImage)
		if(indexOfCurrImage < $scope.imageData.length-1)
			$scope.currImage = $scope.imageData[++indexOfCurrImage];
	}
	$scope.closeImg = function() {
		$scope.showBigImage = false;
	};
});
