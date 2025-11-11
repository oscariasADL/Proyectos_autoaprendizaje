package plugins;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.auth.api.phone.SmsRetriever;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CapacitorPlugin(
    requestCodes = {OtpAutocomplete.SMS_CONSENT_REQUEST}
)
public class OtpAutocomplete extends Plugin implements OTPReceiveListener {
    static final int SMS_CONSENT_REQUEST = 2;

    private final String listenerEventName = "otpReceivedEvent";
    private SmSBroadcastReceiver smsBroadcastReceiver;

    @PluginMethod()
    public void listenOtpOnAndroid(PluginCall call) {
        if (GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(bridge.getActivity()) != ConnectionResult.SUCCESS) {
            call.reject("Google API services not available");
            return;
        }
        if (smsBroadcastReceiver != null) {
            bridge.getActivity().unregisterReceiver(smsBroadcastReceiver);
        }
        String senderCode = call.getString("senderCode");
        SmsRetriever.getClient(this.bridge.getActivity())
            .startSmsUserConsent(senderCode)
            .addOnSuccessListener(command -> {
                JSObject ret = new JSObject();
                ret.put("success", true);
                IntentFilter i = new IntentFilter(SmsRetriever.SMS_RETRIEVED_ACTION);
                smsBroadcastReceiver = new SmSBroadcastReceiver(this);
                if (Build.VERSION.SDK_INT >= 34 && bridge.getActivity().getApplicationInfo().targetSdkVersion >= 34) {
                    bridge.getActivity().registerReceiver(smsBroadcastReceiver, i, Context.RECEIVER_EXPORTED);
                } else {
                    bridge.getActivity().registerReceiver(smsBroadcastReceiver, i, SmsRetriever.SEND_PERMISSION, null);
                }
                call.resolve(ret);
            })
            .addOnFailureListener(error -> {
                call.reject(error.getMessage());
            });
    }

    @Override
    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
        super.handleOnActivityResult(requestCode, resultCode, data);
        if (requestCode == SMS_CONSENT_REQUEST) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                String sms = data.getStringExtra(SmsRetriever.EXTRA_SMS_MESSAGE);
                String otp = fetchOTPFromSms(sms);
                if (!otp.isEmpty()) {
                    JSObject ret = new JSObject();
                    ret.put("success", true);
                    ret.put("otp", otp);
                    ret.put("msg", "");
                    notifyListeners(listenerEventName, ret);
                } else {
                    JSObject ret = new JSObject();
                    ret.put("success", false);
                    ret.put("msg", "error reading otp from sms");
                    ret.put("otp", "");
                    notifyListeners(listenerEventName, ret);
                }

            } else {
                JSObject ret = new JSObject();
                ret.put("success", false);
                ret.put("msg", "user does not accept read permission");
                ret.put("otp", "");
                notifyListeners(listenerEventName, ret);
            }
            if (smsBroadcastReceiver != null) {
                bridge.getActivity().unregisterReceiver(smsBroadcastReceiver);
                smsBroadcastReceiver = null;
            }

        }
    }

    @Override
    public void onSMSReceivedSuccess(Intent intent) {
        startActivityForResult(getSavedCall(), intent, SMS_CONSENT_REQUEST);
    }

    @Override
    public void onSMSTReceivedTmeOut() {
        JSObject ret = new JSObject();
        ret.put("success", false);
        ret.put("msg", "timeout, sms did not arrive before 5 minutes");
        ret.put("otp", "");
        notifyListeners(listenerEventName, ret);
    }

    @Override
    public void onSMSTReceivedError(String errorMsg) {
        JSObject ret = new JSObject();
        ret.put("success", false);
        ret.put("msg", errorMsg);
        ret.put("otp", "");
        notifyListeners(listenerEventName, ret);
    }

    private String fetchOTPFromSms(String sms) {
        Matcher m = Pattern.compile("(\\d{8})").matcher(sms);
        String EMPTY_STRING = "";
        if (m.find()) {
            return m.group();
        } else
            return EMPTY_STRING;
    }
}
