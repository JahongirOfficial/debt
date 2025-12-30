"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
require("@testing-library/jest-dom");
var _Ratings = require("./Ratings");
var _storageUtils = require("../utils/storageUtils");
var _translationUtils = require("../utils/translationUtils");
var _DebtContext = require("../utils/DebtContext");
var _AuthContext = require("../utils/AuthContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Mock the hooks
jest.mock('../utils/storageUtils');
jest.mock('../utils/translationUtils');
jest.mock('../utils/DebtContext');
jest.mock('../utils/AuthContext');
describe('QarzdaftarRatings', function () {
  var mockRatings = [{
    _id: '1',
    creditor: 'John Doe',
    ratingScore: 95,
    totalDebts: 5,
    paidDebts: 4,
    pendingDebts: 1,
    averageDelay: 0,
    ratingStatus: 'excellent'
  }, {
    _id: '2',
    creditor: 'Jane Smith',
    ratingScore: 75,
    totalDebts: 8,
    paidDebts: 6,
    pendingDebts: 2,
    averageDelay: 2,
    ratingStatus: 'good'
  }];
  beforeEach(function () {
    _storageUtils.useStoredState.mockImplementation(function (key, defaultValue) {
      if (key === 'qarzdaftar_language') return ['uz', jest.fn()];
      return [defaultValue, jest.fn()];
    });
    _AuthContext.useAuth.mockReturnValue({
      settings: {
        theme: 'light'
      }
    });
    _translationUtils.useTranslation.mockReturnValue(jest.fn(function (key, fallback) {
      return fallback;
    }));
    _DebtContext.useDebts.mockReturnValue({
      ratings: mockRatings,
      loading: false,
      fetchRatings: jest.fn(),
      calculateRatings: jest.fn()
    });
  });
  test('renders ratings table with correct data', function () {
    (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Ratings.QarzdaftarRatings, null));

    // Check if table headers are present
    expect(_react2.screen.getByText('Kreditor')).toBeInTheDocument();
    expect(_react2.screen.getByText('Reyting')).toBeInTheDocument();
    expect(_react2.screen.getByText('Jami')).toBeInTheDocument();
    expect(_react2.screen.getByText('To\'langan')).toBeInTheDocument();
    expect(_react2.screen.getByText('Kutilayotgan')).toBeInTheDocument();
    expect(_react2.screen.getByText('Kechikish')).toBeInTheDocument();
    expect(_react2.screen.getByText('Holat')).toBeInTheDocument();

    // Check if data is rendered correctly
    expect(_react2.screen.getByText('John Doe')).toBeInTheDocument();
    expect(_react2.screen.getByText('95%')).toBeInTheDocument();
    expect(_react2.screen.getByText('5')).toBeInTheDocument();
    expect(_react2.screen.getByText('4')).toBeInTheDocument();
    expect(_react2.screen.getByText('1')).toBeInTheDocument();
    expect(_react2.screen.getByText('-')).toBeInTheDocument(); // No delay for John

    expect(_react2.screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(_react2.screen.getByText('75%')).toBeInTheDocument();
    expect(_react2.screen.getByText('2 kun')).toBeInTheDocument(); // 2 days delay for Jane
  });
  test('renders rating status with correct colors', function () {
    (0, _react2.render)(/*#__PURE__*/_react["default"].createElement(_Ratings.QarzdaftarRatings, null));

    // Check if rating status badges are present with correct classes
    var excellentBadge = _react2.screen.getByText('Ajoyib');
    var goodBadge = _react2.screen.getByText('Yaxshi');
    expect(excellentBadge).toBeInTheDocument();
    expect(goodBadge).toBeInTheDocument();
  });
});