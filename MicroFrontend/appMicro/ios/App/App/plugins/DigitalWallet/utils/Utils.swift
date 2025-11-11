import Foundation
import AntelopSDK
import Capacitor

class Utils: CAPPlugin {

    public static func validateUploadImageOnWallet( digitalCard:DigitalCard, descriptionImage : String, urlImage:String ) -> Void {
        if let url = URL(string: urlImage) {
                    let task = URLSession.shared.dataTask(with: url) { data, response, error in
                        if  data != nil, let dataDowload = data {
                            DispatchQueue.main.async {
                                if let image = UIImage(data: dataDowload){
                                    let customCardDisplay = CustomCardDisplay(cardDescription:descriptionImage,cardImage:image)
                                    digitalCard.setCustomCardDisplay(customCardDisplay)
                                    var customCardDisplayResult = digitalCard.getCustomCardDisplay()
                                } else {
                                    NSLog("URL not create image: \(dataDowload)")
                                    return
                                }
                            }
                        }
                        return
                    }
                    task.resume()
                } else {
                    NSLog("URL not valid: \(urlImage)")
                    return
                }
    }
}
