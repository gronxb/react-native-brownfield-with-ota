import Foundation
import ReactBrownfield
import HotUpdater

public class ReactNativeHostManager {
    public static let shared = ReactNativeHostManager()

    private init() {}

    public func initialize(bundle: Bundle, onReactNativeLoaded: (() -> Void)? = nil) {
        ReactNativeBrownfield.shared.bundle = bundle

        // Get bundle URL from HotUpdater
        if let bundleURL = HotUpdater.bundleURL() {
            ReactNativeBrownfield.shared.bundleURL = bundleURL
        }

        ReactNativeBrownfield.shared.startReactNative {
            onReactNativeLoaded?()
        }
    }
}
