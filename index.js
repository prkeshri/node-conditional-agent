const net = require('net');
const tls = require('tls');
const Agent = require('agent-base');
const callbackHelper = require('./callback-helper');

class ProxyAgentConditional extends Agent {
    constructor(cb, agent) {
        super()

        this.cb = callbackHelper(cb);
        this.agent = agent;
        this.callback = ProxyAgentConditional.prototype.callback; // Don't know why! :'(
    }
    
    async callback(req, opts) {
        const shouldProxy = await this.cb(req, opts);
        if(!shouldProxy) {
            let socket;
            // `secureEndpoint` is true when using the https module
            if (opts.secureEndpoint) {
                socket = tls.connect(opts);
            } else {
                socket = net.connect(opts);
            }
            return socket;
        }
        return agent.callback.apply(agent, arguments);
    }
}

exports = module.exports = ProxyAgentConditional;