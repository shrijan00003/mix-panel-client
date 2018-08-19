import * as MIXPANEL from "./services/mixPanelServices";

/**
 * MIXPANEL.configure() function to identifiy for the very first time
 *
 */

const configure = () => {
  MIXPANEL.configure({
    apiKey: "abc123",
    email: "shrijan00003@gmail.com"
  })
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

const identify = () => {
  MIXPANEL.identify({
    userId: "1111111",
    userEmail: "st@gmail.com",
    userName: "st",
    userDetails: {
      name: "shrijan triapthi",
      addrss: "kapan"
    }
  })
    .then(data => console.log(data))
    .catch(err => console.error(err));
};

/**
 *
 */

const track = () => {
  MIXPANEL.track({
    name: "Delete the facebook Account",
    eventName: "delete_account",
    payload: {
      user: "shrijan sharma",
      change: "Account Delete",
      reaseon: "feels insecure"
    }
  })
    .then(data => console.log(data))
    .catch(err => console.error(err));
};

/**
 *
 */
const page = () => {
  MIXPANEL.page({
    name: "Home",
    title: "Home",
    keywords: ["home", "news", "top", "hello"]
  })
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

configure();
identify();
// track();
page();

// MIXPANEL.getallMetadata();
