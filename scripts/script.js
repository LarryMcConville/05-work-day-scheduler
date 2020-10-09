//Global Variables.
var currentDay = moment().format("dddd MMMM Do YYYY");
var presentHour = "";
var pastHours = "";
var futureHours = "";

//Get Local Storage

//Set Local Storage

//Functions
init();

function init() {
  $("#currentDay").text(currentDay);
  console.log(currentDay);
}

//loop through business hours and build our calendar elements
//each row shall have the `hour` + `the event` + `save button`
//hours between start of day and current hour are assigned .past
//current hour is assigned .present
//hours between current hour and end of day are assigned .future

//Event Listeners
