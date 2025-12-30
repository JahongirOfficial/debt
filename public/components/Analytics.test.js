"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _Analytics = require("./Analytics");
var _DebtContext = require("../utils/DebtContext");
var _AuthContext = require("../utils/AuthContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Mock the translation utility
jest.mock('../utils/translationUtils', function () {
  return {
    useTranslation: function useTranslation() {
      return function (key, fallback) {
        var translations = {
          'analytics.title': 'Kengaytirilgan Analitika',
          'analytics.subtitle': 'Qarzlar haqida chuqur tahlil va statistikalar',
          'analytics.paidAmount': 'To\'langan',
          'analytics.adjustmentAmount': 'Tahrirlab ayrilgan:',
          'analytics.directlyPaid': 'To\'g\'ridan-to\'g\'ri to\'langan:'
        };
        return translations[key] || fallback || key;
      };
    }
  };
});

// Mock the storage utility
jest.mock('../utils/storageUtils', function () {
  return {
    useStoredState: function useStoredState(key, defaultValue) {
      return [defaultValue, jest.fn()];
    }
  };
});

// Mock the DebtContext
jest.mock('../utils/DebtContext', function () {
  return {
    useDebts: function useDebts() {
      return {
        debts: [],
        loading: false
      };
    }
  };
});

// Mock AuthContext
jest.mock('../utils/AuthContext', function () {
  return {
    useAuth: function useAuth() {
      return {
        user: {
          id: 'test-user'
        },
        loading: false
      };
    }
  };
});
describe('QarzdaftarAnalytics', function () {
  var renderComponent = function renderComponent() {
    return (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_AuthContext.AuthProvider, null, /*#__PURE__*/_react["default"].createElement(_DebtContext.DebtProvider, null, /*#__PURE__*/_react["default"].createElement(_Analytics.QarzdaftarAnalytics, null))));
  };
  test('renders analytics component', function () {
    renderComponent();

    // Check if the component title is rendered
    expect(_react2.screen.getByText('Kengaytirilgan Analitika')).toBeInTheDocument();
  });
});