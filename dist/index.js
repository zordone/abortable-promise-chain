"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var noop = function noop() {};

var emptyPromise = new Promise(noop);

var AbortablePromise =
/*#__PURE__*/
function (_Promise) {
  _inherits(AbortablePromise, _Promise);

  function AbortablePromise(executor) {
    var _this;

    _classCallCheck(this, AbortablePromise);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AbortablePromise).call(this, executor));
    _this._aborted = false;
    return _this;
  }

  _createClass(AbortablePromise, [{
    key: "_abort",
    value: function _abort() {
      this._aborted = true;
    }
  }, {
    key: "_wrapHandler",
    value: function _wrapHandler(handler) {
      var _this2 = this;

      if (!handler) {
        return handler;
      }

      return function (res) {
        // run the original handler, pass the abort function in case it wants to abort
        var handlerResult = handler(res, function () {
          return _this2._abort();
        }); // if it did abort, ignore the result and return empty promise

        if (_this2._aborted) {
          return emptyPromise;
        } // otherwise return the normal result


        return handlerResult;
      };
    }
  }, {
    key: "then",
    value: function then(thenHandler, catchHandler) {
      return AbortablePromise.from(_get(_getPrototypeOf(AbortablePromise.prototype), "then", this).call(this, this._wrapHandler(thenHandler), this._wrapHandler(catchHandler)));
    }
  }, {
    key: "catch",
    value: function _catch(handler) {
      return AbortablePromise.from(_get(_getPrototypeOf(AbortablePromise.prototype), "catch", this).call(this, this._wrapHandler(handler)));
    }
  }, {
    key: "finally",
    value: function _finally(handler) {
      return AbortablePromise.from(_get(_getPrototypeOf(AbortablePromise.prototype), "finally", this).call(this, this._wrapHandler(handler)));
    }
  }], [{
    key: "from",
    value: function from(promise) {
      if (promise instanceof AbortablePromise) {
        return promise;
      }

      return new AbortablePromise(function (resolve, reject) {
        return promise.then(resolve)["catch"](reject);
      });
    }
  }]);

  return AbortablePromise;
}(_wrapNativeSuper(Promise));

exports["default"] = AbortablePromise;