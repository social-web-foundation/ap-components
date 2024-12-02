// Usage: <avatar-icon url="https://example.com/avatar.jpg" size="128"></avatar-icon>
// Displays a square avatar or a gray square if missing

class AvatarIcon extends HTMLElement {
  static get observedAttributes() {
    return ['url', 'size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Initialize shadow DOM
    this.shadowRoot.innerHTML = `
          <style>
              :host {
                  display: inline-block;
              }
              .avatar {
                  width: var(--avatar-size, 128px);
                  height: var(--avatar-size, 128px);
                  background-color: lightgray;
                  background-size: cover;
                  background-position: center;
                  border-radius: 8px;
              }
          </style>
          <div class="avatar"></div>
      `;
  }

  connectedCallback() {
    // Initialize appearance when added to the DOM
    this.updateAvatar();
    this.updateSize();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'url') {
      this.updateAvatar();
    } else if (name === 'size') {
      this.updateSize();
    }
  }

  updateAvatar() {
    const avatarElement = this.shadowRoot.querySelector('.avatar');
    const icon = this.getAttribute('url');

    if (icon) {
      avatarElement.style.backgroundImage = `url(${url})`;
    } else {
      avatarElement.style.backgroundImage = 'none';
    }
  }

  updateSize() {
    const size = this.getAttribute('size') || '128'; // Default to 128px
    const avatarElement = this.shadowRoot.querySelector('.avatar');
    avatarElement.style.setProperty('--avatar-size', `${size}px`);
  }

  get url() {
    return this.getAttribute('url');
  }

  set url(value) {
    this.setAttribute('url', value);
  }

  get size() {
    return this.getAttribute('size');
  }

  set size(value) {
    this.setAttribute('size', value);
  }
}

// Define the custom element
customElements.define('avatar-icon', AvatarIcon);
