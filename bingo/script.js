function bingoTemplate(name, quotes) {
	this.name = name;
	this.quotes = quotes;
}

bingoTemplateConstructor = {

}

herrman_quotes = [
	"Also ich will dass wir wollen",
	"Die Lösung bietet uns der Taschenrechner",
	"Jeder Betrugsversuch wird mit der dafür vorhergesehenen Note 6 bewertet",
	"Mobiles Endgerät",
	"Die Damen und Herren",
	"Ruge, Handy.",
	"Viel Spaß im nachfolgenden Programm",
	"Eine(n) kleine(n), niedliche(n), feine(n)...",
	"Moppelkotze",
	"Ja, aber habt ihr von mir etwas anderes erwartet?",
	"Essen weg",
	"Wir wollen vergleichen",
	"Wir befinden uns in der Situation, dass...",
	"Kein Bodyshaming",
	"Nach Sek 1 Verordnung...",
	"Quatsch mit Soße",
	"Jurij, Mütze."
];

hoffmann_quotes = [
	"Deutsche Sprache, schwierige Sprache",
	"Ihr werdet alle noch mal dumm sterben",
	"Jetzt strengt mal eure drei Gehirnzellen an",
	"Ich krieg dann Zuckungen, und dann kann ich auch für nichts mehr garantieren",
	"Ich ruf dann mal deine Eltern an, schön auf einen Freitagabend."
];

quotemap = [
	new bingoTemplate("Herr Herrmann", herrman_quotes)
];

window.onload = function() {
	MainScreen();
};

function MainScreen() {
	BodyReset();

	var buttonArea = document.createElement("div");

	buttonArea.className = "centered";

	quotemap.forEach(element => {
		var button = document.createElement("button");
		button.className = "button large-button";
		button.innerHTML = element.name;
		button.onclick = function() {BingoDialog(element.quotes);};
		buttonArea.appendChild(button);
	});

	
	var githubLink = document.createElement("a");
	githubLink.className = "github-link";
	githubLink.href = "https://github.com/Borjan-Valchanov/web-bingo/";
	githubLink.innerHTML = "Zum GitHub-Projekt";
	buttonArea.appendChild(githubLink);

	document.body.appendChild(buttonArea);
}

function BingoDialog(quotes) {
	BodyReset();

	var dialog = document.createElement("div");
	dialog.className = "centered layered";

	var settingLayer = document.createElement("div");
	
	size = 4;

	var dialogLabel = document.createElement("label");
	dialogLabel.className = "dialog-label"
	dialogLabel.innerHTML = "Größe festlegen:"

	var dialogSubmitButton = document.createElement("button");
	dialogSubmitButton.className = "button large-button";
	dialogSubmitButton.innerHTML = "Los!";
	dialogSubmitButton.onclick = function() {StartBingo(size, quotes)};

	var sizeDisplay = document.createElement("label");
	sizeDisplay.className = "size-display";
	sizeDisplay.innerHTML = size;

	var decreaseButton = document.createElement("button");
	decreaseButton.className = "button num-button";
	decreaseButton.innerHTML = "-";
	decreaseButton.onclick = function () {
		if ( size > 2 ) {
			size--;
			sizeDisplay.innerHTML = size;
		}
	};

	var increaseButton = document.createElement("button");
	increaseButton.className = "button num-button";
	increaseButton.innerHTML = "+";
	increaseButton.onclick = function () {
		if ( size < 9 ) {
			size++;
			sizeDisplay.innerHTML = size;
		}
	};

	settingLayer.appendChild(decreaseButton);
	settingLayer.appendChild(sizeDisplay);
	settingLayer.appendChild(increaseButton);

	dialog.appendChild(dialogLabel);
	dialog.appendChild(settingLayer);
	dialog.appendChild(dialogSubmitButton);

	var githubLink = document.createElement("a");
	githubLink.className = "github-link";
	githubLink.href = "https://github.com/Borjan-Valchanov/web-bingo/";
	githubLink.innerHTML = "Zum GitHub-Projekt";
	dialog.appendChild(githubLink);

	document.body.appendChild(dialog);
}

function StartBingo(size, quotes) {
	BodyReset();

	quoteQueue = [];

	var bingo = document.createElement("div");
	bingo.className = "centered layered";

	for (i = 0; i < size; i++) {
		var layer = document.createElement("div");
		for (j = 0; j < size; j++) {

			var tile = document.createElement("button");
			
			tile.className = "button tile";

			bingoSideLength = 0.9 * ((window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth);
			tileSize = (bingoSideLength - (10 * (size - 1))) / size;
			tile.style.width = tileSize + "px";
			tile.style.height = tileSize + "px";
			tile.style.borderRadius = (0.08 * tileSize) + "px";

			if (quoteQueue.length == 0) {
				quoteQueue = [...quotes];
			}

			quote = Math.floor(Math.random() * quoteQueue.length);

			var text = document.createElement("div");
			text.innerHTML = quoteQueue[quote];
			text.className = "tile-text";
			text.style.fontSize = ((16 - size) * (16 / 11)) + "px";
			text.style.width = tileSize + "px";
			text.style.height = tileSize + "px";
			tile.appendChild(text);

			tile.onclick = function() {
				this.className = "button tile tile-clicked";
				this.childNodes[0].className = "tile-text tile-text-clicked";
				this.childNodes[0].style.backgroundColor = "none";
			};
			
			quoteQueue.splice(quote, 1);

			layer.appendChild(tile);
		}
		bingo.appendChild(layer);
	}

	var githubLink = document.createElement("a");
	githubLink.className = "github-link";
	githubLink.href = "https://github.com/Borjan-Valchanov/web-bingo/";
	githubLink.innerHTML = "Zum GitHub-Projekt";
	bingo.appendChild(githubLink);

	document.body.appendChild(bingo);
}

function BodyReset() {
	document.body.childNodes.forEach(child => {
		child.remove();
	});
}