import http from "../utils/http";
import { getUserDetails, getLocation } from "../utils/userDetails";
import { getFirstWord, getLastWord } from "../utils/lodash";

export async function identify(params) {
    try {
        const { clientId, email } = params;
        
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

export async function track(params) {
    try {
    
        const { plan, name, eventName , payload } = params;

        const trackData = {
            plan,
            name,
            eventName,
            payload
        }


        const metaData = await getallMetadata();

        console.log( trackData , metaData );

        const data = {
            trackData,
            metaData
        }

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
    
export async function page ( params ) {
    try {
        const { name , title , keywords } = params;
        
        const pageInfo = await getPageInfo();
        
        const pageData = {
            name,
            path: pageInfo.path,
            referrer: pageInfo.referrer,
            search: pageInfo.search,
            url: pageInfo.url,
            title,
            keywords
        }
        
        const metaData = await getallMetadata();
     
        const res = await http.post(`mixpanel/page`, {
            data : {
                pageData,
                metaData,
            }
        });

        return res;
        
    } catch ( err ) {
            console.log ( err );
        }
        
} // end of page funciton 

async function getPageInfo () {
    const referrer = await document.referrer;
    const path = await window.location.pathname;
    console.log('path', path);
    const url = await window.location.href;
    const search = await getLastWord(path);
    return {
        referrer,
        path,
        url,
        search
    }
}

async function saveInLocalStorage ( clientId, email ){
    try {
        await localStorage.setItem( 'clientId', clientId );
        await localStorage.setItem( 'email', email );

        return true;
    } catch (err) {
        console.err(err);
    }
}

async function getallMetadata () {
    const allMetaData = await getUserDetails();
    const currnetLocation = await getLocation();

    const device = allMetaData.screenSize;
    const os = await getFirstWord(allMetaData.os);
    const browser = await getFirstWord(allMetaData.browser);

    return {
        browser,
        os,
        device,
        location : currnetLocation
    }
}