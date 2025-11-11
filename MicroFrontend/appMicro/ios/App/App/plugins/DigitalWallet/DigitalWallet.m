//
//  DigitalWallet.m
//  App
//
//  Created by Juan Carlos Pinzon on 4/04/24.
//

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(DigitalWalletPlugin, "DigitalWallet",
           CAP_PLUGIN_METHOD(validateWalletStatus, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(initializeWalletProvisioning, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(checkEligibility, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createWallet, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(isWalletCreated, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getWalletId, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(enrollCardToWallet, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getDigitalCardId, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setCustomCardDisplay, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getDigitalCards, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getStatusApplePayService, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(canPushCardInApplePay, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(pushCardToApplePay, CAPPluginReturnPromise);
)
