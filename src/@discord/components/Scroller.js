import { WebpackModules } from '@zlibrary/api';

const { ScrollerAuto, ScrollerThin, default: Scroller } = WebpackModules.getByProps('ScrollerAuto');

export { ScrollerAuto, ScrollerThin };

export default Scroller;
