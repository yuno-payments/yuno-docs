# Changelog Automation

This directory contains workflows that keep the Yuno documentation changelogs in sync with SDK and plugin releases — no manual edits to the docs repo required.

## How it works

```
SDK repo                          yuno-docs
─────────────────────────────     ──────────────────────────────────────
Release workflow fires             repository_dispatch received
  ↓                                  ↓
Sends repository_dispatch   →     Prepends new release to source JSON
with release data as                ↓
client_payload                    Regenerates MDX changelog page
                                    ↓
                                  Opens PR for docs team review
```

1. On release, the SDK repo sends a `repository_dispatch` event carrying the new release object as `client_payload`.
2. The matching workflow here validates the payload, prepends it to the correct file in `changelog/source/`, and regenerates the MDX page via `scripts/generate_changelog.js`.
3. A pull request is opened targeting `main`, with **@Arcapas** and **@htessaro** as reviewers. Nothing is merged automatically.

## Event types

| SDK / Plugin | Event type |
|---|---|
| Android SDK | `android-sdk-changelog` |
| iOS SDK | `ios-sdk-changelog` |
| Flutter SDK | `flutter-sdk-changelog` |
| React Native SDK | `react-native-sdk-changelog` |
| Web SDK | `web-sdk-changelog` |
| API | `api-changelog` |
| VTEX Plugin | `vtex-plugin-changelog` |
| WooCommerce Plugin | `woocommerce-plugin-changelog` |

## Required secret

Each SDK repo must have a secret named `YUNO_DOCS_DISPATCH_TOKEN` — a GitHub token with permission to send `repository_dispatch` events to this repo. Contact the docs team to obtain it.

## Payload schema

The `client_payload` must be a valid release object following the schema in the **Changelog Guidelines** document. See the **Dispatch Guide** for integration examples. Both documents are shared by the docs team.
