"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTierFeatures = exports.getTierDisplayName = exports.getTierColors = exports.getTierBadgeProps = exports.formatTierDisplay = exports.canAccessFeature = void 0;
// Subscription tier utility functions

/**
 * Get display name for subscription tier
 * @param {string} tier - Subscription tier (free, lite, standard, pro)
 * @param {string} role - User role (user, admin, employee)
 * @returns {string} Display name
 */
var getTierDisplayName = exports.getTierDisplayName = function getTierDisplayName(tier, role) {
  if (role === 'employee') {
    return 'XODIM';
  }
  switch (tier) {
    case 'free':
      return 'Free';
    case 'lite':
      return 'Lite';
    case 'standard':
      return 'Standard';
    case 'pro':
      return 'Pro';
    default:
      return 'Free';
  }
};

/**
 * Get tier color classes for UI
 * @param {string} tier - Subscription tier
 * @param {string} role - User role
 * @returns {object} Color classes for different UI elements
 */
var getTierColors = exports.getTierColors = function getTierColors(tier, role) {
  if (role === 'employee') {
    return {
      gradient: 'from-orange-500 to-amber-500',
      bg: 'bg-orange-500',
      text: 'text-orange-600',
      badge: 'bg-orange-100 text-orange-800'
    };
  }
  switch (tier) {
    case 'pro':
      return {
        gradient: 'from-purple-500 to-pink-500',
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-800'
      };
    case 'standard':
      return {
        gradient: 'from-blue-500 to-indigo-500',
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800'
      };
    case 'lite':
      return {
        gradient: 'from-green-500 to-emerald-500',
        bg: 'bg-green-500',
        text: 'text-green-600',
        badge: 'bg-green-100 text-green-800'
      };
    case 'free':
    default:
      return {
        gradient: 'from-gray-500 to-gray-600',
        bg: 'bg-gray-500',
        text: 'text-gray-600',
        badge: 'bg-gray-100 text-gray-800'
      };
  }
};

/**
 * Get tier features and limits
 * @param {string} tier - Subscription tier
 * @returns {object} Tier features and limits
 */
var getTierFeatures = exports.getTierFeatures = function getTierFeatures(tier) {
  switch (tier) {
    case 'pro':
      return {
        debtLimit: Infinity,
        branchLimit: Infinity,
        smsNotifications: true,
        analytics: true,
        "export": true,
        priority: 'high'
      };
    case 'standard':
      return {
        debtLimit: 500,
        branchLimit: 10,
        smsNotifications: true,
        analytics: true,
        "export": true,
        priority: 'medium'
      };
    case 'lite':
      return {
        debtLimit: 100,
        branchLimit: 3,
        smsNotifications: true,
        analytics: false,
        "export": false,
        priority: 'low'
      };
    case 'free':
    default:
      return {
        debtLimit: 20,
        branchLimit: 1,
        smsNotifications: false,
        analytics: false,
        "export": false,
        priority: 'lowest'
      };
  }
};

/**
 * Check if user can access a feature
 * @param {string} tier - User's subscription tier
 * @param {string} feature - Feature to check
 * @returns {boolean} Whether user can access the feature
 */
var canAccessFeature = exports.canAccessFeature = function canAccessFeature(tier, feature) {
  var features = getTierFeatures(tier);
  return features[feature] === true;
};

/**
 * Get tier badge component props
 * @param {string} tier - Subscription tier
 * @returns {object} Badge props
 */
var getTierBadgeProps = exports.getTierBadgeProps = function getTierBadgeProps(tier) {
  var colors = getTierColors(tier);
  var displayName = getTierDisplayName(tier);
  return {
    className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ".concat(colors.badge),
    children: displayName
  };
};

/**
 * Format tier display with icon
 * @param {string} tier - Subscription tier
 * @returns {object} Formatted tier info
 */
var formatTierDisplay = exports.formatTierDisplay = function formatTierDisplay(tier) {
  var displayName = getTierDisplayName(tier);
  var colors = getTierColors(tier);
  var icon = '👤'; // Default icon
  switch (tier) {
    case 'pro':
      icon = '👑';
      break;
    case 'standard':
      icon = '⭐';
      break;
    case 'lite':
      icon = '🌟';
      break;
    case 'free':
      icon = '👤';
      break;
  }
  return {
    name: displayName,
    icon: icon,
    colors: colors,
    fullName: "".concat(icon, " ").concat(displayName, " tarif")
  };
};