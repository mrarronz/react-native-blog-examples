//
//  OpenNativeModule.m
//  RNAddNative
//
//  Created by Arron Zhu on 2018/5/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "OpenNativeModule.h"
#import "AppDelegate.h"
#import "NativeViewController.h"

@implementation OpenNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(openNativeVC) {
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *delegate = (AppDelegate *)([UIApplication sharedApplication].delegate);
    UIViewController *rootVC = delegate.window.rootViewController;
    NativeViewController *nativeVC = [[NativeViewController alloc] init];
    UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:nativeVC];
    [rootVC presentViewController:nav animated:YES completion:nil];
  });
}

@end
