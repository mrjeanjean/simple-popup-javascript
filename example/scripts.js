'use strict';
function afterPrompt(e){
	console.log(e);
	if(e.confirm){
		Popup.alert("Confirmed !", {title:"Info"});
	}else{
		Popup.alert("Not Confirmed...", {title:"Info"});
	}
}

function displayPopup(){
	Popup.alert("Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim. Lorem test uil pour esta mide etam este luim.", {title:"Mon titre 2", animationOpen: "zoomIn", animationClose: "fadeOutUp", callbackClose:function(){console.log("Close !!", this)}});
}

$(function(){
	Popup.confirm("Quel est ton nom ?", {title:"Mon titre", animationOpen: "zoomIn", animationClose: "zoomOut", callbackClose:afterPrompt});
	$("button.show-popup").on("click", displayPopup);
});