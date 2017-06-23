# Translator

[Preact]: https://github.com/developit/preact
[webpack]: https://webpack.github.io

/*start() {
  var config = {

  };
  const nodeID = "0000000081474d35";
  const endpoint = "wss://open-data.api.satori.com";
  const appKey = "da4F19eb331E6465a6C206DE6c9cE2dc";
  const channel = "rosetta-home";

  var rm = new RosettaHome(nodeID,config);
  var rtm = new satori_sdk(endpoint, appKey);
  rtm.on("enter-connected", function() { console.log("Connected to rosetta-home via satori.js!"); });
  var subscription = rtm.subscribe("where", satori_sdk.SubscriptionMode.SIMPLE, {
    filter: 'SELECT * FROM `rosetta-home` WHERE tags.node_id=\"'+ nodeID +'\"',
  });
  subscription.on('rtm/subscription/data', function (pdu) {
    pdu.body.messages.forEach(function (msg) {
      rm.process(msg);
    });
  });
  rtm.start();
}*/
