app.controller("surveyCtrl", function ($scope, $http) {
    var o1 = 1;
    var o2 = 1;
    var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light2", // "light1", "light2", "dark1", "dark2"
          exportEnabled: true,
          animationEnabled: true,
          title: {
            text: "Desktop Browser Market Share in 2016"
          },
          data: [{
            type: "pie",
            startAngle: 0,
            toolTipContent: "<b>{label}</b>: {y} votes",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y} votes",
            dataPoints: [
              { y: o1, label: "Option 1" },
              { y: o2, label: "Option 2" }
             
            ]
          }]
        });
   
     $scope.clickOption = function($number){
        console.log("number " + $number + " selected");
        var index = $number -1;
        switch(index){
          case 0:
            o1 = o1+1;
            chart.options.data[0].dataPoints[0]=({y:o1,label: "Option 1"});
            break;
          case 1:
            o2 = o2+1;
            chart.options.data[0].dataPoints[1]=({y:o2,label: "Option 2"});
            break;  
        }

        chart.render();
        

     }







    $scope.init = function(){
    
        console.log("Init surveyCtrl update");

       
        chart.render();
    }
    $scope.init();
   
});
