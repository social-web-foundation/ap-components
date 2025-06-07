import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-actor-profile.js';
import { mockData } from './mock-server.js';

describe('<ap-actor-profile>', () => {

  it('renders an Actor profile', async () => {
    const el = document.createElement('ap-actor-profile');
    const actor = mockData.get('https://example.com/user/1')
    el.name = actor.name
    el.webfinger = actor.webfinger
    el.summary = actor.summary
    el.url = actor.url
    el.icon = actor.icon.href
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.innerHTML).to.include(actor.name)
    expect(el.shadowRoot.innerHTML).to.include(actor.webfinger)
    expect(el.shadowRoot.innerHTML).to.include(actor.summary)
    expect(el.shadowRoot.innerHTML).to.include(actor.url)
    expect(el.shadowRoot.innerHTML).to.include(actor.icon.href)
    el.remove();
  });

});