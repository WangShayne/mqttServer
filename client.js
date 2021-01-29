let mqtt = require('mqtt');
let client = mqtt.connect('mqtt://127.0.0.1');

client.on('connect', function () {
  client.subscribe('fromServer');

  client.publish('fromClient', new Date().toISOString());

  setInterval(() => {
    client.publish('fromClient', new Date().toISOString());
  }, 1000);
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('Received a message', topic, message.toString());
  //client.end();
});