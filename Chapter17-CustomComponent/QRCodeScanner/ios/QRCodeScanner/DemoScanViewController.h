//
//  DemoScanViewController.h
//  QRCodeScanner
//
//  Created by Arron Zhu on 2019/2/11.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "QRScannerViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface DemoScanViewController : QRScannerViewController

@property (nonatomic, copy) void(^completionBlock)(NSString *result);

@end

NS_ASSUME_NONNULL_END
