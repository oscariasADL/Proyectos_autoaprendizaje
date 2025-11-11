package plugins.DigitalWallet;

import android.content.Intent;

import fr.antelop.sdk.util.AndroidActivityResultCallback;

import plugins.DigitalWallet.interfaces.EventNotifier;

public class DigitalEnrollCallback {
    private static DigitalEnrollCallback instance;

    private EventNotifier eventNotifier;

    private AndroidActivityResultCallback cardStatusCallback = null;

    private DigitalEnrollCallback() {}

    public void setEventNotifier(EventNotifier eventNotifier) {
        this.eventNotifier = eventNotifier;
    }

    public void notifyEvent(String eventName, String callbackName, String message) {
        if (eventNotifier != null) {
            eventNotifier.emitEvent(eventName, callbackName, message);
        }
    }

    public void setAndroidActivityResultCallback(AndroidActivityResultCallback cardStatusCallback) {
        this.cardStatusCallback = cardStatusCallback;
    }

    public boolean runAndroidActivityResultCallback(int requestCode, int resultCode, Intent data) {
        if (cardStatusCallback == null) {
            return false;
        }

        boolean response = cardStatusCallback.onActivityResult(requestCode, resultCode, data);

        cardStatusCallback = null;

        return response;
    }

    public static void setEventsNotifier(EventNotifier eventNotifier) {
        getInstance().setEventNotifier(eventNotifier);
    }

    public static void emitEvent(String eventName, String callbackName, String message) {
        getInstance().notifyEvent(eventName, callbackName, message);
    }

    public static void setPushCardCallback(AndroidActivityResultCallback cardStatusCallback) {
        getInstance().setAndroidActivityResultCallback(cardStatusCallback);
    }

    public static boolean runPushCardResult(int requestCode, int resultCode, Intent data) {
        return getInstance().runAndroidActivityResultCallback(requestCode, resultCode, data);
    }

    private static DigitalEnrollCallback getInstance() {
        if (instance == null) {
            instance = new DigitalEnrollCallback();
        }

        return instance;
    }
}
