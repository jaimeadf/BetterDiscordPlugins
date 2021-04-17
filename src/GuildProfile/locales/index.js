/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

const requireContext = require.context('./', false, /.json$/);

const locales = {};

for (const localePath of requireContext.keys()) {
    const language = localePath.match(/\.\/(.+)\.json/)[1];
    locales[language] = requireContext(localePath);
}

export default locales;
