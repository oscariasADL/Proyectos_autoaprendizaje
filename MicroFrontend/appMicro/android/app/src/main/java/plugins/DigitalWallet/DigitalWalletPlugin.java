package plugins.DigitalWallet;

import android.util.Log;

import androidx.annotation.NonNull;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.gson.Gson;

import fr.antelop.sdk.AntelopError;
import fr.antelop.sdk.Wallet;
import fr.antelop.sdk.WalletManager;
import fr.antelop.sdk.WalletProvisioning;
import fr.antelop.sdk.card.CardInfo;
import fr.antelop.sdk.digitalcard.DigitalCard;
import fr.antelop.sdk.digitalcard.DigitalCardServiceStatus;
import fr.antelop.sdk.exception.WalletValidationException;
import fr.antelop.sdk.util.AndroidActivityResultCallback;
import fr.antelop.sdk.util.OperationCallback;

import plugins.DigitalWallet.enums.CreateWalletParams;
import plugins.DigitalWallet.enums.WalletParams;
import plugins.DigitalWallet.interfaces.EventNotifier;
import plugins.DigitalWallet.interfaces.WalletHandler;
import plugins.DigitalWallet.models.DigitalCardStructure;
import plugins.DigitalWallet.utils.DigitalCardManagement;
import plugins.DigitalWallet.utils.DigitalWalletErrorHandler;

@CapacitorPlugin(name = "DigitalWallet")
public class DigitalWalletPlugin extends Plugin implements EventNotifier, WalletHandler {
    public static final int PUSH_CARD_REQUEST_CODE = 50;
    private WalletManager walletManager;
    private WalletProvisioning walletProvisioning;
    private Wallet wallet;

    public DigitalWalletPlugin() {
        DigitalEnrollCallback.setEventsNotifier(this);
    }

    @PluginMethod
    public void validateWalletStatus(PluginCall call) {
        try {
            if (this.walletManager == null) {
                WalletManagerProtocol callback = new WalletManagerProtocol(this, this);
                walletManager = new WalletManager(getContext(), callback);
            }

            walletManager.connect();
        } catch (WalletValidationException e) {
            call.reject(e.getMessage());
        }
        call.resolve();
    }

    @PluginMethod
    public void initializeWalletProvisioning(PluginCall call) {
        try {
            if (walletProvisioning == null) {
                WalletProvisioningProtocol callback = new WalletProvisioningProtocol(this, this.walletManager);
                walletProvisioning = new WalletProvisioning(getContext(), callback);
            }
            walletProvisioning.initialize();
        } catch (WalletValidationException e) {
            call.reject(e.getMessage());
        }
        call.resolve();
    }

    @PluginMethod
    public void checkEligibility(PluginCall call) {
        try {
            if (walletProvisioning == null) {
                call.reject("Error provision not initialized in device");
                return;
            }
            walletProvisioning.checkEligibility(true);
        } catch (WalletValidationException e) {
            call.reject(e.getMessage());
        }
        call.resolve();
    }

    @PluginMethod
    public void createWallet(PluginCall call) {
        try {
            if (walletProvisioning == null) {
                call.reject("Error provision not initialized in device");
                return;
            }

            String activationCode = call.getString(CreateWalletParams.ACTIVATION_CODE.getRawValue());
            String phoneNumber = call.getString(CreateWalletParams.PHONE_NUMBER.getRawValue());

            if (activationCode != null) {
                byte[] activationCodeBytes = activationCodeToBytes(activationCode);
                walletProvisioning.launch(activationCodeBytes, phoneNumber);
            }
        } catch (WalletValidationException e) {
            call.reject(e.getMessage());
        }
        call.resolve();
    }

    @PluginMethod
    public void isWalletCreated(PluginCall call) {
        Wallet walletAux = this.wallet != null ? this.wallet : null;
        JSObject data = new JSObject();
        data.put("wallet", walletAux != null ? true : false);
        call.resolve(data);
    }

    @PluginMethod
    public void getWalletId(PluginCall call) {
        if (this.wallet == null) {
            DigitalWalletErrorHandler.reject(call, DigitalWalletErrorHandler.ErrorType.EMPTY_WALLET);
            return;
        }

        String walletId = this.wallet.getWalletId();
        if (walletId == null) {
            walletId = "";
        }

        Log.i("HCESDK:AVV:", "getWalletId (walletId): " + walletId);
        JSObject data = new JSObject();
        data.put("walletId", walletId);

        call.resolve(data);
    }

