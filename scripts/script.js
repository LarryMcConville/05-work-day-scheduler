//Global Variables.
var currentDay = moment().format("dddd MMMM Do YYYY");
var currentHour = moment().format("h");

businessHours = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4];

//Get Local Storage

//Set Local Storage

//Functions
init();

function init() {
  $("#currentDay").text(currentDay);
  renderCalendar();
  console.log(currentDay);
}

function renderCalendar() {
  //loop through business hours to build calendar elements
  //each row shall have the `hour` + `the event` + `save button`

  for (var i = 0; i < businessHours.length; i++) {
    //put moment wrapper here
    var hourOfDay = businessHours[i];
    var hourTense = getTimeCategory(hourOfDay);

    var divRow = $("<div>").attr("class", "row");
    var divHour = $("<div>").attr("class", "col-1 hour").text(hourOfDay);
    //Template literal
    //https://stackoverflow.com/questions/3304014/how-to-interpolate-variables-in-strings-in-javascript-without-concatenation
    var textArea = $("<textarea>").attr("class", `col-9 textarea ${hourTense}`);
    var saveButton = $("<button>").attr("class", "col-1 saveBtn");

    divHour.appendTo(divRow);
    textArea.appendTo(divRow);
    saveButton.appendTo(divRow);
    divRow.appendTo("#row-parent");
  }
}

function getTimeCategory(hour) {
  //https://stackoverflow.com/questions/36197031/how-to-use-moment-js-to-check-whether-the-current-time-is-between-2-times
  var hourTense = "";
  console.log(currentHour);
  console.log(hour);
  //if hour < current hour hourTense = ".past"
  hourTense = "row present";
  //else if hour = current hour hourTense = "".present"
  //hourTense = "".future"
  return hourTense;
}

function getCalendarEvent() {}

function saveCalendarEvent() {}

//Event Listeners
