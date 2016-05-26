var url = require('url');
var Rx = require('rx');
var revolt = require('revolt');

module.exports = function(server) {
  server.onPeerResponse(function(request) {
    return request
      .flatMap(function(env) {
        var peerOptions = env.request.raw;

        if (env.response.statusCode === 302 || env.response.statusCode === 301) {
          var parsed = url.parse(env.response.headers.location);
          server.log('Peer was redirected to ' + env.response.headers.location);
          
          peerOptions.uri = env.response.headers.location;
          peerOptions.port = parsed.port;
          peerOptions.hostname = parsed.hostname;
          peerOptions.headers.Host = parsed.host;
          peerOptions.path = parsed.path;
          
          env.response.socket.end();
          
          return revolt()
            .request(peerOptions);
        } else {
          return Rx.Observable.just(env);
        }
      });
  });
};
