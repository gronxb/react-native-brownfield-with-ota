package com.rnapp.brownfieldlib

import android.app.Application
import com.callstack.reactnativebrownfield.OnJSBundleLoaded
import com.callstack.reactnativebrownfield.ReactNativeBrownfield
import com.facebook.react.PackageList
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.hotupdater.HotUpdater

object ReactNativeHostManager {
    fun initialize(application: Application, onJSBundleLoaded: OnJSBundleLoaded? = null) {
        loadReactNative(application)

        val packageList = PackageList(application).packages
        val options = hashMapOf<String, Any>(
            "packages" to packageList,
            "mainModuleName" to "index",
            "bundleAssetPath" to null,
            "bundleFilePath" to HotUpdater.getJSBundleFile(application),
            "useDeveloperSupport" to false
        )

        ReactNativeBrownfield.initialize(application, options) { initialized ->
            // Set ReactHost in HotUpdater after initialization
            HotUpdater.setReactHost(ReactNativeBrownfield.shared.reactHost)
            onJSBundleLoaded?.invoke(initialized)
        }
    }

    fun destroy() {
        HotUpdater.clearReactHost()
    }
}
