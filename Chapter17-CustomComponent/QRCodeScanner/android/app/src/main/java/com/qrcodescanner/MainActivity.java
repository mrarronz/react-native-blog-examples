package com.qrcodescanner;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.yzq.zxinglibrary.common.Constant;

public class MainActivity extends ReactActivity {

    private int REQUEST_CODE_SCAN = 111;
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
            Log.i("scan result", data.getStringExtra(Constant.CODED_CONTENT));
            if (data != null) {

                String content = data.getStringExtra(Constant.CODED_CONTENT);
                Toast.makeText(this, "扫描结果为："+content, Toast.LENGTH_LONG).show();
            }
        }
    }
}
