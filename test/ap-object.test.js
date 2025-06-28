import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-object.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

describe('<ap-object>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-object');
    el.objectId = 'https://example.com/note/1';
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Something went wrong');
    el.remove();
  });

  it('renders a Note when json is provided', async () => {
    const el = document.createElement('ap-object');
    el.json = mockData.get('https://example.com/note/1')
    document.body.appendChild(el);
    await el.updateComplete;
    const noteEl = el.shadowRoot.querySelector('ap-note');
    expect(noteEl, '<ap-note> should have been stamped into the shadow DOM').to.exist;
    el.remove();
  });

  it('renders an Article when json is provided', async () => {
    const el = document.createElement('ap-object');
    el.json = mockData.get('https://example.com/article/1')
    document.body.appendChild(el);
    await el.updateComplete;
    const articleEl = el.shadowRoot.querySelector('ap-article');
    expect(articleEl).to.exist;
    el.remove();
  });

  it('renders a Note when object ID is provided', async () => {
    const el = document.createElement('ap-object');
    el.objectId = 'https://example.com/note/1'
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const noteEl = el.shadowRoot.querySelector('ap-note');
    expect(noteEl, '<ap-note> should have been stamped into the shadow DOM').to.exist;
    el.remove();
  });

  it('renders an Article when object ID is provided', async () => {
    const el = document.createElement('ap-object');
    el.objectId = 'https://example.com/article/1'
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const articleEl = el.shadowRoot.querySelector('ap-article');
    expect(articleEl).to.exist;
    el.remove();
  });
});
