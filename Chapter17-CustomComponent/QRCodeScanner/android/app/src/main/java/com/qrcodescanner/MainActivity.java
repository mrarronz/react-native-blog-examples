package com.qrcodescanner;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.yzq.zxinglibrary.common.Constant;

import java.util.concurrent.ArrayBlockingQueue;

public class MainActivity extends ReactActivity {

    private int REQUEST_CODE_SCAN = 111;
    public static ArrayBlockingQueue<String> mQueue = new ArrayBlockingQueue<String>(1);
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "QRCodeScanner";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // 扫描二维码/条码回传
        if (requestCode == REQUEST_CODE_SCAN && resultCode == RESULT_OK) {

            if (data != null) {
                String content = data.getStringExtra(Constant.CODED_CONTENT);
                Log.i("scan result", data.getStringExtra(Constant.CODED_CONTENT));
                mQueue.add(content);
            } else {
                mQueue.add("");
            }
        }
    }
}
