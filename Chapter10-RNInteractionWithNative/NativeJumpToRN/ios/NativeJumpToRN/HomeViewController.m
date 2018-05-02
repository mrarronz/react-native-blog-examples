//
//  HomeViewController.m
//  NativeJumpToRN
//
//  Created by Arron Zhu on 2018/5/2.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "HomeViewController.h"
#import "RNViewController.h"

@interface HomeViewController ()

@end

@implementation HomeViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  self.title = @"这是iOS原生页面";
  self.view.backgroundColor = [UIColor brownColor];
  
  UIButton *button = [[UIButton alloc] initWithFrame:CGRectMake(100, 100, 200, 50)];
  [button setTitle:@"点击跳转到RN页面" forState:UIControlStateNormal];
  [button addTarget:self action:@selector(onClickButton) forControlEvents:UIControlEventTouchUpInside];
  
  [self.view addSubview:button];
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (void)onClickButton {
  RNViewController *vc = [[RNViewController alloc] init];
  [self.navigationController pushViewController:vc animated:YES];
}

@end
