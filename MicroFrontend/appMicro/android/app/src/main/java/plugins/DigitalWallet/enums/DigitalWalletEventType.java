package plugins.DigitalWallet.enums;

import plugins.DigitalWallet.interfaces.RawValuable;

public enum DigitalWalletEventType implements RawValuable {
    WALLET_STATUS_EVENT("WalletStatusEvent"),
    WALLET_PROVISIONING_INIT_EVENT("WalletProvisioningInitEvent"),
    WALLET_ELIGIBILITY_EVENT("WalletEligibilityEvent"),
    CREATE_WALLET_EVENT("CreateWalletEvent"),
    ENROLL_CARD_EVENT("EnrollCardEvent");

    private final String value;

    DigitalWalletEventType(String value) {
        this.value = value;
    }

    public String getRawValue() {
        return value;
    }
}
