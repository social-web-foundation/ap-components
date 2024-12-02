import './avatar-icon.js';
class ActivityPubActorProfile extends HTMLElement {
  static get observedAttributes() {
    return [
      'name',
      'webfinger',
      'summary',
      'url',
      'icon'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <h2 class="name">(name)</h2>
        <avatar-icon class="icon" size="512"></avatar-icon>
        <p class="webfinger">(webfinger)</p>
        <div class="summary">(summary)</div>
        <p><a class="url" href="javascript:void(0)">(url)</a></p>
      `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name':
        this.shadowRoot.querySelector('.name').textContent = newValue;
        break;
      case 'webfinger':
        this.shadowRoot.querySelector('.webfinger').textContent = newValue;
        break;
      case 'summary':
        this.shadowRoot.querySelector('.summary').innerHTML = newValue;
        break;
      case 'url':
        this.shadowRoot.querySelector('.url').textContent = newValue;
        this.shadowRoot.querySelector('.url').href = newValue;
        break;
      case 'icon':
        this.shadowRoot.querySelector('.icon').url = newValue;
        break;
    }
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    this.setAttribute('name', value);
  }

  get summary() {
    return this.getAttribute('summary');
  }

  set summary(value) {
    this.setAttribute('summary', value);
  }

  get url() {
    return this.getAttribute('url');
  }

  set url(value) {
    this.setAttribute('url', value);
  }

  get webfinger() {
    return this.getAttribute('webfinger');
  }

  set webfinger(value) {
    this.setAttribute('webfinger', value);
  }

  get icon() {
    return this.getAttribute('icon');
  }

  set icon(value) {
    this.setAttribute('icon', value);
  }
}

// Define the custom element
customElements.define('activitypub-actor-profile', ActivityPubActorProfile);