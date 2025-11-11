import Foundation
import Capacitor
import AntelopSDK

enum DigitalWalletEventType: String {
    case WalletStatusEvent
    case WalletProvisioningInitEvent
    case WalletEligibilityEvent
    case CreateWalletEvent
    case EnrollCardEvent
}

enum CreateWalletParams: String {
    case activationCode
    case phoneNumber
}

enum WalletParams: String {
    case cardId
    case enrollmentData
    case cardImageUrl
    case cardDescription
}

@objc(DigitalWalletPlugin)
public class DigitalWalletPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier: String = "DigitalWalletPlugin"
    public let jsName: String = "DigitalWallet"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "validateWalletStatus", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "initializeWalletProvisioning", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkEligibility", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createWallet", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isWalletCreated", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getWalletId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "enrollCardToWallet", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getDigitalCardId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setCustomCardDisplay", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getDigitalCards", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getStatusApplePayService", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "canPushCardInApplePay", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pushCardToApplePay", returnType: CAPPluginReturnPromise),
    ]

    private lazy var walletManager = WalletManager(self)
    private lazy var walletProvisioning = WalletProvisioning(self)

    static let shared = DigitalWalletPlugin()
    var wallet: Wallet?

    // Try to connect to Antelop wallet services.
    // Check that no wallet is started
    // onConnectionSuccess - if the wallet is already started
    // onProvisioningRequired - if no wallet is started
    @objc func validateWalletStatus(_ call: CAPPluginCall) {
        walletManager.connect()
        call.resolve()
    }

    @objc func initializeWalletProvisioning(_ call: CAPPluginCall) {
        walletProvisioning.initialize()
        call.resolve()
    }

    @objc func checkEligibility(_ call: CAPPluginCall) {
        walletProvisioning.checkEligibility(forbidJailBrokenDevices: true)
        call.resolve()
    }

    @objc func createWallet(_ call: CAPPluginCall) {
        let activationCode = call.getString(CreateWalletParams.activationCode.rawValue) ?? ""
        let phoneNumber = call.getString(CreateWalletParams.phoneNumber.rawValue) ?? nil
        try? walletProvisioning.launch(activationCode: activationCode, phoneNumber: phoneNumber)
        call.resolve()
    }

    @objc func isWalletCreated(_ call: CAPPluginCall) {
        let wallet = DigitalWalletPlugin.shared.wallet ?? nil
        call.resolve([
            "wallet": wallet != nil ? true : false
        ])
    }

    @objc func getWalletId(_ call: CAPPluginCall) {
        guard let wallet = DigitalWalletPlugin.shared.wallet else { return DigitalWalletErrorHandler.reject(call: call, error: .emptyWallet)}
        let walletId = wallet.getId()
        NSLog("HCESDK:AVV: getWalletId (walletId): \(walletId ?? 0)")
        call.resolve([
            "walletId": String(walletId ?? 0)
        ])
    }

    @objc func enrollCardToWallet(_ call: CAPPluginCall) {
        let enrollmentData = call.getString(WalletParams.enrollmentData.rawValue) ?? ""
        guard let wallet = DigitalWalletPlugin.shared.wallet else { return DigitalWalletErrorHandler.reject(call: call, error: .emptyWallet)}
        try? wallet.enrollDigitalCard(enrollmentData: enrollmentData) { result in
            NSLog("HCESDK:AVV: enrollCardToWallet: \(result)")
            switch result{
            case .success():
                self.listenEvent()
                call.resolve([
                    "success": true
                ])
            case .failure(let error):
                DigitalWalletErrorHandler.reject(call: call, error: .unknownError, errorDetail: "\(error)")
            }
        }
    }

    @objc func getDigitalCardId(_ call: CAPPluginCall) {
        let cardId = call.getString(WalletParams.cardId.rawValue) ?? ""
        NSLog("HCESDK:AVV: digitalCard cardId: \(cardId)")
        let digitalCard = findDigitalCardByCardId(cardId);
        NSLog("HCESDK:AVV: getDigitalCard id: \(digitalCard as Any)")
        call.resolve([
            "digitalCardId": digitalCard?.getId() as Any
        ])
    }

    @objc func setCustomCardDisplay(_ call: CAPPluginCall) {
        guard let wallet = DigitalWalletPlugin.shared.wallet else {
            NSLog("HCESDK:AVV: set custom card display wallet not found")
            DigitalWalletErrorHandler.reject(call: call, error: .emptyWallet, errorDetail: "Digital Card not found when validation Update Image Card")
            return
        }

        let cardId = call.getString(WalletParams.cardId.rawValue) ?? ""
        let digitalCardImageUrl = call.getString(WalletParams.cardImageUrl.rawValue) ?? ""
        let digitalCardDescription = call.getString(WalletParams.cardDescription.rawValue) ?? ""
        //NSLog("HCESDK:AVV: ImageURL \(digitalCardImageUrl) -- Desc \(digitalCardDescription)")

        let digitalCard = findDigitalCardByCardId(cardId)!;

        Utils.validateUploadImageOnWallet(digitalCard: digitalCard, descriptionImage: digitalCardDescription, urlImage: digitalCardImageUrl)

        NSLog("HCESDK:AVV: Set Custom Card Display to cardId \(cardId)")

        call.resolve([
            "imageIsLoaded":true
        ])
    }

    @objc func getDigitalCards(_ call: CAPPluginCall) {
        var cardsResult: [DigitalCardStructure]  = []
        guard let wallet = DigitalWalletPlugin.shared.wallet else {
            NSLog("HCESDK:AVV: wallet not found")
            return call.resolve(["cards": "[]"])
        }
        let digitalCards: [String : DigitalCard] = wallet.getDigitalCards(includeNotProvisionedCards: true)
            NSLog("HCESDK:AVV: getDigitalCards : \(digitalCards)")
            cardsResult = digitalCards.map(DigitalCardManagement.mapStructure)
            NSLog("HCESDK:AVV: getDigitalCards cardsResult: \(cardsResult)")
            let dataEncodeUtf8 = self.encodeUtil(cardsResult,call)
            call.resolve([
                "cards": dataEncodeUtf8
            ])
    }

    @objc func getStatusApplePayService(_ call: CAPPluginCall) {
        let digitalCard = validateDigitalCard(call);
        digitalCard?.getApplePayService().getStatus() { result in
            NSLog("HCESDK:AVV: getStatusApplePayService: \(result)")
            switch result{
            case .success(let data):
                call.resolve([
                    "status": data.description
                ])
            case .failure(let error):
                DigitalWalletErrorHandler.reject(call: call, error: .canPushCardInApplePayError, errorDetail: "\(error)")
            }
        }
    }


    @objc func canPushCardInApplePay(_ call: CAPPluginCall) {
        let digitalCard = validateDigitalCard(call);
        try? digitalCard?.getApplePayService().canPushCard { result in
            NSLog("HCESDK:AVV: canPushCardInApplePay: \(result)")
            switch result{
            case .success(let data):
                call.resolve([
                    "canPushCardInApplePay": data
                ])
            case .failure(let error):
                DigitalWalletErrorHandler.reject(call: call, error: .unknownError, errorDetail: "\(error)")
            }
        }
    }

    @objc func pushCardToApplePay(_ call: CAPPluginCall) {
        let digitalCard = validateDigitalCard(call);
        try? digitalCard?.getApplePayService().pushCard() { result in
           NSLog("HCESDK:AVV: pushCardToApplePay: \(result)")
           switch result{
           case .success(let data):
               call.resolve([
                   "pushToApplePay": data
               ])
           case .failure(let error):
               DigitalWalletErrorHandler.reject(call: call, error: .unknownError, errorDetail: "\(error)")
           }
        }
    }

    private func emitEvent(_ eventName: String, _ callBackName: String, _ message: String){
        DispatchQueue.main.async {
            self.notifyListeners(eventName, data: ["\(callBackName)" : message], retainUntilConsumed: true)
        }
    }

    func listenEvent() {
        WalletNotifications.subscribe(observer: self)
    }

    func encodeUtil(_ toEncoder: Encodable,_ call: CAPPluginCall)-> String {
        let jsonEncoder = JSONEncoder()
        do{
        let dataEncode = try jsonEncoder.encode(toEncoder)
        if  let dataEncodeUtf8 = String(data: dataEncode, encoding: .utf8) {
            return dataEncodeUtf8
          }
        } catch let error {
            NSLog(" HCESDK:AVV: Error al convertir a JSON to string: \(error)")
            DigitalWalletErrorHandler.reject(call: call, error: .encodeUtilError, errorDetail: "\(error)")

        }
        return ""
    }
}

