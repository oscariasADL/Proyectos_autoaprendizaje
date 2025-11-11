package plugins.DigitalWallet.interfaces;

import fr.antelop.sdk.Wallet;

public interface WalletHandler {
    void setWallet(Wallet wallet);

    Wallet getWallet();
}
