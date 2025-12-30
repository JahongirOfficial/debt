"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProtectedRoute = ProtectedRoute;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _AuthContext = require("../utils/AuthContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// ProtectedRoute component to prevent admin users from accessing regular user routes
function ProtectedRoute(_ref) {
  var children = _ref.children,
    _ref$allowedRoles = _ref.allowedRoles,
    allowedRoles = _ref$allowedRoles === void 0 ? ['user'] : _ref$allowedRoles;
  var _useAuth = (0, _AuthContext.useAuth)(),
    user = _useAuth.user;
  var navigate = (0, _reactRouterDom.useNavigate)();
  (0, _react.useEffect)(function () {
    // Check if user is authenticated and has the required role
    if (!user) {
      // User not authenticated, redirect to login
      navigate('/login');
      return;
    }

    // Check if user role is allowed to access this route
    if (!allowedRoles.includes(user.role)) {
      // User role not allowed, redirect to appropriate dashboard
      if (user.role === 'admin') {
        // Admin users should not access regular user routes
        navigate('/panel/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, allowedRoles, navigate]);

  // Show nothing while checking authentication
  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  // User is authenticated and has the required role, render children
  return children;
}