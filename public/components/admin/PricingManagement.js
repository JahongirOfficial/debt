"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PricingManagement = PricingManagement;
var _react = _interopRequireWildcard(require("react"));
var _api = require("../../utils/api");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
function PricingManagement() {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    pricingPlans = _useState2[0],
    setPricingPlans = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    editingPlan = _useState6[0],
    setEditingPlan = _useState6[1];
  var _useState7 = (0, _react.useState)({
      name: '',
      price: '',
      period: 'month',
      debtLimit: '',
      features: []
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    formData = _useState8[0],
    setFormData = _useState8[1];
  var planColors = {
    'Bepul': 'from-gray-500 to-gray-600',
    'Standart': 'from-orange-500 to-orange-600',
    'Pro': 'from-purple-500 to-purple-600'
  };
  (0, _react.useEffect)(function () {
    fetchPricingPlans();
  }, []);
  var fetchPricingPlans = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            setLoading(true);
            _context.n = 1;
            return (0, _api.apiFetch)('/admin/pricing', {
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token'))
              }
            });
          case 1:
            response = _context.v;
            if (!response.ok) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return response.json();
          case 2:
            data = _context.v;
            setPricingPlans(data.plans);
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Error fetching pricing plans:', _t);
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 4, 5, 6]]);
    }));
    return function fetchPricingPlans() {
      return _ref.apply(this, arguments);
    };
  }();
  var updatePricingPlan = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(planId, updatedPlan) {
      var response, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return (0, _api.apiFetch)("/admin/pricing/".concat(planId), {
              method: 'PUT',
              headers: {
                'Authorization': "Bearer ".concat(localStorage.getItem('token')),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedPlan)
            });
          case 1:
            response = _context2.v;
            if (response.ok) {
              setPricingPlans(pricingPlans.map(function (plan) {
                return plan.id === planId ? _objectSpread(_objectSpread({}, plan), updatedPlan) : plan;
              }));
              setEditingPlan(null);
            }
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            console.error('Error updating pricing plan:', _t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function updatePricingPlan(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleEdit = function handleEdit(plan) {
    setEditingPlan(plan.id);
    setFormData({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      debtLimit: plan.debtLimit,
      features: plan.features || []
    });
  };
  var handleSave = function handleSave() {
    updatePricingPlan(editingPlan, formData);
  };
  var handleCancel = function handleCancel() {
    setEditingPlan(null);
    setFormData({
      name: '',
      price: '',
      period: 'month',
      debtLimit: '',
      features: []
    });
  };
  var addFeature = function addFeature() {
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      features: [].concat(_toConsumableArray(formData.features), [''])
    }));
  };
  var updateFeature = function updateFeature(index, value) {
    var newFeatures = _toConsumableArray(formData.features);
    newFeatures[index] = value;
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      features: newFeatures
    }));
  };
  var removeFeature = function removeFeature(index) {
    var newFeatures = formData.features.filter(function (_, i) {
      return i !== index;
    });
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      features: newFeatures
    }));
  };
  if (loading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "animate-pulse"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-8 bg-white bg-opacity-20 rounded-lg w-1/3 mb-2"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "h-4 bg-white bg-opacity-20 rounded w-1/2"
    }))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
    }, _toConsumableArray(Array(3)).map(function (_, i) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: i,
        className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "p-8"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "animate-pulse space-y-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "space-y-2"
      }, _toConsumableArray(Array(4)).map(function (_, j) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: j,
          className: "h-4 bg-gray-300 dark:bg-gray-600 rounded"
        });
      })))));
    })));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "space-y-8"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", {
    className: "text-3xl font-bold mb-2"
  }, "Tarif Rejalarini Boshqarish"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-purple-100 text-lg"
  }, "Tarif rejalarini tahrirlash va yangilash")), /*#__PURE__*/_react["default"].createElement("div", {
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
    d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-8"
  }, pricingPlans.map(function (plan) {
    var _plan$features;
    var gradient = planColors[plan.name] || 'from-gray-500 to-gray-600';
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: plan.id,
      className: "relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-gradient-to-r ".concat(gradient, " p-6 text-white")
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex justify-between items-start"
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", {
      className: "text-2xl font-bold mb-2"
    }, plan.name), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-baseline"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-4xl font-bold"
    }, plan.price === '0' ? 'Bepul' : plan.price), plan.price !== '0' && /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-lg ml-2 opacity-80"
    }, "UZS/", plan.period === 'month' ? 'oyiga' : 'yiliga'))), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleEdit(plan);
      },
      className: "p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-200"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    }))))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "p-8 flex-1 flex flex-col"
    }, editingPlan === plan.id ? /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-6"
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
      className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    }, "Nomi"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: formData.name,
      onChange: function onChange(e) {
        return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
          name: e.target.value
        }));
      },
      className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
      className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    }, "Narx"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "number",
      value: formData.price,
      onChange: function onChange(e) {
        return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
          price: e.target.value
        }));
      },
      className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
      className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    }, "Davomiyligi"), /*#__PURE__*/_react["default"].createElement("select", {
      value: formData.period,
      onChange: function onChange(e) {
        return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
          period: e.target.value
        }));
      },
      className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    }, /*#__PURE__*/_react["default"].createElement("option", {
      value: "month"
    }, "Oyiga"), /*#__PURE__*/_react["default"].createElement("option", {
      value: "year"
    }, "Yiliga"))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
      className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    }, "Qarzlar chegarasi"), /*#__PURE__*/_react["default"].createElement("input", {
      type: "number",
      value: formData.debtLimit,
      onChange: function onChange(e) {
        return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
          debtLimit: e.target.value
        }));
      },
      className: "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", {
      className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    }, "Imkoniyatlar"), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-3"
    }, formData.features.map(function (feature, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index,
        className: "flex space-x-3"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "text",
        value: feature,
        onChange: function onChange(e) {
          return updateFeature(index, e.target.value);
        },
        className: "flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
        placeholder: "Imkoniyat nomi"
      }), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return removeFeature(index);
        },
        className: "px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      }))));
    }), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: addFeature,
      className: "flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
    })), /*#__PURE__*/_react["default"].createElement("span", null, "Imkoniyat qo'shish")))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex space-x-3 pt-4"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: handleSave,
      className: "flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
    }, "Saqlash"), /*#__PURE__*/_react["default"].createElement("button", {
      onClick: handleCancel,
      className: "flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
    }, "Bekor qilish"))) : /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex flex-col h-full"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "mb-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center space-x-2 mb-4"
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "w-5 h-5 text-gray-500 dark:text-gray-400",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    })), /*#__PURE__*/_react["default"].createElement("span", {
      className: "text-sm text-gray-600 dark:text-gray-400"
    }, "Qarzlar chegarasi:"), /*#__PURE__*/_react["default"].createElement("span", {
      className: "font-semibold text-gray-900 dark:text-white"
    }, plan.debtLimit, " ta"))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-3 flex-1"
    }, /*#__PURE__*/_react["default"].createElement("h4", {
      className: "font-semibold text-gray-900 dark:text-white mb-4"
    }, "Imkoniyatlar:"), (_plan$features = plan.features) === null || _plan$features === void 0 ? void 0 : _plan$features.map(function (feature, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index,
        className: "flex items-start space-x-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex-shrink-0 mt-1"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "w-5 h-5 rounded-full bg-gradient-to-r ".concat(gradient, " flex items-center justify-center")
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        className: "w-3 h-3 text-white",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/_react["default"].createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M5 13l4 4L19 7"
      })))), /*#__PURE__*/_react["default"].createElement("span", {
        className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
      }, feature));
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "mt-8"
    }, /*#__PURE__*/_react["default"].createElement("button", {
      onClick: function onClick() {
        return handleEdit(plan);
      },
      className: "w-full bg-gradient-to-r ".concat(gradient, " hover:shadow-lg text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105")
    }, "Tahrirlash")))));
  })));
}