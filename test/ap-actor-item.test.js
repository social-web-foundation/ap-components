import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-actor-item.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

describe('<ap-actor-item>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-actor-item');
    el.objectId = 'https://example.com/user/1';
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Something went wrong');
    el.remove();
  });

  it('renders an actor item when json is provided', async () => {
    const el = document.createElement('ap-actor-item');
    el.json = mockData.get('https://example.com/user/1')
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Sample Q. Person');
    el.remove();
  });

  it('renders an actor item when object ID is provided', async () => {
    const el = document.createElement('ap-actor-item');
    el.objectId = 'https://example.com/user/1'
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Sample Q. Person');
    el.remove();
  });
});
