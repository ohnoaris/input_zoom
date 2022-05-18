// ==UserScript==
// @name         Torn iOS Input Zoom Fix
// @version      0.7.1
// @description  Allows you to change the font-size. iOS zooms on input if font is less than 16px. 
// @author       cts
// @match        https://www.torn.com/*
// @updateURL    https://raw.githubusercontent.com/cts0x1/input_zoom/main/ios_input_fix.js
// @downloadURL  https://raw.githubusercontent.com/cts0x1/input_zoom/main/ios_input_fix.js
// @run-at       document-start
// @grant        none
// @namespace    cts | requested by Lost.
// ==/UserScript==

//For storing font size.
var fontSize = localStorage.getItem("tr_fontsize") ? localStorage.getItem("tr_fontsize") : "16px";

//Grabs the chat root funky boy.
var chatRoot = document.getElementById("chatRoot");
var config = {
  childList: true
};

//Stuff for settings panel
if (window.location.pathname == "/preferences.php") {
  window.onload = function() {
    var style_settings = document.createElement("style");
    style_settings.type = "text/css";
    style_settings.innerHTML = `
         .trSettings { width: 100%; height: auto; background-color: #191919; border-radius: 6px; padding: 0px 16px 8px 16px; box-sizing: border-box; }
         .trDivLine { width: 100%; height: 16px; padding-top: 6px; padding-bottom: 6px; }
         .trLabel { font-size: 16px; }
         .trTextInput { -webkit-appearance: none; width: 88%; float: right; height: 16px; border: 1px solid #212121; padding-left: 8px; }
         .trHeader { width: 100%; height: 18px; padding: 6px 0px 6px 0px; font-size: 18px; font-weight: bold; color: #fcfafa; }
         .trSeperator { display: block; height: 1px; border: 0; border-top: 1px solid #fcfafa; margin: 1em 0; padding 0; }
         .trDivButton { width: 100%; height: 16px; padding-top: 6px; padding-bottom: 6px; display: flex; align-items: center; justify-content: center; }
         .trButton { width: 128px; background: #343434; padding: 4px 0px 4px 0px; margin: 2px 2px 0px 2px; border: 2px solid #999999; }`
    document.head.appendChild(style_settings);

//Settings panel in Pref stuff.
    var clear = document.createElement("div");
    clear.className = "clear";
    var settings = document.createElement("div");
    settings.className = "trSettings";

    var div_header = document.createElement("div");
    div_header.className = "trHeader";
    var span_header = document.createElement("span");
    span_header.innerText = "iOS Input Zoom Fix";
    div_header.appendChild(span_header);
    settings.appendChild(div_header);

    var hr_seperator = document.createElement("hr");
    hr_seperator.className = "trSeperator";
    settings.appendChild(hr_seperator);

    var div_fontSize = document.createElement("div");
    div_fontSize.className = "trDivLine";
    var span_fontSize = document.createElement("span");
    span_fontSize.className = "trLabel";
    span_fontSize.innerText = "Size: (16px-18px is recommended!)";
    var text_fontSize = document.createElement("input");
    text_fontSize.type = "text";
    text_fontSize.value = localStorage.getItem("tr_fontsize") ? localStorage.getItem("tr_fontsize") : "16px";
    text_fontSize.className = "trTextInput";
    text_fontSize.id = "txt_fontsize";
    div_fontSize.appendChild(span_fontSize);
    div_fontSize.appendChild(text_fontSize);
    settings.appendChild(div_fontSize);

    var div_save = document.createElement("div");
    div_save.className = "trDivButton";
    var button_save = document.createElement("button");
    button_save.type = "button";
    button_save.innerText = "Apply";
    button_save.className = "trButton";
    button_save.id = "btn_save";
    var button_reset = document.createElement("button");
    button_reset.type = "button";
    button_reset.innerText = "Reset";
    button_reset.className = "trButton";
    button_reset.id = "btn_reset";
    div_save.appendChild(button_save);
    div_save.appendChild(button_reset);
    settings.appendChild(div_save);

    var cw = document.getElementById("mainContainer").children[document.getElementById("mainContainer").childElementCount - 2];
    cw.appendChild(clear);
    cw.appendChild(settings);

//Save variables
    document.getElementById("btn_save").addEventListener("click", function() {
      let fs = document.getElementById("txt_fontsize");
      let tsr = document.getElementById("txt_TSReadability");

      localStorage.setItem("tr_fontsize", fs.value);
      localStorage.setItem("tr_TSReadability", tsr.checked);
    });
//Reset variables
    document.getElementById("btn_reset").addEventListener("click", function() {
      localStorage.removeItem("tr_fontsize");
      localStorage.removeItem("tr_TSReadability");
    });
  };
}

//Setting fontsize for chat in CSS
  var cssstr = ""
  cssstr+=`._message_14cwy_509 { font-size: ` + fontSize + ` }`
  cssstr+=`._chat-box-input_14cwy_789 { font-size: ` + fontSize + ` }`
  cssstr+=`._chat-box-textarea_14cwy_816 { font-size: ` + fontSize + ` }`
  cssstr+=`._edit-note_14cwy_1279 { font-size: ` + fontSize + ` }`
  cssstr+=`._title_14cwy_1357 { font-size: ` + fontSize + ` }`

  if (cssstr != "") {
      var style = document.createElement('style');
      style.type = "text/css";
      style.innerHTML = cssstr;
      document.head.appendChild(style);
  }
