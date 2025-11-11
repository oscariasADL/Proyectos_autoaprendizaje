package services;


import android.util.Log;

import androidx.annotation.NonNull;

import com.google.firebase.messaging.RemoteMessage;
import com.capacitorjs.plugins.pushnotifications.MessagingService;
import fr.antelop.sdk.firebase.AntelopFirebaseMessagingUtil;

public class FirebaseMessagingServiceExtended extends MessagingService {

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        Log.i("RECEIVED_PUSS", remoteMessage.toString());
        if (AntelopFirebaseMessagingUtil.onMessageReceived(getBaseContext(), remoteMessage)) {
            //Message caught by Entrust SDK, nothing to do
            return;
        }
        super.onMessageReceived(remoteMessage);
    }

    @Override
    public void onNewToken(@NonNull String s) {
        Log.i("FIREBASE_TOKEN", s);
        super.onNewToken(s);
        AntelopFirebaseMessagingUtil.onTokenRefresh(getBaseContext());
    }
}
