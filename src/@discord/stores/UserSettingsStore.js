import { WebpackModules } from '@zlibrary/api';

export default WebpackModules.find(m => m.locale && m.theme);
