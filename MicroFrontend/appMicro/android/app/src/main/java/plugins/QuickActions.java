package plugins;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.drawable.Icon;
import android.os.Build;
import android.os.Bundle;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import co.com.adl.mb.test.avvillas.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import co.com.adl.mb.avvillas.MainActivity;

@CapacitorPlugin(
    requestCodes = QuickActions.REQUEST_CODE
)
public class QuickActions extends Plugin {
    public static final int REQUEST_CODE = 0x1687; // Unique request code

    private boolean isLoaded = false;
    private String currentType = null;

    @PluginMethod
    public void configureQuickActions(PluginCall call) {

        JSArray actions = call.getArray("actions");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
            try {
                ShortcutManager shortcutManager = (ShortcutManager) getContext().getSystemService(Context.SHORTCUT_SERVICE);

                shortcutManager.removeAllDynamicShortcuts();

                List<ShortcutInfo> shortcuts = new ArrayList<>();
                List<JSONObject> actionsList = actions.toList();

                for (JSONObject action : actionsList) {

                    String type = action.getString("type");
                    String title = action.getString("title");

                    Intent intent = new Intent(getContext(), MainActivity.class)
                        .putExtra(Intent.EXTRA_TEXT, type)
                        .setAction(Intent.ACTION_VIEW);

                    ShortcutInfo shortcut = new ShortcutInfo.Builder(getContext(), type)
                        .setShortLabel(title)
                        .setLongLabel(title)
                        .setIcon(Icon.createWithResource(getContext(), this.getIc(type)))
                        .setIntent(intent)
                        .build();

                    shortcuts.add(shortcut);
                }

                shortcutManager.addDynamicShortcuts(shortcuts);
                setLoadedAndVerify();

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        call.resolve();

    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        Bundle extras = intent.getExtras();

        if (extras != null) {
            String type = extras.getString(Intent.EXTRA_TEXT);
            if (isLoaded) {
                handleSignal(type);
            } else {
                currentType = type;
            }
        }

    }

    private void setLoadedAndVerify() {
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                isLoaded = true;
                if (currentType != null) {
                    handleSignal(currentType);
                }
            }
        }, 100);
    }

    private void handleSignal(String type) {
        JSObject response = new JSObject();
        response.put("type", type);
        notifyListeners("quickActionPressed", response);
    }

    private int getIc(String type) {
        switch (type) {
            case "careChannels":
                return R.drawable.ic_callcenter;
            case "requestProducts":
                return R.drawable.ic_request_products;
            case "qr":
                return R.drawable.ic_qr;
            default:
                return R.drawable.ic_default;
        }
    }
}
