"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminEmployeesPage = AdminEmployeesPage;
var _react = _interopRequireDefault(require("react"));
var _AdminEmployeesSection = require("./AdminEmployeesSection");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function AdminEmployeesPage() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "max-w-7xl mx-auto space-y-6"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold mb-2"
  }, "\uD83D\uDC65 Xodimlar"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-indigo-100 text-lg"
  }, "Barcha biznes egalari xodimlari ro'yxati")), /*#__PURE__*/_react["default"].createElement("div", {
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
    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  })))))), /*#__PURE__*/_react["default"].createElement(_AdminEmployeesSection.AdminEmployeesSection, null));
}