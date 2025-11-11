//
//  QuickActionsPlugin.swift
//  App
//
//  Created by Jimmy Alfonso Cardenas Orjuela on 11/08/21.
//

import Foundation
import Capacitor


struct QuickAction: Codable {
    var type: String
    var title: String
    var subtitle: String?
    var iconType: String
}

@objc(QuickActionsPlugin)
public class QuickActionsPlugin: CAPPlugin, CAPBridgedPlugin {
    
    public let identifier = "QuickActionsPlugin"
    public let jsName = "QuickActions"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "configureQuickActions", returnType: CAPPluginReturnPromise)
    ]
    public override func load() {
        UIApplication.shared.shortcutItems = []
        self.createObserver()
    }
    
    @objc func configureQuickActions(_ call: CAPPluginCall) {
        
        let actions = call.getArray("actions", [String: Any].self) ?? [[String: Any]]()
        
        UIApplication.shared.shortcutItems = []
        var shortcutItems = UIApplication.shared.shortcutItems
        
        for action in actions {
            
            let subtitle = (action["subtitle"] ?? nil)
            
            let _action: QuickAction = QuickAction(
                type: (action["type"] ?? nil) as! String,
                title: (action["title"] ?? nil) as! String,
                subtitle: subtitle as? String,
                iconType: (action["iconType"] ?? nil) as! String)
            
            var userInfo = [String:NSSecureCoding]()
            userInfo.updateValue(_action.type as NSSecureCoding, forKey: "key")

            let shortcut = UIMutableApplicationShortcutItem.init(type: _action.type, localizedTitle: _action.title, localizedSubtitle: _action.subtitle, icon: UIApplicationShortcutIcon.init(templateImageName: _action.iconType), userInfo: userInfo )

            shortcutItems?.append(shortcut)
        }
        
        UIApplication.shared.shortcutItems = shortcutItems
                
        call.resolve()
    }
    
    @objc private func handleSignal(notification: Notification) {
        let quickAction = notification.userInfo?["key"] as Any
        self.notifyListeners("quickActionPressed", data: ["type": quickAction as Any])
    }
    
    @objc private func createObserver() {
        NotificationCenter.default.addObserver(self, selector: #selector(self.handleSignal), name: Notification.Name("QuickActionsEvents"), object: nil)
    }
}

