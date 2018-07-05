//
//  DBHelper.h
//  SQLiteStorage
//
//  Created by Arron Zhu on 2018/7/5.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DBHelper : NSObject

+ (DBHelper *)sharedDBHelper;

- (void)saveStudent:(NSDictionary *)dict;
- (void)deleteStudentByName:(NSString *)studentName;
- (void)deleteAllStudent;
- (NSMutableArray *)getAllStudent;

@end
