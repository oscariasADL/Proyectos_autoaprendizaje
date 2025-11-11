package plugins;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;
import com.google.android.gms.tasks.Task;

@CapacitorPlugin(
    requestCodes = StoreRating.REQUEST_CODE
)
public class StoreRating extends Plugin {
    public static final int REQUEST_CODE = 0x1656; // Unique request code

    private ReviewManager manager;
    private ReviewInfo reviewInfo;

    @PluginMethod
    public void requestReview(PluginCall call) {
        manager = ReviewManagerFactory.create(getContext());
        Task<ReviewInfo> managerInfoTask = manager.requestReviewFlow();

        managerInfoTask.addOnCompleteListener((task) -> {
            if (task.isSuccessful()) {
                reviewInfo = task.getResult();
                Task<Void> flow = manager.launchReviewFlow(this.bridge.getActivity(), reviewInfo);
                flow.addOnCompleteListener(_task -> {
                    call.resolve();
                });

            } else {
                call.reject("Review failed to start");
            }
        });
    }
}
