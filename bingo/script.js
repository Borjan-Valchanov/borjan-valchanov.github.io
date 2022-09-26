//#region Basic function and object definitions

// Define range function
const range = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

// Constructor for bingoTemplate object
function bingoTemplate(name, quotes, randomInsertLookup) {
	this.name = name;
	this.quotes = quotes;
	this.randomInsertLookup = randomInsertLookup;
}

// Constructor for randomInsertLookup object
function randomInsertLookup(keyword, inserts) {
	this.keyword = keyword;
	this.inserts = inserts;
}

//#endregion

//#region Bingo Generation Data

herrman_quotes = [
	"Also ich will dass wir wollen",
	"Die Lösung bietet uns der Taschenrechner",
	"Jeder Betrugsversuch wird mit der dafür vorhergesehenen Note 6 bewertet",
	"Mobiles Endgerät",
	"Die Damen und Herren",
	"Ruge, Handy.",
	"Viel Spaß im nachfolgenden Programm",
	"Eine$nornot:0$ $kleinfeinetc:0$$nornot:0$, $kleinfeinetc:1$$nornot:0$, $kleinfeinetc:2$$nornot:0$, $kleinfeinetc:3$$nornot:0$...",
	"Moppelkotze",
	"Ja, aber habt ihr von mir etwas anderes erwartet?",
	"$name:0$, Essen weg",
	"Wir wollen vergleichen",
	"Wir befinden uns in der Situation, dass...",
	"Kein Bodyshaming",
	"Nach Sek 1 Verordnung...",
	"Quatsch mit Soße",
	"Jurij, Mütze.",
	"Wir begeben uns an unsere Plätze",
	"$name:0$, hinsetzen.",
	"Kommt zur Ruhe",
	"Die Lösung hätte ich gerne",
	"In Ordnung",
	"Ham wa aber nicht",
	"Das jetzt bitte nicht mitschreiben",
	"Das wage ich zu bezweifeln",
	"$name:0$, an deinen Platz.",
	"Kurzer Hinweis",
	"Kommt zur Ruhe",
	"$name:0$, Ruhe",
	"Fatalerweise",
	"Ich wünsche einen wunderschönen Guten Morgen",
	"Programm für heute...",
	"Übungsphase",
	"...entsprechend...",
	"Die Spannung steigt$insUnermessliche:0$.",
	"durchwachsen",
	"Nach dem großen Erfolg von...",
	"Wann haben wir?",
	"Ey, Leute.",
	"$name:0$, mitschreiben.",
	"Wir gehen hier davon aus, dass...",
	"In Hinsicht darauf...",
	"An eure Plätze",
	"Dazu werden wir gleich kommen"
];

herrmann_inserts = [
	new randomInsertLookup("name", [
		"Abraham",
		"Lukas",
		"Otto",
		"Ruge",
		"Konrad"
	]),
	new randomInsertLookup("nornot", [
		"n",
		""
	]),
	new randomInsertLookup("insUnermessliche", [
		" ins Unermessliche",
		""
	]),
	new randomInsertLookup("kleinfeinetc", [
		"süße",
		"niedliche",
		"kleine",
		"feine"
	])
]

hoffmann_quotes = [
	"Deutsche Sprache, schwierige Sprache",
	"Ihr werdet alle noch mal dumm sterben",
	"Jetzt strengt mal eure drei Gehirnzellen an",
	"Ich krieg dann Zuckungen, und dann kann ich auch für nichts mehr garantieren",
	"Ich ruf dann mal deine Eltern an, schön auf einen Freitagabend."
];

// Laying out bingo options
quotemap = [
	new bingoTemplate("Herr Herrmann", herrman_quotes, herrmann_inserts),
	new bingoTemplate("Standard 0 - 50", range(0, 51), []),
	new bingoTemplate("Standard 50 - 100", range(50, 101), []),
	new bingoTemplate("Standard 0 - 100", range(0, 101), []),
	new bingoTemplate("Standard 100 - 200", range(100, 201), []),
	new bingoTemplate("Standard 0 - 500", range(0, 501), [])
];

//#endregion

// Render main screen as soon as the page has loaded
window.onload = function() {
	MainScreen();
};

//#region Bingo Dialogues

function MainScreen() {
	BodyReset();

	var buttonArea = document.createElement("div");

	buttonArea.className = "centered";

	quotemap.forEach(element => {
		var button = document.createElement("button");
		button.className = "button large-button";
		button.innerHTML = element.name;
		button.onclick = function() {BingoDialog(element.quotes, element.randomInsertLookup);};
		buttonArea.appendChild(button);
	});

	buttonArea.appendChild(githubLink());

	document.body.appendChild(buttonArea);
}

