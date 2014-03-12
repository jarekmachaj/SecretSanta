var extend = require('util')._extend;

function Randomer(arr){
	this._objArr = arr;
	this._left =  arr.slice(0);
}

Randomer.prototype.getAssignments = function(){
	var assignments = [];

	for (var i = 0; i < this._objArr.length; ++i) {
		assignments.push({"obj" : this._objArr[i], "assignment" : this._randomPick(this._objArr[i])});
	}

	return assignments;
}

Randomer.prototype._randomLeftIndex = function(){
	return Math.floor(Math.random() * (this._left.length));
} 

Randomer.prototype._randomPick = function(obj){
	var picked = undefined;
	var idx = undefined;
	do {	
		idx = this._randomLeftIndex();
		picked = this._left[idx];
	} while(this._condition(obj, picked))

	picked = extend({}, this._left[idx]);
	this._left.splice(idx, 1);
	return picked;
}

Randomer.prototype._condition = function(obj, objToAssign) {
	return JSON.stringify(obj) === JSON.stringify(objToAssign);
}

module.exports = Randomer;