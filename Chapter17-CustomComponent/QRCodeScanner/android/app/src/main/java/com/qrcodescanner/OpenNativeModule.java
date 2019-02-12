package com.qrcodescanner;

import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yanzhenjie.permission.Action;
import com.yanzhenjie.permission.AndPermission;
import com.yanzhenjie.permission.Permission;
import com.yzq.zxinglibrary.android.CaptureActivity;
import com.yzq.zxinglibrary.bean.ZxingConfig;
import com.yzq.zxinglibrary.common.Constant;

import java.util.List;

public class OpenNativeModule extends ReactContextBaseJavaModule {

    private ReactContext mReactContext;
    private int REQUEST_CODE_SCAN = 111;

    public OpenNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "OpenNativeModule";
    }

    @ReactMethod
    public void scanQRCode(final Callback callback) {
        AndPermission
                .with(this.mReactContext)
                .runtime()
                .permission(Permission.CAMERA, Permission.READ_EXTERNAL_STORAGE)
                .onGranted(new Action<List<String>>() {
                    @Override
                    public void onAction(List<String> data) {
                        Activity currentActivity = getCurrentActivity();
                        if ( null != currentActivity) {
                            try {
                                Intent intent = new Intent();
                                intent.setClass(currentActivity, CaptureActivity.class);
                                // 配置扫码UI
                                ZxingConfig config = new ZxingConfig();
                                config.setDecodeBarCode(false); // 不扫描条形码
                                config.setReactColor(R.color.angleColor); // 四个角的颜色
                                config.setFrameLineColor(R.color.borderColor); // 扫描框边框颜色
                                config.setScanLineColor(R.color.angleColor); // 扫描线的颜色
                                config.setFullScreenScan(false); // 设置是否全屏扫描
                                config.setShowbottomLayout(false); // 不显示下方功能布局
                                intent.putExtra(Constant.INTENT_ZXING_CONFIG, config);
                                currentActivity.startActivityForResult(intent, REQUEST_CODE_SCAN, null);
                                callback.invoke(MainActivity.mQueue.take());
                            } catch (Exception e) {
                                e.printStackTrace();
                                callback.invoke("");
                            }
                        } else {
                            callback.invoke("");
                        }
                    }
                })
                .onDenied(new Action<List<String>>() {
                    @Override
                    public void onAction(List<String> data) {
                        Toast.makeText(mReactContext, "没有权限无法扫描呦", Toast.LENGTH_LONG).show();
                    }
                }).start();
    }


}
