# MMM-SwissLakeTemperature
Display the temperature of a Swiss lake at a given point on your MagicMirror.

This module uses data from the [Alplakes API](https://www.alplakes.eawag.ch/api)
*(formerly the EPFL [Meteolakes API](http://meteolakes.ch/#!/data))*.


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
			latitude: '47.36539',
			longitude: '8.54305',
			lake: 'zurich',
			depth: '1'
		}
	},
]
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `latitude`       | Latitude (x-coordinate) of the point in the lake (WGS 84). <br><br>**Type:** `String` <br>Default 47.36539 (pointing to Zurich Bellevue)
| `longitude `     | Longitude (y-coordinate) of the point in the lake (WGS 84). <br><br>**Type:** `String` <br>Default 8.54305 (pointing to Zurich Bellevue)
| `lake `          | The desired lake to measure the temperature.<br>[Check available lakes here](https://www.alplakes.eawag.ch/api) (go down to Schemas > Lakes > Enum) <br><br>**Type:** `String` <br>Default zurich
| `depth`          | Depth where the water temperature should be measured (in metres). <br><br>**Type:** `String` <br>Default 1

## Dependencies

This module uses the [Alplakes API](https://www.alplakes.eawag.ch/api) which is free and does not require a key.

## Find the WGS 84 coordinates
1. Go to https://map.geo.admin.ch/.
2. Find your lake and press right click on the desired point.
3. Get the coordinates where it says «WGS 84 (lat/lon)».

![Coordinates](https://github.com/roufri/MMM-SwissLakeTemperature/blob/main/screenshots/coordinates.png)

