/**
 * Created by Alessandro on 28/12/15.
 */

var Cylon = require("cylon"),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Adapter = module.exports = function Adapter(port) {
    this.port = port;
    EventEmitter.call(this);
    self = this;
    this.robot = Cylon.robot({
    connections: {
        neurosky: { adaptor: 'mindflex', port: self.port }
    },
    devices: {
        headset: { driver: 'mindflex' }
    },
    work: function(my) {
        my.headset.on("allComputedPacket", function(packet) {
          //if (packet.hasOwnProperty("signal")) {
            //if (packet.signal === 0) {
			  console.log("a packet arrived and was emited, yey!")
              self.emit("packet", packet);
            //} else {
			  //console.log("what a nasty packet this one!");
             // self.emit("lowSignalPacket");
            //}
          //} 
        });
    }
	});
}

util.inherits(Adapter, EventEmitter);

Adapter.prototype.isInit = false;

Adapter.prototype.init = function() {
    if (!this.isInit) {
        this.robot.start();
        this.isInit = true;
    }
}
