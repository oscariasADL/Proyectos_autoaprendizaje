//
//  StoreRatingPlugin.swift
//  App
//
//  Created by Jimmy Alfonso Cardenas Orjuela on 3/11/21.
//

import Foundation
import Capacitor
import StoreKit

@objc(StoreRatingPlugin)
public class StoreRatingPlugin: CAPPlugin, CAPBridgedPlugin {
    
    public let identifier = "StoreRatingPlugin"
    public let jsName = "StoreRating"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "configureStoreRating", returnType: CAPPluginReturnPromise)
    ]
    
    @objc func requestReview(_ call: CAPPluginCall) {
        SKStoreReviewController.requestReview()
        call.resolve()
    }
}

