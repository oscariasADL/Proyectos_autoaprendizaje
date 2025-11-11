import Foundation
import AntelopSDK
import Capacitor

struct DigitalCardStructure: Encodable {
    var id: String
    var status: String
    var bin: String
    var lastDigits: String
    var expirationDate: String
    var imageIsLoaded: Bool
}

class DigitalCardManagement: CAPPlugin {

    public static func mapStructure( key:String, value : DigitalCard) -> DigitalCardStructure {
        return DigitalCardStructure(
            id: value.getId(),
            status: DigitalCardManagement.convertDigitalCardStatusToString(value.getStatus()),
            bin: DigitalCardManagement.getBin(value.getCardInfo()),
            lastDigits: DigitalCardManagement.getLastDigits(value.getCardInfo()),
            expirationDate: DigitalCardManagement.getExpiryDate(value.getCardInfo()),
            imageIsLoaded: DigitalCardManagement.imageIsLoaded(value)
        )
    }

    private static func convertDigitalCardStatusToString(_ digitalCardServiceStatus: CardStatus?) -> String {
    switch digitalCardServiceStatus {
        case .activating:
            return "activating"
        case .activationRefused:
            return "activationRefused"
        case .activationRequired:
            return "activationRequired"
        case .active:
            return "active"
        case .locked:
            return "locked"
        case .termsAndConditionsValidationRequired:
            return "termsAndConditionsValidationRequired"
        default:
            NSLog("HCESDK:AVV: DigitalCardManagement (convertDigitalCardStatusToString) : \(digitalCardServiceStatus?.description)")
            return ""
        }
    }

    private static func getLastDigits(_ digitalCardCardInfo: CardInfo?) -> String {
        if let cardInfo = digitalCardCardInfo?.getLastDigits() {
            return cardInfo
        }
        return ""
    }

    private static func getBin(_ digitalCardCardInfo: CardInfo?) -> String {
        if let cardInfo = digitalCardCardInfo?.getBin() {
            return cardInfo
        }
        return ""
    }

    private static func getExpiryDate(_ digitalCardCardInfo: CardInfo?) -> String {
        if let expiryDate = digitalCardCardInfo?.getExpiryDate() {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
            return dateFormatter.string(from: expiryDate)
        }
        return ""
    }

    private static func imageIsLoaded(_ digitalCard: DigitalCard) -> Bool {
        return digitalCard.getCustomCardDisplay() != nil
    }
}
