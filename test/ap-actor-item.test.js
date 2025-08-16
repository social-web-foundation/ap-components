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
});
