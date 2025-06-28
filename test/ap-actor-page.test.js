import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-actor-page.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

const actorId = 'https://example.com/user/1'
const webfinger = 'acct:one@example.com'

describe('<ap-actor-page>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-actor-page');
    el.objectId = actorId;
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    el.remove();
  });

  it('renders an Actor when json is provided', async () => {
    const el = document.createElement('ap-actor-page');
    el.json = mockData.get(actorId)
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('ap-actor-profile')).to.exist
    expect(el.shadowRoot.querySelector('nav.feed-selector')).to.exist
    expect(el.shadowRoot.querySelector('ap-activity-collection')).to.exist
    el.remove();
  });

  it('renders an Actor when object ID is provided', async () => {
    const el = document.createElement('ap-actor-page');
    el.objectId = actorId
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('ap-actor-profile')).to.exist
    expect(el.shadowRoot.querySelector('nav.feed-selector')).to.exist
    expect(el.shadowRoot.querySelector('ap-activity-collection')).to.exist
    el.remove();
  });

  it('renders an Actor when Webfinger is provided', async () => {
    const el = document.createElement('ap-actor-page');
    el.webfinger = webfinger
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('ap-actor-profile')).to.exist
    expect(el.shadowRoot.querySelector('nav.feed-selector')).to.exist
    expect(el.shadowRoot.querySelector('ap-activity-collection')).to.exist
    el.remove();
  });
});
