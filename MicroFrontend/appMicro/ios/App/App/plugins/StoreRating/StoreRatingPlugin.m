//
//  StoreRatingPlugin.m
//  App
//
//  Created by Jimmy Alfonso Cardenas Orjuela on 3/11/21.
//

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(StoreRatingPlugin, "StoreRating",
           CAP_PLUGIN_METHOD(requestReview, CAPPluginReturnPromise);
)
