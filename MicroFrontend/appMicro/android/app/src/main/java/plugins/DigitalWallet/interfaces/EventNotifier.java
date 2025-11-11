package plugins.DigitalWallet.interfaces;

public interface EventNotifier {
    void emitEvent(String eventName, String callbackName, String message);
}
