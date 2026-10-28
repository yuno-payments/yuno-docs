#!/usr/bin/env bash
# Compiles the extracted Android samples (compileDebugKotlin) against the SDK
# version pinned in the docs, resolved from the public Yuno jfrog repository.
# Usage: run-android.sh [BUILD_DIR]   (needs JDK 17, Gradle 8.11+, ANDROID_HOME)
set -euo pipefail
BUILD="${1:-.sdk-samples-build}"
source "$BUILD/versions.env"
GRADLE="${GRADLE:-gradle}"
cd "$BUILD/android"
if [ -z "${ANDROID_HOME:-}${ANDROID_SDK_ROOT:-}" ] && [ ! -f local.properties ]; then
  echo "ANDROID_HOME is not set" >&2; exit 1
fi
echo "compileDebugKotlin against com.yuno.payments:android-sdk:${ANDROID_SDK_VERSION}"
"$GRADLE" --no-daemon --console=plain -PyunoAndroidSdkVersion="${ANDROID_SDK_VERSION}" :app:compileDebugKotlin
echo "android: OK"
