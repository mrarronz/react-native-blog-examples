//
//  DemoScanViewController.m
//  QRCodeScanner
//
//  Created by Arron Zhu on 2019/2/11.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "DemoScanViewController.h"

@interface DemoScanViewController ()

@end

@implementation DemoScanViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.navigationItem.title = @"扫一扫";
  self.edgesForExtendedLayout = UIRectEdgeNone;
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  [self.navigationController setNavigationBarHidden:NO animated:YES];
}

- (void)viewWillDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (QRScannerStyle *)customStyle {
  QRScannerStyle *style = [[QRScannerStyle alloc] init];
  style.isNeedShowRectangle = YES;
  style.angleColor = [UIColor colorWithRed:0 green:0.6 blue:0.9 alpha:1.0];
  style.noneRecognizeColor = [[UIColor blackColor] colorWithAlphaComponent:0.6];
  style.rectangleBorderColor = [UIColor whiteColor];
  return style;
}

- (void)handleScanResult {
  NSLog(@"扫描结果：%@", self.scanResult);
}

@end