/*
 https://doc.antelop-solutions.com/latest/common/sdk-swiftdoc/Protocols/WalletManagerProtocol.html
 */
extension DigitalWalletPlugin: WalletManagerProtocol {
    // Status
    public func onProvisioningRequired() {
        self.emitEvent(DigitalWalletEventType.WalletStatusEvent.rawValue, "onProvisioningRequired", "No wallet created")
        NSLog("HCESDK:AVV: onProvisioningRequired")
    }

    public func onCredentialsRequired(reason: CustomerCredentialsRequiredReason) {
        self.emitEvent(DigitalWalletEventType.WalletStatusEvent.rawValue, "onCredentialsRequired", "Credentials must be provided to access the wallet")
        NSLog("HCESDK:AVV: onCredentialsRequired")
    }

    public func onConnectionSuccess(wallet: Wallet) {
        // you can now use Antelop Wallet Services
        DigitalWalletPlugin.shared.wallet = wallet
        self.emitEvent(DigitalWalletEventType.WalletStatusEvent.rawValue, "onConnectionSuccess", "Full access to wallet features")
        NSLog("HCESDK:AVV: onConnectionSuccess")
    }

    public func onConnectionError(error: AntelopError) {
        self.emitEvent(DigitalWalletEventType.WalletStatusEvent.rawValue, "onConnectionError" ,"\(error)")
        NSLog("HCESDK:AVV: onConnectionError")
    }
}

