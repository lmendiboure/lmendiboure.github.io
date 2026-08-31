# Publishing the IoT course on GitHub Pages

## Public structure

The intended URLs are:

```text
/cours/iot/                    course hub shown to students
/cours/iot/session-1/          Session 1 student mission
/cours/iot/session-2/          only exists once Session 2 is released
/cours/iot/session-3/          only exists once Session 3 is released
/cours/iot/session-4/          only exists once Session 4 is released

/cours/instructor/iot/         instructor hub
/cours/instructor/iot/session-1/
```

There is deliberately no teacher link on the public student hub.

## The one number to edit

Course availability is controlled from:

`cours/iot/course-config.js`

For normal week-to-week teaching, change only:

```js
release: {
  releasedThrough: 1
}
```

The hub derives the states automatically:

- session ID `< releasedThrough` → **Review**;
- session ID `= releasedThrough` → **Current mission**;
- session ID `> releasedThrough` → **Locked**.

Set `releasedThrough: 0` before the course if you want every mission locked.

## Recommended release ritual

Example: releasing Session 2.

1. Copy the finished student folder to `cours/iot/session-2/`.
2. Copy the teacher guide to `cours/instructor/iot/session-2/`.
3. Change one line in `cours/iot/course-config.js`:

```js
releasedThrough: 2
```

4. Commit and push.

Session 1 automatically becomes **Review**, Session 2 becomes **Current**, and Sessions 3–4 remain **Locked**. No hub HTML needs to be edited.

## Why not just comment out a link?

A hidden or commented link is only an interface choice. If `session-3/index.html` is already present in the public GitHub Pages tree, anyone who knows that URL can still open it directly.

Therefore:

> **UI locking controls orientation; publication controls availability.**

For ordinary teaching, the simplest reliable approach is to keep future session folders out of the published tree until release.

## If your repository itself is public

Files elsewhere in that same public repository may still be visible through GitHub even when they are outside the Pages folder. If future material must genuinely remain unseen, keep it local or in a private repository until release.
