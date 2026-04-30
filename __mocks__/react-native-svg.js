const React = require('react');
const {View} = require('react-native');

function createMockComponent(name) {
  return function MockComponent(props) {
    return React.createElement(View, {...props, accessibilityLabel: name}, props.children);
  };
}

module.exports = {
  __esModule: true,
  default: createMockComponent('Svg'),
  Rect: createMockComponent('Rect'),
};
