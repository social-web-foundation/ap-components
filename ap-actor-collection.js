
import { ActivityPubCollectionElement } from './ap-collection.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ActivityPubActorItem } from './ap-actor-item.js';

export class ActivityPubActorCollection extends ActivityPubCollectionElement {

  static _itemElement = ActivityPubActorItem;

  constructor() {
    super();
  }
}

customElements.define('ap-actor-collection', ActivityPubActorCollection);