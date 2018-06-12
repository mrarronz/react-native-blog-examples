//
//  TestViewController.m
//  DataTransfer
//
//  Created by Arron Zhu on 2018/6/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "TestViewController.h"

@interface TestViewController ()

@end

@implementation TestViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];
  UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
  button.frame = CGRectMake(15, 100, [UIScreen mainScreen].bounds.size.width - 30, 50);
  button.backgroundColor = [UIColor brownColor];
  [button setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
  [button setTitle:@"点击button跳转回RN页面并传递参数" forState:UIControlStateNormal];
  [button addTarget:self action:@selector(buttonClicked:) forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:button];
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (void)buttonClicked:(id)sender {
  [[NSNotificationCenter defaultCenter] postNotificationName:@"sendCustomEventNotification" object:nil];
  [self dismissViewControllerAnimated:YES completion:nil];
}

@end
