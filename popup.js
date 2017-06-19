'use strict';
let settings = {};
class Popup{

	constructor(content, options){
		this.content = content;
		this.event = new PopupEvent("popup-event");

		options = options || {};
		this.options = {};
		this.options.title = options.title || "";
		this.options.callbackOpen = options.callbackOpen || null;
		this.options.callbackClose = options.callbackClose || null;
		this.options.animationOpen = options.animationOpen || "fadeIn";
		this.options.animationClose = options.animationClose || "fadeOut";
		this.options.closeLabel = options.closeLabel || settings.closeLabel || "close";
	}

	show(){
        this.$popup = this.draw();
        this.initEvents();

		$("body").append(this.$popup);
		this.playAnimation(this.options.animationOpen);

		if(typeof this.options.callbackOpen === "function"){
			this.options.callbackOpen();
		}
	}

	draw(){
		let popup = $("<div>").html(this.getTemplate());

		popup.find(".popup-header").html(this.options.title);
		popup.find(".popup-content").html(this.content);
		
		return popup;
	}

	initEvents(){
		this.$popup.find("button").on("click", this.hide.bind(this));
		$("body").on("keydown.popup", this.$popup, this.keyPressed.bind(this));
	}

	removeEvents(){
		this.$popup.find("button").off("click", this.hide.bind(this));
		$("body").off(".popup");
	}

	keyPressed(event){
		if(event.keyCode == 13){
			this.$popup.find("button").trigger("click");
		}

		if(event.keyCode == 27){
			this.remove();
		}
	}

	hide(){
		this.playAnimation(this.options.animationClose, this.remove.bind(this));
	}

	remove(){
		this.removeEvents();
		this.$popup.remove();

		if(typeof this.options.callbackClose === "function"){
			this.options.callbackClose(this.event);
		}
	}

	playAnimation(animationName, callback){
		let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

		this.$popup.find(".popup-inner").addClass('animated ' + animationName).one(animationEnd, function(){
			$(this).removeClass('animated ' + animationName);
			if(typeof callback === "function"){
				callback();
			}
		});
	}

	getTemplate(){}

	static alert(content, options){
		let alert = new Alert(content, options);
		alert.show();
	}

	static confirm(content, options){
		let confirm = new Confirm(content, options);
		confirm.show();
	}

	static prompt(content, options){
		let prompt = new Prompt(content, options);
		prompt.show();
	}

    static settings(){
        return settings;
    }

    static init(params){
        params = params || {};
        settings.closeLabel = params.closeLabel || null;
        settings.yesLabel = params.yesLabel || null;
        settings.noLabel = params.noLabel || null;
    }
}

class Alert extends Popup{

	constructor(content, options){
		super(content, options);
		this.event.name = "event-alert";
	}

	getTemplate(){
		return "<div class='popup-bg popup-alert'>" +
					"<div class='popup'>" +
						"<div class='popup-inner'>" +
							"<div class='popup-header'></div>" +
							"<div class='popup-content'></div>" +
							"<div class='popup-footer'><button>" + this.options.closeLabel + "</button></div>" +
						"</div>" +
					"</div>" +
				"</div>";
	}
}

class Confirm extends Popup{

	constructor(content, options){
		super(content, options);

        options = options || {};
        this.options.yesLabel = options.yesLabel || settings.yesLabel || "yes";
        this.options.noLabel = options.noLabel || settings.noLabel || "no";

		this.event.name = "event-confirm";
		this.event.confirm = false;
	}

	hide(evt){
		super.hide();
		this.event.confirm = $(evt.target).hasClass("true");
	}

	keyPressed(event){
		if(event.keyCode == 13){
			this.$popup.find("button.true").trigger("click");
		}
		if(event.keyCode == 27){
			this.$popup.find("button.false").trigger("click");
		}
	}

	getTemplate(){
		return "<div class='popup-bg popup-confirm'>" +
					"<div class='popup'>" +
						"<div class='popup-inner'>" +
							"<div class='popup-header'></div>" +
							"<div class='popup-content'></div>" +
							"<div class='popup-footer'><button class='true'>" + this.options.yesLabel + "</button><button class='false'>" + this.options.noLabel + "</button></div>" +
						"</div>" +
					"</div>" +
				"</div>";
	}
}


class Prompt extends Popup{

	constructor(content, options){
		super(content, options);

        options = options || {};
        this.options.validLabel = options.validLabel || settings.validLabel || "valid";

        console.log(this.options)

		this.event.name = "event-prompt";
		this.event.value = "";
	}

	hide(evt){
		this.event.value = this.$popup.find("input").val();
		super.hide();
	}

	getTemplate(){
		return "<div class='popup-bg popup-confirm'>" +
					"<div class='popup'>" +
						"<div class='popup-inner'>" +
							"<div class='popup-header'></div>" +
							"<div class='popup-content'></div>" +
							"<div class='popup-input'>" +
								"<input value='' type='text' autofocus>" +
							"</div>" +
							"<div class='popup-footer'><button>" + this.options.validLabel + "</button></div>" +
						"</div>" +
					"</div>" +
				"</div>";
	}
}

class PopupEvent{
	
	constructor(name){
		this.name = name;
	}
}