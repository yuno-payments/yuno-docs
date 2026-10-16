#!/usr/bin/env bash
# Type-checks the extracted Web samples with tsc --strict.
# Usage: run-web.sh [BUILD_DIR]   (BUILD_DIR defaults to .sdk-samples-build; run extract.cjs first)
set -euo pipefail
BUILD="${1:-.sdk-samples-build}"
source "$BUILD/versions.env"
TYPESCRIPT_VERSION="${TYPESCRIPT_VERSION:-5.7.3}"
cd "$BUILD/web"
npm install --no-audit --no-fund --no-save \
  "@yuno-payments/sdk-web@${WEB_SDK_VERSION}" "typescript@${TYPESCRIPT_VERSION}"
echo "tsc ${TYPESCRIPT_VERSION} --strict against @yuno-payments/sdk-web@${WEB_SDK_VERSION}"
npx --no-install tsc -p tsconfig.json --pretty false
echo "web: OK"