/*
 https://doc.antelop-solutions.com/latest/common/sdk-swiftdoc/Protocols/WalletProvisioningProtocol.html
 */
extension DigitalWalletPlugin: WalletProvisioningProtocol {
    // Initialization

    public func onInitializationSuccess() {
        self.emitEvent(DigitalWalletEventType.WalletProvisioningInitEvent.rawValue, "onInitializationSuccess", "Provisioning initialization successful")
        NSLog("HCESDK:AVV: onInitializationSuccess")
    }

    public func onInitializationError(error: AntelopSDK.AntelopError) {
        self.emitEvent(DigitalWalletEventType.WalletProvisioningInitEvent.rawValue, "onInitializationError", "\(error)")
        NSLog("HCESDK:AVV: onInitializationError")
    }

    // Eligibility
    public func onDeviceEligible(fingerprintAllowed: Bool, eligibleProducts: [AntelopSDK.Product]) {
        self.emitEvent(DigitalWalletEventType.WalletEligibilityEvent.rawValue, "onDeviceEligible", "The device is eligible")
        NSLog("HCESDK:AVV: onDeviceEligible")
    }

    public func onDeviceNotEligible(reason: AntelopSDK.EligibilityDenialReason?, denialReference: String?) {
        self.emitEvent(DigitalWalletEventType.WalletEligibilityEvent.rawValue, "onDeviceNotEligible", "\(String(describing: reason))")
        NSLog("HCESDK:AVV: onDeviceNotEligible")
    }

    public func onCheckEligibilityError(error: AntelopSDK.AntelopError) {
        self.emitEvent(DigitalWalletEventType.WalletEligibilityEvent.rawValue, "onCheckEligibilityError", "\(error)")
        NSLog("HCESDK:AVV: onCheckEligibilityError")
    }

    //launch()
    public func onProvisioningPending() {
        self.emitEvent(DigitalWalletEventType.CreateWalletEvent.rawValue, "onProvisioningPending", "Wallet creation in progress")
        NSLog("HCESDK:AVV: onProvisioningPending")
    }

    public func onProvisioningSuccess() {
        self.emitEvent(DigitalWalletEventType.CreateWalletEvent.rawValue, "onProvisioningSuccess", "Wallet created")
        walletManager.connect()
        NSLog("HCESDK:AVV: onProvisioningSuccess")
    }

    public func onProvisioningError(error: AntelopSDK.AntelopError) {
        self.emitEvent(DigitalWalletEventType.CreateWalletEvent.rawValue, "onProvisioningError", "\(error)")
        NSLog("HCESDK:AVV: onProvisioningError: \(error)")
    }
}

extension DigitalWalletPlugin: WalletNotificationsObserver {
    public func onCardsUpdated() {
        self.emitEvent(DigitalWalletEventType.EnrollCardEvent.rawValue, "onCardsUpdated", "Card enrolled in the sdk wallet")
        NSLog("HCESDK:AVV: onCardsUpdated")
    }
}

/*
 https://doc.antelop-solutions.com/latest/common/sdk-swiftdoc/Classes/Wallet.html
 */
extension DigitalWalletPlugin {
    func getDigitalCardById(_ cardId: String) -> DigitalCard? {
        guard let wallet = DigitalWalletPlugin.shared.wallet else { return nil }
        return wallet.getDigitalCard(cardId: cardId)
    }

    public func findDigitalCardByCardId(_ cardId: String) -> DigitalCard? {
        guard let wallet = DigitalWalletPlugin.shared.wallet else { return nil }
        let digitalCards: [String : DigitalCard] = wallet.getDigitalCards(includeNotProvisionedCards: true)
        NSLog("HCESDK:AVV: findDigitalCardByCardId (digitalCards): \(digitalCards)")
        let bin = String(cardId.prefix(6))
        let pan = String(cardId.suffix(4))

        if let entry = digitalCards.first(where: { (key, value) in
            if let panSDK = value.getCardInfo()?.getLastDigits(), let binSDK = value.getCardInfo()?.getBin() {
                return panSDK.contains(pan) && binSDK.contains(bin)
            }
            return false
        }){
            NSLog("HCESDK:AVV: findDigitalCardByCardId (entry): \(entry.value)")
            return entry.value
        } else {
            NSLog("HCESDK:AVV: error trying to find digital card")
            return nil
        }
    }

    func validateDigitalCard(_ call: CAPPluginCall) -> DigitalCard? {
        let cardId = call.getString(WalletParams.cardId.rawValue) ?? ""
        let digitalCard = getDigitalCardById(cardId)

        if digitalCard == nil {
            DigitalWalletErrorHandler.reject(call: call, error: .nullDigitalCard)
            return nil
        }

        NSLog("HCESDK:AVV: validateDigitalCard (digitalCard): \(digitalCard?.getId() ?? "emptyDigitalCard")")
        return digitalCard
    }
}
