import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';
import Header from './components/header/Header';

test('header component exist', () => {
 const component = renderer.create(
    <App></App>
  );
 expect(component.toJSON().children[0].props.className).toBe('Header');
 
});
