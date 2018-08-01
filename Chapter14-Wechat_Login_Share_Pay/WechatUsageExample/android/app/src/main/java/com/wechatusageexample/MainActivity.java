package com.wechatusageexample;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    public static boolean isActivityCreated;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        isActivityCreated = true;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        isActivityCreated = false;
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WechatUsageExample";
    }
}
