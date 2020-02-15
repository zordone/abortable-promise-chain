"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _possibleConstructorReturn(a,b){return b&&("object"===_typeof(b)||"function"==typeof b)?b:_assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _get(a,b,c){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(a,b,c){var d=_superPropBase(a,b);if(d){var e=Object.getOwnPropertyDescriptor(d,b);return e.get?e.get.call(c):e.value}},_get(a,b,c||a)}function _superPropBase(a,b){for(;!Object.prototype.hasOwnProperty.call(a,b)&&(a=_getPrototypeOf(a),null!==a););return a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),b&&_setPrototypeOf(a,b)}function _wrapNativeSuper(a){var b="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(a){function c(){return _construct(a,arguments,_getPrototypeOf(this).constructor)}if(null===a||!_isNativeFunction(a))return a;if("function"!=typeof a)throw new TypeError("Super expression must either be null or a function");if("undefined"!=typeof b){if(b.has(a))return b.get(a);b.set(a,c)}return c.prototype=Object.create(a.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(c,a)},_wrapNativeSuper(a)}function isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(a){return!1}}function _construct(){return _construct=isNativeReflectConstruct()?Reflect.construct:function(b,c,d){var e=[null];e.push.apply(e,c);var a=Function.bind.apply(b,e),f=new a;return d&&_setPrototypeOf(f,d.prototype),f},_construct.apply(null,arguments)}function _isNativeFunction(a){return-1!==Function.toString.call(a).indexOf("[native code]")}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}var noop=function(){},emptyPromise=new Promise(noop),AbortablePromise=function(a){function b(a){var c;return _classCallCheck(this,b),c=_possibleConstructorReturn(this,_getPrototypeOf(b).call(this,a)),c._aborted=!1,c}return _inherits(b,a),_createClass(b,[{key:"_abort",value:function _abort(){this._aborted=!0}},{key:"_wrapHandler",value:function _wrapHandler(a){var b=this;return a?function(c){var d=a(c,function(){return b._abort()});return b._aborted?emptyPromise:d}:a}},{key:"then",value:function then(a,c){return b.from(_get(_getPrototypeOf(b.prototype),"then",this).call(this,this._wrapHandler(a),this._wrapHandler(c)))}},{key:"catch",value:function _catch(a){return b.from(_get(_getPrototypeOf(b.prototype),"catch",this).call(this,this._wrapHandler(a)))}},{key:"finally",value:function _finally(a){return b.from(_get(_getPrototypeOf(b.prototype),"finally",this).call(this,this._wrapHandler(a)))}}],[{key:"from",value:function from(a){return a instanceof b?a:new b(function(b,c){return a.then(b)["catch"](c)})}}]),b}(_wrapNativeSuper(Promise));exports["default"]=AbortablePromise;