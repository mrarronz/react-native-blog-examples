package com.datatransfer;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class DataTransferModule extends ReactContextBaseJavaModule {

    private ReactContext mContext;

    public DataTransferModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "DataTransferModule";
    }

    /**
     * RN获取原生端定义的常量
     * @return
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> params = new HashMap<>();
        params.put("CustomConstant", "我是Android端定义的常量");
        params.put("ToastLONG", Toast.LENGTH_LONG);
        params.put("ToastSHORT", Toast.LENGTH_SHORT);
        return params;
    }

    /**
     * RN向原生传递字符串
     * @param s
     */
    @ReactMethod
    public void getStringFromReactNative(String s) {
        Toast.makeText(mContext, s, Toast.LENGTH_SHORT).show();
    }

    /**
     * RN向原生传递Int
     * @param i
     */
    @ReactMethod
    public void getIntFromReactNative(Integer i) {
        Toast.makeText(mContext, "" + i, Toast.LENGTH_SHORT).show();
    }

    /**
     * RN向原生传递字典。这里原生端接收RN传过来的字典类型是ReadableMap
     * @param map
     */
    @ReactMethod
    public void getDictionaryFromRN(ReadableMap map) {
        System.out.print(map);
        Toast.makeText(mContext, "已收到字典数据", Toast.LENGTH_SHORT).show();
    }

    /**
     * RN向原生传递数组
     * @param array
     */
    @ReactMethod
    public void getArrayFromRN(ReadableArray array) {
        System.out.print(array);
        Toast.makeText(mContext, "已收到数组数据", Toast.LENGTH_SHORT).show();
    }

    /**
     * 原生通过回调的形式向RN端传递string
     * @param callback
     */
    @ReactMethod
    public void passStringBackToRN(Callback callback) {
        callback.invoke("This is a string from Native");
    }

    /**
     * 原生通过回调的形式向RN端传递字典。这里传出去的字典类型必须是WritableMap，java中的Map、HashMap是不能传递到RN的
     * @param callback
     */
    @ReactMethod
    public void passDictionaryBackToRN(Callback callback) {
        WritableMap map = Arguments.createMap();
        map.putString("name", "小明");
        map.putInt("age", 20);
        map.putString("gender", "male");
        map.putBoolean("isGraduated", true);
        callback.invoke(map);
    }

    @ReactMethod
    public void passArrayBackToRN(Callback callback) {
        WritableArray array = Arguments.createArray();
        array.pushString("React Native");
        array.pushString("Android");
        array.pushString("iOS");
        callback.invoke(array);
    }

    @ReactMethod
    public void passPromiseBackToRN(String msg, Promise promise) {
        if (!msg.equals("")) {
            promise.resolve(true);
        } else {
            promise.reject("warning", "msg cannot be empty!");
        }
    }

    @ReactMethod
    public void jumpToNativeView() {
        Intent intent = new Intent();
        intent.setClass(mContext, TestActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(intent);
    }

    public void sendEvent(String eventName) {
        String dataToRN = "这是发给RN的字符串";
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, dataToRN);
    }

}
