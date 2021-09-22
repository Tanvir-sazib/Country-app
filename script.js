var app= angular.module('myApp',['ngMaterial'])
const url = "https://restcountries.eu/rest/v2"


app.factory("countryFactory",function($http){
    var service={};
    var urlBase = "https://restcountries.eu/rest/v2"

    service.getCountries = function(){
        return $http.get(urlBase);
    }

    service.getCountry = (selectedCountry)=>{
        return $http.get(urlBase+'/name/'+selectedCountry)
    }
    return service;

})
app.controller("countryController",function($scope,countryFactory, $mdDialog){
    
    
    $scope.allData=[];
    $scope.countryData={};
    $scope.isLoading = true;
    
    init();
    function init() {
        // Load All Countries
        countryFactory.getCountries()
        .then((response) => {
            console.log(response.data)
            $scope.allData= response.data;
            $scope.isLoading=false;
        },(err)=>{
            console.log(err)
        })
        
    }
    $scope.getCountry= function(selectedCountry,ev){
        countryFactory.getCountry(selectedCountry)
        .then((response) => {
            // console.log(response.data[0])
            $mdDialog.show({
                controller: function($scope) {
                    $scope.country = response.data[0];
                },
                templateUrl: 'popup.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen 
            })
        },(err)=>{
            console.log(err)
        })

    }
})