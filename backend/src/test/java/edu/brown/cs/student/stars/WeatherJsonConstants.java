package edu.brown.cs.student.stars;

public class WeatherJsonConstants {

  public static final String POINTS_RESPONSE_JSON =
      "{\n"
          + "    \"@context\": [\n"
          + "        \"https://geojson.org/geojson-ld/geojson-context.jsonld\",\n"
          + "        {\n"
          + "            \"@version\": \"1.1\",\n"
          + "            \"wx\": \"https://api.weather.gov/ontology#\",\n"
          + "            \"s\": \"https://schema.org/\",\n"
          + "            \"geo\": \"http://www.opengis.net/ont/geosparql#\",\n"
          + "            \"unit\": \"http://codes.wmo.int/common/unit/\",\n"
          + "            \"@vocab\": \"https://api.weather.gov/ontology#\",\n"
          + "            \"geometry\": {\n"
          + "                \"@id\": \"s:GeoCoordinates\",\n"
          + "                \"@type\": \"geo:wktLiteral\"\n"
          + "            },\n"
          + "            \"city\": \"s:addressLocality\",\n"
          + "            \"state\": \"s:addressRegion\",\n"
          + "            \"distance\": {\n"
          + "                \"@id\": \"s:Distance\",\n"
          + "                \"@type\": \"s:QuantitativeValue\"\n"
          + "            },\n"
          + "            \"bearing\": {\n"
          + "                \"@type\": \"s:QuantitativeValue\"\n"
          + "            },\n"
          + "            \"value\": {\n"
          + "                \"@id\": \"s:value\"\n"
          + "            },\n"
          + "            \"unitCode\": {\n"
          + "                \"@id\": \"s:unitCode\",\n"
          + "                \"@type\": \"@id\"\n"
          + "            },\n"
          + "            \"forecastOffice\": {\n"
          + "                \"@type\": \"@id\"\n"
          + "            },\n"
          + "            \"forecastGridData\": {\n"
          + "                \"@type\": \"@id\"\n"
          + "            },\n"
          + "            \"publicZone\": {\n"
          + "                \"@type\": \"@id\"\n"
          + "            },\n"
          + "            \"county\": {\n"
          + "                \"@type\": \"@id\"\n"
          + "            }\n"
          + "        }\n"
          + "    ],\n"
          + "    \"id\": \"https://api.weather.gov/points/41.8268,-71.4029\",\n"
          + "    \"type\": \"Feature\",\n"
          + "    \"geometry\": {\n"
          + "        \"type\": \"Point\",\n"
          + "        \"coordinates\": [\n"
          + "            -71.402900000000002,\n"
          + "            41.826799999999999\n"
          + "        ]\n"
          + "    },\n"
          + "    \"properties\": {\n"
          + "        \"@id\": \"https://api.weather.gov/points/41.8268,-71.4029\",\n"
          + "        \"@type\": \"wx:Point\",\n"
          + "        \"cwa\": \"BOX\",\n"
          + "        \"forecastOffice\": \"https://api.weather.gov/offices/BOX\",\n"
          + "        \"gridId\": \"BOX\",\n"
          + "        \"gridX\": 64,\n"
          + "        \"gridY\": 64,\n"
          + "        \"forecast\": \"https://api.weather.gov/gridpoints/BOX/64,64/forecast\",\n"
          + "        \"forecastHourly\": \"https://api.weather.gov/gridpoints/BOX/64,64/forecast/hourly\",\n"
          + "        \"forecastGridData\": \"https://api.weather.gov/gridpoints/BOX/64,64\",\n"
          + "        \"observationStations\": \"https://api.weather.gov/gridpoints/BOX/64,64/stations\",\n"
          + "        \"relativeLocation\": {\n"
          + "            \"type\": \"Feature\",\n"
          + "            \"geometry\": {\n"
          + "                \"type\": \"Point\",\n"
          + "                \"coordinates\": [\n"
          + "                    -71.418784000000002,\n"
          + "                    41.823056000000001\n"
          + "                ]\n"
          + "            },\n"
          + "            \"properties\": {\n"
          + "                \"city\": \"Providence\",\n"
          + "                \"state\": \"RI\",\n"
          + "                \"distance\": {\n"
          + "                    \"unitCode\": \"wmoUnit:m\",\n"
          + "                    \"value\": 1380.4369590568999\n"
          + "                },\n"
          + "                \"bearing\": {\n"
          + "                    \"unitCode\": \"wmoUnit:degree_(angle)\",\n"
          + "                    \"value\": 72\n"
          + "                }\n"
          + "            }\n"
          + "        },\n"
          + "        \"forecastZone\": \"https://api.weather.gov/zones/forecast/RIZ002\",\n"
          + "        \"county\": \"https://api.weather.gov/zones/county/RIC007\",\n"
          + "        \"fireWeatherZone\": \"https://api.weather.gov/zones/fire/RIZ002\",\n"
          + "        \"timeZone\": \"America/New_York\",\n"
          + "        \"radarStation\": \"KBOX\"\n"
          + "    }\n"
          + "}";

