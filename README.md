# Sanity + Easyling Translation Example

This repository demonstrates an example setup for using **Easyling translations in Sanity** with two complementary flows:

- **On-demand translation** via the Easyling Sanity Studio plugin
- **Automated translation** on publish via Sanity Functions

## What This Example Shows

- A Sanity Studio configured with the Easyling connector plugin (`@easyling/sanity-connector`)
- A Sanity Function (`easyling-translate`) that runs on document publish
- A shared Easyling translation package (`@easyling/sanity-auto-translate`) used by the function
- Blueprint configuration that registers the function and triggers it on `publish`

## Important Note About the Studio Plugin

The plugin import in Studio is a **necessary evil** in this setup.

Even if your main goal is automated translation through Functions, the Studio plugin provides the classes and UI entities required to display and configure Easyling connection settings. Without that plugin import, the Easyling configuration entities are not available for setup.

## Repository Structure

- `studio/` — Sanity Studio app, including Easyling plugin registration
- `functions/easyling-translate/` — function handler that calls Easyling translation on publish
- `sanity.blueprint.ts` — blueprint resource definition for the document function trigger

## Setup

1. Install dependencies at the repository root.
2. Install dependencies in `studio/` (if needed separately in your environment).
3. Ensure `NPM_TOKEN` is available in your environment (required by `.npmrc`).
4. Configure your Easyling connection from Studio.
5. Run/deploy Studio and Functions as needed for your environment.

## How Translation Works in This Example

1. A document is published in Sanity.
2. The `easyling-translate` document function is triggered.
3. The function calls Easyling translation logic from `@easyling/sanity-auto-translate`.
4. Translations are processed automatically, with logs and basic success/failure reporting.

## Relevant Files

- `studio/sanity.config.ts` — includes `translationPlugin()` registration
- `functions/easyling-translate/index.ts` — function handler invoking translation
- `sanity.blueprint.ts` — publish event trigger configuration
