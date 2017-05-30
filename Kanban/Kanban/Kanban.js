var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    // Drag and Drop
    Greeter.prototype.allowDrop = function (ev) {
        ev.preventDefault();
    };
    Greeter.prototype.drag = function (ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    };
    Greeter.prototype.drop = function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        if (ev.target.id === "divCompleted") {
            var elem = document.getElementById(data);
            elem.parentNode.removeChild(elem);
        }
        else {
            ev.target.appendChild(document.getElementById(data));
        }
    };
    Greeter.prototype.Rename = function (ev) {
        alert("you double clicked on something");
    };
    // Buttons
    Greeter.prototype.AddNewItem = function () {
        //alert("Not implemented yet");
        var div = document.getElementById('divBacklog');
        var newItem = document.createElement('p');
        newItem.id = this.guidGenerator();
        var value = document.getElementById("newItem").value;
        if (value !== "") {
            newItem.innerText = value;
        }
        else {
            newItem.innerText = "???";
        }
        newItem.draggable = true;
        newItem.ondragstart = this.drag;
        this.AddClassToElement(newItem, "item");
        div.appendChild(newItem);
    };
    // helpers
    //This code is jQuery's
    Greeter.prototype.AddClassToElement = function (elem, value) {
        var rspaces = /\s+/;
        var classNames = (value || "").split(rspaces);
        var className = " " + elem.className + " ", setClass = elem.className;
        for (var c = 0, cl = classNames.length; c < cl; c++) {
            if (className.indexOf(" " + classNames[c] + " ") < 0) {
                setClass += " " + classNames[c];
            }
        }
        elem.className = setClass.replace(/^\s+|\s+$/g, ''); //trim
    };
    //This code is jQuery's
    Greeter.prototype.RemoveClassFromElement = function (elem, value) {
        var rspaces = /\s+/;
        var rclass = /[\n\t]/g;
        var classNames = (value || "").split(rspaces);
        var className = (" " + elem.className + " ").replace(rclass, " ");
        for (var c = 0, cl = classNames.length; c < cl; c++) {
            className = className.replace(" " + classNames[c] + " ", " ");
        }
        elem.className = className.replace(/^\s+|\s+$/g, ''); //trim
    };
    Greeter.prototype.guidGenerator = function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
    return Greeter;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
//# sourceMappingURL=Kanban.js.map