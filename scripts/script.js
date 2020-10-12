//Global Variables.
var currentDay = moment().format("dddd MMMM Do YYYY");
var currentHour24 = moment().format("HH");

businessHours = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
schedule = [];

init();

function init() {
  $("#currentDay").text(currentDay);
  renderCalendar();

  //Load calendar events when application starts.
  getCalendarEvents();
}

function renderCalendar() {
  for (var i = 0; i < businessHours.length; i++) {
    var hourInArray = businessHours[i];
    var hourToDisplay = moment(businessHours[i], "hh").format("LT");

    var hourTense = getTimeCategory(hourInArray);

    var divRow = $("<div>").attr("class", "row time-block");
    var divHour = $("<div>").attr("class", "col-1 hour").text(hourToDisplay);
    var textArea = $("<textarea>").attr("class", `col-10 textarea description ${hourTense}`).attr("id", `${businessHours[i]}`);
    var saveButton = $("<button>").attr("class", "col-1 saveBtn").attr("button-index", businessHours[i]);

    $(saveButton).append($("<i>").attr("class", "fas fa-save fa-2x"));

    $(divRow).append(divHour, textArea, saveButton);
    $("#row-parent").append(divRow);
  }
}

function getTimeCategory(hour) {
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

function getCalendarEvents() {
  var storedSchedule = JSON.parse(localStorage.getItem("schedule"));

  if (storedSchedule !== null) {
    schedule = storedSchedule;
    //create loop to set textarea.textContent = to the stored schedule
    //where textarea.attr() = schedule.key

    for (var i = 0; i < schedule.length; i++) {
      var id = "#" + schedule[i].hour;

      $(id).val(schedule[i].event);
    }
  }
}

function saveCalendarEvents(buttonIndex) {
  //we will search for the textarea having the same id as the buttonIndex.
  var id = "#" + buttonIndex;

  //return the textarea.val() where the textarea id = buttonIndex.
  var newSchedule = {
    hour: buttonIndex,
    event: $(id).val(),
  };

  console.log(newSchedule);

  schedule.push(newSchedule);
  localStorage.setItem("schedule", JSON.stringify(schedule));
}

//Event Listeners
$(".saveBtn").click(function (event) {
  event.preventDefault();
  var buttonIndex = $(this).attr("button-index");

  saveCalendarEvents(buttonIndex);
});
