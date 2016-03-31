/*!
 * minQuery
 */

var SweetSelector = {};

(function(exports) {

  exports.select = function(identifier) {
    if (identifier[0] === "#" || identifier[0] === ".") {
      var token = identifier[0];
      var selector = identifier.slice(1)
    };

    if (token === "#") {
      return document.getElementById(selector);
    }
      else if (token === ".") {
        return document.getElementsByClassName(selector)
    }
      else {
        return document.getElementsByTagName(identifier)
    }
  }

})(SweetSelector);


var DOM = {};

(function(manipulateHtml) {

  manipulateHtml.hide = function(element) {
    if (element[0]){
      for (var i = 0; i < element.length; i++){
        (element)[i].classList.removeClass(eraseClass)
      };
    } else{
      (element).style.visibility = "hidden";
    }
  };

  manipulateHtml.show = function(element) {
    if (element[0]){
      for (var i = 0; i < element.length; i++){
        (element)[i].classList.style.visibility = "visible";
      }
    } else{
      (element)[0].style.visibility = "visible";
    }
  };

  manipulateHtml.addClass = function(element, secondClass) {
    if (element[0]){
      for (var i = 0; i < element.length; i++){
        (element)[i].classList.add(secondClass)
      }
    } else{
      (element).classList.add(secondClass)
    }
  };

  manipulateHtml.removeClass = function(element, eraseClass) {
    if (element[0]){
      for (var i = 0; i < element.length; i++){
        (element)[i].classList.remove(eraseClass)
      }
    } else{
      (element).classList.remove(eraseClass)
    }
  };

})(DOM);


var EventDispatcher = {};

(function(exports) {

  exports.on = function(element, event, action) {
    var customEvent = new Event(event);
    if (element[0]){

      for (var i = 0; i < element.length; i++){
        element[i].addEventListener(event, action);
        element[i].dispatchEvent(customEvent);
      }

    } else{

      element.addEventListener(event, action);
      element.dispatchEvent(customEvent);
    }

  }

  exports.trigger = function(element, event) {
    var customEvent = new Event(event)
    if (element[0]){

      for (var i = 0; i < element.length; i++){

        element[i].addEventListener(event, function() { console.log("awesome") });
        element[i].dispatchEvent(customEvent);
      }

    } else{

      element.addEventListener(event, function() { console.log("awesome") });
      element.dispatchEvent(customEvent);
    }

  }

})(EventDispatcher);


var AjaxWrapper = {};

(function(exports) {

  exports.request = function(args) {
    var promise = new Promise( function(resolve, reject){
      var ajax = new XMLHttpRequest();
      ajax.addEventListener('load', transferComplete);
      ajax.addEventListener('error', transferFailed);
      ajax.open(args.type, args.url);
      ajax.send();
      function transferComplete(){
        resolve(this);
      };
      function transferFailed(){
        reject(this);
      }
    })
    return promise;
  };
})(AjaxWrapper);


var miniQuery = function(selector) {
  var selected = SweetSelector.select(selector);

  selected.hide = function() {
    DOM.hide(selector)
  }

  selected.show = function() {
    DOM.show(selector)
  }

  selected.addClass = function(newClass) {
    DOM.addClass(selector, newClass)
  }

  selected.removeClass = function(newClass) {
    DOM.removeClass(selector, newClass)
  }

  selected.on = function(event, action) {
    EventDispatcher.on(selected, event, action)
  }

  selected.trigger = function(event) {
    EventDispatcher.trigger(selected, event)
  }

  return selected;
}

miniQuery.ajax = function(args){

  return AjaxWrapper.request(args)
  // var promise = AjaxWrapper.request(args);

  // promise.success = function(response){
  //   return response;
  // };

//   promise.fail = function(){
//     function(response){
//       return response;
//     };
//   };

//   return promise;
};



// var p = new Promise( function(resolve, reject){ resolve(1)}).then(function(x){console.log(x)})






