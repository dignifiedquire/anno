# Anno

## Use

```bash
$ git clone git@github.com:dignifiedquire/anno.git
$ npm install
$ npm start
$ open http://localhost:9966
```

You need a version with `floodsub` of `go-ipfs` running with the api on port `5001` (default).
Also the following config has to be set

```json
"API": {
  "HTTPHeaders": {
    "Access-Control-Allow-Origin": ["*"],
    "Access-Control-Allow-Methods": ["PUT", "GET", "POST"],
    "Access-Control-Allow-Credentials": ["true"]
  }
},
```

You can download an appropriate version [here](https://dist.ipfs.io/go-ipfs/floodsub-2).
And run it with

```bash
$ ipfs daemon --enable-pubsub-experiment
```
