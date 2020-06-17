# GraphQL API - Sundata API

## Run

`node ./src/index_sun.js`

### Supported Types

SunData

- location
- date
- time
- type (SUNRISE | SUNSET)

### Supported Queries Examples

Get sunset and sunrise times for given dates (from is inclusive, to is exclusive) and locations

```query getSunTimes($from: String!,$to:String!, $locations:[String!]! ){
  getSunTimesForLocations(from: $from, to: $to, locations: $locations){
    date
    time
    type
    location
  }

}
```

For example with variables:

```
{"from": "17-Jun-20", "to":"19-Jun-20", "locations": ["LONDON", "PLYMOUTH"]}
```
