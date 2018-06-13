//
//  DataTransferModule.m
//  DataTransfer
//
//  Created by Arron Zhu on 2018/6/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "DataTransferModule.h"
#import "TestViewController.h"
#import "AppDelegate.h"

NSString *const kCustomEventName = @"CustomEventName";

@implementation DataTransferModule

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(struct _NSZone *)zone {
  static DataTransferModule *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    NSNotificationCenter *defaultCenter = [NSNotificationCenter defaultCenter];
    [defaultCenter removeObserver:self];
    [defaultCenter addObserver:self
                      selector:@selector(sendCustomEvent:)
                          name:@"sendCustomEventNotification"
                        object:nil];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

/// RN向原生传递字符串
RCT_EXPORT_METHOD(getStringFromReactNative:(NSString *)s) {
  NSString *msg = [NSString stringWithFormat:@"RN传递过来的字符串：%@", s];
  [self showAlert:msg];
}

/// RN向原生端传递整数
RCT_EXPORT_METHOD(getIntFromReactNative:(NSInteger)i) {
  NSString *msg = [NSString stringWithFormat:@"RN传递过来的整数：%zd", i];
  [self showAlert:msg];
}

/// RN向原生传递字典
RCT_EXPORT_METHOD(getDictionaryFromRN:(NSDictionary *)dict) {
  NSLog(@"RN传递过来的字典：%@", dict);
  NSString *name = [dict objectForKey:@"title"];
  [self showAlert:name];
}

/// RN向原生传递数组
RCT_EXPORT_METHOD(getArrayFromRN:(NSArray *)array) {
  NSLog(@"RN传递过来的数组：%@", array);
  NSString *joinString = [array componentsJoinedByString:@", "];
  [self showAlert:joinString];
}

/// 回传字符串到RN端
RCT_EXPORT_METHOD(passStringBackToRN:(RCTResponseSenderBlock)block) {
  if (block) {
    block(@[@"This is a string from Native"]);
  }
}

/// 回传字典到RN端
RCT_EXPORT_METHOD(passDictionaryBackToRN:(RCTResponseSenderBlock)block) {
  if (block) {
    NSDictionary *dict = @{
                           @"name": @"小明",
                           @"age" : @(20),
                           @"gender" : @"male",
                           @"isGraduated": @(YES)
                           };
    block(@[dict]);
  }
}

/// 回传数组到RN端
RCT_EXPORT_METHOD(passArrayBackToRN:(RCTResponseSenderBlock)block) {
  if (block) {
    NSArray *items = @[@"React Native", @"Android", @"iOS"];
    block(@[items]);
  }
}

/// 以promise形式回传数据到RN端
RCT_EXPORT_METHOD(passPromiseBackToRN:(NSString *)msg resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  if (![msg isEqualToString:@""]) {
    resolve(@(YES));
  } else {
    reject(@"warning", @"msg cannot be empty!", nil);
  }
}

/// 跳转界面，在主线程进行UI操作
RCT_EXPORT_METHOD(jumpToNativeView) {
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *delegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    TestViewController *testVC = [[TestViewController alloc] init];
    [delegate.window.rootViewController presentViewController:testVC animated:YES completion:nil];
  });
}

/// 接收通知的方法，接收到通知后发送事件到RN端。RN端接收到事件后可以进行相应的逻辑处理或界面跳转
- (void)sendCustomEvent:(NSNotification *)notification {
  [self sendEventWithName:kCustomEventName body:@"这是发给RN的字符串"];
}

/// 重写方法，定义支持的事件集合
- (NSArray<NSString *> *)supportedEvents {
  return @[kCustomEventName];
}

/// 重写方法，定义常量
- (NSDictionary *)constantsToExport {
  return @{@"CustomConstant": @"我是iOS端定义的常量"};
}

- (void)showAlert:(NSString *)msg {
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"显示结果"
                                                    message:msg
                                                   delegate:nil
                                          cancelButtonTitle:nil
                                          otherButtonTitles:@"确定", nil];
    [alert show];
  });
}

@end