  public static final String FORECAST_RESPONSE_JSON =
      "{\n"
          + "    \"@context\": [\n"
          + "        \"https://geojson.org/geojson-ld/geojson-context.jsonld\",\n"
          + "        {\n"
          + "            \"@version\": \"1.1\",\n"
          + "            \"wx\": \"https://api.weather.gov/ontology#\",\n"
          + "            \"geo\": \"http://www.opengis.net/ont/geosparql#\",\n"
          + "            \"unit\": \"http://codes.wmo.int/common/unit/\",\n"
          + "            \"@vocab\": \"https://api.weather.gov/ontology#\"\n"
          + "        }\n"
          + "    ],\n"
          + "    \"type\": \"Feature\",\n"
          + "    \"geometry\": {\n"
          + "        \"type\": \"Polygon\",\n"
          + "        \"coordinates\": [\n"
          + "            [\n"
          + "                [\n"
          + "                    -71.3837762,\n"
          + "                    41.861357300000002\n"
          + "                ],\n"
          + "                [\n"
          + "                    -71.388849500000006,\n"
          + "                    41.839880600000001\n"
          + "                ],\n"
          + "                [\n"
          + "                    -71.360011700000001,\n"
          + "                    41.836098100000001\n"
          + "                ],\n"
          + "                [\n"
          + "                    -71.354932399999996,\n"
          + "                    41.857574499999998\n"
          + "                ],\n"
          + "                [\n"
          + "                    -71.3837762,\n"
          + "                    41.861357300000002\n"
          + "                ]\n"
          + "            ]\n"
          + "        ]\n"
          + "    },\n"
          + "    \"properties\": {\n"
          + "        \"updated\": \"2022-10-14T19:07:43+00:00\",\n"
          + "        \"units\": \"us\",\n"
          + "        \"forecastGenerator\": \"BaselineForecastGenerator\",\n"
          + "        \"generatedAt\": \"2022-10-14T21:57:38+00:00\",\n"
          + "        \"updateTime\": \"2022-10-14T19:07:43+00:00\",\n"
          + "        \"validTimes\": \"2022-10-14T13:00:00+00:00/P8DT6H\",\n"
          + "        \"elevation\": {\n"
          + "            \"unitCode\": \"wmoUnit:m\",\n"
          + "            \"value\": 0.91439999999999999\n"
          + "        },\n"
          + "        \"periods\": [\n"
          + "            {\n"
          + "                \"number\": 1,\n"
          + "                \"name\": \"This Afternoon\",\n"
          + "                \"startTime\": \"2022-10-14T17:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-14T18:00:00-04:00\",\n"
          + "                \"isDaytime\": true,\n"
          + "                \"temperature\": 66,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"5 mph\",\n"
          + "                \"windDirection\": \"NW\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/day/bkn?size=medium\",\n"
          + "                \"shortForecast\": \"Partly Sunny\",\n"
          + "                \"detailedForecast\": \"Partly sunny, with a high near 66. Northwest wind around 5 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 2,\n"
          + "                \"name\": \"Tonight\",\n"
          + "                \"startTime\": \"2022-10-14T18:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-15T06:00:00-04:00\",\n"
          + "                \"isDaytime\": false,\n"
          + "                \"temperature\": 48,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"6 mph\",\n"
          + "                \"windDirection\": \"NW\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/night/sct?size=medium\",\n"
          + "                \"shortForecast\": \"Partly Cloudy\",\n"
          + "                \"detailedForecast\": \"Partly cloudy, with a low around 48. Northwest wind around 6 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 3,\n"
          + "                \"name\": \"Saturday\",\n"
          + "                \"startTime\": \"2022-10-15T06:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-15T18:00:00-04:00\",\n"
          + "                \"isDaytime\": true,\n"
          + "                \"temperature\": 70,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"6 mph\",\n"
          + "                \"windDirection\": \"W\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/day/skc?size=medium\",\n"
          + "                \"shortForecast\": \"Sunny\",\n"
          + "                \"detailedForecast\": \"Sunny, with a high near 70. West wind around 6 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 4,\n"
          + "                \"name\": \"Saturday Night\",\n"
          + "                \"startTime\": \"2022-10-15T18:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-16T06:00:00-04:00\",\n"
          + "                \"isDaytime\": false,\n"
          + "                \"temperature\": 48,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"3 to 7 mph\",\n"
          + "                \"windDirection\": \"S\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/night/few?size=medium\",\n"
          + "                \"shortForecast\": \"Mostly Clear\",\n"
          + "                \"detailedForecast\": \"Mostly clear, with a low around 48. South wind 3 to 7 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 5,\n"
          + "                \"name\": \"Sunday\",\n"
          + "                \"startTime\": \"2022-10-16T06:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-16T18:00:00-04:00\",\n"
          + "                \"isDaytime\": true,\n"
          + "                \"temperature\": 68,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"6 mph\",\n"
          + "                \"windDirection\": \"W\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/day/sct?size=medium\",\n"
          + "                \"shortForecast\": \"Mostly Sunny\",\n"
          + "                \"detailedForecast\": \"Mostly sunny, with a high near 68. West wind around 6 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 6,\n"
          + "                \"name\": \"Sunday Night\",\n"
          + "                \"startTime\": \"2022-10-16T18:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-17T06:00:00-04:00\",\n"
          + "                \"isDaytime\": false,\n"
          + "                \"temperature\": 48,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"6 mph\",\n"
          + "                \"windDirection\": \"SW\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/night/sct?size=medium\",\n"
          + "                \"shortForecast\": \"Partly Cloudy\",\n"
          + "                \"detailedForecast\": \"Partly cloudy, with a low around 48. Southwest wind around 6 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 7,\n"
          + "                \"name\": \"Monday\",\n"
          + "                \"startTime\": \"2022-10-17T06:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-17T18:00:00-04:00\",\n"
          + "                \"isDaytime\": true,\n"
          + "                \"temperature\": 65,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"3 to 10 mph\",\n"
          + "                \"windDirection\": \"S\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/day/rain_showers,60?size=medium\",\n"
          + "                \"shortForecast\": \"Rain Showers Likely\",\n"
          + "                \"detailedForecast\": \"Rain showers likely. Mostly cloudy, with a high near 65. South wind 3 to 10 mph. Chance of precipitation is 60%.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 8,\n"
          + "                \"name\": \"Monday Night\",\n"
          + "                \"startTime\": \"2022-10-17T18:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-18T06:00:00-04:00\",\n"
          + "                \"isDaytime\": false,\n"
          + "                \"temperature\": 50,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"5 to 9 mph\",\n"
          + "                \"windDirection\": \"SW\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/night/rain_showers,70?size=medium\",\n"
          + "                \"shortForecast\": \"Rain Showers Likely\",\n"
          + "                \"detailedForecast\": \"Rain showers likely. Mostly cloudy, with a low around 50. Southwest wind 5 to 9 mph. Chance of precipitation is 70%.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 9,\n"
          + "                \"name\": \"Tuesday\",\n"
          + "                \"startTime\": \"2022-10-18T06:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-18T18:00:00-04:00\",\n"
          + "                \"isDaytime\": true,\n"
          + "                \"temperature\": 58,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"5 to 8 mph\",\n"
          + "                \"windDirection\": \"SW\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/day/rain_showers,60/rain_showers,40?size=medium\",\n"
          + "                \"shortForecast\": \"Chance Rain Showers\",\n"
          + "                \"detailedForecast\": \"A chance of rain showers. Partly sunny, with a high near 58. Southwest wind 5 to 8 mph. Chance of precipitation is 60%.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 10,\n"
          + "                \"name\": \"Tuesday Night\",\n"
          + "                \"startTime\": \"2022-10-18T18:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-19T06:00:00-04:00\",\n"
          + "                \"isDaytime\": false,\n"
          + "                \"temperature\": 40,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"6 mph\",\n"
          + "                \"windDirection\": \"W\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/night/rain_showers/sct?size=medium\",\n"
          + "                \"shortForecast\": \"Slight Chance Rain Showers then Partly Cloudy\",\n"
          + "                \"detailedForecast\": \"A slight chance of rain showers before 11pm. Partly cloudy, with a low around 40. West wind around 6 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 11,\n"
          + "                \"name\": \"Wednesday\",\n"
          + "                \"startTime\": \"2022-10-19T06:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-19T18:00:00-04:00\",\n"
          + "                \"isDaytime\": true,\n"
          + "                \"temperature\": 56,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"5 to 12 mph\",\n"
          + "                \"windDirection\": \"W\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/day/few?size=medium\",\n"
          + "                \"shortForecast\": \"Sunny\",\n"
          + "                \"detailedForecast\": \"Sunny, with a high near 56. West wind 5 to 12 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 12,\n"
          + "                \"name\": \"Wednesday Night\",\n"
          + "                \"startTime\": \"2022-10-19T18:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-20T06:00:00-04:00\",\n"
          + "                \"isDaytime\": false,\n"
          + "                \"temperature\": 39,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"8 mph\",\n"
          + "                \"windDirection\": \"W\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/night/few?size=medium\",\n"
          + "                \"shortForecast\": \"Mostly Clear\",\n"
          + "                \"detailedForecast\": \"Mostly clear, with a low around 39. West wind around 8 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 13,\n"
          + "                \"name\": \"Thursday\",\n"
          + "                \"startTime\": \"2022-10-20T06:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-20T18:00:00-04:00\",\n"
          + "                \"isDaytime\": true,\n"
          + "                \"temperature\": 56,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"6 to 13 mph\",\n"
          + "                \"windDirection\": \"SW\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/day/few?size=medium\",\n"
          + "                \"shortForecast\": \"Sunny\",\n"
          + "                \"detailedForecast\": \"Sunny, with a high near 56. Southwest wind 6 to 13 mph.\"\n"
          + "            },\n"
          + "            {\n"
          + "                \"number\": 14,\n"
          + "                \"name\": \"Thursday Night\",\n"
          + "                \"startTime\": \"2022-10-20T18:00:00-04:00\",\n"
          + "                \"endTime\": \"2022-10-21T06:00:00-04:00\",\n"
          + "                \"isDaytime\": false,\n"
          + "                \"temperature\": 43,\n"
          + "                \"temperatureUnit\": \"F\",\n"
          + "                \"temperatureTrend\": null,\n"
          + "                \"windSpeed\": \"6 to 10 mph\",\n"
          + "                \"windDirection\": \"SW\",\n"
          + "                \"icon\": \"https://api.weather.gov/icons/land/night/sct?size=medium\",\n"
          + "                \"shortForecast\": \"Partly Cloudy\",\n"
          + "                \"detailedForecast\": \"Partly cloudy, with a low around 43. Southwest wind 6 to 10 mph.\"\n"
          + "            }\n"
          + "        ]\n"
          + "    }\n"
          + "}";
}
