class Greeter {
	element: HTMLElement;
	span: HTMLElement;
	timerToken: number;

	constructor(element: HTMLElement) {
		this.element = element;
		this.element.innerHTML += "The time is: ";
		this.span = document.createElement('span');
		this.element.appendChild(this.span);
		this.span.innerText = new Date().toUTCString();
	}

	start() {
		this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
	}

	stop() {
		clearTimeout(this.timerToken);
	}

	// Drag and Drop
	allowDrop(ev) {
		ev.preventDefault();
	}

	drag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
	}

	drop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		ev.target.appendChild(document.getElementById(data));
	}

	// Buttons
	AddNewItem()
	{
		//alert("Not implemented yet");
		var div = document.getElementById('divBacklog');
		var newItem = document.createElement('p');
		newItem.id = "123456";
		var value = (<HTMLInputElement>document.getElementById("newItem")).value;
		if (value !== "") newItem.innerText = value
		else newItem.innerText = "???";
		newItem.draggable = true;
		newItem.ondragstart = this.drag;
		div.appendChild(newItem);
	}

	// helpers
	//This code is jQuery's
	AddClassToElement(elem, value) {
		var rspaces = /\s+/;
		var classNames = (value || "").split(rspaces);
		var className = " " + elem.className + " ",
			setClass = elem.className;
		for (var c = 0, cl = classNames.length; c < cl; c++) {
			if (className.indexOf(" " + classNames[c] + " ") < 0) {
				setClass += " " + classNames[c];
			}
		}
		elem.className = setClass.replace(/^\s+|\s+$/g, '');//trim
	}


	//This code is jQuery's
	RemoveClassFromElement(elem, value) {
		var rspaces = /\s+/;
		var rclass = /[\n\t]/g
		var classNames = (value || "").split(rspaces);
		var className = (" " + elem.className + " ").replace(rclass, " ");
		for (var c = 0, cl = classNames.length; c < cl; c++) {
			className = className.replace(" " + classNames[c] + " ", " ");
		}
		elem.className = className.replace(/^\s+|\s+$/g, '');//trim
	}
}

window.onload = () => {
	var el = document.getElementById('content');
	var greeter = new Greeter(el);
	greeter.start();
};