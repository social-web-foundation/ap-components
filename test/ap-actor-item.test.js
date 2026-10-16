import { expect } from 'chai';
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

  it('renders an actor item when the url is an embedded object', async () => {
    const el = document.createElement('ap-actor-item');
    el.json = mockData.get('https://example.com/user/4')
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    const links = el.shadowRoot.querySelectorAll('a');
    let link
    links.forEach(a => {
      if (a.href === 'https://example.com/user/4.html') {
        link = a;
      }
    });
    expect(link).to.be.ok;
    el.remove();
  });

  it('renders an actor item when the url is an array of embedded objects', async () => {
    const el = document.createElement('ap-actor-item');
    el.json = mockData.get('https://example.com/user/5')
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    const links = el.shadowRoot.querySelectorAll('a');
    let link
    links.forEach(a => {
      if (a.href === 'https://example.com/user/5.html') {
        link = a;
      }
    });
    expect(link).to.be.ok;
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

    for (const [form, value] of [['readable handle', handle], ['encoded acct URI', acct]]) {
      it(`displays ${label} unencoded from a ${form}`, async () => {
        const el = document.createElement('ap-actor-item');
        const actor = mockData.get(actorId);
        el.json = { ...actor, webfinger: value };
        try {
          document.body.appendChild(el);
          await el.updateComplete;
          const link = el.shadowRoot.querySelector('a.webfinger');
          expect(link).to.exist;
          expect(link.textContent).to.equal(handle);
        } finally {
          el.remove();
        }
      });
    }

    it(`displays ${label} unencoded when deriving the handle from the actor`, async () => {
      const el = document.createElement('ap-actor-item');
      const actor = { ...mockData.get(actorId) };
      delete actor.webfinger;
      el.json = actor;
      try {
        document.body.appendChild(el);
        await el.updateComplete;
        const link = el.shadowRoot.querySelector('a.webfinger');
        expect(link).to.exist;
        expect(link.textContent).to.equal(handle);
      } finally {
        el.remove();
      }
    });
  }

});
