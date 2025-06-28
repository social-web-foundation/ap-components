
import { ActivityPubCollectionElement } from './ap-collection.js';
import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ActivityPubActivityItem } from './ap-activity-item.js';

export class ActivityPubActivityCollection extends ActivityPubCollectionElement {

  static _itemElement = ActivityPubActivityItem;

  constructor() {
    super();
  }
}

customElements.define('ap-activity-collection', ActivityPubActivityCollection);
