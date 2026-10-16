import { expect } from 'chai';
import '../lib/ap-actor-profile.js';
import { mockData } from './mock-server.js';

describe('<ap-actor-profile>', () => {

  it('renders an Actor profile', async () => {
    const el = document.createElement('ap-actor-profile');
    const actor = mockData.get('https://example.com/user/1')
    el.name = actor.name
    el.webfinger = actor.webfinger
    el.webfingerHref = `web+acct:${actor.webfinger}`
    el.summary = actor.summary
    el.url = actor.url
    el.icon = actor.icon.href
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.innerHTML).to.include(actor.name)
    expect(el.shadowRoot.querySelector('a.webfinger').textContent).to.equal(actor.webfinger)
    expect(el.shadowRoot.querySelector('a.webfinger').getAttribute('href')).to.equal(el.webfingerHref)
    expect(el.shadowRoot.innerHTML).to.include(actor.summary)
    expect(el.shadowRoot.innerHTML).to.include(actor.url)
    expect(el.shadowRoot.innerHTML).to.include(actor.icon.href)
    el.remove();
  });

  for (const { label, username, domain, hostname } of [
    { label: 'PRECIS@IDNA', username: 'αλέξανδρος', domain: 'ελληνικά.example', hostname: 'xn--hxargifdar.example' },
    { label: 'PRECIS@ASCII', username: 'ελπίδα', domain: 'example.com', hostname: 'example.com' },
    { label: 'ASCII@IDNA', username: 'sample', domain: 'ελληνικά.example', hostname: 'xn--hxargifdar.example' }
  ]) {
    const actorId = `https://${hostname}/user/${encodeURIComponent(username)}`;
    const handle = `${username}@${domain}`;
    const acct = `acct:${encodeURIComponent(username)}@${hostname}`;

    it(`renders supplied ${label} text and href unchanged`, async () => {
      const el = document.createElement('ap-actor-profile');
      const actor = mockData.get(actorId);
      el.name = actor.name;
      el.webfinger = handle;
      el.webfingerHref = `web+${acct}`;
      el.summary = actor.summary;
      el.url = actor.url;
      el.icon = actor.icon.href;
      try {
        document.body.appendChild(el);
        await el.updateComplete;
        const link = el.shadowRoot.querySelector('a.webfinger');
        expect(link).to.exist;
        expect(link.textContent).to.equal(handle);
        expect(link.getAttribute('href')).to.equal(`web+${acct}`);
      } finally {
        el.remove();
      }
    });
  }

});
