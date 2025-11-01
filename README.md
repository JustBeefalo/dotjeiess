# Dotjeiess

> I almost wish you could just stick JavaScript in ~/.js. Do you know what I'm saying?

-Ryan Tomayko

---

A quick and dirty port of [Witchcraft][1]/[dotjs][2] for firefox.

[1]: https://github.com/luciopaiva/witchcraft
[2]: https://github.com/defunkt/dotjs

## Using

Dotjeiess injects user scripts and styles into any web page from a configurable (local) web server
(defaults to `http://localhost:5743`). The web page URL is used to determine what scripts are
loaded.

E.g., `https://www.example.com` might load:

- `www.example.com.js`
- `www.example.com.css`

URL domain names will also match against script names based on the parent domain name(s).

E.g., `https://www.example.com` might load (in order):

- `com.js`
- `example.com.js`
- `www.example.com.js`

A leading `_.` in a script name will prevent that script from applying to further subdomains. E.g.,
`https://example.com` will load `_.example.com.js`, but `https://www.example.com` will not.

The full URL path will also match against scripts under a similar path or parent path.

E.g., `https://www.example.com/directory/page` might load (in order):

- `www.example.com.js`,
- `www.example.com/directory.js`
- `www.example.com/directory/page.js`

Special files `_global.js` and `_global.css` will apply to all web pages.

### Example

Given the default script base URL of `http://localhost:5743` (and all of the rules above), browsing
to `https://www.example.com/about` will attempt to load the following scripts/styles in order:

- `http://localhost:5743/_global.js`
- `http://localhost:5743/_global.css`
- `http://localhost:5743/com.js`
- `http://localhost:5743/com.css`
- `http://localhost:5743/com/about.js`
- `http://localhost:5743/com/about.css`
- `http://localhost:5743/example.com.js`
- `http://localhost:5743/example.com.css`
- `http://localhost:5743/example.com/about.js`
- `http://localhost:5743/example.com/about.css`
- `http://localhost:5743/www.example.com.js`
- `http://localhost:5743/www.example.com.css`
- `http://localhost:5743/www.example.com/about.js`
- `http://localhost:5743/www.example.com/about.css`
- `http://localhost:5743/_.www.example.com.js`
- `http://localhost:5743/_.www.example.com.css`
- `http://localhost:5743/_.www.example.com/about.js`
- `http://localhost:5743/_.www.example.com/about.css`
