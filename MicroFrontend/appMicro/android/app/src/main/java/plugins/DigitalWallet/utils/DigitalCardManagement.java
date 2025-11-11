package plugins.DigitalWallet.utils;

import android.util.Log;

import com.getcapacitor.Plugin;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;

import fr.antelop.sdk.card.CardInfo;
import fr.antelop.sdk.digitalcard.DigitalCard;
import fr.antelop.sdk.card.CardStatus;
import plugins.DigitalWallet.models.DigitalCardStructure;

public class DigitalCardManagement extends Plugin {

    public static DigitalCardStructure mapStructure(String key, DigitalCard value) {
        return new DigitalCardStructure(
            value.getId(),
            convertDigitalCardStatusToString(value.getStatus()),
            getBin(value.getCardInfo()),
            getLastDigits(value.getCardInfo()),
            getExpiryDate(value.getCardInfo()),
            imageIsLoaded(value)
        );
    }

    private static String convertDigitalCardStatusToString(CardStatus status) {
        if (status == null) return "";
        switch (status) {
            case Activating: return "activating";
            case ActivationRefused: return "activationRefused";
            case ActivationRequired: return "activationRequired";
            case Active: return "active";
            case Locked: return "locked";
            case TermsAndConditionsValidationRequired: return "termsAndConditionsValidationRequired";
            default:
                Log.i("HCESDK:AVV", "DigitalCardManagement (convertDigitalCardStatusToString): " + status);
                return "";
        }
    }

    private static String getLastDigits(CardInfo cardInfo) {
        return Optional.ofNullable(cardInfo)
            .map(CardInfo::getLastDigits)
            .orElse("");
    }

    private static String getBin(CardInfo cardInfo) {
        return Optional.ofNullable(cardInfo)
            .map(CardInfo::getBin)
            .orElse("");
    }

    private static String getExpiryDate(CardInfo cardInfo) {
        Date expiry = Optional.ofNullable(cardInfo)
            .map(CardInfo::getExpiryDate)
            .orElse(null);

        if (expiry == null) return "";

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US);
        return formatter.format(expiry);
    }

    private static boolean imageIsLoaded(DigitalCard card) {
        return true;
    }
}
