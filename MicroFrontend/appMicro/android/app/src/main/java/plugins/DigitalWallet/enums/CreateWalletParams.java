package plugins.DigitalWallet.enums;

import plugins.DigitalWallet.interfaces.RawValuable;

public enum CreateWalletParams implements RawValuable {
    ACTIVATION_CODE("activationCode"),
    PHONE_NUMBER("phoneNumber");

    private final String value;
    CreateWalletParams(String value) {
        this.value = value;
    }

    public String getRawValue() {
        return value;
    }
}
