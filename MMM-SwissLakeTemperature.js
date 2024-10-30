Module.register("MMM-SwissLakeTemperature", {
	defaults: {
		// default Coordinates are pointing to Zurich Bellevue
		latitude: '47.36539',
		longitude: '8.54305',
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
				var waterData = payload;

				var temperatureDiv = document.getElementById("temperatureDiv");
				temperatureDiv.innerHTML = ""; // overwrite loading text

				var symbol = document.createElement("span");
				symbol.className = "symbol fas " + this.getSymbolClassForTemperature(waterData.temperature);

				var text = document.createTextNode(waterData.temperature + "°C in " + waterData.depth + "m Tiefe");

				temperatureDiv.appendChild(symbol);
				temperatureDiv.appendChild(text);
				console.log("UPDATED WATER DATA: " + waterData.temperature + " at " + waterData.depth);
				break;
		}
	},
	getRequestUrl: function() {
		var latitude = this.config.latitude;
		var longitude = this.config.longitude;
		var lake = this.config.lake;
		var depth = this.config.depth;

		var now = new Date();
		var threeHoursBack = new Date(now.getTime() - (1000 * 60 * 60 * 3));

		var endTime = this.formatDateToUTC(now);
		var startTime = this.formatDateToUTC(threeHoursBack);

		return `https://alplakes-api.eawag.ch/simulations/point/delft3d-flow/${lake}/${startTime}/${endTime}/${depth}/${latitude}/${longitude}`;
	},
	formatDateToUTC: function(date) {
		const year = date.getUTCFullYear();
		const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // months are zero-based
		const day = String(date.getUTCDate()).padStart(2, '0');
		const hours = String(date.getUTCHours()).padStart(2, '0');
		const minutes = String(date.getUTCMinutes()).padStart(2, '0');

		return `${year}${month}${day}${hours}${minutes}`;
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
