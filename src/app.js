import * as MIXPANEL from "./services/mixPanelServices";

// module.exports.default = MIXPANEL;
const connect = MIXPANEL.configure({
  email: "shrijan00003@gmail.com",
  apiKey: "abc123"
});
if (connect) {
  MIXPANEL.identify();
  MIXPANEL.track({
    name: "Homepage",
    eventName: "Profile Updated",
    payload: { payload: "paylod" }
  });

  MIXPANEL.page({
    name: "Gallery",
    title: "Gallery",
    keywords: ["keywords"]
  });
}
// (function() {
//   // Establish the root object, `window` in the browser, or `global` on the server.
//   let root = this || window;

//   // Create a reference to this
//   //   let MIXPANEL = new Object();

//   let isNode = false;

//   // Export the Underscore object for **CommonJS**, with backwards-compatibility
//   // for the old `require()` API. If we're not in CommonJS, add `_` to the
//   // global object.
//   if (typeof module !== "undefined" && module.exports) {
//     module.exports = MIXPANEL;
//     root.MIXPANEL = MIXPANEL;
//     isNode = true;
//   } else {
//     root.MIXPANEL = MIXPANEL;
//   }
// })();

// MIXPANEL.configure({
//   apiKey: "abc123",
//   email: "shrijan00003@gmail.com"
// })
//   .then(
//     MIXPANEL.identify({
//       userId: "abc",
//       userName: "shrijan",
//       userEmail: "hello@gmail.com",
//       userDetails: "shrijan from kapan"
//     })
//   )
//   .then(d => console.log("data", d))
//   .catch(err => console.log(err));

// MIXPANEL.track({
//   name: "deleting facebook Account",
//   eventName: "delete_account",
//   payload: {
//     user: "shrijan sharma",
//     change: "Account Delete",
//     reaseon: "feels insecure"
//   }
// })
//   .then(data => console.log(data))0
//   .catch(err => console.error(err));

console.log(process.env.TARGET);

console.log(MIXPANEL);

if (process.env.TARGET === "web") {
  //   module.exports.default = MIXPANEL;
  // } else {
  window.MIXPANEL = MIXPANEL;
} else {
  module.exports = MIXPANEL;
}
