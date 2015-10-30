
var app = angular.module('simple-chart', []);
google.load("visualization", "1", {packages:["corechart"]});

app.controller('MainController', ['$scope', '$http',  function($scope, $http) {
  $http.get('/data').success(function(data){
    
  var dataArray = formatDataForView(data);

  var table = google.visualization.arrayToDataTable(dataArray, false);
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  
  var options = {
    title:'The Most Prolific Civic Artists in San Francisco',
    chartArea: {width: '50%'},
        hAxis: {
          title: 'Number of Artworks located in SF',
          minValue: 0
        },
        vAxis: {
          title: 'Artists'
        }
  };
  chart.draw(table, options);

  });
}]);

function formatDataForView(data) {
  
    var dataArray = [], keysArray = [];
    
    keysArray.push('Artist');
    keysArray.push('Number of Artworks');
    dataArray.push(keysArray);

    //get the values
    data.forEach(function(value){
        var dataEntry = [];
        for(var prop in value) {
          dataEntry.push(value[prop]);
        }
        dataArray.push(dataEntry);
    });
  
    return dataArray;
}