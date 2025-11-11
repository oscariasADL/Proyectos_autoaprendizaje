package plugins.DigitalWallet;

import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;

import java.util.Date;
import java.util.List;

import fr.antelop.sdk.WalletLockReason;
import fr.antelop.sdk.WalletNotificationServiceCallback;
import fr.antelop.sdk.card.EmvApplicationActivationMethod;
import plugins.DigitalWallet.enums.DigitalWalletEventType;

public class DigitalWalletNotificationServiceCallback implements WalletNotificationServiceCallback {
    @Override
    public void onCardsUpdated(@NonNull Context context) {
        DigitalEnrollCallback.emitEvent(DigitalWalletEventType.ENROLL_CARD_EVENT.getRawValue(), "onCardsUpdated", "Card enrolled in the sdk wallet");
        Log.i("HCESDK:AVV:", "[onCardsUpdated]: Card enrolled in the sdk wallet");
    }

    @Override
    public void onEmvApplicationActivationRequired(@NonNull Context context, @NonNull String s, @NonNull List<EmvApplicationActivationMethod> list) {

    }

    @Override
    public void onEmvApplicationCredentialsUpdated(@NonNull Context context) {

    }

    @Override
    public void onWalletLoaded(@NonNull Context context) {

    }

    @Override
    public void onWalletLocked(@NonNull Context context, @NonNull WalletLockReason walletLockReason) {

    }

    @Override
    public void onWalletUnlocked(@NonNull Context context) {

    }

    @Override
    public void onLogout(@NonNull Context context) {

    }

    @Override
    public void onWalletDeleted(@NonNull Context context) {

    }

    @Override
    public void onSettingsUpdated(@NonNull Context context) {

    }

    @Override
    public void onCountersUpdated(@NonNull Context context) {
        DigitalEnrollCallback.emitEvent(DigitalWalletEventType.ENROLL_CARD_EVENT.getRawValue(), "onCountersUpdated", "Counters updated");
    }

    @Override
    public void onCustomerCredentialsReset(@NonNull Context context) {

    }

    @Override
    public void onSunsetScheduled(@NonNull Context context, @NonNull Date date) {

    }

    @Override
    public void onLostEligibility(@NonNull Context context) {

    }
}
