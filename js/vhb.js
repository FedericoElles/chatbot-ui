var vhb = new function(){
	this.ajaxify = new VHBAjaxify();
};

//ajaxify
$(document).ready(function () {
	vhb.ajaxify.getNodes();
});
