app.controller("chatroomCtrl", function ($scope) {
    /*https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#receiveMessage-property*/
    console.log("chatroomCtrl");

    var sqs = new AWS.SQS({
        apiVersion: '2012-11-05',
        region: 'us-east-1',
        credentials: '',
        RoleArn: 'arn:aws:iam::110014340829:role/Admin'
    });

    sqs.config.update({
        accessKeyId: "AKIAINRUPUX6GPNIWYVQ",
        secretAccessKey: "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",
        "region": "us-east-1"
    });


    var params = {
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/110014340829/chatroom.fifo',


        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
            'STRING_VALUE',
        ],
        VisibilityTimeout: 0,
        WaitTimeSeconds: 0


    };
    /* region:'sqs.us-east-1.amazonaws.com'*/
    sqs.receiveMessage(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);
            data.Messages.forEach(function(message) {
                console.log(message.Body);
                addToBody(message.Body); // successful response
            });

        }
    });

    function addToBody(textBody) {
        document.querySelector("#chatBody").innerHTML += "<div> " + textBody + " </div>"
    }
    //   SendMessage("https://sqs.us-east-1.amazonaws.com/110014340829/ChatroomQueue");*/
});
