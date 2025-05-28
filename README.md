# ap-components

This is a collection of [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for showing [ActivityPub](https://activitypub.rocks/) objects in a browser.

## Install

To install in your own JavaScript application, use the `@socialwebfoundation/ap-components` package:

```shell
npm install @socialwebfoundation/ap-components
```

It's also possible to use the package through [UNPKG](https://unpkg.com). Just add this script to your HTML:

```html
<script src="https://unpkg.com/@socialwebfoundation/ap-components"></script>
```

## Usage

Each component is used as an element in your HTML, just like any other element. You can find a good [introduction to Web Components](https://www.webcomponents.org/introduction) on [webcomponents.org](https://www.webcomponents.org/introduction) or the [Web Components skill](https://learning.oreilly.com/search/skills/web-components/) on [O'Reilly Learning Platform](https://learning.oreilly.com/).

To understand concepts in ActivityPub, like object IDs, actors, collections, or objects, refer to https://activitypub.rocks/ or [ActivityPub: Programming for the Social Web](https://evanp.me/activitypub-book/) (O'Reilly Media, 2024).

### Common properties

All components in this library accept two important properties:

- `json`: a string containing JSON in Activity Streams 2.0 format representing the model object.
- `object-id`: an https:// URL for the object, which should be in Activity Streams 2.0 format.

If the JSON representation is provided, its contents will be used. Otherwise, the object ID will be used to fetch the JSON representation from the source, and display that.

### ActivityPubElement.fetchFunction

In an ideal world, fetching ActivityPub content from the browser would work without any problems. Unfortunately, between [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) and [authorized fetch](https://www.w3.org/wiki/ActivityPub/Primer/Authentication_Authorization#Authorized_fetch), this may generate a lot of errors.

To allow adding authentication headers or using proxy servers, which should smooth out some of the rocky terrain, it's possible to override the function that the library uses for fetching remote data, `ActivityPubElement.fetchFunction`. Its value is a function that has two parameters, matching the function signature of the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) method.

- `url`: the URL to fetch
- `options`: a set of options for the request, matching the [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) type

Here is an example for an ActivityPub API client. It adds an [OAuth 2.0 access token](https://www.oauth.com/oauth2-servers/access-tokens/) to requests to a logged-in user's server, and requests remote objects through the logged-in user's configured [proxyUrl endpoint](https://www.w3.org/TR/activitypub/#actor-objects).

```javascript

const actorId = "https://social.example/user/foo"
const proxyUrl = "https://social.example/endpoint/proxyUrl"
const token = "k1yJrUWQ55fLv_kEH7CRJ"

ActivityPubElement.fetchFunction =
  async (url, options) => {
    if ((new URL(url)).origin == (new URL(actorId)).origin) {
      const headers = options.headers || {}
      headers.authorization = `Bearer ${token}`
      options.headers = headers
      return fetch(url, options)
    } else {
      return fetch(proxyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${token}`
        },
        body: new URLSearchParams({ id: url }),
      })
    }
  }
```

### Styling

It should be possible to style the layout on the page after the components have been rendered, but this is not yet well-documented.

## API

These are the elements provided by the library, in alphabetical order.

### ap-activity-collection

A collection of [Activity](https://www.w3.org/TR/activitystreams-vocabulary/#activity-types) objects, such as the ones in an [inbox](https://www.w3.org/wiki/ActivityPub/Primer/Inbox) or an [outbox](https://www.w3.org/wiki/ActivityPub/Primer/Outbox).

Each element of the collection is an [ap-activity](#ap-activity).

The collection supports infinite scroll; scrolling the page will load more activity objects into the component.

The component takes a `page-size` property; this is a number for how many activities to load at one time. The default is 20.

### ap-activity

A single [Activity](https://www.w3.org/TR/activitystreams-vocabulary/#activity-types), as part of an [ap-activity-collection](#ap-activity-collection).

If the activity type is recognized, a more specific element will be inserted. Otherwise, default
properties of the activity, like the `icon` and `summary`, will be used to represent it.

### ap-actor-collection

A collection of [Actor](https://www.w3.org/TR/activitystreams-vocabulary/#actor-types) objects, such as the ones in a [followers](https://www.w3.org/TR/activitypub/#followers) or [following](https://www.w3.org/TR/activitypub/#following) collection.

Each element of the collection is an [ap-actor-item](#ap-actor-item).

The collection supports infinite scroll; scrolling the page will load more activity objects into the component. The component takes a `page-size` property; this is a number for how many activities to load at one time. The default is 20.

### ap-actor-item

A single [Actor](https://www.w3.org/TR/activitystreams-vocabulary/#actor-types) objects in an [ap-actor-collection](#ap-actor-collection).

### ap-actor-page

Detailed information about an ActivityPub [Actor](https://www.w3.org/TR/activitypub/#actors), typically to be displayed on its own page. It includes an [ap-actor-profile](#ap-actor-profile) to show information about the actor, plus one of the actor's feeds. It includes a menu to switch between the `outbox`, `followers`, `following` and `liked` feeds.

The component takes a `webfinger` property as well as the standard properties. This can be used to identify the actor for the page in the `username@domain.example` defined by [RFC 7033](https://www.rfc-editor.org/rfc/rfc7033.html) and widely used as user identifiers in ActivityPub networks (see [ActivityPub and Webfinger](https://swicg.github.io/activitypub-webfinger/)).

### ap-actor-profile

Depicts an actor, primarily for use inside an [ap-actor-page](#ap-actor-page). Includes avatar, name, description, and links.

### ap-announce-activity

An [Announce](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-announce) activity, used for boosting or sharing content in ActivityPub. Includes metadata about the sharer and the creator, the activity itself, and the content of the activity's `object` property.

### ap-article

Represents an [Article](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-article) object, for multi-paragraph text. For use in an [ap-activity-collection](#ap-activity-collection) or an [ap-object-collection](#ap-object-collection), so only shows the title, summary, and a link to the full content.

### ap-create-activity

A [Create](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-create) activity, which is one of the most common activity types on the social web. Includes metadata about the creator, the activity itself, and the content of the activity's `object` property.

### ap-note

A [Note](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-note) object, for single-paragraph text -- often used for comments, "toots", or short status updates. Includes metadata about the creator and the object. The `content` property is displayed after it has been sanitized, to avoid common security issues.

### ap-object-collection

A collection of [content objects](https://www.w3.org/TR/activitystreams-vocabulary/#object-types), as provided in the ActivityPub [liked](https://www.w3.org/TR/activitypub/#liked) property. Each object in the collection is represented by an [ap-object](#ap-object) component.

This component takes a `page-size` parameter, default 20 items. It is infinitely scrollable; scrolling to the end of the page will fetch more items.

### ap-object

A single [content objects](https://www.w3.org/TR/activitystreams-vocabulary/#object-types), as part of an [ap-object-collection](#ap-object-collection) component.

If the type of object is known -- like an `Article` or a `Note` -- the more specific type is substituted for the object. Otherwise, default properties of the object like `icon`, `image`, and `summary` are used to display the contents.

## Contributing

Contributions are welcome. To get started, open an issue on our GitHub repository:

https://github.com/social-web-foundation/ap-components/issues

Then, start a pull request.

## License

Copyright 2024-2025 Social Web Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.