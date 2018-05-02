package com.rnaddnative;

import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
      public boolean isDebug() {
          return BuildConfig.DEBUG;
      }

      protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
                  new OpenNativePackage()
          );
      }

      @Override
      public List<ReactPackage> createAdditionalReactPackages() {
          return getPackages();
      }

      @Override
      public String getJSMainModuleName() {
          return "index";
      }


}