    @PluginMethod
    public void enrollCardToWallet(PluginCall call) {
        String enrollmentData = call.getString(WalletParams.ENROLLMENT_DATA.getRawValue());
        if (this.wallet == null) {
            DigitalWalletErrorHandler.reject(call, DigitalWalletErrorHandler.ErrorType.EMPTY_WALLET);
            return;
        }

        try {
            this.wallet.enrollDigitalCard(getContext(), enrollmentData, new OperationCallback<Void>() {
                @Override
                public void onSuccess(Void unused) {
                    Log.i("HCESDK:AVV:", "enrollCardToWallet: onSuccess");
                    JSObject data = new JSObject();
                    data.put("success", true);
                    call.resolve(data);
                }

                @Override
                public void onError(@NonNull AntelopError antelopError) {
                    DigitalWalletErrorHandler.reject(call, DigitalWalletErrorHandler.ErrorType.UNKNOWN_ERROR);
                }
            });
        } catch (WalletValidationException e) {
            call.reject(e.getMessage());
        }
    }

    @PluginMethod
    public void getDigitalCardId(PluginCall call) {
        String cardId = call.getString(WalletParams.CARD_ID.getRawValue());
        Optional<DigitalCard> digitalCard = this.findDigitalCardByCardId(cardId);
        JSObject data = new JSObject();
        Log.i("HCESDK:AVV:", "digitalCardId cardId: " + cardId);
        String digitalCardId = digitalCard.isPresent() ? digitalCard.get().getId() : null;
        data.put("digitalCardId", digitalCardId);
        Log.i("HCESDK:AVV:", "getDigitalCardId id: " + digitalCardId);
        call.resolve(data);
    }

