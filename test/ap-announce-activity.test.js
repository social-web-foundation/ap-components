import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-announce-activity.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

const objectId = 'https://example.com/user/1/announce/example.com/note/1'

describe('<ap-announce-activity>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-announce-activity');
    el.objectId = objectId;
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Something went wrong');
    el.remove();
  });

  it('renders a Announce activity when json is provided', async () => {
    const el = document.createElement('ap-announce-activity');
    el.json = mockData.get(objectId)
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objectEl = el.shadowRoot.querySelector('ap-object')
    expect(objectEl).to.exist;
    if (objectEl.updateComplete) await objectEl.updateComplete;
    expect(objectEl.objectId).to.equal('https://example.com/note/1');
    el.remove();
  });

  it('renders a Announce activity when object ID is provided', async () => {
    const el = document.createElement('ap-announce-activity');
    el.objectId = objectId
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const objectEl = el.shadowRoot.querySelector('ap-object')
    expect(objectEl).to.exist;
    if (objectEl.updateComplete) await objectEl.updateComplete;
    expect(objectEl.objectId).to.equal('https://example.com/note/1');
    el.remove();
  });
});
