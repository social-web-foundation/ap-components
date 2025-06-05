import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-note.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

describe('<ap-note>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-note');
    el.objectId = 'https://example.com/note/1';
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Something went wrong');
    el.remove();
  });

  it('renders a Note when json is provided', async () => {
    const el = document.createElement('ap-note');
    el.json = mockData.get('https://example.com/note/1')
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Hello world!');
    el.remove();
  });

  it('renders a Note when object ID is provided', async () => {
    const el = document.createElement('ap-note');
    el.objectId = 'https://example.com/note/1'
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Hello world!');
    el.remove();
  });
});