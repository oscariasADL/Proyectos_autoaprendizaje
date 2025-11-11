package plugins.DigitalWallet.utils;

import com.getcapacitor.PluginCall;
import java.util.HashMap;
import java.util.Map;

public class DigitalWalletErrorHandler {

    private String message = "";
    private String code = "";

    public enum ErrorType {
        INVALID_DATA,
        NULL_DIGITAL_CARD,
        UNKNOWN_ERROR,
        EMPTY_WALLET,
        TOKENS_NOT_FOUND,
        DELETE_TOKEN_ERROR,
        RESUME_TOKEN_ERROR,
        SUSPEND_TOKEN_ERROR,
        CAN_PUSH_CARD_IN_GOOGLE_PAY_ERROR,
        DIGITAL_PLATFORMS_ERROR,
        ENCODE_UTIL_ERROR,
        SEARCH_DIGITAL_CARD_ERROR
    }

    private static final Map<ErrorType, String> errorMap = new HashMap<>() {{
        put(ErrorType.INVALID_DATA, "The data is in an invalid format");
        put(ErrorType.NULL_DIGITAL_CARD, "Digital card is null");
        put(ErrorType.UNKNOWN_ERROR, "An unknown error occurred");
        put(ErrorType.EMPTY_WALLET, "Empty Wallet");
        put(ErrorType.TOKENS_NOT_FOUND, "tokens not found");
        put(ErrorType.DELETE_TOKEN_ERROR, "token not removed");
        put(ErrorType.RESUME_TOKEN_ERROR, "token not activated");
        put(ErrorType.SUSPEND_TOKEN_ERROR, "token not deactivated");
        put(ErrorType.CAN_PUSH_CARD_IN_GOOGLE_PAY_ERROR, "error in isCardInGooglePay");
        put(ErrorType.DIGITAL_PLATFORMS_ERROR, "error in getDigitalPlatforms");
        put(ErrorType.ENCODE_UTIL_ERROR, "error encode To string object with encodeUtil");
        put(ErrorType.SEARCH_DIGITAL_CARD_ERROR, "error find card Digital");
    }};

    public DigitalWalletErrorHandler(ErrorType error, String errorDetail) {
        init(error, errorDetail);
    }

    public DigitalWalletErrorHandler(ErrorType error) {
        init(error, "");
    }

    private void init(ErrorType error, String errorDetail) {
        String defaultMessage = errorMap.getOrDefault(error, "Unknown error");
        this.message = (errorDetail != null && !errorDetail.isEmpty()) ? errorDetail : defaultMessage;
        this.code = error.name(); // enum name as string (like rawValue in Swift)
    }

    public static void reject(PluginCall call, ErrorType error, String errorDetail) {
        DigitalWalletErrorHandler err = new DigitalWalletErrorHandler(error, errorDetail);
        err.rejectCall(call);
    }

    public static void reject(PluginCall call, ErrorType error) {
        reject(call, error, "");
    }

    public void rejectCall(PluginCall call) {
        System.out.println("HCESDK:AVV:Error(" + code + "): " + message);
        call.reject(message, code);
    }
}
