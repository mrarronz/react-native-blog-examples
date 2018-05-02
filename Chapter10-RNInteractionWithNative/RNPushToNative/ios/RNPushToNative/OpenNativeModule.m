//
//  OpenNativeModule.m
//  RNPushToNative
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
    UINavigationController *rootNav = delegate.navController;
    NativeViewController *nativeVC = [[NativeViewController alloc] init];
    [rootNav pushViewController:nativeVC animated:YES];
  });
}

@end
