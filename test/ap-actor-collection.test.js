import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-actor-collection.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

const objectId = 'https://example.com/user/1/followers'

describe('<ap-actor-collection>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-actor-collection');
    el.objectId = objectId;
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Something went wrong');
    el.remove();
  });

  it('renders an Actor collection when json is provided', async () => {
    const el = document.createElement('ap-actor-collection');
    el.json = mockData.get(objectId)
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objects = el.shadowRoot.querySelectorAll('ap-actor-item')
    expect(objects.length).to.equal(2);
    el.remove();
  });

  it('renders an Actor collection when object ID is provided', async () => {
    const el = document.createElement('ap-actor-collection');
    el.objectId = objectId
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objects = el.shadowRoot.querySelectorAll('ap-actor-item')
    expect(objects.length).to.equal(2);
    el.remove();
  });
});
