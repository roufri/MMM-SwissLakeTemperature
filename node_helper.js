const NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({
	socketNotificationReceived: function (notification, payload) {
		switch (notification) {
			case "LOAD_WATER_DATA":
				console.log("Fetch water data from " + payload);
				// send request to get json from https://www.alplakes.eawag.ch/api
				request(
					{
						url: payload,
						encoding: null,
						method: "GET"
					},
					(error, response, body) => {
						if (!error) {
							if (response.statusCode === 200) {
								var lakeData = JSON.parse(body);

								var depth = Math.round(lakeData.depth.data * 10) / 10;
								var temperature = Math.round(lakeData.variables.temperature.data[0] * 10) / 10;

								console.log("Fetched water data: " + temperature + " at " + depth);

								var waterData = {
									"temperature": temperature,
									"depth": depth
								}

								this.sendSocketNotification("LOADED_WATER_DATA", waterData);
							} else if (response.statusCode > 400) {
								console.log("No file found at url " + payload);
							}
						} else {
							console.log("Error for request at " + payload);
						}
					}
				); // end request
				break;
		}
	},
})