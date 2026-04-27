import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-object-collection.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

const objectId = 'https://example.com/user/1/liked'

describe('<ap-object-collection>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-object-collection');
    el.objectId = objectId;
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Something went wrong');
    el.remove();
  });

  it('renders a Collection of objects when json is provided', async () => {
    const el = document.createElement('ap-object-collection');
    el.json = mockData.get(objectId)
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objects = el.shadowRoot.querySelectorAll('ap-object')
    expect(objects.length).to.equal(2);
    el.remove();
  });

  it('renders a Collection of objects when object ID is provided', async () => {
    const el = document.createElement('ap-object-collection');
    el.objectId = objectId
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objects = el.shadowRoot.querySelectorAll('ap-object')
    expect(objects.length).to.equal(2);
    el.remove();
  });

  it('shows the collection name when provided', async () => {
    const el = document.createElement('ap-object-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/named-object-collection',
      type: 'OrderedCollection',
      name: 'Test Object Collection Header',
      totalItems: 137,
      orderedItems: []
    };
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Test Object Collection Header');
    el.remove();
  });

  it('shows totalItems when provided', async () => {
    const el = document.createElement('ap-object-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/counted-object-collection',
      type: 'OrderedCollection',
      name: 'Counted Objects',
      totalItems: 137,
      orderedItems: []
    };
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('137');
    el.remove();
  });

  it('falls back to summary when name is not provided', async () => {
    const el = document.createElement('ap-object-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/summary-object-collection',
      type: 'OrderedCollection',
      summary: 'Object Summary Fallback Text',
      totalItems: 0,
      orderedItems: []
    };
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Object Summary Fallback Text');
    el.remove();
  });

  it("shows 'Collection' when neither name nor summary is provided", async () => {
    const el = document.createElement('ap-object-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/default-object-collection',
      type: 'OrderedCollection',
      totalItems: 0,
      orderedItems: []
    };
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Collection');
    el.remove();
  });
});
