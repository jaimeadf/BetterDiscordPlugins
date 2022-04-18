import { WebpackModules } from '@zlibrary/api';

export default WebpackModules.find(m =>
    Object.getOwnPropertyDescriptor(m?.default?.__proto__ ?? {}, 'hidePersonalInformation')
).default;
