import * as MIXPANEL from "./services/mixPanelServices";

// window.MIXPANEL = MIXPANEL;

MIXPANEL.configure({ email: "shrijan00003@gmail.com", apiKey: "abc123" });
MIXPANEL.identify();
// module.exports.default = MIXPANEL;

// (function() {
//   // Establish the root object, `window` in the browser, or `global` on the server.
//   var root = this;

//   // Create a reference to this
//   var _ = new Object();

//   var isNode = false;

//   // Export the Underscore object for **CommonJS**, with backwards-compatibility
//   // for the old `require()` API. If we're not in CommonJS, add `_` to the
//   // global object.
//   if (typeof module !== "undefined" && module.exports) {
//     module.exports = _;
//     root._ = _;
//     isNode = true;
//   } else {
//     root._ = _;
//   }
// })();

// export default MIXPANEL;
