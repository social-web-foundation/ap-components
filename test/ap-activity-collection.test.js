import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-activity-collection.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

const objectId = 'https://example.com/user/1/outbox'

describe('<ap-activity-collection>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-activity-collection');
    el.objectId = objectId;
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Something went wrong');
    el.remove();
  });

  it('renders a Collection of activities when json is provided', async () => {
    const el = document.createElement('ap-activity-collection');
    el.json = mockData.get(objectId)
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objects = el.shadowRoot.querySelectorAll('ap-activity-item')
    expect(objects.length).to.equal(2);
    el.remove();
  });

  it('renders a Collection of activities when object ID is provided', async () => {
    const el = document.createElement('ap-activity-collection');
    el.objectId = objectId
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objects = el.shadowRoot.querySelectorAll('ap-activity-item')
    expect(objects.length).to.equal(2);
    el.remove();
  });

  it('shows the collection name when provided', async () => {
    const el = document.createElement('ap-activity-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/named-activity-collection',
      type: 'OrderedCollection',
      name: 'Test Activity Collection Header',
      totalItems: 137,
      orderedItems: []
    };
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Test Activity Collection Header');
    el.remove();
  });

  it('shows totalItems when provided', async () => {
    const el = document.createElement('ap-activity-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/counted-activity-collection',
      type: 'OrderedCollection',
      name: 'Counted Activities',
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
    const el = document.createElement('ap-activity-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/summary-activity-collection',
      type: 'OrderedCollection',
      summary: 'Activity Summary Fallback Text',
      totalItems: 0,
      orderedItems: []
    };
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Activity Summary Fallback Text');
    el.remove();
  });

  it("shows 'Collection' when neither name nor summary is provided", async () => {
    const el = document.createElement('ap-activity-collection');
    el.json = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'https://example.com/test/default-activity-collection',
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
