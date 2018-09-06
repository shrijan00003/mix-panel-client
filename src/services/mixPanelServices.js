import UID from "uuid/v1";
import http from "../utils/http";
import socketIO from "socket.io-client";
import { getFirstWord, getLastWord } from "../utils/lodash";
import { getUserDetails, getLocation } from "../utils/userDetails";

// let isNewUser = false;
// let metadataId = undefined;
let clientEmail = null;

export async function configure(params) {
  try {
    const { apiKey, email } = params;

    const savedData = await saveInLocalStorage(apiKey, email);
    const res = http.post(`mixpanel/configure`, {
      data: {
        clientId: apiKey,
        email
      }
    });

    if (savedData) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function disconfigure() {
  try {
    const res = http.post(`mixpanel/disconfigure`);
  } catch (err) {
    console.log(
      "error occured while disconfiguring client details please check your apikey and email" +
        err
    );
  }
}

export async function identify(params = {}) {
  try {
    const { userId, userEmail, userName, userDetails, ...rest } = params;

    if (userId) {
      const userInfo = {
        userId,
        userName,
        userEmail,
        userDetails
      };

      // saving in localstorage
      const data = JSON.stringify(userInfo);
      await localStorage.setItem("userInfo", data);

      clientEmail = await localStorage.getItem("clientEmail");
      liveRequestToServer(userInfo, clientEmail);
    } else {
      // create userid and other info
      console.log("hello");
      // if (!localStorage.getItem("userInfo")) {
      const userInfo = {
        userId: UID(),
        userName: "New User",
        userDetails: null,
        userEmail: "user@mail.com"
      };
      const data = JSON.stringify(userInfo);
      //save in local storage
      await localStorage.setItem("userInfo", data);

      clientEmail = await localStorage.getItem("clientEmail");
      liveRequestToServer(userInfo, clientEmail);
      // }
    }

    const deviceMetaData = await getAllMetadata();
    const isConfigured = await checkIfConfigured();
    const metadataId = await localStorage.getItem("metadataId");
    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));

    // if (metadataId === null) {
    const metaData = {
      ...userInfo,
      ...deviceMetaData
    };

    const response = await http.post(`mixpanel/identify`, {
      data: {
        email: localStorage.getItem("clientEmail"),
        metaData
      }
    });

    if (response.status === 200) {
      await localStorage.setItem("metadataId", response.data.id);

      return response;
    }
    // }
  } catch (err) {
    console.log(err);
  }
}

const liveRequestToServer = (userInfo, clientEmail) => {
  const endPoint = "http://127.0.0.1:8848";
  const socket = socketIO(endPoint);

  const userData = {
    ...userInfo,
    clientEmail
  };

  socket.emit("newUser", userData);
  socket.on("testSocketMsg", function(data) {
    console.log(data.msg);
  });
};

const checkIfConfigured = () => {
  const clientId = localStorage.getItem("clientId");
  const email = localStorage.getItem("clientEmail");

  return clientId && email ? true : false;
};

export async function track(params = {}) {
  try {
    const { name, eventName, payload } = params;

    const deviceMetaData = await getAllMetadata();
    const isConfigured = await checkIfConfigured();
    const metadataId = await localStorage.getItem("metadataId");
    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo === null) {
      return;
    }

    const trackData = {
      name,
      eventName,
      payload
    };

    const getMetaData = () => {
      return metadataId
        ? { metadataId }
        : {
            ...userInfo,
            ...deviceMetaData
          };
    };

    const metaData = await getMetaData();
    if (isConfigured) {
      const res = await http.post(`mixpanel/track`, {
        data: {
          trackData,
          metaData
        }
      });

      if (res.status === 200) {
        return res;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export async function page(params) {
  try {
    const { name, title, keywords } = params;

    const deviceMetaData = await getAllMetadata();
    const isConfigured = await checkIfConfigured();
    const metadataId = await localStorage.getItem("metadataId");
    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo === null) {
      return;
    }
    const pageInfo = await getPageInfo();

    const getMetaData = () => {
      return metadataId
        ? { metadataId }
        : {
            ...userInfo,
            ...deviceMetaData
          };
    };

    const metaData = await getMetaData();

    const pageData = {
      name,
      path: pageInfo.path,
      referrer: pageInfo.referrer,
      search: pageInfo.search,
      url: pageInfo.url,
      title,
      keywords
    };

    const allMetaData = {
      ...userInfo,
      ...deviceMetaData
    };

    if (isConfigured) {
      const res = await http.post(`mixpanel/page`, {
        data: {
          pageData,
          metaData
        }
      });
      return res;
    }
  } catch (err) {
    console.log(err);
  }
} // end of page funciton

async function getPageInfo() {
  const referrer = await document.referrer;
  const path = await window.location.pathname;
  const url = await window.location.href;
  const search = await getLastWord(path);
  return {
    referrer,
    path,
    url,
    search
  };
}

async function saveInLocalStorage(apiKey, email) {
  try {
    await localStorage.setItem("clientId", apiKey);
    await localStorage.setItem("clientEmail", email);

    return true;
  } catch (err) {
    console.err(err);
  }
}

export async function getAllMetadata() {
  const allMetaData = await getUserDetails();
  const currnetLocation = await getLocation();

  const device = allMetaData.screenSize;
  const os = await getFirstWord(allMetaData.os);
  const browser = await getFirstWord(allMetaData.browser);

  return {
    os,
    device,
    browser,
    location: currnetLocation
  };
}
