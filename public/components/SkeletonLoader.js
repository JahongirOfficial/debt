"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletonLoader = SkeletonLoader;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function SkeletonLoader(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'default' : _ref$type,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var baseClasses = "animate-pulse bg-gray-200 rounded";
  var skeletonTypes = {
    // Dashboard stats cards
    dashboardStats: /*#__PURE__*/_react["default"].createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8"
    }, [1, 2, 3].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item,
        className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-24 mb-2")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-6 w-32")
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-12 h-12 rounded-xl")
      })));
    })),
    // Dashboard chart
    dashboardChart: /*#__PURE__*/_react["default"].createElement("div", {
      className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl mb-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-6 w-48 mb-4")
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-64 w-full rounded-lg")
    })),
    // Dashboard recent activity
    dashboardActivity: /*#__PURE__*/_react["default"].createElement("div", {
      className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-6 w-48 mb-4")
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-3"
    }, [1, 2, 3, 4, 5].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item,
        className: "flex items-center justify-between p-3 bg-white/20 rounded-lg"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center gap-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-10 h-10 rounded-full")
      }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-24 mb-1")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-3 w-16")
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-right"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-20 mb-1")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-3 w-16")
      })));
    }))),
    // Debts list
    debtsList: /*#__PURE__*/_react["default"].createElement("div", {
      className: "max-w-6xl mx-auto p-4 md:p-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex justify-between items-center mb-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-8 w-48")
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-4"
    }, [1, 2, 3, 4, 5].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item,
        className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center gap-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-12 h-12 rounded-full")
      }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-5 w-32 mb-1")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-24")
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-right"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-6 w-24 mb-1")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-20")
      }))));
    }))),
    // Analytics summary cards
    analyticsStats: /*#__PURE__*/_react["default"].createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    }, [1, 2, 3, 4].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item,
        className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-24 mb-2")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-8 w-32")
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-12 h-12 rounded-xl")
      })));
    })),
    // Analytics charts
    analyticsCharts: /*#__PURE__*/_react["default"].createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-6 w-40 mb-4")
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " w-48 h-48 rounded-full")
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex justify-center gap-6 mt-4"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " w-4 h-4 rounded-full")
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-4 w-24")
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " w-4 h-4 rounded-full")
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-4 w-24")
    })))), /*#__PURE__*/_react["default"].createElement("div", {
      className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-6 w-40 mb-4")
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-3"
    }, [1, 2, 3, 4, 5, 6].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item,
        className: "flex items-center justify-between"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-20")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center gap-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-3 h-3 rounded-full")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-8")
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center gap-2"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-3 h-3 rounded-full")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-8")
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-20")
      })));
    })))),
    // Analytics creditors
    analyticsCreditors: /*#__PURE__*/_react["default"].createElement("div", {
      className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-6 w-64 mb-4")
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-3"
    }, [1, 2, 3, 4, 5].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item,
        className: "flex items-center justify-between p-3 bg-white/50 rounded-lg"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center gap-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-8 h-8 rounded-full")
      }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-5 w-32 mb-1")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-20")
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-right"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-6 w-24 mb-1")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-32")
      })));
    }))),
    // Reports list
    reportsList: /*#__PURE__*/_react["default"].createElement("div", {
      className: "max-w-4xl mx-auto"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-4"
    }, [1, 2, 3, 4, 5].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item,
        className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center gap-3"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-12 h-12 rounded-full")
      }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-5 w-32 mb-1")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-24")
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-right"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-6 w-24 mb-1")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-20")
      }))));
    }))),
    // Ratings stats
    ratingsStats: /*#__PURE__*/_react["default"].createElement("div", {
      className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
    }, [1, 2, 3, 4].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item,
        className: "backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl p-4 shadow-xl"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center justify-between"
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-20 mb-2")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-8 w-12")
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-12 h-12 rounded-xl")
      })));
    })),
    // Ratings list
    ratingsList: /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-4"
    }, [1, 2, 3, 4, 5].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item,
        className: "backdrop-blur-lg border rounded-2xl p-4 shadow-lg"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center gap-4"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " w-12 h-12 rounded-full")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex-1"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex items-center gap-2 mb-1"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-6 w-32")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-5 w-20 rounded-full")
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
      }, [1, 2, 3, 4].map(function (subItem) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: subItem
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "".concat(baseClasses, " h-4 w-16 mb-1")
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: "".concat(baseClasses, " h-5 w-8")
        }));
      })))));
    })),
    // Auth form
    authForm: /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-8 w-32 mx-auto")
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-5 w-40 mt-2 mx-auto")
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "p-8"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "space-y-6"
    }, [1, 2].map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: item
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-4 w-16 mb-2")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(baseClasses, " h-12 w-full rounded-lg")
      }));
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " w-4 h-4 rounded")
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-4 w-20 ml-2")
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-4 w-24")
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-12 w-full rounded-lg")
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "mt-8 pt-6 border-t border-gray-200"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " h-4 w-64 mx-auto")
    })))),
    // Default skeleton
    "default": /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex justify-center items-center h-64"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "".concat(baseClasses, " rounded-full h-12 w-12")
    }))
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className
  }, skeletonTypes[type] || skeletonTypes["default"]);
}