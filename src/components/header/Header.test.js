import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Header from './Header';

test('check App Name', () => {
 const component = renderer.create(
    <Header></Header>
  );
 expect(component.toJSON().children[0].children[0].children[0]).toBe('Mails Demo');
 
});
