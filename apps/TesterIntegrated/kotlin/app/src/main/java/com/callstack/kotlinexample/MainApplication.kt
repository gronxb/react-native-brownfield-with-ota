package com.callstack.kotlinexample

import android.app.Application
import android.util.Log
import com.callstack.reactnativebrownfield.ReactNativeBrownfield
import com.facebook.react.PackageList
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.hotupdater.HotUpdater

class MainApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)

    // Get current bundle path from HotUpdater (supports both assets and file paths)
    val jsBundlePath = HotUpdater.getJSBundleFile(this)

    val packageList = PackageList(this).packages
    val options = hashMapOf<String, Any>(
        "packages" to packageList,
        "mainModuleName" to "index",
        "bundleFilePath" to jsBundlePath,
        "useDeveloperSupport" to false
    )

    ReactNativeBrownfield.initialize(this, options) { initialized ->
      // Set ReactHost in HotUpdater after initialization
      HotUpdater.setReactHost(ReactNativeBrownfield.shared.reactHost)
      Log.d("TesterIntegrated", "React Native initialized with HotUpdater support")
    }
  }
}
