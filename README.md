# Translator (Rosetta Home 2.0)

Translator is the end-user client for Rosetta Home. Rosetta Home 2.0 is an open source building performance monitoring platform which is located <a href="https://github.com/rosetta-home">here</a>. Translator is a web application meant for interaction with your Rosetta Home sensors (Touchstones). The backbone of the project is an lightweight version of <a href="https://facebook.github.io/react/">React</a> called <a href="https://preactjs.com/">Preact</a>. Webpack and babel-core are used for compiling the web app. Authentication is done through Bearer and tokens which are valid up to a month at a time. The application makes use of redux store for managing the data set from the Satori API.

Cloud backend for RosettaHome located <a href="https://github.com/rosetta-home/brood">here</a>.

### Essential Libraries

  - <a href="https://github.com/developit/preact">preact</a>
  - <a href="https://github.com/developit/preact-mdl">preact-mdl</a>
  - <a href="https://github.com/developit/preact-redux">preact-redux</a>
  - <a href="https://github.com/developit/preact-router">preact-router</a>
  - <a href="https://github.com/developit/preact-compat">preact-compat</a>
  - <a href="https://momentjs.com/">moment</a>
  - <a href="https://github.com/visionmedia/superagent">superagent</a>


### Supporting Documentation

- <a href="https://facebook.github.io/react/docs/installation.html">React installation</a>
- <a href="https://preactjs.com/guide/switching-to-preact">Switching to Preact</a>
- <a href="https://webpack.github.io/docs/">Webpack Documentation</a>
- <a href="https://www.satori.com/channels/rosetta-home">Satori Rosetta Home Channel</a>

### Features

- [ ] Authentication
  - [x] Login
  - [ ] Signup
  - [ ] Confirm Account
  - [ ] Recover Password
  - [ ] Two-Step Verification (Security Mind!)
- [x] Google <a href="https://material.io/guidelines/">Material Theme</a>
- [ ] Dashboard Charts
  - [x] Live Graph
  - [x] Bullet Chart
  - [x] Simple Data Point with Brush
  - [x] Multi Data Points with Brush
  - [x] Radial Compare
  - [x] Spark Graph
  - [ ] Now Card
  - [ ] Date Range Picker
- [ ] Web App Life Cycle
  - [x] Detect UnAuth User
  - [x] Changes Current Route
  - [x] NavBar Title Change (Uses on-broadcast-emitter)
  - [x] SideMenu Options Change (Uses on-broadcast-emitter)
  - [ ] Footer
  - [x] Login Page
  - [x] Dashboard Page
  - [x] Setup Page
  - [ ] Signup Page

### Project Structure

  - src/
    - auth
    - components/
      - elements (Graphs)
      - layout (App layout components -> header,sidemenu,footer,navtitle)
      - pages (Login,Dashboard,etc.)
      - Setup
      - App.js (The skeleton of the app)
      - NotificationCenter.js (Notification component list)
    - service
    - style (CSS files)
    - actions.js
    - configs.js
    - index.js
    - reducers.js
    - store.js
    - util.js

### Documentation

<b>MultiDPChart</b> is a simple line chart which has the option for a threshold and populates more than one data point. For example all the data points from the weather station.

```
/* Data points to graph */
const points = "weather_station.humidity,weather_station.outdoor_temperature,weather_station.indoor_temperature";
<MultiDPChart datapoints={points} startDateTime={fromValue} endDateTime={toValue}/>
```
<b>SparkGraphLive</b> is a mix of the sparkline and the live graph. The component has the most current value on the left side of the compoment and a sparkline to the right. Under the top two elements is a live is the LiveGraph.

```
/* Id of the data point */
const datapoint = "weather_station.humidity";
<SparkGraphLive type={datapoint} startDateTime={fromValue} endDateTime={toValue}/>
```

<b>LiveGraph</b> is a live graph component that interfaces with Satori and redux provider.

```
/* Rosetta Home NodeID on Satori */
const nodeID = "0000000081474d35";
/* Data points to stream */
const points = "weather_station.outdoor_temperature";
<RHLiveGraph nodeID={nodeID} type={points} startDateTime={fromValue} endDateTime={toValue}/>
```
