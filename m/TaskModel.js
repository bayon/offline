function Task(id, todo,minutes,added_on) {
	this.id = id;
	this.todo = todo;
	this.minutes = minutes;
	this.added_on = added_on;
	 
}

Task.prototype.id = '';
Task.prototype.todo = '';
Task.prototype.minutes = '';
Task.prototype.added_on = '';

Task.prototype.reveal = function() {
	alert(this.id + " | todo:" + this.todo+ " | minutes:" + this.minutes+ " | added_on:" + this.added_on);
};
 
 