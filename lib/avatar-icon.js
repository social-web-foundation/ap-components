// Usage: <avatar-icon url="https://example.com/avatar.jpg" size="128"></avatar-icon>
// Displays a square avatar or a gray square if missing

import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class AvatarIcon extends LitElement {

  static get properties() {
    return {
      'url': { type: String },
      'size': { type: String }
    }
  }

  static styles = css`
  :host {
    display: inline-block;
    min-width: var(--ap-min-width);
    min-height: var(--ap-min-height);
  }
  .avatar {
      background-color: lightgray;
      background-size: cover;
      background-position: center;
      border-radius: 8px;
  }
  `;

  constructor() {
    super();
    this.size = 128;
  }

  render() {
    return html`
      <div
        class="avatar"
        style="width: ${this.size}px; height: ${this.size}px; background-image: url(${this.url});">
      </div>
    `;
  }
}

// Define the custom element
customElements.define('avatar-icon', AvatarIcon);
