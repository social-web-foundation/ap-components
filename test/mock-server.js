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
    to: 'as:Public'
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
]);

export function setupMockServer() {
  ActivityPubElement.fetchFunction = async (url, options) => {
    if (!mockData.has(url)) {
      return missing()
    } else {
      return wrap(mockData.get(url))
    }
  }
}