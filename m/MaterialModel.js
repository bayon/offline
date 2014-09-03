function Material(id, material,cost,added_on) {
	this.id = id;
	this.material = material;
	this.cost = cost;
	this.added_on = added_on;
	 
}

Material.prototype.id = '';
Material.prototype.material = '';
Material.prototype.cost = '';
Material.prototype.added_on = '';

Material.prototype.reveal = function() {
	alert(this.id + " | material:" + this.material+ " | cost:" + this.cost+ " | added_on:" + this.added_on);
};
 