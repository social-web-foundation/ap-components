import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-activity-item.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

const createId = 'https://example.com/user/1/create/example.com/note/1'
const announceId = 'https://example.com/user/1/announce/example.com/note/1'

describe('<ap-activity>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-activity-item');
    el.objectId = createId;
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Something went wrong');
    el.remove();
  });

  it('renders a Create activity when json is provided', async () => {
    const el = document.createElement('ap-activity-item');
    el.json = mockData.get(createId)
    document.body.appendChild(el);
    await el.updateComplete;
    const createEl = el.shadowRoot.querySelector('ap-create-activity');
    expect(createEl).to.exist;
    el.remove();
  });

  it('renders an Announce activity when json is provided', async () => {
    const el = document.createElement('ap-activity-item');
    el.json = mockData.get(announceId)
    document.body.appendChild(el);
    await el.updateComplete;
    const announceEl = el.shadowRoot.querySelector('ap-announce-activity');
    expect(announceEl).to.exist;
    el.remove();
  });

  it('renders a Create activity when object ID is provided', async () => {
    const el = document.createElement('ap-activity-item');
    el.objectId = createId
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const createEl = el.shadowRoot.querySelector('ap-create-activity');
    expect(createEl).to.exist;
    el.remove();
  });

  it('renders an Announce activity when object ID is provided', async () => {
    const el = document.createElement('ap-activity-item');
    el.objectId = announceId
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const announceEl = el.shadowRoot.querySelector('ap-announce-activity');
    expect(announceEl).to.exist;
    el.remove();
  });
});