function BingoDialog(quotes, randomInsertLookup) {
	BodyReset();

	var dialog = document.createElement("div");
	dialog.className = "centered layered";

	var settingLayer = document.createElement("div");
	
	size = 5;

	var dialogLabel = document.createElement("label");
	dialogLabel.className = "dialog-label"
	dialogLabel.innerHTML = "Größe festlegen:"

	var dialogSubmitButton = document.createElement("button");
	dialogSubmitButton.className = "button large-button";
	dialogSubmitButton.innerHTML = "Los!";
	dialogSubmitButton.onclick = function() {StartBingo(size, quotes, randomInsertLookup)};

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

	dialog.appendChild(githubLink());

	document.body.appendChild(dialog);
}

function StartBingo(size, quotes, randomInsertLookup) {
	// Clear Screen
	BodyReset();

	// Initiate queue in order to provide equal distribution of randomly picked quotes
	quoteQueue = [];

	// DOM Element for holding all rows of tiles of the bingo
	var bingo = document.createElement("div");
	bingo.className = "centered layered";

	// Iterate y coordinate of the tile to be worked on
	for (i = 0; i < size; i++) {
		// Create layer for each "row" of matching y coordinates
		var layer = document.createElement("div");

		// Iterate over x coordinate (this will be repeated for each layer, thus y coordinate, as this is nested in the y loop, creating a total amount of size^2 tiles)
		for (j = 0; j < size; j++) {

			//#region DOM Element Creation + Styling

			// Create a tile
			var tile = document.createElement("button");
			
			// CSS Stuff
			tile.className = "button tile";

			// Fancy dynamic screen size stuff... hope I'll never have to understand this again

			// Calculate the side length of the entire bingo; this is 90% of "vmin"
			bingoSideLength = 0.9 * ((window.innerWidth > window.innerHeight) ? window.innerHeight : window.innerWidth);

			// Calculate what the size of the tile should be;
			// this is 
				// the side length of the bingo
			// minus
				// a certain percentage (that will be used as margin around the tiles)
				// times
				// the amount of tiles on one axis minus 1 (as the outer tiles do not need margin)
			//
			// These values originate from testing; at bingoSideLength == 872.1 a margin of 5px seemed to work.
			// Because two neighbouring tiles both have margin, the double (10px) is used here.
			tileSize = (bingoSideLength - ((bingoSideLength * (10 / 872.1)) * (size - 1))) / size;
			tile.style.width = tileSize + "px";
			tile.style.height = tileSize + "px";

			// Look at the comments above, should make this easier to understand
			tile.style.borderRadius = (0.08 * tileSize) + "px";
			tile.style.margin = (bingoSideLength * (5 / 872.1)) + "px";

			//#endregion

			// If the quote queue is empty, refill it using the originally passed quotes
			if (quoteQueue.length == 0) {
				quoteQueue = [...quotes];
			}

			// Generate a random index for a quote from the queue
			quote = Math.floor(Math.random() * quoteQueue.length);

			// Initialise a DOM element to hold the tiles text
			var text = document.createElement("div");

			// Here is where the quote assignment magic happens
			// First, we assign the actual quote of type string to a new variable
			// using the random index we generated before
			quoteRendered = quoteQueue[quote];
			// We then iterate over every entry in the lookup for random inserts
			randomInsertLookup.forEach(element => {
				// We're bringing back the queueing feature for the inserts!
				// Also, this is not how I should comment my code in an exam...
				// Anyways, initially, we fill up the queue with all inserts
				insertsQueue = [...element.inserts];

				// I really like how clean this for loop looks
				// We initialise a variable insertInstance as 0
				// and increase it as long as there is a reference to it contained in the quote.
				// For each value of insertInstance that we come across we replace all occurrences with an insert that is specific to this instance
				// This way we can control wether we want random inserts we use to have the same or different values
				for (
					insertInstance = 0;
					quoteRendered.includes("$" + element.keyword + ":" + insertInstance + "$");
					insertInstance++
				) {
					// Generate a random index for an index
					chosenInsert = Math.floor(Math.random() * insertsQueue.length);
					// Insert the insert in suitable locations
					quoteRendered = quoteRendered.replaceAll("$" + element.keyword + ":" + insertInstance + "$", insertsQueue[chosenInsert]);
					// Remove used insert from the queue
					insertsQueue.splice(chosenInsert, 1);

					// Replenish queue if it is empty
					if (insertsQueue.length == 0) {
						insertsQueue = [...element.inserts];
					}
				}
			});

			text.innerHTML = quoteRendered;
			text.className = "tile-text";
			text.style.fontSize = Math.floor(tileSize * (24 / 211)) + "px";
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

	bingo.appendChild(githubLink());

	document.body.appendChild(bingo);
}

//#endregion

//#region Project-specific DOM functions

function githubLink() {
	var githubLink = document.createElement("a");
	githubLink.className = "github-link";
	githubLink.href = "https://github.com/Borjan-Valchanov/web-bingo/";
	githubLink.target = "_top";
	githubLink.innerHTML = "Zum GitHub-Projekt";
	return githubLink;
}

function BodyReset() {
	document.body.childNodes.forEach(child => {
		child.remove();
	});
}

//#endregion