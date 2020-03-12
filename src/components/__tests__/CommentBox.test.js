import React from 'react';
import { mount } from 'enzyme';
import Root from 'root';

import CommentBox from 'components/CommentBox';

let component;

// TODO - Rewrite testing to use Shallow rendering

beforeEach( () => {
  component = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach( () => {
  component.unmount();
});

it ('has a text area and 2 buttons', () => {
  expect(component.find('textarea').length).toEqual(1);
  expect(component.find('button').length).toEqual(2);
});

describe('the textarea', () => {
  beforeEach( () => {
    component.find('textarea').simulate('change', {
        target: { value: 'New Comment' }
      });
      component.update();
  })

  it ('has a text area that users can type in', () => {
    expect(component.find('textarea').prop('value')).toEqual('New Comment');
  });

  it ('empties the text area upon submission', () => {
    component.find('form').simulate('submit');
    component.update();
    expect(component.find('textarea').prop('value')).toEqual('');
  });

});