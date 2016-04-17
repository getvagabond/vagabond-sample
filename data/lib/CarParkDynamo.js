import Promise from 'bluebird';
import AWS from 'aws-sdk';
const dynamoConfig = {
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION
};
const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);
const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT_NAME;
const tableName = projectName + '-CarPark-' + stage;

function paramsCarPark(key) {
  return {
    TableName: tableName,
    Key: {
      key: key
    },
    AttributesToGet: ['key', 'name', 'open', 'free', 'total']
  };
}

export function getCarPark(key) {
  return new Promise(function(resolve, reject) {

    docClient.get(paramsCarPark(key), function(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data['Item']);
    });

  });
}

export function newCarPark(source, args) {
  var carPark = {
    key: args.key,
    name: args.name,
    open: args.open,
    free: args.free,
    total: args.total
  };

  return new Promise(function(resolve, reject) {

    var params = {
      TableName: tableName,
      Item: carPark
    };

    docClient.put(params, function(err, data) {
      if (err) {
        return reject(err);
      }
      console.debug('data : %o', data);
      return resolve(carPark);
    });

  });
}
