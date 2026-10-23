#!/usr/bin/env bash
# Type-checks the extracted iOS samples with swiftc in Swift 5 and Swift 6 modes
# against the YunoSDK xcframework of the version pinned in the docs.
# The framework is the SPM binary target from the public yuno-sdk-ios GitHub
# release, verified against the checksum in that tag's Package.swift.
# Usage: run-ios.sh [BUILD_DIR]   (macOS with Xcode >= the compiler that built the SDK)
set -euo pipefail
BUILD="${1:-.sdk-samples-build}"
source "$BUILD/versions.env"
CACHE_ROOT="${IOS_SDK_CACHE:-$HOME/.cache/yuno-sdk-ios}"
mkdir -p "$CACHE_ROOT"
CACHE="$(cd "$CACHE_ROOT" && pwd)/${IOS_SDK_VERSION}"
FRAMEWORK="$CACHE/YunoSDK.xcframework"

if [ ! -d "$FRAMEWORK" ]; then
  mkdir -p "$CACHE"
  base="https://github.com/yuno-payments/yuno-sdk-ios"
  manifest="$(curl -fsSL "https://raw.githubusercontent.com/yuno-payments/yuno-sdk-ios/${IOS_SDK_VERSION}/Package.swift")"
  url="$(printf '%s' "$manifest" | tr -d '\n' | sed -nE 's/.*binaryTarget\([[:space:]]*name:[[:space:]]*"YunoSDK",[[:space:]]*url:[[:space:]]*"([^"]+)",[[:space:]]*checksum:[[:space:]]*"([0-9a-f]+)".*/\1/p')"
  sum="$(printf '%s' "$manifest" | tr -d '\n' | sed -nE 's/.*binaryTarget\([[:space:]]*name:[[:space:]]*"YunoSDK",[[:space:]]*url:[[:space:]]*"([^"]+)",[[:space:]]*checksum:[[:space:]]*"([0-9a-f]+)".*/\2/p')"
  [ -n "$url" ] && [ -n "$sum" ] || { echo "YunoSDK binaryTarget not found in $base Package.swift@${IOS_SDK_VERSION}" >&2; exit 1; }
  curl -fsSL "$url" -o "$CACHE/sdk.zip"
  echo "$sum  $CACHE/sdk.zip" | shasum -a 256 -c -
  unzip -q "$CACHE/sdk.zip" -d "$CACHE/unzipped"
  mv "$(find "$CACHE/unzipped" -maxdepth 2 -name 'YunoSDK.xcframework' -type d | head -1)" "$FRAMEWORK"
  rm -rf "$CACHE/sdk.zip" "$CACHE/unzipped"
fi

ARCH="$(uname -m)"
SDK_PATH="$(xcrun --sdk iphonesimulator --show-sdk-path)"
SLICE="$(find "$FRAMEWORK" -maxdepth 1 -type d -name 'ios-*simulator' | head -1)"
cd "$BUILD/ios"
swiftc -version
status=0
for mode in 5 6; do
  echo "swiftc -typecheck -swift-version $mode against YunoSDK ${IOS_SDK_VERSION}"
  if xcrun swiftc -typecheck -swift-version "$mode" \
      -sdk "$SDK_PATH" -target "${ARCH}-apple-ios15.0-simulator" \
      -F "$SLICE" ./*.swift; then
    echo "ios (Swift $mode): OK"
  else
    echo "::error::iOS samples fail to type-check in Swift $mode mode"
    status=1
  fi
done
exit $status
