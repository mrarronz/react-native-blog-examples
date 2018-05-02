package com.rnpushtonative;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by arronzhu on 2018/5/2.
 */

public class OpenNativeModule extends ReactContextBaseJavaModule {

    private ReactContext mReactContext;

    public OpenNativeModule(ReactApplicationContext context) {
        super(context);
        this.mReactContext = context;
    }

    @Override
    public String getName() {
        return "OpenNativeModule";
    }

    @ReactMethod
    public void openNativeVC() {
        Intent intent = new Intent();
        intent.setClass(mReactContext, SettingsActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mReactContext.startActivity(intent);
    }
}
