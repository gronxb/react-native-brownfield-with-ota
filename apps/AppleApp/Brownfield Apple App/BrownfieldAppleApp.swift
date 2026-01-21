import Brownie
import ReactBrownfield
import HotUpdater
import SwiftUI

class AppDelegate: NSObject, UIApplicationDelegate {
    var window: UIWindow?
}

@main
struct BrownfieldAppleApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    init() {
        // Initialize React Native with HotUpdater support
        ReactNativeBrownfield.shared.bundle = ReactNativeBundle

        // Get bundle URL from HotUpdater (supports OTA updates)
        if let bundleURL = HotUpdater.bundleURL() {
            ReactNativeBrownfield.shared.bundleURL = bundleURL
        }

        ReactNativeBrownfield.shared.startReactNative {
            print("React Native has been loaded")
        }

        BrownfieldStore.register(initialState)
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
