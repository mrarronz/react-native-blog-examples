//
//  DBManagerModule.m
//  SQLiteStorage
//
//  Created by Arron Zhu on 2018/7/5.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "DBManagerModule.h"
#import "DBHelper.h"

@implementation DBManagerModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(saveStudent:(NSDictionary *)dict) {
  [[DBHelper sharedDBHelper] saveStudent:dict];
}

RCT_EXPORT_METHOD(deleteStudent:(NSString *)studentName) {
  [[DBHelper sharedDBHelper] deleteStudentByName:studentName];
}

RCT_EXPORT_METHOD(getAllStudent:(RCTResponseSenderBlock)callback) {
  NSArray *students = [[DBHelper sharedDBHelper] getAllStudent];
  callback(@[students]);
}

RCT_EXPORT_METHOD(deleteAllStudent) {
  [[DBHelper sharedDBHelper] deleteAllStudent];
}

@end
