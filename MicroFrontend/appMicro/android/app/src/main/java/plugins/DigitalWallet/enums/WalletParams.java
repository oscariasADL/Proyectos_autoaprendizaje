package plugins.DigitalWallet.enums;

import plugins.DigitalWallet.interfaces.RawValuable;

public enum WalletParams implements RawValuable {
    CARD_ID("cardId"),
    ENROLLMENT_DATA("enrollmentData"),
    CARD_IMAGE_URL("cardImageUrl"),
    CARD_DESCRIPTION("cardDescription");

    private final String value;

    WalletParams(String value) {
        this.value = value;
    }

    @Override
    public String getRawValue() {
        return value;
    }
}
