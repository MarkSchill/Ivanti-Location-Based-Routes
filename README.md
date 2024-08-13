### Features

- Support for JSON configuration files
- Allows for rapid generation of Ivanti import files for Location Based Routes

# Ivanti-Location-Based-Routes.md

#### Usage

In order to use this script you will need to generate a configuration file called config.json.  In this script you will define the assignment maps that are being used per location which will allow the dynamic generation of the import sheet.  Please see the example config file below:

####JSON Config

```json
{
	{
		"company": "<Company name>",
		"categorization":
		{
			"<Categories>": {
				"<Services>": [
					"<Symptoms>"
				]
			}
		},

		"maps": [
			{
				"company": "<Company name>",
				"map": [
					{
						"name": "Site 1",
						"group": "Site 1 Desktop Support"
					},
					{
						"name": "Site 2",
						"group": "Site 2 Desktop Support"
					},
					{
						"name": "Site 3",
						"group": "Remote Desktop Support"
					}
				]
			}
		]
	}
}
```