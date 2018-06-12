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

RCT_EXPORT_METHOD(getStringFromReactNative:(NSString *)s) {
  NSString *msg = [NSString stringWithFormat:@"RN传递过来的字符串：%@", s];
  [self showAlert:msg];
}

RCT_EXPORT_METHOD(getIntFromReactNative:(NSInteger)i) {
  NSString *msg = [NSString stringWithFormat:@"RN传递过来的整数：%zd", i];
  [self showAlert:msg];
}

RCT_EXPORT_METHOD(getDictionaryFromRN:(NSDictionary *)dict) {
  NSLog(@"RN传递过来的字典：%@", dict);
  NSString *name = [dict objectForKey:@"title"];
  [self showAlert:name];
}

RCT_EXPORT_METHOD(getArrayFromRN:(NSArray *)array) {
  NSLog(@"RN传递过来的数组：%@", array);
  NSString *joinString = [array componentsJoinedByString:@", "];
  [self showAlert:joinString];
}

RCT_EXPORT_METHOD(passStringBackToRN:(RCTResponseSenderBlock)block) {
  if (block) {
    block(@[@"This is a string from Native"]);
  }
}

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

RCT_EXPORT_METHOD(passArrayBackToRN:(RCTResponseSenderBlock)block) {
  if (block) {
    NSArray *items = @[@"React Native", @"Android", @"iOS"];
    block(@[items]);
  }
}

RCT_EXPORT_METHOD(passPromiseBackToRN:(NSString *)msg resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  if (![msg isEqualToString:@""]) {
    resolve(@(YES));
  } else {
    reject(@"warning", @"msg cannot be empty!", nil);
  }
}

RCT_EXPORT_METHOD(jumpToNativeView) {
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *delegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    TestViewController *testVC = [[TestViewController alloc] init];
    [delegate.window.rootViewController presentViewController:testVC animated:YES completion:nil];
  });
}

- (void)sendCustomEvent:(NSNotification *)notification {
  [self sendEventWithName:kCustomEventName body:@"这是发给RN的字符串"];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[kCustomEventName];
}

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
