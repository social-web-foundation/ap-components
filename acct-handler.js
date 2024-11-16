// Usage: <acct-handler acct="acct:example@domain"></acct-handler>
// Description: Fetches the actor object from the given acct and displays the name, summary, and url of the actor.
class AcctHandler extends HTMLElement {
  static get observedAttributes() {
    return ['acct'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <h2 id="name">(name)</h2>
        <div id="summary">(summary)</div>
        <p><a id="url" href="javascript:void(0)">(url)</a></p>
      `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'acct') {
      this.updateAcct(newValue);
    }
  }

  updateAcct(acct) {
    const [protocol, address] = acct.split(':');
    const parts = address.split("@");
    const domain = parts[1];
    fetch(`https://${domain}/.well-known/webfinger?resource=${encodeURIComponent(acct)}`)
      .then(res => res.json())
      .then(json => {
        const links = json.links;
        const ap = links.find(link =>
          link.rel === "self" && link.type === "application/activity+json");
        if (ap) {
          fetch(ap.href, { headers: { Accept: ap.type } })
            .then(res => res.json())
            .then(json => {
              this.showActor(json);
            })
            .catch(err => {
              console.error(err)
              alert(err.message);
            });
        }
      })
      .catch(err => {
        console.error(err)
        alert(err.message);
      });
  }

  showActor(actor) {
    const name = actor.name;
    const summary = actor.summary;
    const url = actor.url;
    this.shadowRoot.getElementById('name').textContent = name;
    this.shadowRoot.getElementById('summary').innerHTML = summary;
    this.shadowRoot.getElementById('url').textContent = url;
    this.shadowRoot.getElementById('url').href = url;
  }

  get acct() {
    return this.getAttribute('acct');
  }

  set acct(value) {
    this.setAttribute('acct', value);
  }
}

// Define the custom element
customElements.define('acct-handler', AcctHandler);
