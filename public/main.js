"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _App = require("./App.jsx");
var _LanguageContext = require("./utils/LanguageContext.jsx");
var _AuthContext = require("./utils/AuthContext.jsx");
require("./index.css");
var _reactRouterDom = require("react-router-dom");
var _pwaUtils = require("./utils/pwaUtils.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Register Service Worker for PWA functionality
if (import.meta.env.PROD) {
  (0, _pwaUtils.registerServiceWorker)().then(function (registration) {
    if (registration) {
      console.log('✅ PWA Service Worker registered successfully');
    }
  })["catch"](function (error) {
    console.error('❌ PWA Service Worker registration failed:', error);
  });
}
_client["default"].createRoot(document.getElementById('root')).render(/*#__PURE__*/_react["default"].createElement(_react["default"].StrictMode, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react["default"].createElement(_AuthContext.AuthProvider, null, /*#__PURE__*/_react["default"].createElement(_LanguageContext.LanguageProvider, null, /*#__PURE__*/_react["default"].createElement(_App.QarzdaftarApp, null))))));