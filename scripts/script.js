//Global Variables.
var currentDay = moment().format("dddd MMMM Do YYYY");
var currentHour24 = moment().format("HH");

businessHours = ["07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
schedule = [];

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
    var textArea = $("<textarea>").attr("class", `col-10 textarea ${hourTense}`).attr("id", `${businessHours[i]}`);
    var saveButton = $("<button>").attr("class", "col-1 saveBtn fas fa-save fa-lg").attr("button-index", businessHours[i]);

    divHour.appendTo(divRow);
    textArea.appendTo(divRow);
    saveButton.appendTo(divRow);
    divRow.appendTo("#row-parent");
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
  //console.log("Inside getCalendarEvents");
  var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
  if (storedSchedule !== null) {
    schedule = storedSchedule;
    //console.log(schedule);
    //create loop to set textarea.textContent = to the stored schedule
    //where textarea.attr() = schedule.key
  }
}

function saveCalendarEvents(buttonIndex) {
  var id = "#" + buttonIndex;

  //return the textarea.val() where the textarea id = buttonIndex.
  var newSchedule = {
    hour: buttonIndex,
    event: $(id).val(),
    //event: textAreaValue,
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
  //getCalendarEvents();
  //alert("Save Button Clicked!!");
});
