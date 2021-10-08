"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AuthStorageObject = window.localStorage;

var Auth =
/** @class */
function () {
  function Auth() {
    this.key = '@auth_key';
    this.roleKey = 'role_code';
    this["default"] = {
      token: null,
      user: null
    };
  }

  Auth.prototype.data = function (key) {
    if (key === void 0) {
      key = null;
    }

    var defaultValue = this["default"];
    var o = JSON.parse(AuthStorageObject.getItem(this.key) || JSON.stringify(defaultValue)) || defaultValue;
    if (key === null) return o;
    return o[key];
  };

  Auth.prototype.save = function (attributes) {
    if (attributes === void 0) {
      attributes = {};
    }

    var storageData = this.data();

    var save = __assign({}, attributes);

    Object.keys(this["default"]).forEach(function (k) {
      return save[k] = attributes[k] !== undefined ? attributes[k] : storageData[k];
    });
    AuthStorageObject.setItem(this.key, JSON.stringify(save));
  };

  Auth.prototype.getAccessToken = function () {
    var _a;

    return ((_a = this.data()) === null || _a === void 0 ? void 0 : _a.token) || null;
  };

  Auth.prototype.getUserData = function () {
    var _a;

    return ((_a = this.data()) === null || _a === void 0 ? void 0 : _a.user) || null;
  };

  Auth.prototype.isLogin = function () {
    var token = this.data().token;
    return token ? token.length > 0 : false;
  };

  Auth.prototype.logout = function () {
    AuthStorageObject.removeItem(this.key);
  };

  Auth.prototype.is = function (roles) {
    var _a, _b;

    var user = (this.data() || this["default"]).user;
    if (!user || _typeof(user) !== 'object') return false;
    var t = ((_b = (_a = user[this.roleKey]) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === null || _b === void 0 ? void 0 : _b.trim()) || null;
    if (!t || typeof t !== 'string') return false;
    var role = typeof roles === 'string' ? roles : roles;
    role = typeof role === 'string' ? role.split(',') : Object.keys(role);
    role.map(function (i, item) {
      var _a, _b;

      return (_b = (_a = item === null || item === void 0 ? void 0 : item.toString()) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === null || _b === void 0 ? void 0 : _b.trim();
    });
    return role.indexOf(t) > -1;
  };

  Auth.prototype.set = function (key, value) {
    var data = this.data();
    data[key] = value;
    this.save(data);
  };

  Auth.prototype.get = function (key) {
    return this.data(key);
  };

  return Auth;
}();

exports["default"] = Auth;