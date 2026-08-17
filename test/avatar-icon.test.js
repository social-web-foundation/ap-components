import { expect } from 'chai';
import '../lib/avatar-icon.js';

describe('<avatar-icon>', () => {

  it('renders an avatar', async () => {
    const el = document.createElement('avatar-icon');
    el.url = 'https://files.example.com/upload/file1.jpg'
    el.size = 128
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.innerHTML).to.include(el.url)
    expect(el.shadowRoot.innerHTML).to.include(el.size)
    el.remove();
  });
})
