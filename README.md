How about wrapping up an http(s) , maybe proxy? , agent and checking wrt request whether to call the agent or not? Sounds good? This module doex exactly that!

Ex:
```javascript
	const agent = new http.Agent(/* whatever ..... */);
	const newAgent = new ConditionalAgent(function cb(req, options) { /* Can be async */
	    return req.method === 'GET';
	}, agent);


	// Now use newAgent or override global as https.globalAgent = newAgent;
```