const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ endpoint: 'http://localhost:4566' }); // Local SQS endpoint


exports.hello = async (event) => {
  const params = {
    MessageBody: JSON.stringify({ message: 'Hello from SQS!' }),
    QueueUrl: 'http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/my-queue', // LocalStack URL for the SQS queue
  };
  try {
    const result = await sqs.sendMessage(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent', result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send message', error }),
    };
  }
};



// exports.sendMessage = async (event) => {
//   const params = {
//     MessageBody: JSON.stringify({ message: 'Hello from SQS!' }),
//     QueueUrl: 'http://localhost:9324/000000000000/myQueue', // LocalStack URL for the SQS queue
//   };

//   try {
//     const result = await sqs.sendMessage(params).promise();
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: 'Message sent', result }),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Failed to send message', error }),
//     };
//   }
// };

exports.processMessage = async (event) => {
  console.log('Received SQS message:', JSON.stringify(event));

  for (const record of event.Records) {
    const message = JSON.parse(record.body);
    console.log('Processing message:', message);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message processed' }),
  };
};