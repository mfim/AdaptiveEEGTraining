var BOUND = 5;

var starter = require("./sessionStarter");

var level;
var intensity;
var functionType;
var active;
var variable;
var time;
var action;
var lastIntensity;

function FollowingTask(){
    this.level = 100;
    this.active = false;
    this.time = 180;
    this.intensity = 100;
    this.functionType = "linear";
    this.variable = "attention";
    this.lastIntensity = 100;
}


FollowingTask.prototype.checkPacket = function(packet,object) {
    console.log("I'm following session and this is the packet ");
    console.log(packet);

    //Logging in cosole for checking
    console.log("target level : " + object.level);
    console.log("total time : " + object.time);
    console.log("final intensity : " + object.intensity);
    
    var currentVariable;
    
    if (object.variable == "attention") {
        currentVariable = packet.attention;
    } else {
        currentVariable = packet.meditation;
    }
    
    var currentIntensity;
    
    if(currentVariable > object.level){
        currentVariable = object.level;
    }
    
    if (object.functionType == "quadratic") {
        
        currentIntensity = (object.intensity / object.level) * Math.pow(currentVariable,2) / 100;
        
    }  else if (object.functionType == "linear") {
        
        currentIntensity = ((object.intensity) / object.level )* currentVariable;   
        
        /*
        if (Math.abs(currentIntensity - object.lastIntensity)>object.BOUND){
            console.log('SONO DENTRO');
            if(currentIntensity - object.lastIntensity > 0){
                currentIntensity = object.lastIntensity + object.BOUND;
            }else{
                currentIntensity = object.lastIntensity - object.BOUND;
            }
        }*/
    }
    currentIntensity = 100 - currentIntensity;
    //object.lastIntensity = currentIntensity;
    
    changeIntensity(object, currentIntensity);
}


function changeIntensity(object, intensity){
    console.log("Intensity is now : " + intensity);
    starter.getView().followingActions(JSON.stringify(object.action),"continue",intensity);
}

FollowingTask.prototype.startIntensity = function() {
    starter.getView().followingActions(JSON.stringify(this.action),"play",100);
    var object = this;
    setTimeout(function(){
        stopIntensity(object);
    }, 1000 * this.time);
}


function stopIntensity(object) {
    starter.getView().followingActions(JSON.stringify(this.action),"stop",0);
    starter.removeListener(object);
}



FollowingTask.prototype.setIntensity = function(intensity){
    this.intensity = intensity;
}

FollowingTask.prototype.getIntensity = function(){
    return this.intensity;
}

FollowingTask.prototype.setFunctionType = function(type){
    this.functionType = type;
}

FollowingTask.prototype.getFunctionType = function(){
    return this.functionType;
}



FollowingTask.prototype.setVariable = function(variable){
    this.variable = variable;
}

FollowingTask.prototype.getVariable = function(){
    return this.variable;
}

FollowingTask.prototype.setLevel = function(level){
    this.level = level;
}

FollowingTask.prototype.getLevel = function(){
    return this.level;
}


FollowingTask.prototype.setTime = function(time){
    this.time = time;
}

FollowingTask.prototype.getTime = function(){
    return this.time;
}

FollowingTask.prototype.setAction = function(action){
    this.action = action;
}

FollowingTask.prototype.getAction = function(){
    return this.action;
}


module.exports = FollowingTask;