import * as MIXPANEL from './services/mixPanelServices'
import { getBrowserDetails } from './utils/getBrower';
import {getUserDetails} from './utils/userDetails';

MIXPANEL.tract('UPDATE_PROFILE', {
  details :getUserDetails()
});








