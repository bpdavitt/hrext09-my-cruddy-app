var populateTests = function(){
  var data = [
  {"date":"05/17/2019","type":"Swim","duration":40,"distance":1,"notes":"Tempo","time":900,"completed":true},
  {"date":"05/18/2019","type":"Run","duration":21,"distance":3,"notes":"Tempo","time":2000,"completed":false},
  {"date":"05/17/2019","type":"Bike","duration":60,"distance":20,"notes":"Threshold","time":1430,"completed":false},
  {"date":"05/16/2019","type":"Run","duration":30,"distance":3.5,"notes":"Tempo","time":1430,"completed":true}
  ]
  window.localStorage.setItem('workouts', JSON.stringify(data))
}

var getItem = function(key) {
  return window.localStorage.getItem(key);
}

//create
var createItem = function(key, value) {
  if(!keyExists(key)){
    var arr = [];
  }else{
    var arr = JSON.parse(window.localStorage[key])
  }
  arr.push(value);
  return window.localStorage.setItem(key, JSON.stringify(arr));
}

var keyExists = function(key) {
  var currentValue = getItem(key);
  return currentValue !== null;
}

var createWorkout = function(date, type, duration, distance, notes, time, completed){
  type = type.charAt(0).toUpperCase() + type.substring(1);
  var workout = {
    "date": date,
    "type": type,
    "duration": duration,
    "distance": distance,
    "notes": notes,
    "time": time,
    "completed": completed
  }
  return workout;
}

var buildWorkout = function(workout, index){
  var $workout = $('<div class = "workout"></div>')
  var $date = $(`<div class = "date">${formatDate(workout.date)}</div>`)
  var $type = $(`<div class = "type">${workout.type}</div>`)
  var $duration = $(`<div class = "duration">${workout.duration} minutes</div>`)
  var $distance = $(`<div class = "distance">${workout.distance} miles</div>`)
  var $notes = $(`<div class = "notes">Notes: ${workout.notes}</div>`)
  var $time = $(`<div class = "time">Time of Day: ${workout.time}</div>`)
  var $completed = $(`<div class = "completed">Completed: ${workout.completed}</div>`)
  var $index = $(`<div class = "index">${index}</div>`)
  $workout.append($date, $type, $duration, $distance, $notes, $time, $completed, $index);
  if(workout.type === "Swim"){
    $workout.css("background-color", "aqua");
  }
  if(workout.type === "Bike"){
    $workout.css("background-color", "Goldenrod");
  }
  if(workout.type === "Run"){
    $workout.css("background-color", "Lightgray");
  }
  return $workout;
}

var deleteWorkout = function(index){
  var allWorkouts = sortLocalStorage();
  allWorkouts.splice(index, 1);
  window.localStorage.setItem('workouts', JSON.stringify(allWorkouts));
  drawWorkouts();
}

var updateWorkout = function(workout, index){
  var allWorkouts = sortLocalStorage();
  allWorkouts.splice(index, 1, workout);
  window.localStorage.setItem('workouts', JSON.stringify(allWorkouts));
  drawWorkouts();
}

function sortLocalStorage(){
   var workouts = JSON.parse(localStorage.getItem('workouts'));
   workouts.sort(function(a,b){
    return a.date < b.date;
   })
   
   return workouts;
}

var formatDate = function(date){
  return date;
  
}

var drawWorkouts = function(){
  var $plannedWorkouts = $(".planned-workouts");
  $plannedWorkouts.html("Planned Workouts")
  var $completedWorkouts = $(".completed-workouts");
  $completedWorkouts.html("Completed Workouts")
  
  var allWorkouts = sortLocalStorage();
  for(var i = 0; i < allWorkouts.length; i++){
    var $workout = buildWorkout(allWorkouts[i], i);
   
    $($workout).unbind('click').click(function(event){
      event.preventDefault();      
      var selectedWorkout = sortLocalStorage()[event.currentTarget.lastChild.textContent];
      //Prepopulates workout modification form with data from the selected workout
      $("#dateUpdate").val(selectedWorkout.date)
      $("#typeUpdate").val(selectedWorkout.type)
      $("#durationUpdate").val(selectedWorkout.duration)
      $("#distanceUpdate").val(selectedWorkout.distance)
      $("#notesUpdate").val(selectedWorkout.notes)
      $("#timeUpdate").val(selectedWorkout.time)
      $("#completedUpdate").val(selectedWorkout.completed)
      
      //Displays a popup box to modify workouts, previous info pre-populated
      modifyWorkout.showModal();

      $("#deleteBtn").unbind("click").click(function(){    
        deleteWorkout(Number(event.currentTarget.lastChild.textContent));
        modifyWorkout.close()
      });
      $("#cancelBtn").unbind("click").click(function(){    
        modifyWorkout.close()
      });
      $("#updateBtn").unbind("click").click(function(){
        var date = $("#dateUpdate").val();
        if(date === ''){
          alert("You must enter a date");
          return undefined;
        }
        var type = $("#typeUpdate").val();
        var duration = Number($("#durationUpdate").val());
        var distance = Number($("#distanceUpdate").val());
        var notes = $("#notesUpdate").val();
        var time = Number($("#timeUpdate").val());
        var completed = $("#completedUpdate").val();
        var updated = createWorkout(date, type, duration, distance, notes, time, completed)
        updateWorkout(updated, event.currentTarget.lastChild.textContent)
        modifyWorkout.close()
      });
    })
    ///*****************
    if(allWorkouts[i].completed === 'Y'){
      $workout.appendTo(".completed-workouts");   
    }else{
      $workout.appendTo(".planned-workouts"); 
    }
  } //completes iteration through all workouts
  generateChart(allWorkouts);

}

var generateChart = function(allWorkouts){
  var data = [["Swim"],["Bike"],["Run"]];
  for(element of allWorkouts){
    if(element.completed === "Y"){
      if(element.type === "Swim"){
        data[0].push(element.duration)
      }
      if(element.type === "Bike"){
        data[1].push(element.duration)
      }
      if(element.type === "Run"){
        data[2].push(element.duration)
      }
    }
  }

  var chart = c3.generate({
    data: {
      columns: data,
      type: 'pie'
    },
    color: {
      pattern: ['aqua','Goldenrod','Lightgray']
    },
    pie: {
          label: {
              format: function (value, ratio, id) {
                  return value + ' minutes';
              }
          }
      }
  });
}

$(document).ready(function() {
  
  if(!keyExists('workouts')){
    populateTests();
  }

  drawWorkouts();

  $('#createButton').click(function(event) {
    event.preventDefault();

    var date = $("#dateInput").val();
    if(date === ''){
      alert("You must enter a date");
      return undefined;
    }
    var type = $("#typeInput").val();
    var duration = Number($("#durationInput").val());
    var distance = Number($("#distanceInput").val());
    var notes = $("#notesInput").val();
    var time = Number($("#timeInput").val());
    var completed = $("#completeInput").val();
    var workout = createWorkout(date, type, duration, distance, notes, time, completed)
    //passes workout into local storage
    createItem('workouts', workout);
    drawWorkouts();
  });

  $(".workout-holder").unbind("click").click(function(event){
    event.preventDefault();
    drawWorkouts();
  });
});
