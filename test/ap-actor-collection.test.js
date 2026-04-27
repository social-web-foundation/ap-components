import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-actor-collection.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

const objectId = 'https://example.com/user/1/followers'
const collectionWithEmbeddedObjects = 'https://example.com/user/1/following'

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

  it('renders an Actor collection when objectId is set', async () => {
    const el = document.createElement('ap-actor-collection');
    el.objectId = objectId
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objects = el.shadowRoot.querySelectorAll('ap-actor-item')
    expect(objects.length).to.equal(2);
    el.remove();
  });

  it('renders an Actor collection with embedded objects', async () => {
    const el = document.createElement('ap-actor-collection');
    el.objectId = collectionWithEmbeddedObjects
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objects = el.shadowRoot.querySelectorAll('ap-actor-item')
    expect(objects.length).to.equal(22);
    el.remove();
  });

  it('shows the collection name when provided', async () => {
    const el = document.createElement('ap-actor-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/named-actor-collection',
      type: 'OrderedCollection',
      name: 'Test Actor Collection Header',
      totalItems: 137,
      orderedItems: []
    };
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Test Actor Collection Header');
    el.remove();
  });

  it('shows totalItems when provided', async () => {
    const el = document.createElement('ap-actor-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/counted-actor-collection',
      type: 'OrderedCollection',
      name: 'Counted Actors',
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
    const el = document.createElement('ap-actor-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/summary-actor-collection',
      type: 'OrderedCollection',
      summary: 'Actor Summary Fallback Text',
      totalItems: 0,
      orderedItems: []
    };
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Actor Summary Fallback Text');
    el.remove();
  });

  it("shows 'Collection' when neither name nor summary is provided", async () => {
    const el = document.createElement('ap-actor-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/default-actor-collection',
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
