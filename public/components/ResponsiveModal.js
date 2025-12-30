"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveModal = ResponsiveModal;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ResponsiveModal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    title = _ref.title,
    children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'md' : _ref$size;
  if (!isOpen) return null;

  // Size classes for different modal sizes
  var sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  };
  var handleBackdropClick = function handleBackdropClick(e) {
    if (e.target.id === 'modal-backdrop') {
      onClose();
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    id: "modal-backdrop",
    className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4",
    onClick: handleBackdropClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white rounded-2xl shadow-2xl w-full ".concat(sizeClasses[size], " p-4 sm:p-6 dark:bg-gray-800 relative max-h-[90vh] overflow-y-auto"),
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300",
    "aria-label": "Close"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  }))), title && /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex justify-between items-center mb-4"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-xl font-bold text-gray-800 dark:text-white"
  }, title)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-4"
  }, children)));
}