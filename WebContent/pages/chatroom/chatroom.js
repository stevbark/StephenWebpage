app.controller("chatroomCtrl", function ($scope) {
    
    $scope.addComment = function(){
       $scope.addCommentCore($scope.maxID,$scope.textInput,$userID,"01");
       location.href ="connectToDB";

    }

    $scope.addCommentInit = function($Text,$Date){
       $scope.addCommentCore($scope.maxID,$Text,$userID,$Date);
    }
   
    $scope.addCommentCore = function($ID,$Text,$user,$Date){
       $scope.chatLog.push({"ID":$ID,"Text":$Text,"User":$user,"Date":$Date});
       $scope.maxID ++;
       $scope.textInput = "";
    }

     
    $scope.init = function(){
        $scope.maxID=0;
        $scope.chatLog = [];
        $textInput="";
        

        //For Test Data
        $userID= "Stephen";
        $scope.addCommentInit("At the moment the chat cannot communite with anyone else. Sorry. This part is still in progress.","01/01/2019");
        $scope.addCommentInit("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad omnis quae expedita ipsum nobis praesentium velit animi minus amet perspiciatis laboriosam similique debitis iste ratione nemo ea at corporis aliquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad omnis quae expedita ipsum nobis praesentium velit animi minus amet perspiciatis laboriosam similique debitis iste ratione nemo ea at corporis aliquam.","01/02/2019");

        $scope.addCommentInit("Test2","01/02/2019");
        $scope.addCommentInit("Test3","01/05/2019");
        console.log($scope.chatLog);
        
    }
    $scope.init();
   
    //   SendMessage("https://sqs.us-east-1.amazonaws.com/110014340829/ChatroomQueue");*/
});
