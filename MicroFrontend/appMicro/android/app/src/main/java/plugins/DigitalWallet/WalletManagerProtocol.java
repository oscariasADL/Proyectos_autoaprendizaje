package plugins.DigitalWallet;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import fr.antelop.sdk.AntelopError;
import fr.antelop.sdk.AsyncRequestType;
import fr.antelop.sdk.Wallet;
import fr.antelop.sdk.WalletManagerCallback;
import fr.antelop.sdk.authentication.CustomerAuthenticationMethodType;
import fr.antelop.sdk.authentication.CustomerCredentialsRequiredReason;
import fr.antelop.sdk.authentication.LocalAuthenticationErrorReason;

import plugins.DigitalWallet.enums.DigitalWalletEventType;
import plugins.DigitalWallet.interfaces.EventNotifier;
import plugins.DigitalWallet.interfaces.WalletHandler;

public class WalletManagerProtocol implements WalletManagerCallback {

    private final EventNotifier eventNotifier;
    private final WalletHandler walletHandler;

    public WalletManagerProtocol(EventNotifier eventNotifier, WalletHandler walletHandler) {
        this.eventNotifier = eventNotifier;
        this.walletHandler = walletHandler;
    }

    @Override
    public void onConnectionError(@NonNull AntelopError antelopError) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.WALLET_STATUS_EVENT.getRawValue(),"onConnectionError", antelopError.getMessage());
        Log.i("HCESDK:AVV:", "[onConnectionError]");
    }

    @Override
    public void onConnectionSuccess(@NonNull Wallet wallet) {
        this.walletHandler.setWallet(wallet);
        this.eventNotifier.emitEvent(DigitalWalletEventType.WALLET_STATUS_EVENT.getRawValue(),"onConnectionSuccess", "Full access to wallet features");
        Log.i("HCESDK:AVV:", "[onConnectionSuccess]: Full access to wallet features");
    }

    @Override
    public void onCredentialsRequired(@NonNull CustomerCredentialsRequiredReason customerCredentialsRequiredReason, @Nullable AntelopError antelopError) {
        this.eventNotifier.emitEvent(DigitalWalletEventType.WALLET_STATUS_EVENT.getRawValue(),"onCredentialsRequired", "Credentials must be provided to access the wallet");
        Log.i("HCESDK:AVV:", "[onCredentialsRequired]: Credentials must be provided to access the wallet");
    }

    @Override
    public void onProvisioningRequired() {
        this.eventNotifier.emitEvent(DigitalWalletEventType.WALLET_STATUS_EVENT.getRawValue(),"onProvisioningRequired", "No wallet created");
        Log.i("HCESDK:AVV:", "[onProvisioningRequired]: No wallet created");
    }

    @Override
    public void onAsyncRequestSuccess(@NonNull AsyncRequestType asyncRequestType) {
        Log.i("HCESDK:AVV:", String.format("%s[onAsyncRequestSuccess]: Ignored event", DigitalWalletEventType.WALLET_STATUS_EVENT.getRawValue()));
    }

    @Override
    public void onAsyncRequestError(@NonNull AsyncRequestType asyncRequestType, @NonNull AntelopError antelopError) {
        Log.i("HCESDK:AVV:", String.format("%s[onAsyncRequestError]: Ignored event", DigitalWalletEventType.WALLET_STATUS_EVENT.getRawValue()));
    }

    @Override
    public void onLocalAuthenticationSuccess(@NonNull CustomerAuthenticationMethodType customerAuthenticationMethodType) {
        Log.i("HCESDK:AVV:", String.format("%s[onLocalAuthenticationSuccess]: Ignored event", DigitalWalletEventType.WALLET_STATUS_EVENT.getRawValue()));
    }

    @Override
    public void onLocalAuthenticationError(@NonNull CustomerAuthenticationMethodType customerAuthenticationMethodType, @NonNull LocalAuthenticationErrorReason localAuthenticationErrorReason, @Nullable String s) {
        Log.i("HCESDK:AVV:", String.format("%s[onLocalAuthenticationError]: Ignored event", DigitalWalletEventType.WALLET_STATUS_EVENT.getRawValue()));
    }
}
