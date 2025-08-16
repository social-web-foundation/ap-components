import { ActivityPubElement } from '../lib/ap-element.js';

function wrap(json) {
  return {
    ok: true,
    status: 200,
    statusText: "OK",
    async json() {
      return json
    }
  }
}

function missing() {
  return {
    ok: false,
    status: 404,
    statusText: "Not Found",
    async json() {
      return json
    }
  }
}

export const mockData = new Map([
  ['https://example.com/user/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    type: 'Person',
    id: 'https://example.com/user/1',
    name: 'Sample Q. Person',
    to: 'as:Public',
    summary: 'A sample person used in unit tests for ap-components',
    icon: {
      type: 'Link',
      mediaType: 'image/png',
      width: 128,
      height: 128,
      href: 'https://upload.example.com/files/7VyVjfCVSGP25g6bgWc7e.png'
    },
    preferredUsername: 'one',
    url: 'https://example.com/user/1.html',
    liked: 'https://example.com/user/1/liked',
    followers: 'https://example.com/user/1/followers',
    following: 'https://example.com/user/1/following',
    inbox: 'https://example.com/user/1/inbox',
    outbox: 'https://example.com/user/1/outbox',
    webfinger: 'one@example.com'
  }],
  ['https://example.com/user/1/liked', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/liked',
    summary: 'Collection of objects that Sample Q. Person has liked',
    type: 'OrderedCollection',
    totalItems: 2,
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    first: 'https://example.com/user/1/liked/1'
  }],
  ['https://example.com/user/1/liked/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/liked/1',
    summary: 'A page in the collection of objects that Sample Q. Person has liked',
    type: 'OrderedCollectionPage',
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    partOf: 'https://example.com/user/1/liked',
    orderedItems: [
      'https://example.com/note/1',
      'https://example.com/article/1'
    ]
  }],
  ['https://example.com/user/1/followers', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/followers',
    summary: 'Collection of people that follow Sample Q. Person',
    type: 'OrderedCollection',
    totalItems: 2,
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    first: 'https://example.com/user/1/followers/1'
  }],
  ['https://example.com/user/1/followers/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/followers/1',
    summary: 'A page in the collection of people that follow Sample Q. Person',
    type: 'OrderedCollectionPage',
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    partOf: 'https://example.com/user/1/followers',
    orderedItems: [
      'https://example.com/user/2',
      'https://example.com/user/3'
    ]
  }],
  ['https://example.com/user/1/following', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/following',
    summary: 'Collection of people that Sample Q. Person follows',
    type: 'OrderedCollection',
    totalItems: 22,
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    first: {
      id: 'https://example.com/user/1/following/2',
      type: 'OrderedCollectionPage'
    },
    last: {
      id: 'https://example.com/user/1/following/1',
      type: 'OrderedCollectionPage'
    }
  }],
  ['https://example.com/user/1/following/2', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/following/2',
    summary: 'A page in the collection of people Sample Q. Person follows',
    type: 'OrderedCollectionPage',
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    partOf: {
      id: 'https://example.com/user/1/following',
      type: 'OrderedCollection'
    },
    next: {
      id: 'https://example.com/user/1/following/1',
      type: 'OrderedCollectionPage'
    },
    orderedItems: [
      'https://example.com/user/23',
      'https://example.com/user/22'
    ]
  }],
  ['https://example.com/user/1/following/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/following/1',
    summary: 'A page in the collection of people Sample Q. Person follows',
    type: 'OrderedCollectionPage',
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    partOf: {
      id: 'https://example.com/user/1/following',
      type: 'OrderedCollection'
    },
    prev: {
      id: 'https://example.com/user/1/following/2',
      type: 'OrderedCollectionPage'
    },
    orderedItems: [
      'https://example.com/user/21',
      'https://example.com/user/20',
      'https://example.com/user/19',
      'https://example.com/user/18',
      'https://example.com/user/17',
      'https://example.com/user/16',
      'https://example.com/user/15',
      'https://example.com/user/14',
      'https://example.com/user/13',
      'https://example.com/user/12',
      'https://example.com/user/11',
      'https://example.com/user/10',
      'https://example.com/user/9',
      'https://example.com/user/8',
      'https://example.com/user/7',
      'https://example.com/user/6',
      'https://example.com/user/5',
      'https://example.com/user/4',
      'https://example.com/user/3',
      'https://example.com/user/2'
    ]
  }],
  ['https://example.com/user/1/inbox', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/inbox',
    summary: 'Collection of activities that Sample Q. Person has received',
    type: 'OrderedCollection',
    totalItems: 2,
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    first: 'https://example.com/user/1/inbox/1'
  }],
  ['https://example.com/user/1/inbox/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/inbox/1',
    summary: 'A page in the collection of activities that Sample Q. Person has received',
    type: 'OrderedCollectionPage',
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    partOf: 'https://example.com/user/1/inbox',
    orderedItems: [
      'https://example.com/user/1/create/example.com/note/1',
      'https://example.com/user/1/announce/example.com/note/1'
    ]
  }],
  ['https://example.com/user/1/outbox', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/outbox',
    summary: 'Collection of activities that Sample Q. Person has done',
    type: 'OrderedCollection',
    totalItems: 2,
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    first: 'https://example.com/user/1/outbox/1'
  }],
  ['https://example.com/user/1/outbox/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/outbox/1',
    summary: 'A page in the collection of activities that Sample Q. Person has done',
    type: 'OrderedCollectionPage',
    attributedTo: 'https://example.com/user/1',
    to: 'as:Public',
    partOf: 'https://example.com/user/1/outbox',
    orderedItems: [
      'https://example.com/user/1/create/example.com/note/1',
      'https://example.com/user/1/announce/example.com/note/1'
    ]
  }],
  ['https://example.com/note/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    type: 'Note',
    id: 'https://example.com/note/1',
    content: 'Hello world!',
    to: 'as:Public',
    attributedTo: {
      type: 'Person',
      id: 'https://example.com/user/1',
      name: 'Sample Q. Person'
    }
  }],
  ['https://example.com/article/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/article/1',
    type: 'Article',
    name: 'Breaking news!',
    summary: 'There is news to share! Exciting news.',
    url: 'https://example.com/article/1.html',
    to: 'as:Public',
    attributedTo: {
      type: 'Person',
      id: 'https://example.com/user/1',
      name: 'Sample Q. Person'
    }
  }],
  ['https://example.com/user/1/create/example.com/note/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/create/example.com/note/1',
    type: 'Create',
    summary: 'Sample Q. Person created a note',
    to: 'as:Public',
    actor: 'https://example.com/user/1',
    object: 'https://example.com/note/1'
  }],
  ['https://example.com/user/1/create/example.com/article/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/create/example.com/article/1',
    type: 'Create',
    summary: 'Sample Q. Person created an article',
    to: 'as:Public',
    actor: 'https://example.com/user/1',
    object: 'https://example.com/article/1'
  }],
  ['https://example.com/user/1/announce/example.com/note/1', {
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: 'https://example.com/user/1/announce/example.com/note/1',
    type: 'Announce',
    summary: 'Sample Q. Person shared a note',
    to: 'as:Public',
    actor: 'https://example.com/user/1',
    object: 'https://example.com/note/1'
  }],
  ['https://example.com/.well-known/webfinger?resource=acct:one@example.com', {
    'subject': 'acct:one@example.com',
    'links': [
      {
        'rel': 'self',
        'type': 'application/activity+json',
        'href': 'https://example.com/user/1'
      }
    ]
  }]
]);

for (let i = 2; i <= 23; i++) {
  mockData.set(`https://example.com/user/${i}`, {
    '@context': 'https://www.w3.org/ns/activitystreams',
    type: 'Person',
    id: `https://example.com/user/${i}`,
    name: 'Other Q. Person',
    to: 'as:Public',
    summary: 'Another person used in unit tests for ap-components',
    icon: {
      type: 'Link',
      mediaType: 'image/png',
      width: 128,
      height: 128,
      href: 'https://upload.example.com/files/WJXMMWVLVTjuASgwSgIKo.png'
    },
    preferredUsername: `user${i}`,
    url: `https://example.com/user/${i}.html`,
    inbox: `https://example.com/user/${i}/inbox`,
    outbox: `https://example.com/user/${i}/outbox`,
    followers: `https://example.com/user/${i}/followers`,
    following: `https://example.com/user/${i}/following`,
    liked: `https://example.com/user/${i}/liked`
  })
}

export function setupMockServer() {
  ActivityPubElement.fetchFunction = async (url, options) => {
    if (!mockData.has(url)) {
      return missing()
    } else {
      return wrap(mockData.get(url))
    }
  }
}
