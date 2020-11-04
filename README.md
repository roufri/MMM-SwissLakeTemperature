# MMM-SwissLakeTemperature
Display the temperature of a Swiss lake at a given point on your MagicMirror.

This module uses data from EPFL [Meteolakes API](http://meteolakes.ch/#!/data).


## Example screenshots

![Hot](https://github.com/roufri/MMM-SwissLakeTemperature/blob/main/screenshots/screenshot_temp_hot.png)

![Warm](https://github.com/roufri/MMM-SwissLakeTemperature/blob/main/screenshots/screenshot_temp_warm.png)

![Average](https://github.com/roufri/MMM-SwissLakeTemperature/blob/main/screenshots/screenshot_temp_average.png)

![Cold](https://github.com/roufri/MMM-SwissLakeTemperature/blob/main/screenshots/screenshot_temp_cold.png)

![Freezing](https://github.com/roufri/MMM-SwissLakeTemperature/blob/main/screenshots/screenshot_temp_freezing.png)

## Installation

Navigate into your MagicMirror's modules folder:

```shell
cd ~/MagicMirror/modules
```
Clone this repository:
```shell
git clone https://github.com/roufri/MMM-SwissLakeTemperature
```
Configure the module in your config.js file.


## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
modules: [
	{
			module: 'MMM-SwissLakeTemperature',
			position: 'top_left',
			header: 'Water temperature',
			config: {
				xCoordinate: '683474',
				yCoordinate: '246769',
				lake: 'zurich',
				depth: '2'
			}
		},
]
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `xCoordinate`        | X-Coordinate of the point in the lake (CH1903/LV03). <br><br>**Type:** `String` <br>Default 683474 (pointing to Zurich Bellevue)
| `yCoordinate `        | Y-Coordinate of the point in the lake (CH1903/LV03). <br><br>**Type:** `String` <br>Default 246769 (pointing to Zurich Bellevue)
| `lake `        | The desired lake to measure the temperature. [Check available lakes here](http://meteolakes.ch/#!/data) <br><br>**Type:** `String` <br>Default zurich
| `depth`        | Depth where the water temperature should be measured (in metres). <br><br>**Type:** `String` <br>Default 1

## Dependencies

This module uses the [Meteolakes API](http://meteolakes.ch/#!/data) which is free and does not require a key.

## Find the CH1903/LV03-Coordinate
1. Go to https://map.geo.admin.ch/.
2. Find your lake and press right click on the desired point.
3. Get the coordinates where it says «CH1903/LV03».

![Coordinates](https://github.com/roufri/MMM-SwissLakeTemperature/blob/main/screenshots/coordinates.png)

