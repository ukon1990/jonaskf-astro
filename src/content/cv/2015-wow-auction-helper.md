---
title: 'WoW Auction Helper'
role: 'Full-stack Developer'
employer: 'Personal Project'
capacity: 'hobby'
sourceLink: 'https://github.com/ukon1990/wow-auction-helper'
startDate: '2015-01-01'
endDate: '2023-04-01'
summary: >
  Built a serverless Angular PWA that turns World of Warcraft auction-house data into actionable insights, helping
  players spot profitable crafts, monitor auctions, import TSM addon data, and build custom dashboards while keeping
  most data offline in IndexedDB for instant response.
tech:
  - angular
  - angular-material
  - angular-pwa
  - typescript
  - indexeddb
  - dynamodb
  - aws-lambda
  - aws-appsync
  - mariadb
  - nodejs
  - serverless-framework
  - git
  - logrocket
---

### Motivation

I started this project as a personal challenge: to create a single-page tool that could transform the vast amount of
World of Warcraft auction-house data into quick, actionable decisions. The goal was to let players:

- Spot the most profitable crafting recipes.
- Track the lowest buyout prices for items they own.
- Import their own inventory and sales history from the popular TSM addon.
- Build customized dashboards based on self-defined criteria.

### Features

| Area           | What I built                                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Dashboard**  | Live charts of craft profitability, watchlist alerts, and a "maximum-profit" calculator for high-value items.        |
| **Crafting**   | Filter recipes by character, recipe ID, or scan the entire in-game database.                                         |
| **Auctions**   | Filter items and battle pets, automatically highlighting the lowest buyout for the user's listings.                  |
| **Items**      | Detailed item pages showing auction house volume, recipes that produce the item, and a time-series of buyout prices. |
| **Watchlist**  | Custom rule groups (e.g. "item < 70% of market value") that trigger alerts.                                          |
| **TSM Import** | Drag-and-drop or API import of TSM addon data, exposing inventory, sale, and purchase history.                       |

### Architecture

- **Client-side** –
  - Angular (v15+) + Angular Material for UI.
  - Angular PWA with service workers for automatic background updates.
  - IndexedDB (via dexie) for an offline-first local cache of items, recipes, and auction data.

- **Server-side** –
  - AWS Lambda functions (written in TypeScript) orchestrated by the Serverless framework.
  - Optional AWS AppSync layer for user settings and real-time subscriptions.
  - SQL (MariaDB/MySQL) for persistent storage; most data lives in the client's IndexedDB.

- **Hosting** –
  - Static front-end served from S3 with CloudFront CDN.
  - API endpoints and background jobs deployed as Lambda functions.

- **DevOps** –
  - Git for version control, Docker for local testing (optional), and a CI pipeline that builds the Angular bundle and
    deploys the Lambda functions via the Serverless framework.

### Data freshness

- Auction data is refreshed from Blizzard's public API **once per hour**, not in real time.
- The application caches this data locally (IndexedDB) and updates it in the background on each hourly fetch.

### Testing

The project is not a test-heavy code base, but it **does** contain unit and integration tests:

- **Front-end** – Jasmine/Karma tests for core components and services.
- **Back-end** – Jest tests for Lambda handlers and utility functions.
- **E2E** – (optional) Cypress tests for critical user flows.

These tests help keep the core logic—craft profitability calculations, auction filtering, and TSM import—reliable across
deployments.
