//
//  DigitalWalletErrorHandler.swift
//  App
//
//  Created by Juan Carlos Pinzon on 12/04/24.
//

import Foundation
import Capacitor

public class DigitalWalletErrorHandler: Error {
    var message: String = ""
    var code: String = ""
    
    enum ErrorTypes: String {
        case invalidData
        case nullDigitalCard
        case unknownError
        case emptyWallet
        case tokensNotFound
        case deleteTokenError
        case resumeTokenError
        case suspendTokenError
        case canPushCardInApplePayError
        case digitalPlatformsError
        case encodeUtilError
        case searchDigitalCardError
    }
    
    private static let errorMap: [DigitalWalletErrorHandler.ErrorTypes: String] = [
            .invalidData: "The data is in an invalid format",
            .unknownError: "An unknown error occurred",
            .nullDigitalCard: "Digital card is null",
            .emptyWallet: "Empty Wallet",
            .tokensNotFound: "tokens not found",
            .deleteTokenError: "token not removed",
            .resumeTokenError: "token not activated",
            .suspendTokenError: "token not deactivated",
            .canPushCardInApplePayError: "error in isCardInApplePay",
            .digitalPlatformsError: "error in getDigitalPlatforms",
            .encodeUtilError: "error encode To string object whit encodeUtil",
            .searchDigitalCardError: "error find card Digital"
          ]
    
    init(_ error: ErrorTypes,_ errorDetail: String = "") {
        _init(error, errorDetail)
    }
    
    private func _init(_ error: ErrorTypes,_ errorDetail: String = "") {
        if let message = DigitalWalletErrorHandler.errorMap[error] {
          self.message = errorDetail != "" ? errorDetail : message
          self.code = error.rawValue
        }
    }
    
    static func reject(call: CAPPluginCall, error: ErrorTypes, errorDetail: String = "") {
        let err = DigitalWalletErrorHandler(error, errorDetail)
        err.rejectCall(call)
    }
    
    public func rejectCall(_ call: CAPPluginCall) {
        NSLog("HCESDK:AVV:Error(\(code)): \(message)")
        call.reject(message, code)
    }
}
