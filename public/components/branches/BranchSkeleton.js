"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BranchListSkeleton = BranchListSkeleton;
exports.BranchSkeleton = BranchSkeleton;
var _react = _interopRequireDefault(require("react"));
var _AuthContext = require("../../utils/AuthContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function BranchSkeleton() {
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center space-x-3 px-4 py-2 rounded-xl animate-pulse"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-8 h-8 rounded-lg ".concat(settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200')
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-4 rounded mb-1 ".concat(settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'),
    style: {
      width: '60%'
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-3 rounded ".concat(settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'),
    style: {
      width: '40%'
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-4 h-4 rounded ".concat(settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200')
  }));
}
function BranchListSkeleton(_ref) {
  var _ref$count = _ref.count,
    count = _ref$count === void 0 ? 3 : _ref$count;
  var _useAuth2 = (0, _AuthContext.useAuth)(),
    settings = _useAuth2.settings;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-2"
  }, Array.from({
    length: count
  }).map(function (_, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: index,
      className: "flex items-center space-x-3 px-4 py-3 animate-pulse"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-8 h-8 rounded-lg ".concat(settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200')
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-4 rounded mb-1 ".concat(settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'),
      style: {
        width: "".concat(60 + Math.random() * 20, "%")
      }
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-3 rounded ".concat(settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'),
      style: {
        width: "".concat(30 + Math.random() * 20, "%")
      }
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-4 h-4 rounded ".concat(settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200')
    }));
  }));
}