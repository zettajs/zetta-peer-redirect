# zetta-peer-redirect

Allow zetta to follow 301/302 redirects while peering.

## Install

`npm install zetta-peer-redirect`

## Usage

```js
var zetta = require('zetta');
var redirect = require('zetta-peer-redirect');

zetta()
  .use(redirect)
  .link('http://<peering server>') // Will return a 302 with a new location to peer to.
  .listen(3001)
```

## License

MIT
