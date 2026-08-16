# Amirmohammad Chegeni — academic website

This static, single-page site uses HTML, CSS, JavaScript, Bootstrap 3 utilities, and jQuery. No build step is required. The existing visual system remains in `css/style.css`; shared academic content lives in `js/academic-data.js`.

## Updating the Academic Timeline

Timeline data lives under `window.ACADEMIC_DATA.timeline` in `js/academic-data.js`. The UI sorts entries automatically by `date`, newest first.

Event types are `education`, `research`, `publication`, `conference`, `talk`, and `service`. A normal entry requires `date`, `type`, and `title`. Optional fields are `endDate`, `institution`, `location`, `description`, `links`, and `tags`.

Use ISO-style dates: `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`. Omit `endDate` for a single event, use `endDate: null` for an ongoing activity (displayed as “Present”), or give an ISO date for a completed range.

### Add a conference

```js
{
  date: "2027-09",
  type: "conference",
  title: "Euclid Consortium Meeting",
  institution: "Euclid Consortium",
  location: "Rome, Italy",
  description: "Attended the Euclid Consortium Meeting.",
  links: [{ label: "Conference", url: "https://verified-event-page.example" }],
  tags: ["Euclid"]
}
```

Add this one object to the `timeline` array. Do not edit the timeline HTML. For a school or workshop, use `type: "conference"` and identify the format in the title. For a position, use `type: "research"` and `endDate: null` while current.

### Add a publication

Add its full metadata once to `publications` with a unique `id`. Then add a timeline reference:

```js
{ date: "2027-06", type: "publication", publicationId: "short-unique-id", tags: ["Euclid"] }
```

The timeline automatically reuses the title, journal, DOI, and publisher link.

## Local preview

Run `python3 -m http.server 8000` and open `http://localhost:8000`. There is no package manager or compilation step.
