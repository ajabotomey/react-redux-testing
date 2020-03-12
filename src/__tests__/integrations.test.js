import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'root';
import App from 'components/App';

beforeEach( () => {
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [
      {
        name: 'Fetched #1'
      },
      {
        name: 'Fetched #2'
      }
    ]
  })
});

afterEach( () => {
  moxios.uninstall();
});

it ('can fetch a list of comments and display them', (done) => {
  // Attempt to render the entire app
  const component = mount(
    <Root>
      <App />
    </Root>
  );

  // Find the fetch comments button and click it
  component.find('.fetch-comments').simulate('click');

  // Expect to find a list of comments!
  moxios.wait(() => {
    component.update();
    expect(component.find('li').length).toEqual(2);

    done();
    component.unmount();
  });
})