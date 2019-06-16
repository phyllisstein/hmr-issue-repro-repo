# `hmr-issue-repro-repo`
![](mascot.gif)

Quick-'n'-dirty tweak to [`react-hot-loader`'s Styled Components demo](https://github.com/gaearon/react-hot-loader/tree/master/examples/styled-components) demonstrating some glitches in getting the hooks support in RHL >= v4.9 to play nicely with Babel's CommonJS transform.

## Tests
`yarn start:uncommon` will fire up a Webpack dev server in which ESNext `import`s and `exports` are ignored by Babel and fall through to Webpack. Running `yarn start:common` kicks off a server that allows Babel to handle module loading. You can also run `yarn build` to generate static bundles for examination at your leisure.

## Results
[`Spring.js`](src/Spring.js) is lean and legible and built around hooks, making it an ideal canary for this particular coal mine. When [Webpack's generated code](dist/uncommon/bundle.js#L36507-36585) assigns a local identifier for the `react-spring` import...

```js
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/web.js");
```

...RHL, as expected, sees it:

```js
__signature__(SpringTest, "useState{[thingDone, toggleThingDone](false)}\nuseCallback{doTheThing}\nuseSpring{fader}", function () {
  return [react_spring__WEBPACK_IMPORTED_MODULE_0__["useSpring"]]; // ✅
});
```

But in [Babel's interpretation](dist/common/bundle.js#L36354-36438), the identifier drifts between its import...

```js
var _reactSpring = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/web.js");
```

...and its reference:

```js
__signature__(SpringTest, "useState{[thingDone, toggleThingDone](false)}\nuseCallback{doTheThing}\nuseSpring{fader}", function () {
  return [useSpring]; // 💥
});
```
