// This is more of an exploration of Leaflet plugins and Typescript integration than anything else
// The code here is mostly ripped from an existing repo and doesn't apply to my use case

// Plugin README from Leaflet
// https://github.com/Leaflet/Leaflet/blob/main/PLUGIN-GUIDE.md

import L, { TileLayer, type CachedTileLayerOptions } from 'leaflet';

// On extending tile layers
// https://leafletjs.com/examples/extending/extending-2-layers.html

// TODO: this would need to be defined for TS support
// @ts-ignore
L.locallyCachedTileLayer = function (urlTemplate: string, options: CachedTileLayerOptions): TileLayer {
  // TODO: this would need to be defined for TS support
  // @ts-ignore
  return new L.TileLayer.LocallyCachedTileLayer();
};

// TODO: this would need to be defined for TS support
// @ts-ignore
L.TileLayer.LocallyCachedTileLayer = L.TileLayer.extend({
  initialize: function (urlTemplate: string, options: CachedTileLayerOptions) {
    const _options = {
      autocache: false,
      debug: false,
      ...options,
    };

    L.TileLayer.prototype.initialize.call(this, urlTemplate, _options);
    L.setOptions(this, options);

    // connect to the filesystem or else die loudly
    // save a handle to the filesystem, and also use it to open a directory handle to our stated folder
    // thus: self.fshandle and self.dirhandle
    //
    // also set the ._url for both online and offline use
    // we have two versions of URL which may be the _url at any given time: offline and online
    // online is the HTTP one we were given as the 'url' parameter here to initialize()
    // offline is underneath the local filesystem: /path/to/sdcard/FOLDER/name-z-x-y.png
    // tip: the file extension isn't really relevant; using .png works fine without juggling file extensions from their URL templates

    this._url_online = this._url; // Do this early, so it's done before the time-intensive filesystem activity starts.

    // if (!window.requestFileSystem && this.options.debug) console.log('L.TileLayer.Cordova: device does not support requestFileSystem');
    // if (!window.requestFileSystem) throw 'L.TileLayer.Cordova: device does not support requestFileSystem';

    // if (this.options.debug) console.log('Opening filesystem');
    // window.requestFileSystem(
    //   LocalFileSystem.PERSISTENT,
    //   0,
    //   function (fshandle) {
    //     if (this.options.debug) console.log('requestFileSystem OK ' + options.folder);
    //     this.fshandle = fshandle;
    //     this.fshandle.root.getDirectory(
    //       options.folder,
    //       { create: true, exclusive: false },
    //       function (dirhandle) {
    //         if (this.options.debug) console.log('getDirectory OK ' + options.folder);
    //         this.dirhandle = dirhandle;
    //         this.dirhandle.setMetadata(null, null, { 'com.apple.MobileBackup': 1 });

    //         // Android's toURL() has a trailing / but iOS does not; better to have 2 than to have 0 !
    //         this._url_offline = dirhandle.toURL() + '/' + [this.options.name, '{z}', '{x}', '{y}'].join('-') + '.png';

    //         if (success_callback) success_callback();
    //       },
    //       function (error) {
    //         if (this.options.debug) console.log('getDirectory failed (code ' + error.code + ')' + options.folder);
    //         throw 'L.TileLayer.Cordova: ' + options.name + ': getDirectory failed with code ' + error.code;
    //       },
    //     );
    //   },
    //   function (error) {
    //     if (this.options.debug) console.log('requestFileSystem failed (code ' + error.code + ')' + options.folder);
    //     throw 'L.TileLayer.Cordova: ' + options.name + ': requestFileSystem failed with code ' + error.code;
    //   },
    // );

    // done, return ourselves because method chaining is cool
    return this;
  },

  /*
   * Toggle between online and offline functionality
   * essentially this just calls setURL() with either the ._url_online or ._url_offline, and lets L.TileLayer reload the tiles... or try, anyway
   */

  goOnline: function () {
    // use this layer in online mode
    this.setUrl(this._url_online);
  },
  goOffline: function () {
    // use this layer in online mode
    this.setUrl(this._url_offline);
  },

  /*
   * Returns current online/offline state.
   */

  isOnline: function () {
    return this._url == this._url_online;
  },
  isOffline: function () {
    return this._url == this._url_offline;
  },
});
