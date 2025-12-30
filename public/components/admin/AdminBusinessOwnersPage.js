"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminBusinessOwnersPage = AdminBusinessOwnersPage;
var _react = _interopRequireDefault(require("react"));
var _BusinessOwnersSection = require("./BusinessOwnersSection");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function AdminBusinessOwnersPage() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-7xl mx-auto space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold mb-2"
  }, "\uD83D\uDC68\u200D\uD83D\uDCBC Biznes Egalari"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-blue-100 text-lg"
  }, "Barcha biznes egalari va ularning ma'lumotlari")), /*#__PURE__*/_react["default"].createElement("div", {
    className: "hidden md:block"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "w-10 h-10 text-white",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  })))))), /*#__PURE__*/_react["default"].createElement(_BusinessOwnersSection.BusinessOwnersSection, null));
}