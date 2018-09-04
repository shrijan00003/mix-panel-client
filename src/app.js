import * as MIXPANEL from "./services/mixPanelServices";

(function() {
  // Establish the root object, `window` in the browser, or `global` on the server.
  let root = this;

  // Create a reference to this
  let MIXPANEL = new Object();

  let isNode = false;

  // Export the Underscore object for **CommonJS**, with backwards-compatibility
  // for the old `require()` API. If we're not in CommonJS, add `_` to the
  // global object.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = MIXPANEL;
    root.MIXPANEL = MIXPANEL;
    isNode = true;
  } else {
    root.MIXPANEL = MIXPANEL_;
  }
})();
