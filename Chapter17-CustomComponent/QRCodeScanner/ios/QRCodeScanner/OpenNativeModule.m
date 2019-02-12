//
//  OpenNativeModule.m
//  QRCodeScanner
//
//  Created by Arron Zhu on 2019/2/11.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "OpenNativeModule.h"
#import "DemoScanViewController.h"
#import "AppDelegate.h"
#import "QRScannerHelper.h"

@implementation OpenNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(scanQRCode:(RCTResponseSenderBlock)callback) {
  dispatch_async(dispatch_get_main_queue(), ^{
    [QRScannerHelper beginScanningWithCompletion:^{
      AppDelegate *delegate = (AppDelegate *)([UIApplication sharedApplication].delegate);
      UINavigationController *rootNav = delegate.navController;
      DemoScanViewController *nativeVC = [[DemoScanViewController alloc] init];
      [rootNav pushViewController:nativeVC animated:YES];
      nativeVC.completionBlock = ^(NSString * _Nonnull result) {
        callback(@[result]);
      };
    }];
  });
}

@end
