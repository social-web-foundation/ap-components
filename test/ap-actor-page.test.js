import { expect } from 'chai';
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

  for (const { label, username, domain, hostname } of [
    { label: 'PRECIS@IDNA', username: 'αλέξανδρος', domain: 'ελληνικά.example', hostname: 'xn--hxargifdar.example' },
    { label: 'PRECIS@ASCII', username: 'ελπίδα', domain: 'example.com', hostname: 'example.com' },
    { label: 'ASCII@IDNA', username: 'sample', domain: 'ελληνικά.example', hostname: 'xn--hxargifdar.example' }
  ]) {
    it(`resolves and renders an Actor for ${label}`, async () => {
      const el = document.createElement('ap-actor-page');
      const expectedId = `https://${hostname}/user/${encodeURIComponent(username)}`;
      el.webfinger = `acct:${username}@${domain}`;
      try {
        document.body.appendChild(el);
        const deadline = performance.now() + 1000;
        while (!el.json && !el._error && performance.now() < deadline) {
          await new Promise(resolve => requestAnimationFrame(resolve));
        }
        expect(el._error).to.not.be.ok;
        expect(el.json, 'actor should load through connectedCallback').to.exist;
        await el.updateComplete;
        expect(el.objectId).to.equal(expectedId);
        expect(el.json.id).to.equal(expectedId);
        expect(el.json.preferredUsername).to.equal(username);
        expect(el.json.webfinger).to.equal(`${username}@${domain}`);
        expect(el.shadowRoot.querySelector('ap-actor-profile')).to.exist;
        expect(el.shadowRoot.querySelector('nav.feed-selector')).to.exist;
        expect(el.shadowRoot.querySelector('ap-activity-collection')).to.exist;
      } finally {
        el.remove();
      }
    });
  }

  it('renders an Actor when url is an object', async () => {
    const el = document.createElement('ap-actor-page');
    el.json = mockData.get('https://example.com/user/4')
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.innerHTML).to.include(el.json.url.href)
    el.remove();
  });

  it('renders an Actor when url is an array', async () => {
    const el = document.createElement('ap-actor-page');
    el.json = mockData.get('https://example.com/user/5')
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.innerHTML).to.include(el.json.url[0].href)
    el.remove();
  });
});
