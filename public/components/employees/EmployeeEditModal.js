"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmployeeEditModal = EmployeeEditModal;
var _react = require("react");
var _EmployeeContext = require("../../utils/EmployeeContext");
var _ToastContext = require("../../utils/ToastContext");
var _AuthContext = require("../../utils/AuthContext");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function EmployeeEditModal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onEmployeeUpdated = _ref.onEmployeeUpdated,
    employee = _ref.employee,
    branches = _ref.branches;
  var _useEmployees = (0, _EmployeeContext.useEmployees)(),
    updateEmployee = _useEmployees.updateEmployee;
  var _useToast = (0, _ToastContext.useToast)(),
    showError = _useToast.showError;
  var _useAuth = (0, _AuthContext.useAuth)(),
    settings = _useAuth.settings;
  var _useState = (0, _react.useState)({
      name: '',
      phone: '',
      position: '',
      branchId: '',
      permissions: {
        canAddDebt: false,
        canEditDebt: false,
        canDeleteDebt: false,
        canViewDebts: true,
        canManagePayments: false,
        canViewReports: false,
        canManageCreditors: false
      },
      isActive: true
    }),
    _useState2 = _slicedToArray(_useState, 2),
    formData = _useState2[0],
    setFormData = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    hasChanges = _useState6[0],
    setHasChanges = _useState6[1];

  // Update form data when employee changes
  (0, _react.useEffect)(function () {
    if (employee) {
      var initialData = {
        name: employee.name || '',
        phone: employee.phone || '',
        position: employee.position || '',
        branchId: employee.branchId || '',
        permissions: employee.permissions || {
          canAddDebt: false,
          canEditDebt: false,
          canDeleteDebt: false,
          canViewDebts: true,
          canManagePayments: false,
          canViewReports: false,
          canManageCreditors: false
        },
        isActive: employee.isActive !== undefined ? employee.isActive : true
      };
      setFormData(initialData);
      setHasChanges(false);
    }
  }, [employee]);

  // Check for changes
  (0, _react.useEffect)(function () {
    if (employee) {
      var hasChanged = formData.name !== (employee.name || '') || formData.phone !== (employee.phone || '') || formData.position !== (employee.position || '') || formData.branchId !== (employee.branchId || '') || formData.isActive !== (employee.isActive !== undefined ? employee.isActive : true) || JSON.stringify(formData.permissions) !== JSON.stringify(employee.permissions || {});
      setHasChanges(hasChanged);
    }
  }, [formData, employee]);
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var phoneRegex, result, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();

            // Validation
            if (formData.name.trim()) {
              _context.n = 1;
              break;
            }
            showError('Xodim ismi kiritilishi shart');
            return _context.a(2);
          case 1:
            if (formData.phone.trim()) {
              _context.n = 2;
              break;
            }
            showError('Telefon raqami kiritilishi shart');
            return _context.a(2);
          case 2:
            if (formData.branchId) {
              _context.n = 3;
              break;
            }
            showError('Filial tanlanishi shart');
            return _context.a(2);
          case 3:
            // Phone validation
            phoneRegex = /^\+998[0-9]{9}$/;
            if (phoneRegex.test(formData.phone.trim())) {
              _context.n = 4;
              break;
            }
            showError('Telefon raqami noto\'g\'ri formatda. Masalan: +998901234567');
            return _context.a(2);
          case 4:
            setLoading(true);
            _context.p = 5;
            _context.n = 6;
            return updateEmployee(employee._id, formData);
          case 6:
            result = _context.v;
            if (result.success) {
              onEmployeeUpdated();
              onClose();
            } else {
              showError(result.message || 'Xodim yangilashda xatolik yuz berdi');
            }
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
            console.error('Employee update error:', _t);
            showError('Xodim yangilashda xatolik yuz berdi');
          case 8:
            _context.p = 8;
            setLoading(false);
            return _context.f(8);
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[5, 7, 8, 9]]);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handlePermissionChange = function handlePermissionChange(permission, value) {
    setFormData(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        permissions: _objectSpread(_objectSpread({}, prev.permissions), {}, _defineProperty({}, permission, value))
      });
    });
  };
  if (!isOpen || !employee) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-5xl max-h-[95vh] rounded-xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden ".concat(settings.theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200')
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200 dark:border-slate-700 flex-shrink-0"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg sm:text-xl font-bold ".concat(settings.theme === 'dark' ? 'text-slate-100' : 'text-gray-900')
  }, "Xodimni tahrirlash"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5 sm:w-6 sm:h-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto"
  }, /*#__PURE__*/React.createElement("form", {
    id: "employee-edit-form",
    onSubmit: handleSubmit,
    className: "p-3 sm:p-4 lg:p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 sm:space-y-4 lg:space-y-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-base sm:text-lg font-semibold ".concat(settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-800')
  }, "Asosiy ma'lumotlar"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 sm:space-y-3 lg:space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-1 sm:mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700')
  }, "Ism *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.name,
    onChange: function onChange(e) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        name: e.target.value
      }));
    },
    className: "w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border transition-colors text-sm sm:text-base ".concat(settings.theme === 'dark' ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500', " focus:outline-none focus:ring-2 focus:ring-blue-500/20"),
    placeholder: "Xodim ismi",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-1 sm:mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700')
  }, "Telefon *"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    value: formData.phone,
    onChange: function onChange(e) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        phone: e.target.value
      }));
    },
    className: "w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border transition-colors text-sm sm:text-base ".concat(settings.theme === 'dark' ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500', " focus:outline-none focus:ring-2 focus:ring-blue-500/20"),
    placeholder: "+998901234567",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-1 sm:mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700')
  }, "Lavozim"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.position,
    onChange: function onChange(e) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        position: e.target.value
      }));
    },
    className: "w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border transition-colors text-sm sm:text-base ".concat(settings.theme === 'dark' ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500', " focus:outline-none focus:ring-2 focus:ring-blue-500/20"),
    placeholder: "Kassir, Menejer, ..."
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-1 sm:mb-2 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700')
  }, "Filial *"), /*#__PURE__*/React.createElement("select", {
    value: formData.branchId,
    onChange: function onChange(e) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        branchId: e.target.value
      }));
    },
    className: "w-full px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border transition-colors text-sm sm:text-base ".concat(settings.theme === 'dark' ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500', " focus:outline-none focus:ring-2 focus:ring-blue-500/20"),
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Filialni tanlang"), branches.map(function (branch) {
    return /*#__PURE__*/React.createElement("option", {
      key: branch._id,
      value: branch._id
    }, branch.name);
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center space-x-3 cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: formData.isActive,
    onChange: function onChange(e) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        isActive: e.target.checked
      }));
    },
    className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700')
  }, "Faol xodim"))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 sm:space-y-4 lg:space-y-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-base sm:text-lg font-semibold ".concat(settings.theme === 'dark' ? 'text-slate-200' : 'text-gray-800')
  }, "Ruxsatlar"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700')
  }, "Qarz boshqaruvi"), Object.entries({
    canAddDebt: 'Qarz qo\'shish',
    canEditDebt: 'Qarzni tahrirlash',
    canDeleteDebt: 'Qarzni o\'chirish',
    canViewDebts: 'Qarzlarni ko\'rish'
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      key = _ref4[0],
      label = _ref4[1];
    return /*#__PURE__*/React.createElement("label", {
      key: key,
      className: "flex items-center space-x-2 sm:space-x-3 cursor-pointer p-2 sm:p-2.5 rounded-lg transition-colors ".concat(settings.theme === 'dark' ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50')
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: formData.permissions[key],
      onChange: function onChange(e) {
        return handlePermissionChange(key, e.target.checked);
      },
      className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-medium ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700')
    }, label));
  })), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700')
  }, "Boshqa ruxsatlar"), Object.entries({
    canManagePayments: 'To\'lovlarni boshqarish',
    canViewReports: 'Hisobotlarni ko\'rish',
    canManageCreditors: 'Kreditorlarni boshqarish'
  }).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      key = _ref6[0],
      label = _ref6[1];
    return /*#__PURE__*/React.createElement("label", {
      key: key,
      className: "flex items-center space-x-2 sm:space-x-3 cursor-pointer p-2 sm:p-2.5 rounded-lg transition-colors ".concat(settings.theme === 'dark' ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50')
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: formData.permissions[key],
      onChange: function onChange(e) {
        return handlePermissionChange(key, e.target.checked);
      },
      className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-medium ".concat(settings.theme === 'dark' ? 'text-slate-300' : 'text-gray-700')
    }, label));
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row justify-end items-center p-3 sm:p-4 lg:p-6 border-t border-gray-200 dark:border-slate-700 space-y-2 sm:space-y-0 sm:space-x-3 flex-shrink-0 bg-gray-50 dark:bg-slate-800/50"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    disabled: loading,
    className: "px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base ".concat(settings.theme === 'dark' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50', " disabled:cursor-not-allowed")
  }, "Bekor qilish"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    form: "employee-edit-form",
    disabled: loading || !formData.name.trim() || !formData.phone.trim() || !formData.branchId || !hasChanges,
    className: "px-3 sm:px-4 lg:px-8 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base ".concat(hasChanges && !loading ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700' : 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400')
  }, loading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    className: "opacity-25",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("path", {
    className: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })), "Saqlanmoqda...") : hasChanges ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M5 13l4 4L19 7"
  })), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "O'zgarishlarni saqlash"), /*#__PURE__*/React.createElement("span", {
    className: "sm:hidden"
  }, "Saqlash")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 12l2 2 4-4"
  })), /*#__PURE__*/React.createElement("span", {
    className: "hidden sm:inline"
  }, "O'zgarish yo'q"), /*#__PURE__*/React.createElement("span", {
    className: "sm:hidden"
  }, "Yo'q"))))));
}