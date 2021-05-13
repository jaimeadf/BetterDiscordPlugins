import { WebpackModules } from '@zlibrary/api';

const {
    TooltipColors,
    TooltipContainer,
    TooltipLayer,
    TooltipPositions,
    default: Tooltip
} = WebpackModules.getByProps('TooltipContainer');

export { TooltipColors, TooltipContainer, TooltipLayer, TooltipPositions };

export default Tooltip;
