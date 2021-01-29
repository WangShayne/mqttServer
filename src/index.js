const aedes = require("aedes")();
const server = require('net').createServer(aedes.handle)
const port = 1883


server.listen(port, function () {
  console.log('server started and listening on port ', port);
  aedes.publish({ topic: 'aedes/hello', payload: "I'm broker " + aedes.id })
})

aedes.subscribe('fromClient', function(packet, cb) {
  console.log("收到消息")
  console.log(packet.payload.toString())

  aedes.publish({
    cmd: 'publish',
    qos: 2,
    topic: 'fromServer',
    payload: 'Thank you!',
    retain: false
  });
});

aedes.on('client', function (client) {
  console.log("客户端连接")
  // console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
})

// fired when a client disconnects
aedes.on('clientDisconnect', function (client) {
  console.log("客户端下线")
  // console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
})

// fired when a message is published
aedes.on('publish', async function (packet, client) {
  // console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)
})


aedes.on('subscribe', function (subscriptions, client) {
  console.log("客户端订阅消息")
  // console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
  //         '\x1b[0m subscribed to topics: ' + subscriptions.map(s => s.topic).join('\n'), 'from broker', aedes.id)
})

aedes.on('unsubscribe', function (subscriptions, client) {
  console.log("客户端退订消息")
  // console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
  //         '\x1b[0m unsubscribed to topics: ' + subscriptions.join('\n'), 'from broker', aedes.id)
})