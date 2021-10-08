function helper(cb) {
    const typeofCb = typeof cb;
    if(typeofCb === 'function') {
        return cb;
    }
    const options = {
        method: 'GET'
    };
    if(typeofCb === 'string') {
        options.urlString = cb;
    } else if(cb instanceof RegExp) {
        options.urlRegExp = cb;
    } else {
        Object.assign(options, cb);
    }

    return function(req, opts) {
        if(req.method === options.method) {
            if(options.urlString && req.path.indexOf(options.urlString) > -1) {
                return true;
            }
            if(options.urlRegExp && req.path.match(options.urlRegExp)) {
                return true;
            }
        }
        return false;
    }
}


module.exports = exports = helper;