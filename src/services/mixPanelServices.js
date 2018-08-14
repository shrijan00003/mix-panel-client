import http from "../utils/http";
import { getUserDetails, getLocation } from "../utils/userDetails";
import { getFirstword } from "../utils/lodash";

export async function identify(params) {
    try {
        const { clientId, email } = params;
        // console.log( clientId, email);
        const savedData = await saveInLocalStorage( clientId, email);
        if ( savedData ) {
            const response = await http.post(`mixpanel/identify`)

            if ( response.status === 200 ) {
                return response;
            }
        }

    } catch (err) {
        console.error(err);
    }

}

/* "trackData":{
		"plan":"pro",
		"name":"Ankita",
		"eventName" : "delete_account",
		"payload":{
			"user" : "shrijan sharma",
			"change" : "Account Delete",
			"reaseon" : "feels insecure"
		}
	},
	
	"metaData" : {
		"browser": "firebox",
        "os": "mint",
        "device": "dell",
        "location": {
        	"longitude":1111.1111,
        	"latitude":2222.2222
        }
    } */
    
    /* 
    
appName
:
"Netscape"
browser
:
"Chrome  68 68.0.3440.84"
cookies
:
true
flash
:
"no check"
fullUserAgent
:
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36"
mobile
:
false
os
:
"Linux unknown"
screenSize
:
"1920 x 1080"
:
Object */
export async function track(params) {
    try {
        const allMetaData = await getUserDetails();
        const currnetLocation = await getLocation();

        const { plan, name, eventName , payload } = params;

        const device = allMetaData.screenSize;
        const os = await getFirstword(allMetaData.os);
        const browser = await getFirstword(allMetaData.browser);

        
        // console.log('dataaaaaaaaaaaaaaa', os, browser, device);

        const trackData = {
            plan,
            name,
            eventName,
            payload
        }

        const metaData = {
            browser,
            os,
            device,
            location : currnetLocation
        }

        console.log( trackData , metaData );

        const data = {
            trackData,
            metaData
        }

        console.log('dataaaaaaaaaaaaaaaaaaaaa' , data);


        
        const res = await http.post(`mixpanel/track`, {
            data : {
                trackData,
                metaData,
            }
        });

        return res;

    } catch ( err ) {
        console.error( err );
    }
}
/* /* 
	"pageData" :{
		  "name": "HOME",
		  "path": "/home",
		  "referrer": "www.google.com",
		  "search": "/hope", //last of path
		  "title": "Dashboard",
		  "url": "https://stackoverflow.com/questions/26705782/sending-nested-json-object-using-postman",
		  "keywords": "['home', 'news', 'top']"
	},
	"metaData" : {
		"browser": "firebox",
        "os": "mac",
        "device": "mac",
        "location": {
        	"longitude":"1111.1111",
        	"latitude":"2222.2222"
        }
    } */
    
export async function page ( params ) {
    const { name , title , keywords } = params;

    const pageInfo = await getPageInfo();
}

const getPageInfo = () => {
    
}
// export async function register(userName, userEmail, userPassword) {
//   console.log(userName, userEmail, userPassword);
//   let response = await HTTP.post(`register`, {
//     data: {
//       name: userName,
//       email: userEmail,
//       password: userPassword,
//     },
//   });
//   console.log(response, 'from register');
//   if (response.status === 200) {
//     return response;
//   }
// }

async function saveInLocalStorage ( clientId, email ){
    try {
        await localStorage.setItem( 'clientId', clientId );
        await localStorage.setItem( 'email', email );

        return true;
    } catch (err) {
        console.err(err);
    }
}




// export const hello =()=> console.log('hello EVERYONE');

// const identify = (userId = null) => {
//     if (userId === null) {
//       userId = getUUID();
//     }
  
//     localStorage.setItem('id', userId);
//   }
  
//   const track = (event, payload) => {
//     API.track(event, payload, {
//       browser: window.browser,
//       os: window.os,
//       location: getLocation(),
//       userId: localStorage.getItem('id'),
//       clientId: localStorage.getItem('clientId')
//     })
//   }
  
//   const page = () => {
//     API.page(window.location);
//   }
  
//   const load = id => {
//     API.setID(id);
  
//     localStorage.setItem('clientId', id);
//   }
  
//   API.js
//   track = () => {
//     axios.post()
//   }
  
//   export default {
//     load,
//     page,
//     track,
//     identify,
//   }
  
//   import mixpanel from '../../mixpanel';
  
//   mixpanel.load('todo-app-1')
  
//   mixpanel.identify();
  
//   axios.post('/todos', {
//     todo: '123'
//   })
  
//   request.body = {
//     todo: '123'
//   }
  
//   request.user = {
//     id: localStorage.getItem('clentId')
//   }
  