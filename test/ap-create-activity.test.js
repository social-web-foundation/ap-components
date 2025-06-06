import { expect } from 'https://esm.sh/chai@4.3.8';
import '../lib/ap-create-activity.js';
import { mockData, setupMockServer } from './mock-server.js'

setupMockServer()

const objectId = 'https://example.com/user/1/create/example.com/note/1'

describe('<ap-create-activity>', () => {

  it('shows error when _error is set', async () => {
    const el = document.createElement('ap-create-activity');
    el.objectId = objectId;
    el._error = 'Something went wrong';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.textContent).to.include('Something went wrong');
    el.remove();
  });

  it('renders a Create activity when json is provided', async () => {
    const el = document.createElement('ap-create-activity');
    el.json = mockData.get(objectId)
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    const noteEl = el.shadowRoot.querySelector('ap-object')
    expect(noteEl).to.exist;
    el.remove();
  });

  it('renders a Create activity when object ID is provided', async () => {
    const el = document.createElement('ap-create-activity');
    el.objectId = objectId
    document.body.appendChild(el);
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    await el.updateComplete;
    const noteEl = el.shadowRoot.querySelector('ap-object')
    expect(noteEl).to.exist;
    el.remove();
  });
});