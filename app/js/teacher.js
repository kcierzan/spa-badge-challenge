$(document).ready(function(){
  getTeachers();
});

var getTeachers = function(){
  var url = 'http://spa-badge-api.herokuapp.com/teachers'

  miniQuery.ajax({
    url: url,
    type: 'GET',
    dataType: 'json'
  })
  .then(function(response){
    var teacherList = JSON.parse(response.responseText)

    console.log("pass")
  })
  .catch(function(response){
    console.log(response)
    console.log("fail")
  })
}
