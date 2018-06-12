package com.datatransfer;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class TestActivity extends Activity {

    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);

        button = (Button) findViewById(R.id.test_button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
                MainApplication.getTransferPackage().transferModule.sendEvent("CustomEventName");
            }
        });
    }


}
