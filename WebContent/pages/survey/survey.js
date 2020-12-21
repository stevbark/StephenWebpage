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
        
          
        switch($number){
          case 0:
            o1 = 1;
            o2 = 1;
            chart.options.data[0].dataPoints[0]=({y:o1,label: "Option 1"});
            chart.options.data[0].dataPoints[1]=({y:o2,label: "Option 2"});
            break;
          case 1:
            o1 = o1+1;
            chart.options.data[0].dataPoints[0]=({y:o1,label: "Option 1"});
            break;
          case 2:
            o2 = o2+1;
            chart.options.data[0].dataPoints[1]=({y:o2,label: "Option 2"});
            break;  
        }
        

        chart.render();
        

     }


var chart2 = new CanvasJS.Chart("chartContainer2", {
  animationEnabled: true,
  
  title:{
    text:"Fortune 500 Companies by Country"
  },
  axisX:{
    interval: 1
  },
  axisY2:{
    interlacedColor: "rgba(1,77,101,.2)",
    gridColor: "rgba(1,77,101,.1)",
    title: "Number of Companies"
  },
  data: [{
    type: "bar",
    name: "companies",
    axisYType: "secondary",
    color: "#014D65",
    dataPoints: [
      { y: 3, label: "Sweden" },
      { y: 7, label: "Taiwan" },
      { y: 5, label: "Russia" },
      { y: 9, label: "Spain" },
      { y: 7, label: "Brazil" },
      { y: 7, label: "India" },
      { y: 9, label: "Italy" },
      { y: 8, label: "Australia" },
      { y: 11, label: "Canada" },
      { y: 15, label: "South Korea" },
      { y: 12, label: "Netherlands" },
      { y: 15, label: "Switzerland" },
      { y: 25, label: "Britain" },
      { y: 28, label: "Germany" },
      { y: 29, label: "France" },
      { y: 52, label: "Japan" },
      { y: 103, label: "China" },
      { y: 134, label: "US" }
    ]
  }]
});




    $scope.init = function(){
    
        console.log("Init surveyCtrl update");

       
        chart.render();
        chart2.render();
    }
    $scope.init();
   
});
