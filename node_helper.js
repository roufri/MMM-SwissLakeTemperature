const NodeHelper = require("node_helper");
const request = require("request");

module.exports = NodeHelper.create({
	socketNotificationReceived: function (notification, payload) {
		switch (notification) {
			case "LOAD_WATER_DATA":
				console.log("Fetch water data from " + payload);
				// send request to get csv from http://meteolakes.ch/#!/data
				request(
					{
						url: payload,
						encoding: null,
						method: "GET"
					},
					(error, response, body) => {
						if (!error) {
							if (response.statusCode === 200) {
								var waterData = body.toString('utf8').split('\n')[1].split(',');

								var depth = Math.abs(parseFloat(waterData[0]));
								var temperature = parseFloat(waterData[1]).toFixed(1);
								console.log("Fetched water data: " + temperature + " at " + depth);
								var waterData = {
									"temperature": temperature,
									"depth": depth
								}

								this.sendSocketNotification("LOADED_WATER_DATA", JSON.stringify(waterData));
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
