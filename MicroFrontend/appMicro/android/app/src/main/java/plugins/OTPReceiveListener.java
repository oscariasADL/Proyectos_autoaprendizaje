package plugins;

import android.content.Intent;

public interface OTPReceiveListener {
    void onSMSReceivedSuccess(Intent intent);
    void onSMSTReceivedTmeOut();
    void onSMSTReceivedError(String errorMsg);
}
