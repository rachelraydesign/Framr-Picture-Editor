$(document).ready(function() {
	//Global variable for the embed button
	var valText="Enter Text"
	
	console.log("ready!");
	$('#frame').css({
		"height": flickerAPI.height,
		"width": flickerAPI.borderWidth,
	});
	
	 /*$(function() {      
      $("#frame").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
         //(this).text("You swiped " + direction );  
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:75
      });
    });*/
		
	$("#frame").on("swipe",function() {
    	alert("Swipe detected!");
  	}); 

	//$("#frame").resizable();
	$("#frame").draggable();
	
	//Bounce effect
	$('#frame').click(function() {
	  $( "#frame" ).effect( "bounce", { times:2 }, 300);
	});
	
	//Naming the image
	$("#frameName").keyup(function() {
		var myText = $(this).val();
		$("#frameNamer").text(myText);
	}).keyup();
		
	//Padding around the frame
	$("#padding").slider({
		animate: "fast",
		value: 2,
		max: 15,
		min: 2,
		slide: paddingSlider
	});
	function paddingSlider(event, slider) {
		$("#frame").css('padding', slider.value + '%');
	}
	//Delete Padding
	$("#resetSize").click( function() {
            $("#frame").css('padding', '1px');
            $("#padding").slider({
            value:1
        });
    });
	
	//Roundness of the frame
	$("#roundness").slider({
		animate: "fast",
		value: 10,
		max: 30,
		min: 0,
		slide: roundnessSlider
	});
	function roundnessSlider(event, slider) {
		$('#frame').css('border-radius', slider.value + '%');
	}
	//
	//Delete the border-radius
	$("#resetRoundness").click( function() {
            $("#frame").css('border-radius', '1px');
            $("#roundness").slider({
            value:1
        });
    });
		
	//Thickness of the frame
	$("#thickness").slider({
		animate: "fast",
		value: 10,
		max: 20,
		min: 0,
		slide: thicknessSlider
	});	
	function thicknessSlider(event, slider) {
		$("#frame").css('border-width', slider.value + 'px');
	}
	//Delete the border-width
	$("#resetThickness").click( function() {
            $("#frame").css('border-width', '1px');
            $("#thickness").slider({
            value:1
        });
    });
	
	//Embed code 
	$('#embedHtml').click(function() {
    	$("#textHtml").html('<div>' + valText + '<div>'); 
    });
});

//Image source from Flickr dynamically
var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
$.getJSON(flickerAPI, {
	tags: "flowers",
	tagmode: "any",
	format: "json"
}).done(function(data) {
	$.each(data.items, function(i, item) {
		$("<img>").attr("src", item.media.m).appendTo("#frame").wrap('<td>')('<a href = "' + item.link + '"/>');
	});
});


   