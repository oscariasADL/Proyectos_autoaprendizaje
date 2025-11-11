//
//  IntentHandler.swift
//  WalletNonUIExt
//
//  Created by Juan Carlos Pinzon on 12/08/24.
//

import PassKit
import AntelopSDK

// As an example, this class is set up to handle Message intents.
// You will want to replace this or add other intents as appropriate.
// The intents you wish to handle must be declared in the extension's Info.plist.

class IntentHandler: PKIssuerProvisioningExtensionHandler {
    override init() {
            AntelopAppDelegate.shared.extensionDidFinishLaunching()
        }

        override func status(completion: @escaping (PKIssuerProvisioningExtensionStatus) -> Void) {
            do {
                let status: PKIssuerProvisioningExtensionStatus = try InAppProvisioningExtensionHelper().status(forceAuth: false)
                NSLog("HCESDK:AVV:NonUIExt: status \(status)")
                completion(status)
            } catch {
                processError(error)

                // Default status returned in case of error.
                let defaultStatus = PKIssuerProvisioningExtensionStatus()
                defaultStatus.requiresAuthentication = false
                defaultStatus.passEntriesAvailable = false
                defaultStatus.remotePassEntriesAvailable = false
                completion(defaultStatus)
            }
        }

        override func passEntries(completion: @escaping ([PKIssuerProvisioningExtensionPassEntry]) -> Void) {
            do {
                let passEntries: [PKIssuerProvisioningExtensionPaymentPassEntry] = try InAppProvisioningExtensionHelper().passEntries()
                completion(passEntries)
            } catch {
                processError(error)
                // Returning empty Pass Entries array
                completion([])
            }
        }

        override func remotePassEntries(completion: @escaping ([PKIssuerProvisioningExtensionPassEntry]) -> Void) {
            do {
                let passEntries: [PKIssuerProvisioningExtensionPaymentPassEntry] = try InAppProvisioningExtensionHelper().remotePassEntries()
                completion(passEntries)
            } catch {
                processError(error)
                // Returning empty Pass Entries array
                completion([])
            }
        }

        /* Certificates is an array of NSData, each a DER encoded X.509 certificate, with the leaf first and root last.
         * The continuation handler must be called within 20 seconds or an error will be displayed.
         * Subsequent to timeout, the continuation handler is invalid and invocations will be ignored.
         */
        override func generateAddPaymentPassRequestForPassEntryWithIdentifier(
            _ identifier: String,
            configuration: PKAddPaymentPassRequestConfiguration,
            certificateChain certificates: [Data],
            nonce: Data,
            nonceSignature: Data,
            completionHandler completion: @escaping (PKAddPaymentPassRequest?) -> Void
        ) {
                do {
                    try InAppProvisioningExtensionHelper().pushCard(
                        identifier,
                        configuration: configuration,
                        certificateChain: certificates,
                        nonce: nonce,
                        nonceSignature: nonceSignature,
                        completionHandler: completion)
                } catch {
                    processError(error)
                    // Returning nil Add Payment Pass Request
                    completion(nil)
                }
            }
    }

    @available(iOS 14.0, *)
    private extension IntentHandler {

        func processError(_ error: Error) {

            if let error = error as? AntelopError {
                print("AntelopError: \(error)")
                return
            }

            if let error = error as? WalletValidationError {
                print("WalletValidationError: \(error)")
                return
            }
            print("Unknown error: \(error)")
        }

}
