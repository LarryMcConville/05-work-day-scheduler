//Global Variables.
var currentDay = moment().format("dddd MMMM Do YYYY");
var currentHour24 = moment().format("HH");

businessHours = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
schedule = [];

init();

function init() {
  $("#currentDay").text(currentDay);
  renderSchedule();

  //Load calendar events when application starts.
  getSchedule();
}

function renderSchedule() {
  for (var i = 0; i < businessHours.length; i++) {
    var hourInArray = businessHours[i];
    var hourToDisplay = moment(businessHours[i], "hh").format("LT");

    var hourTense = getHourTense(hourInArray);

    var divRow = $("<div>").attr("class", "row time-block");
    var divHour = $("<div>").attr("class", "col-1 hour").text(hourToDisplay);
    var textArea = $("<textarea>").attr("class", `col-10 textarea description ${hourTense}`).attr("id", businessHours[i]);
    var saveButton = $("<button>").attr("class", "col-1 saveBtn").attr("button-index", businessHours[i]);

    $(saveButton).append($("<i>").attr("class", "fas fa-save fa-2x"));
    $(divRow).append(divHour, textArea, saveButton);
    $("#row-parent").append(divRow);
  }
}

function getHourTense(hour) {
  var hourTense = "";

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

function getSchedule() {
  var storedSchedule = JSON.parse(localStorage.getItem("schedule"));

  if (storedSchedule !== null) {
    schedule = storedSchedule;

    //loop through stored schedules and update html elements for hours having saved events.
    for (var i = 0; i < schedule.length; i++) {
      $("#" + schedule[i].hour).val(schedule[i].event);
    }
  }
}

function saveSchedule(buttonIndex) {
  //search for the textarea having the same id as the buttonIndex and capture the entered text.
  var newSchedule = {
    hour: buttonIndex,
    event: $("#" + buttonIndex).val(),
  };

  schedule.push(newSchedule);
  localStorage.setItem("schedule", JSON.stringify(schedule));
}

//Event Listeners
$(".saveBtn").click(function (event) {
  event.preventDefault();
  var buttonIndex = $(this).attr("button-index");

  saveSchedule(buttonIndex);
  getSchedule();
});
