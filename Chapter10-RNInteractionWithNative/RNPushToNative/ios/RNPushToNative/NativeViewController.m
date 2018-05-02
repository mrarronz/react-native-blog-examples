//
//  NativeViewController.m
//  RNPushToNative
//
//  Created by Arron Zhu on 2018/5/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "NativeViewController.h"

@interface NativeViewController ()

@end

@implementation NativeViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.title = @"这是原生页面";
  self.view.backgroundColor = [UIColor whiteColor];
  self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"返回" style:UIBarButtonItemStylePlain target:self action:@selector(onClickBackButton)];
}

- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleDefault];
  [self.navigationController setNavigationBarHidden:NO animated:YES];
}

- (void)viewWillDisappear:(BOOL)animated {
  [super viewWillDisappear:animated];
  [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent];
  [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (void)onClickBackButton {
  [self.navigationController popViewControllerAnimated:YES];
}

@end
