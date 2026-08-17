
import { ActivityPubCollectionElement } from './ap-collection.js';
import { html, css } from 'lit';
import { ActivityPubObject } from './ap-object.js';

export class ActivityPubObjectCollection extends ActivityPubCollectionElement {

  static _itemElement = ActivityPubObject;

  constructor() {
    super();
  }
}

customElements.define('ap-object-collection', ActivityPubObjectCollection);
