import React from 'react';
import renderer, {act} from 'react-test-renderer';
import {Text} from 'react-native';

import App from '../App';

describe('App', () => {
  it('renderiza el mensaje base del proyecto', () => {
    let app: renderer.ReactTestRenderer;

    act(() => {
      app = renderer.create(<App />);
    });

    const texts = app!.root.findAllByType(Text);
    const content = texts
      .map(node => node.props.children)
      .flat()
      .join(' ');

    expect(content).toContain('Frontend React Native listo');
  });
});
