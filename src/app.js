import * as MIXPANEL from "./services/mixPanelServices";
import { getUserDetails, getLocation } from "./utils/userDetails";

const getLoc = async () => {
  let l = await getLocation();

  MIXPANEL.tract("UPDATE_PROFILE", {
    details: getUserDetails(),
    user: l
  });
};
getLoc();
