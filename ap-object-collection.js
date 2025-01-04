
import { ActivityPubCollectionElement } from './ap-collection.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ActivityPubObject } from './ap-object.js';

export class ActivityPubObjectCollection extends ActivityPubCollectionElement {

  static _itemElement = ActivityPubObject;

  static styles = css`
  :host {
    display: block;
  }
  `;

  constructor() {
    super();
  }
}

customElements.define('ap-object-collection', ActivityPubObjectCollection);