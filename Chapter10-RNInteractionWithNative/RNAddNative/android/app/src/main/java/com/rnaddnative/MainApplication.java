package com.rnaddnative;
import android.support.annotation.Nullable;

import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactPackage;

import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
      public boolean isDebug() {
          return BuildConfig.DEBUG;
      }

      @Nullable
      @Override
      public List<ReactPackage> createAdditionalReactPackages() {
          return null;
      }

      @Nullable
      @Override
      public String getJSMainModuleName() {
          return "index";
      }
}
