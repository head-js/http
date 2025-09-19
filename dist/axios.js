'use strict';

// require('core-js/modules/web.url.to-json.js');

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

/* eslint-disable */
/* axios@1.6.8 */

const kindOf = (cache => thing => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
const {
  isArray
} = Array;
const isPlainObject = val => {
  if (kindOf(val) !== 'object') {
    return false;
  }
  const prototype = Object.getPrototypeOf(val);
  // https://github.com/axios/axios/pull/5036
  return prototype === null || prototype === Object.prototype /* || Object.getPrototypeOf(prototype) === null */;
  // && !(Symbol.toStringTag in val)
  // && !(Symbol.iterator in val);
};
function forEach(obj, fn) {
  let {
    allOwnKeys = false
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function merge(/* obj1, obj2, obj3, ... */
) {
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

function Http(_ref) {
  let {
    instance
  } = _ref;
  this.$axios = instance;
  this.$axios.interceptors.response.use(_ref2 => {
    let {
      config,
      request,
      status,
      statusText,
      headers,
      data
    } = _ref2;
    // eslint-disable-line no-unused-vars
    const res = {
      status,
      statusText,
      headers: headers.toJSON()
    };
    if (data !== null && data !== void 0 && data.data) {
      const rest = _objectSpread2({
        code: 0,
        message: 'ok',
        res
      }, data);
      return Promise.resolve(rest);
    } else {
      const rest = {
        code: 0,
        message: 'ok',
        res,
        data: data || {}
      };
      return Promise.resolve(rest);
    }
  }, err => {
    // eslint-disable-line arrow-body-style
    // console.log('$axios.intercepters.response.rejected', err); // eslint-disable-line no-console
    if (err && err.name === 'AxiosError') {
      const {
        name,
        config,
        request,
        /* response, */code,
        message
      } = err; // eslint-disable-line no-unused-vars
      const {
        status,
        statusText,
        headers,
        data
      } = err.response;
      const res = {
        status,
        statusText,
        headers: headers.toJSON(),
        name,
        code,
        message
      };
      if (data !== null && data !== void 0 && data.data) {
        const rest = _objectSpread2({
          code: -1,
          message: 'AxiosError',
          res
        }, data);
        return Promise.reject(rest);
      } else {
        const rest = {
          code: -1,
          message: 'AxiosError',
          res,
          data: data || {}
        };
        return Promise.reject(rest);
      }
    } else if (err && err.__CANCEL__) {
      const {
        name,
        code,
        message,
        stack
      } = err; // eslint-disable-line no-unused-vars
      const rest = {
        code: -1,
        message: 'AxiosCanceledError',
        res: {},
        data: {},
        stack
      };
      return Promise.reject(rest);
    } else {
      return Promise.reject(err);
    }
  }); // eslint-disable-line function-paren-newline
}
Http.prototype.get = function (endpoint) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return this.$axios.get(endpoint, merge(options, {
    params,
    headers
  }));
};
Http.prototype.post = function (endpoint) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  return this.$axios.post(endpoint, data, merge(options, {
    params,
    headers
  }));
};
Http.prototype.put = function (endpoint) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  return this.$axios.put(endpoint, data, merge(options, {
    params,
    headers
  }));
};
Http.prototype.delete = function (endpoint) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return this.$axios.delete(endpoint, merge(options, {
    params,
    headers
  }));
};

/**
 * const $axios = axios.create({});
 * const $http = create({ instance: $axios });
 */
function create($axios) {
  const $http = new Http($axios);
  return $http;
}
var index = {
  create
};

module.exports = index;
