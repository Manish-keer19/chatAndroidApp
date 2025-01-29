# React Native Android Build Guide

This guide explains how to generate Android APK and Bundle for your React Native application in both debug and release modes.

## Prerequisites

- Node.js installed
- React Native development environment set up
- Android Studio installed
- Android SDK configured
- JDK 11 or newer installed

## Environment Setup

1. Make sure ANDROID_HOME environment variable is set:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

2. Create a `local.properties` file in the `android` folder with your SDK path:
```properties
sdk.dir = /Users/YOUR_USERNAME/Library/Android/sdk   # For macOS
# OR
sdk.dir = C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk   # For Windows
```

## Generate JavaScript Bundle

Before creating APK/Bundle, generate the JavaScript bundle:

```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

```

## Debug APK

1. Clean the project (optional but recommended):
```bash
cd android
./gradlew clean
```

2. Generate debug APK:
```bash
./gradlew assembleDebug
```

The debug APK will be available at:
`android/app/build/outputs/apk/debug/app-debug.apk`

## Release APK

1. Generate a signing key (if you haven't already):
```bash
keytool -genkey -v -keystore android/app/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```

2. Configure signing in `android/app/build.gradle`:
```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('your_key_file.keystore')
            storePassword 'your_store_password'
            keyAlias 'your_key_alias'
            keyPassword 'your_key_password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. Generate release APK:
```bash
cd android
./gradlew assembleRelease
```

The release APK will be available at:
`android/app/build/outputs/apk/release/app-release.apk`

## Android App Bundle (AAB)

To generate an Android App Bundle for Play Store submission:

```bash
cd android
./gradlew bundleRelease
```

The AAB file will be available at:
`android/app/build/outputs/bundle/release/app-release.aab`

## Common Issues and Solutions

### Missing index.android.bundle
If you get an error about missing index.android.bundle, run:
```bash
mkdir -p android/app/src/main/assets
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

### Build Failed
If the build fails:
1. Clean the project:
```bash
cd android
./gradlew clean
```
2. Delete the build folder:
```bash
rm -rf android/app/build
```
3. Try building again

### Resource Issues
If you encounter resource-related errors:
1. Delete the `android/app/src/main/res/drawable-*` folders
2. Delete the `android/app/src/main/res/raw` folder
3. Regenerate the bundle using the command from the "Generate JavaScript Bundle" section

## Testing the Build

1. Debug APK can be installed directly on a device:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

2. Release APK can be tested before uploading to Play Store:
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

## Important Notes

- Always keep your keystore file secure
- Never commit your keystore or passwords to version control
- For production releases, use a different keystore than the debug keystore
- Back up your keystore file - losing it means you can't update your app on the Play Store
- Consider using environment variables or a secure configuration file for storing keystore passwords