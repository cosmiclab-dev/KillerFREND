# The public API and what may be crawled

Discovered through the webskills extraction of the homepage, then verified by calling it.
This is the permissioned way to read structured data from the site. Prefer it over
scraping HTML.

## OpenAPI document

`https://www.awwwards.com/openapi.json` — title "Awwwards API", five operations:

| Method | Path | Returns |
| --- | --- | --- |
| GET | `/api/annual/categories` | the six annual categories, each with nominee ids |
| GET | `/api/annual/categories/{id}` | one category |
| GET | `/api/annual/nominees` | nominee collection (empty on 2026-10-22) |
| GET | `/api/annual/nominees/sites/{id}` | one site nominee |
| GET | `/api/annual/nominees/users/{id}` | one person nominee |

## Shape

The same endpoint answers in two shapes depending on headers. Handle both:

```
[{ id, name, slug, nominees: [...] }]                 // plain
{ links, meta, data: [{ id, attributes: {...} }] }    // JSON:API envelope
```

`scripts/refresh-api.mjs` unwraps both. Copy that, do not assume one.

## Fields worth using

Site nominee: `slug`, `date`, `designBy`, `country`, `url`, `awwwardsUrl`, `images`,
`videos`, `description`.

Person nominee: `slug`, `location`, `awwwardsUrl`, `avatar`, `tags`, `description`.

The awards page (`awwwardsUrl`) is the canonical place for a human to read the entry.

## Categories on 2026-10-22

| Category | Slug | Nominees |
| --- | --- | --- |
| Site of the Year | `site-of-the-year` | 30 |
| Agency of the Year | `agency-of-the-year` | 30 |
| Independent of the Year | `independent-of-the-year` | 40 |
| E-commerce of the Year | `ecommerce-site-of-the-year` | 30 |
| Developer Site of the Year | `developer-site-of-the-year` | 30 |
| Studio of the Year | `studio-of-the-year` | 30 |

The first, fourth and fifth nominate sites. The other three nominate people, so the site
endpoint returns 404 for them. That is not a failure; call the user endpoint.

## robots.txt

Read on 2026-10-22. Crawling rules worth respecting:

- Disallowed: `/feed`, `/vote/`, `/tag/`, `/submission/`, `/app.php/`, `/gallery/`,
  `/preview/`, `/search-websites`, `/search-articles`, `/inspiration/search`,
  `/websites/?` (listing with a query string), `/directory/search/?`, `*favourites?page`.
- Allowed and used by this skill: `/`, `/websites/`, `/websites/sites_of_the_day/`,
  `/websites/<tag>/`, `/jury/2026/`, and the `/api/annual/*` endpoints.

It also points at `https://www.awwwards.com/sitemap.xml`.

## Etiquette

No published rate limit was found, so behave as if there is a tight one:

- one request at a time, with a pause (`scripts/refresh-api.mjs` uses 150 ms),
- retry twice with backoff on 429 and 5xx,
- stop and report rather than hammer an endpoint that keeps failing.

A full refresh is 190 requests. That is not something to run in a loop.

## What is not available

There is no public endpoint for daily winners, scores, tags per site, or the full site
catalogue. Those live in HTML. The listing pages are allowed by robots, which is why the
winner snapshot is built from them, but they are a sample, not a complete index.
