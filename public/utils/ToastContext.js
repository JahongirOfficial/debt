"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToast = exports.ToastProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Toast = _interopRequireDefault(require("../components/Toast"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ToastContext = /*#__PURE__*/(0, _react.createContext)();
var useToast = exports.useToast = function useToast() {
  var context = (0, _react.useContext)(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
var ToastProvider = exports.ToastProvider = function ToastProvider(_ref) {
  var children = _ref.children;
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    toasts = _useState2[0],
    setToasts = _useState2[1];
  var showToast = function showToast(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
    var id = Date.now() + Math.random();
    var newToast = {
      id: id,
      message: message,
      type: type,
      duration: duration
    };

    // Limit to maximum 3 toasts at once
    setToasts(function (prev) {
      var updatedToasts = [].concat(_toConsumableArray(prev), [newToast]);
      return updatedToasts.slice(-3); // Keep only last 3 toasts
    });

    // Auto remove toast after duration
    setTimeout(function () {
      removeToast(id);
    }, duration + 300); // Add 300ms for exit animation
  };
  var removeToast = function removeToast(id) {
    setToasts(function (prev) {
      return prev.filter(function (toast) {
        return toast.id !== id;
      });
    });
  };
  var showSuccess = function showSuccess(message, duration) {
    return showToast(message, 'success', duration);
  };
  var showError = function showError(message, duration) {
    return showToast(message, 'error', duration);
  };
  var showWarning = function showWarning(message, duration) {
    return showToast(message, 'warning', duration);
  };
  var showInfo = function showInfo(message, duration) {
    return showToast(message, 'info', duration);
  };
  return /*#__PURE__*/_react["default"].createElement(ToastContext.Provider, {
    value: {
      showToast: showToast,
      showSuccess: showSuccess,
      showError: showError,
      showWarning: showWarning,
      showInfo: showInfo,
      removeToast: removeToast
    }
  }, children, /*#__PURE__*/_react["default"].createElement("div", {
    className: "fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none"
  }, toasts.map(function (toast, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: toast.id,
      className: "pointer-events-auto",
      style: {
        zIndex: 9999 - index
      }
    }, /*#__PURE__*/_react["default"].createElement(_Toast["default"], {
      message: toast.message,
      type: toast.type,
      duration: toast.duration,
      onClose: function onClose() {
        return removeToast(toast.id);
      }
    }));
  })));
};