# Simple Popup

Just a simple ECMA6 popup class.

## Types implemented

* Alert
* Prompt
* Confirm

## Usage
First, add jQuery link before your closing <body> tag add:

```
<script src="../lib/jquery.min.js"></script>
```
Then, add popup.js script
```html
<script src="../popup.js"></script>
```


### Alert type:
```javascript
Popup.alert("Oh alert!");
```

### Confirm type:
```javascript
Popup.confirm("Are you sure?");
```

### Prompt type:
```javascript
Popup.prompt("What's your name?");
```



## Settings
You can change default settings globally with static Popup ```init``` method:

```javascript
// Change default label on popup button example:
Popup.init({
    closeLabel: "got it!",
    yesLabel: "alright"
});
```
or just use settings object when you call ```alert```, ```confirm``` or ```prompt``` method, like this:
```javascript
// Add popup title example
Popup.alert("Alert with params", {title:"Info"});
```


## Options
Option | Type | Default | Description
------ | ---- | ------- | -----------
title | string | "" | Add title on header popup
callbackOpen | function | null | Callback trigger when popup is opened
callbackClose | function | null | Callback trigger when popup is closed
animationOpen | string | "fadeIn" | Opening animation type based on [Animate.css](https://daneden.github.io/animate.css/) classes name (ie: fadeInDown, zoomIn...)
animationClose | string | "fadeOut" | Closing animation type based on [Animate.css](https://daneden.github.io/animate.css/) classes name
closeLabel | string | "close" | Close button label used for alert popup type
yesLabel  | string | "yes" | Confirm button label used for confirm popup type
noLabel  | string | "no" | Deny button used for confirm popup type
validLabel| string | "valid" | Valid button used for prompt popup type

## Dependencies

* [jQuery v3.2.1](https://code.jquery.com/jquery-3.2.1.min.js)
* [Animate.css](https://daneden.github.io/animate.css/)

*Note: need to be "[Babelify](https://babeljs.io/)" to be used in production.*