    @PluginMethod
    public void getDigitalCards(PluginCall call) {
        JSObject data = new JSObject();
        if (this.wallet == null) {
            Log.i("HCESDK:AVV", "wallet not found");
            data.put("cards", "[]");
            call.resolve(data);
            return;
        }

        Map<String, DigitalCard> digitalCards = this.wallet.digitalCards(true);
        List<DigitalCardStructure> cardsResult = digitalCards.entrySet().stream()
            .map(entry -> DigitalCardManagement.mapStructure(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());

        Log.i("HCESDK:AVV", "getDigitalCards cardsResult: " + cardsResult);

        String dataEncodeUtf8 = this.encodeUtil(cardsResult, call);

        JSObject result = new JSObject();
        result.put("cards", dataEncodeUtf8);
        call.resolve(result);
    }

    @PluginMethod
    public void getStatusGooglePayService(PluginCall call) {
        try {
            Optional<DigitalCard> digitalCard = this.validateDigitalCard(call);
            digitalCard.get().getGooglePayService().getStatus(getContext(), new OperationCallback<DigitalCardServiceStatus>() {
                @Override
                public void onSuccess(DigitalCardServiceStatus digitalCardServiceStatus) {
                    Log.i("HCESDK:AVV:", "getStatusGooglePayService: " + digitalCardServiceStatus.name());
                    JSObject data = new JSObject();
                    data.put("status", digitalCardServiceStatus.name());
                    call.resolve(data);
                }

                @Override
                public void onError(@NonNull AntelopError antelopError) {
                    DigitalWalletErrorHandler.reject(call, DigitalWalletErrorHandler.ErrorType.CAN_PUSH_CARD_IN_GOOGLE_PAY_ERROR, antelopError.getMessage());
                }
            });
        } catch (WalletValidationException e) {
            call.reject(e.getMessage());
        }
    }

    @PluginMethod
    public void canPushCardInGooglePay(PluginCall call) {
        try {
            Optional<DigitalCard> digitalCard = this.validateDigitalCard(call);
            digitalCard.get().getGooglePayService().canPushCard(getContext(), new OperationCallback<Boolean>() {
                @Override
                public void onSuccess(Boolean aBoolean) {
                    Log.i("HCESDK:AVV:", "canPushCardInApplePay: " + aBoolean.toString());
                    JSObject data = new JSObject();
                    data.put("canPushCardInGooglePay", aBoolean);
                    call.resolve(data);
                }

                @Override
                public void onError(@NonNull AntelopError antelopError) {
                    DigitalWalletErrorHandler.reject(call, DigitalWalletErrorHandler.ErrorType.CAN_PUSH_CARD_IN_GOOGLE_PAY_ERROR, antelopError.getMessage());
                }
            });
        } catch (WalletValidationException e) {
            call.reject(e.getMessage());
        }
    }

    @PluginMethod
    public void pushCardToGooglePay(PluginCall call) {
        try {
            Optional<DigitalCard> digitalCard = this.validateDigitalCard(call);
            AndroidActivityResultCallback pushCardCallback = digitalCard.get().getGooglePayService().pushCard(getActivity(), new OperationCallback<Void>() {
                @Override
                public void onSuccess(Void unused) {
                    Log.i("HCESDK:AVV:", "pushCardToGooglePay: onSuccess");
                    JSObject data = new JSObject();
                    data.put("pushToGooglePay", true); // Pending Validation
                    call.resolve(data);
                }

                @Override
                public void onError(@NonNull AntelopError antelopError) {
                    DigitalWalletErrorHandler.reject(call, DigitalWalletErrorHandler.ErrorType.UNKNOWN_ERROR, antelopError.getMessage());
                }
            });

            DigitalEnrollCallback.setPushCardCallback(pushCardCallback);
        } catch (WalletValidationException e) {
            call.reject(e.getMessage());
        }
    }

    @PluginMethod
    public void disconnect(PluginCall call) {
        if (this.walletManager != null) {
            walletManager.disconnect();
        }

        if (this.walletProvisioning != null) {
            this.walletProvisioning.clean();
        }

        JSObject result = new JSObject();
        result.put("disconnect", true);

        call.resolve(result);
    }

    @Override
    public void emitEvent(String eventName, String callbackName, String message) {
        JSObject data = new JSObject();
        data.put(callbackName, message);
        this.notifyListeners(eventName, data, true);
    }

    @Override
    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    @Override
    public Wallet getWallet() {
        return this.wallet;
    }


    private Optional<DigitalCard> findDigitalCardByCardId(String cardId) {
        if (this.wallet == null) {
            return null;
        }
        Map<String, DigitalCard> digitalCards = this.wallet.digitalCards(true);
        String bin = cardId.substring(0, 6);
        String pan = cardId.substring(cardId.length() - 4);

        for (Map.Entry<String, DigitalCard> entry : digitalCards.entrySet()) {
            CardInfo cardInfo = entry.getValue().getCardInfo();

            if (cardInfo != null) {
                String binSDK = cardInfo.getBin();
                String panSDK = cardInfo.getLastDigits();

                if (panSDK != null && binSDK != null && panSDK.contains(pan) && binSDK.contains(bin)) {
                    Log.i("HCESDK:AVV", "findDigitalCardByCardId (entry): " + entry.getValue());
                    return Optional.of(entry.getValue());
                }
            }
        }

        Log.e("HCESDK:AVV", "error trying to find digital card");
        return Optional.ofNullable(null);
    }

    private Optional<DigitalCard> getDigitalCardById(String cardId) throws WalletValidationException {
        if (this.wallet == null) {
            return null;
        }
        return Optional.ofNullable(this.wallet.getDigitalCard(cardId));
    }

    private Optional<DigitalCard> validateDigitalCard(PluginCall call) throws WalletValidationException {
        String cardId = call.getString(WalletParams.CARD_ID.getRawValue());
        Optional<DigitalCard> digitalCard = this.getDigitalCardById(cardId);

        if (!digitalCard.isPresent()) {
            DigitalWalletErrorHandler.reject(call, DigitalWalletErrorHandler.ErrorType.NULL_DIGITAL_CARD);
            return Optional.ofNullable(null);
        }

        Log.i("HCESDK:AVV", String.format("validateDigitalCard (digitalCard): %s", digitalCard.get().getId()));
        return digitalCard;
    }

    private byte[] activationCodeToBytes(String s) {
        if (s.startsWith("0x")) {
            s = s.substring(2);
        }

        if (s.length() % 2 != 0) {
            throw new IllegalArgumentException("Hex string must have even length");
        }

        int len = s.length();
        byte[] data = new byte[len / 2];

        for (int i = 0; i < len; i += 2) {
            int hi = Character.digit(s.charAt(i), 16);
            int lo = Character.digit(s.charAt(i + 1), 16);

            if (hi == -1 || lo == -1) {
                throw new IllegalArgumentException("Invalid hex character at position " + i);
            }

            data[i / 2] = (byte) ((hi << 4) + lo);
        }

        return data;
    }

    private String encodeUtil(List<DigitalCardStructure> cards, PluginCall call) {
        try {
            return new Gson().toJson(cards);
        } catch (Exception e) {
            Log.e("HCESDK:AVV", "Encoding error: " + e.getMessage());
            return "[]";
        }
    }
}
