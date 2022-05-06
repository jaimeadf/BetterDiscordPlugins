import { WebpackModules } from '@zlibrary/api';

export default WebpackModules.find(m => m?.Text?.displayName === 'Text').Text;
