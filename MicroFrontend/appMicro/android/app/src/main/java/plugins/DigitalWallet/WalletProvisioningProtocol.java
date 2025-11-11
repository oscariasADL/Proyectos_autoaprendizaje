package plugins.DigitalWallet;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.List;

import fr.antelop.sdk.AntelopError;
import fr.antelop.sdk.EligibilityDenialReason;
import fr.antelop.sdk.Product;
import fr.antelop.sdk.WalletManager;
import fr.antelop.sdk.WalletProvisioningCallback;
import plugins.DigitalWallet.enums.DigitalWalletEventType;
import plugins.DigitalWallet.interfaces.EventNotifier;

public class WalletProvisioningProtocol implements WalletProvisioningCallback {

    private final EventNotifier eventNotifier;
    private final WalletManager walletManager;

    public WalletProvisioningProtocol(EventNotifier eventNotifier, WalletManager walletManager) {
        this.eventNotifier = eventNotifier;
        this.walletManager = walletManager;
    }

    @Override
    public void onProvisioningError(@NonNull AntelopError antelopError, @Nullable Object o) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.CREATE_WALLET_EVENT.getRawValue(), "onProvisioningError", antelopError.getMessage());
        Log.i("HCESDK:AVV:", "[onProvisioningError]");
    }

    @Override
    public void onProvisioningSuccess(@Nullable Object o) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.CREATE_WALLET_EVENT.getRawValue(), "onProvisioningSuccess", "Wallet created");
        walletManager.connect();
        Log.i("HCESDK:AVV:", "[onProvisioningSuccess]: Wallet created");
    }

    @Override
    public void onProvisioningPending(@Nullable Object o) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.CREATE_WALLET_EVENT.getRawValue(), "onProvisioningPending", "Wallet creation in progress");
        Log.i("HCESDK:AVV:", "[onProvisioningPending]: Wallet creation in progress");
    }

    @Override
    public void onInitializationError(@NonNull AntelopError antelopError, @Nullable Object o) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.WALLET_PROVISIONING_INIT_EVENT.getRawValue(), "onProvisioningError", antelopError.getMessage());
        Log.i("HCESDK:AVV:", "[onProvisioningError]");
    }

    @Override
    public void onInitializationSuccess(@Nullable Object o) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.WALLET_PROVISIONING_INIT_EVENT.getRawValue(), "onInitializationSuccess", "Provisioning initialization successful");
        Log.i("HCESDK:AVV:", "[onInitializationSuccess]: Provisioning initialization successful");
    }

    @Override
    public void onDeviceEligible(boolean b, @NonNull List<Product> list, @Nullable Object o) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.WALLET_ELIGIBILITY_EVENT.getRawValue(), "onDeviceEligible", "The device is eligible");
        Log.i("HCESDK:AVV:", "[onDeviceEligible]: The device is eligible");
    }

    @Override
    public void onDeviceNotEligible(@NonNull EligibilityDenialReason eligibilityDenialReason, @Nullable Object o, @Nullable String s) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.WALLET_ELIGIBILITY_EVENT.getRawValue(), "onDeviceNotEligible", eligibilityDenialReason.name());
        Log.i("HCESDK:AVV:", "[onDeviceNotEligible]");
    }

    @Override
    public void onCheckEligibilityError(@NonNull AntelopError antelopError, @Nullable Object o) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.WALLET_ELIGIBILITY_EVENT.getRawValue(), "onCheckEligibilityError", antelopError.getMessage());
        Log.i("HCESDK:AVV:", "[onCheckEligibilityError]");
    }
}
