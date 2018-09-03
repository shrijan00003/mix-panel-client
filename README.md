/\*\*

- MIXPANEL.configure() function to identifiy for the very first time
- \*/

const configure = () => {
return MIXPANEL.configure({
apiKey: "e84ac190-a6a8-11e8-92de-eb79ccdc12e6",
email: "shrijan00003@gmail.com"
})
.then(data => console.log(data))
.catch(err => console.log(err));
};

const identify = () => {
return MIXPANEL.identify({
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

/\*\* \*
\*/

const track = () => {
MIXPANEL.track({
name: "deleting facebook Account",
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

/\*\* \*
\*/
const page = () => {
MIXPANEL.page({
name: "Google Home",
title: "google",
keywords: ["home", "news", "top", "hello"]
})
.then(data => console.log(data))
.catch(err => console.log(err));
};

configure().then(() => {
identify();
});
// track();
// page();

// MIXPANEL.getallMetadata();
