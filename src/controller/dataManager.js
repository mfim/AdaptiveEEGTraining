var Log = require('../model/Log');
var log = new Log();

exports.addPacket = 
    function addPacket(packet){
    
    log.addEntry(packet.timestamp,packet.attention,packet.meditation);
    //log.addEntry('aaaa:mm:dd::hh:mm:ss',10,10);
   //console.log(JSON.stringify(log.getEntries(),null,4));
    

}   

exports.save = function(){
    console.log(JSON.parse(log.createJSON()));
}