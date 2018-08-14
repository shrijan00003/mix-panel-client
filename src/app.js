import * as MIXPANEL from "./services/mixPanelServices";

/**
 * MIXPANEL.identify() function to identifiy for the very first time 
 */
const identify = () =>{
  MIXPANEL.identify({
    clientId : 'abc123',
    email : 'shrijan00003@gmail.com'
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
}



/**
 * 
 */

const track = () => {
  MIXPANEL.track({
    plan:"pro",
    name:"Delete the facebook Account",
    eventName : "delete_account",
    payload:{
      user: "shrijan sharma",
      change: "Account Delete",
      reaseon: "feels insecure"
    }
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
}

/**
 * 
 */
const page = () => {
  MIXPANEL.page({
    name: 'Home',
    title : 'Home',
    keywords : ['home', 'news', 'top', 'hello']
  })
}



  // identify();
  // track();








