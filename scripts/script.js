//Global Variables.
var currentDay = moment().format("dddd MMMM Do YYYY");
var currentHour24 = moment().format("HH");

businessHours = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];

//Load calendar events when application starts.
getCalendarEvents();

init();

function init() {
  $("#currentDay").text(currentDay);
  renderCalendar();
}

function renderCalendar() {
  for (var i = 0; i < businessHours.length; i++) {
    var hourInArray = businessHours[i];
    var hourToDisplay = moment(businessHours[i], "hh").format("LT");

    var hourTense = getTimeCategory(hourInArray);

    var divRow = $("<div>").attr("class", "row");
    var divHour = $("<div>").attr("class", "col-1 hour").text(hourToDisplay);
    var textArea = $("<textarea>").attr("class", `col-10 textarea ${hourTense}`);
    var saveButton = $("<button>").attr("class", "col-1 saveBtn fas fa-save fa-lg");

    divHour.appendTo(divRow);
    textArea.appendTo(divRow);
    saveButton.appendTo(divRow);
    divRow.appendTo("#row-parent");
  }
}

function getTimeCategory(hour) {
  //https://stackoverflow.com/questions/36197031/how-to-use-moment-js-to-check-whether-the-current-time-is-between-2-times
  var hourTense = "";

  console.log(hour);
  console.log(currentHour24);

  if (hour < currentHour24) {
    hourTense = "past";
  }
  if (hour === currentHour24) {
    hourTense = "present";
  }
  if (hour > currentHour24) {
    hourTense = "future";
  }

  return hourTense;
}

function getCalendarEvents() {}

function saveCalendarEvents() {}

//Event Listeners
$(".saveBtn").click(function () {
  alert("Save Button Clicked!!");
});
