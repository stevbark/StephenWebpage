app.controller("chatroomCtrl", function ($scope, $http) {
    
    $scope.addComment = function(){
       $scope.addCommentCore($scope.maxID,$scope.textInput,$userID,"01");
     
           
    }

    $scope.addCommentInit = function($Text,$Date){
       
       $scope.chatLog.push({"ID":$scope.maxID,"Text":$Text,"User":$userID,"Date":$Date});
       $scope.maxID ++;
       $scope.textInput = "";
    }
   
    $scope.addCommentCore = function($ID,$Text,$user,$Date){
    	if(!$Text){
    		console.log("Needs a text value");
    		return;
    	}
    	var postData = {"ID":$ID,"Text":$Text,"User":$user,"Date":$Date};
    	$scope.chatLog.push(postData);
       
       //http://techfunda.com/howto/565/http-post-server-request
   
       var config = {
           headers : {
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
           }
       }

       //http://localhost:8080/chatroom/connectToDB
       $http({
    		method: 'POST',
    		url: '/chatroom/connectToDB',  
    		data:JSON.stringify(postData), 
    		headers: {
    		   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    		}
    	})
       .then( 
    	function successCallback(response){
    	   if(successCallback) {
    		   console.log("connection");
    	   }
       },
       function errorCallback (response) {
           console.log("Error connection to backend");
       });
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
