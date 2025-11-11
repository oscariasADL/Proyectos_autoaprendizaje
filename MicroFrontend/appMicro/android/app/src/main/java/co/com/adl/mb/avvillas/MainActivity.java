package co.com.adl.mb.avvillas;

import java.util.ArrayList;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.os.Bundle;
import android.graphics.Color;
import android.os.Build;
import android.view.View;
import android.view.WindowInsetsController;

import androidx.core.splashscreen.SplashScreen;
import androidx.core.view.WindowCompat;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.avaldigitallabs.onespan.binding.OnespanBinding;
import com.avaldigitallabs.onespan.digipass.OneSpanDigipass;
import com.avaldigitallabs.onespan.securestorage.OneSpanSecureStorage;
import com.avaldigitallabs.onespan.securemessaging.OneSpanSecureMessaging;
import com.avaldigitallabs.lifecycle.events.LifecycleEvents;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;
import com.getcapacitor.Plugin;

import plugins.Contacts;
import plugins.DigitalWallet.DigitalEnrollCallback;
import plugins.DigitalWallet.DigitalWalletPlugin;
import plugins.OtpAutocomplete;
import plugins.QuickActions;
import plugins.StoreRating;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Initializes the Bridge
        registerPlugins(new ArrayList<Class<? extends Plugin>>() {{
            // Additional plugins you've installed go here
            // Ex: add(TotallyAwesomePlugin.class);
            add(OnespanBinding.class);
            add(OneSpanDigipass.class);
            add(OneSpanSecureStorage.class);
            add(OneSpanSecureMessaging.class);
            add(LifecycleEvents.class);
            add(Contacts.class);
            add(StoreRating.class);
            add(QuickActions.class);
            add(OtpAutocomplete.class);
            add(DigitalWalletPlugin.class);
        }});

        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);
        
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) { 
            getWindow().setStatusBarColor(Color.TRANSPARENT);
            getWindow().setNavigationBarColor(Color.TRANSPARENT);
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                WindowInsetsController controller = getWindow().getInsetsController();
                if (controller != null) {
                    controller.setSystemBarsAppearance(
                        WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS | 
                        WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS,
                        WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS | 
                        WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS
                    );
                }
            } else {
                getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                    View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                    View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                    View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | 
                    View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
                );
            }
        }
        
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(android.R.id.content), (view, insets) -> {
            return ViewCompat.onApplyWindowInsets(view, insets);
        });
        
        this.getBridge().getWebView().getSettings().setTextZoom(100);
        this.getBridge().getWebView().setWebChromeClient(new BridgeWebChromeClient(bridge) {
            @Override
            public Bitmap getDefaultVideoPoster() {
                final Bitmap bitmap = Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_4444);
                Canvas canvas = new Canvas(bitmap);
                canvas.drawARGB(0, 0, 0, 0);
                return bitmap;
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == DigitalWalletPlugin.PUSH_CARD_REQUEST_CODE) {
            DigitalEnrollCallback.runPushCardResult(requestCode, resultCode, data);
        }
    }
}