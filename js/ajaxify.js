/**
 * @namespace
 * @constructor
 */
VHBAjaxify = function () {
  this.namespace = "data";
  this.cssClass = "ajaxify2";
  this.rootNode = $("body");
  this.asyncLoading = {};  //HBO-700 Keep track of async libs
  this.keepAjaxify = {
    datatables: true,
    'datatables-lightbox': true
  }; 
};

VHBAjaxify.prototype.getNodes = function (parent) {
  var self = this;
  var nodes; 
  
  if (typeof parent === 'undefined') {
    nodes = $("." + this.cssClass);
  } else {
    nodes = $(parent).find("." + this.cssClass);
  }
  nodes.each(function () {
    var node = $(this);
    if (node.data("command")) {
      // Allows to bind more than one data-command on one container
      var functions = node.data("command").split(" ");
      $.each(functions, function (i, v) {
        if (typeof(self[v]) == "function") {
          self[v](node, node.data());
        }
      });
    }
    else {
      console.warn("function " + node.data("command") + " not found, called by ", node);
    }
    //HBO-700 if defined, keep ajaxify class for async processing
    if (self.keepAjaxify[node.data("command")] !== true){
      node.removeClass(self.cssClass);
    }
  });
};
