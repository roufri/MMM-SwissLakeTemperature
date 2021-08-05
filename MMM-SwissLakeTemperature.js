Module.register("MMM-SwissLakeTemperature", {
	defaults: {
		// default Coordinates are pointing to Zurich Bellevue
		xCoordinate: '683474',
		yCoordinate: '246769',
		lake: 'zurich',
		depth: '1'
	},
	getStyles: function () {
		return ["custom.css", "font-awesome.css"];
	},
	start: function () {
		this.url = '';
	},
	getDom: function () {
		var temperatureDiv = document.createElement("div");
		temperatureDiv.id = "temperatureDiv";
		temperatureDiv.innerHTML = "Loading water temperature...";

		return temperatureDiv;
	},
	notificationReceived: function (notification, payload, sender) {
		switch (notification) {
			case "DOM_OBJECTS_CREATED":
				// initial data load
				console.log("Url: " + this.getRequestUrl());
				this.sendSocketNotification("LOAD_WATER_DATA", this.getRequestUrl());

				// update every 1.0 hours
				var time = setInterval(() => {
					this.sendSocketNotification("LOAD_WATER_DATA", this.getRequestUrl());
				}, (1000 * 60 * 60 * 1.0))
				break;
		}
	},
	socketNotificationReceived: function (notification, payload) {
		switch (notification) {
			case "LOADED_WATER_DATA":
				var data = JSON.parse(payload);

				var temperatureDiv = document.getElementById("temperatureDiv");
				temperatureDiv.innerHTML = ""; // overwrite loading text

				var symbol = document.createElement("span");
				symbol.className = "symbol fas " + this.getSymbolClassForTemperature(data.temperature);

				var text = document.createTextNode(data.temperature + "°C in " + data.depth + "m Tiefe");

				temperatureDiv.appendChild(symbol);
				temperatureDiv.appendChild(text);
				console.log("UPDATED WATER DATA: " + data.temperature + " at " + data.depth);
				break;
		}
	},
	getRequestUrl: function() {
		var xCoord = this.config.xCoordinate;
		var yCoord = this.config.yCoordinate;
		var lake = this.config.lake;
		var depth = this.config.depth;
		var endTime = Date.now();
		var startTime = endTime - (1000 * 60 * 60); // 1 hour back

		return `http://meteolakes.ch/api/coordinates/${xCoord}/${yCoord}/${lake}/temperature/${startTime}/${endTime}/${depth}`;
	},
	/**
	 * Get the temperature-dependent css-class (icon + color)
	 * https://fontawesome.com/icons?d=gallery&q=thermometer
	 *
	 * @param temperature in celsius
	 * @returns a String with the class-name
	 */
	getSymbolClassForTemperature: function (temperature) {
		if (temperature >= 22) {
			return "fa-thermometer-full temp-hot";
		} else if (temperature >= 18) {
			return "fa-thermometer-three-quarters temp-warm";
		} else if (temperature >= 10) {
			return "fa-thermometer-half temp-average";
		} else if (temperature >= 5) {
			return "fa-thermometer-quarter temp-cold";
		} else {
			return "fa-thermometer-empty temp-freezing";
		}
	}
});
