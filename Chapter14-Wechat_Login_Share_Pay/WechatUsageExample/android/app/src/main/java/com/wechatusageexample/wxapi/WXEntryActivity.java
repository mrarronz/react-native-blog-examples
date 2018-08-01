package com.wechatusageexample.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.theweflex.react.WeChatModule;
import com.wechatusageexample.MainActivity;

public class WXEntryActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (MainActivity.isActivityCreated) {
            WeChatModule.handleIntent(this.getIntent());
        } else {
            // 如果应用未在后台启动，就打开应用
            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(intent);
        }

        finish();
    }
}
