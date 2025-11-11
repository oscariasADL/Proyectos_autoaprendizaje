//
//  Permission.swift
//  App
//
//  Created by Jimmy Alfonso Cardenas Orjuela on 10/08/21.
//

import Foundation
import Contacts

class Permissions {

    class func contactPermission(completionHandler: @escaping (_ accessGranted: Bool) -> Void) {
        let contactStore = CNContactStore()
        switch CNContactStore.authorizationStatus(for: .contacts) {
        case .authorized:
            completionHandler(true)
        case .denied:
            completionHandler(false)
        case .restricted, .notDetermined:
            contactStore.requestAccess(for: .contacts) { granted, error in
                if granted {
                    completionHandler(true)
                } else {
                    DispatchQueue.main.async {
                        completionHandler(false)
                    }
                }
            }
        case .limited:
          completionHandler(false)
        @unknown default:
          completionHandler(false)
        }
    }
}


