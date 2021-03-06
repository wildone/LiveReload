// Generated by IcedCoffeeScript 1.3.1c
(function() {
  var Path, debug, iced, __iced_k, __iced_k_noop,
    __slice = [].slice;

  iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    }
  };
  __iced_k = __iced_k_noop = function() {};

  debug = require('debug')('livereload:cli:rpc');

  Path = require('path');

  exports.api = {
    init: function(_arg, callback) {
      var appDataDir, build, err, logDir, logFile, platform, pluginFolders, preferencesFolder, resourcesDir, version, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      resourcesDir = _arg.resourcesDir, appDataDir = _arg.appDataDir, logDir = _arg.logDir, logFile = _arg.logFile, version = _arg.version, build = _arg.build, platform = _arg.platform;
      if (!resourcesDir) return callback(new Error("init requires resourcesDir"));
      if (!appDataDir) return callback(new Error("init requires appDataDir"));
      if (!logDir) return callback(new Error("init requires logDir"));
      pluginFolders = [process.env.LRBundledPluginsOverride || resourcesDir];
      preferencesFolder = Path.join(appDataDir, 'Data');
      LR.version = version || '0.0.0';
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "cli/rpc-api/app.iced",
          funcname: "init"
        });
        LR.plugins.init(pluginFolders, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return err = arguments[0];
            };
          })(),
          lineno: 14
        }));
        __iced_deferrals._fulfill();
      })(function() {
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "cli/rpc-api/app.iced",
            funcname: "init"
          });
          LR.websockets.init(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return err = arguments[0];
              };
            })(),
            lineno: 15
          }));
          __iced_deferrals._fulfill();
        })(function() {
          if (err) {
            LR.client.app.failedToStart({
              message: "" + err.message
            });
            LR.rpc.exit(1);
            return callback(null);
          }
          LR.stats.startup();
          LR.log.fyi("Backend is up and running.");
          debug("Backend is up and running.");
          return callback();
        });
      });
    },
    ping: function(arg, callback) {
      return callback();
    }
  };

  exports.displayCriticalError = function(_arg) {
    var button, text, title, url;
    title = _arg.title, text = _arg.text, url = _arg.url, button = _arg.button;
    if (button == null) button = "More Info";
    LR.log.omg("" + title + " -- " + text);
    return LR.client.app.displayPopupMessage({
      title: title,
      text: text,
      buttons: [['help', button], ['quit', "Quit"]]
    }, function(err, result) {
      if (result === 'help') LR.client.app.openUrl(url);
      return LR.client.app.terminate();
    });
  };

  exports.displayHelpfulWarning = function(_arg) {
    var button, text, title, url;
    title = _arg.title, text = _arg.text, url = _arg.url, button = _arg.button;
    if (button == null) button = "More Info";
    LR.log.wtf("" + title + " -- " + text);
    return LR.client.app.displayPopupMessage({
      title: title,
      text: text,
      buttons: [['help', button], ['ignore', "Ignore"]]
    }, function(err, result) {
      if (result === 'help') return LR.client.app.openUrl(url);
    });
  };

}).call(this);
