/* Quick and dirty way to highlight the current happening (might fail on first/last event of a day)*/
$("#runTable .current").removeClass("current").children().css("background", "");
var vToday = null, vCurrent = null, vDate = new Date(),
		vText = "" + (vDate.getMonth() + 1) + "/" + vDate.getDate() + "/" + vDate.getFullYear();
$("#runTable .day-split td").each(function(pIndex, pElem){
  var vJQElem = $(pElem);
  if(vJQElem.text() === vText){
	vToday = vJQElem.parent();
  }
});
if(vToday){
	var vAllToday = vToday.nextUntil(".day-split");
	vAllToday.nextUntil(".day-split").each(function(pIndex, pElem){
		if(!vCurrent){
			var vJQElem = $(pElem).children().first(),
				vTimeText = vJQElem.text(),
				vTextArray = vTimeText.split(" "),
				vClockArray = vTextArray[1].split(":"),
				vHours = +vClockArray[0],
				vMinutes = +vClockArray[1];
			if(vTextArray[2] === "PM"){
				if(vHours != 12){
					vHours += 12;
				}
			}else if(vHours === 12){
				vHours = 0;
			}
			/*Didn't care to add a test for seconds, since they're usually 00 anyways*/
			if(vHours > vDate.getHours() || (vHours === vDate.getHours() && vMinutes >= vDate.getMinutes()) ||
				pIndex === vAllToday.length - 1 /*Added to work with last event of the day (not tested)*/){
				
				vCurrent = vJQElem.parent().prev();
				
				/* Check added to work with the first event of the day (not tested)*/
				if(vCurrent.length <= 0){
					vCurrent = vJQElem.parent();
				}
				vCurrent.addClass("current");
				vCurrent.children().css("background", "bisque");
			}
		}
	});
}

/* Function for scrolling to the current if it's found */
function scrollToCurrent(){
	if(vCurrent){
		$('html, body').animate({
			scrollTop: vCurrent.offset().top
		}, 2000);
	}
}

/* Added a button for calling the scroll function */
$(".text-gdq-black").parent().children("button").remove();
$(".text-gdq-black").parent().append("<button class='btn btn-default' onclick='scrollToCurrent()'>Go to current</button>");