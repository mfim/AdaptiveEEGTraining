/* CLASS LOG */

//Constructor
function ActionLog() {
    
    this.entries = [];
    this.timestamp = [];
    this.lable = [];
    this.intensity = [];
    this.JSONTimestamp = '"timestamp":"';
    this.JSONLable = '"lable":"';
    this.JSONIntensity = '"intensity":"';
    
}

//Class methods
ActionLog.prototype.addEntry = function(timestamp, lable, intensity) {
    console.log('pushing action:');
    console.log(action);
    var data = new ActionEntry(timestamp, lable, intensity);
    this.entries.push(data);   
    
};

ActionLog.prototype.getEntries = function() {
    
    return this.entries;
    
};

ActionLog.prototype.getEntry = function() {
    
    return this.entries.pop();
    
};

/* Function to create the final JSON of all log entries for Abilia DB*/
ActionLog.prototype.createJSON = function() {
    for (entry in this.entries){
        this.timestamp.push(this.entries[entry].timestamp);
        this.lable.push(this.entries[entry].lable);
        this.intensity.push(this.entries[entry].intensity);
    }
    
    this.JSONTimestamp = this.JSONTimestamp + JSON.stringify(this.timestamp)+'"';
    this.JSONLable = this.JSONLable + JSON.stringify(this.lable)+'"';
    this.intensity = this.JSONIntensity + JSON.stringify(this.intensity)+'"';
    return '{' + this.JSONTimestamp + ',' + this.JSONLable + ',' + this.JSONIntensity + '}';
    
    
    return JSON.stringify(this.entries);
    
    
    /*for (entry in this.entries) {
        this.timestamps.push(this.entries[entry].timestamp);
        this.attentionLevels.push(this.entries[entry].attentionLevel);
        this.relaxationLevels.push(this.entries[entry].relaxationLevel);
        //console.log(entry);
        //console.log(this.entries);
    }
    
    this.JSONTimestamps = this.JSONTimestamps + JSON.stringify(this.timestamps) +'"';
    this.JSONAttentionLevels = this.JSONAttentionLevels + JSON.stringify(this.attentionLevels) +'"';
    this.JSONRelaxationLevels = this.JSONRelaxationLevels + JSON.stringify(this.relaxationLevels) +'"';
    console.log(this.timestamps);
    return '{' + this.JSONTimestamps + ',' + this.JSONAttentionLevels + ',' + this.JSONRelaxationLevels +'}';
    
    return JSON.stringify(this.entries);*/
}

//Export class
module.exports = ActionLog;

