
import { ActivityPubCollectionElement } from './ap-collection.js';
import { html, css } from 'lit';
import { ActivityPubActorItem } from './ap-actor-item.js';

export class ActivityPubActorCollection extends ActivityPubCollectionElement {

  static _itemElement = ActivityPubActorItem;

  constructor() {
    super();
  }
}

customElements.define('ap-actor-collection', ActivityPubActorCollection);
