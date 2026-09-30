# Video Batch — languages

The interface languages of Video Batch. The app ships in English only; every
other language is a pack here, downloaded from Settings › General › Language
(or on first start, when it is the computer's language).

## Layout

- `index.json` — the packs: `code`, `name` (in its own language),
  `englishName`, `file`, `bytes`, `sha256`. The app checks the size and the
  hash before it installs a pack.
- `<code>/<code>.json` — one pack:
  - `ui` — the window's messages, keyed as the English catalog
    (`apps/desktop/src/renderer/i18n/en`); `{name}` placeholders kept as they are;
    plurals as `key.one` / `key.other`.
  - `commands.names` / `commands.categories` — the command palette's names.
  - `main` — the menus and dialogs of the main process.

A key missing from a pack shows in English.

## Adding or changing a language

1. Copy `es/es.json` to `<code>/<code>.json` and translate the values.
2. Add it to `index.json` with its `bytes` and `sha256`
   (`shasum -a 256 <code>/<code>.json`).
3. To try it before publishing, start the app with
   `VEP_LANGUAGES_DIR=/path/to/this/folder`.
