let mqtt = require('mqtt');
let client = mqtt.connect('mqtt://127.0.0.1');

client.on('connect', function () {
  client.subscribe('database/get/response/app/version');

  client.publish('app/get/request/database/version', JSON.stringify(
    {
      time:new Date().toISOString(),
      token: "123"
    }
  ));

  setInterval(() => {
    client.publish('app/get/request/database/version', JSON.stringify(
      {
        time:new Date().toISOString(),
        token: "123"
      }
    ));
  }, 1000);
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('Received a message', topic, message.toString());
  //client.end();
});