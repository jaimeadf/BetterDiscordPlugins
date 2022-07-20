const beautify = require('js-beautify').js;

module.exports = source => {
    return beautify(source);
};
