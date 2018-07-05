//
//  DBHelper.m
//  SQLiteStorage
//
//  Created by Arron Zhu on 2018/7/5.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "DBHelper.h"
#import <FMDB/FMDatabase.h>

NSString *const STUDENT_TABLE = @"Student";

@interface DBHelper ()

@property (nonatomic, strong) FMDatabase *db;

@end

@implementation DBHelper

+ (DBHelper *)sharedDBHelper {
  static DBHelper *instance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    instance = [[self alloc] init];
  });
  return instance;
}

- (instancetype)init {
  self = [super init];
  if (self) {
    _db = [[FMDatabase alloc] initWithPath:[self getDBFilePath]];
    [self createTables];
  }
  return self;
}

- (NSString *)getDBFilePath {
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = [paths objectAtIndex:0];
  NSString *storePath = [documentsDirectory stringByAppendingPathComponent:@"StudentDB.db"];
  return storePath;
}

#pragma mark - Basic operations

- (void)dropTable:(NSString *)tableName {
  if ([_db open]) {
    NSString *sql = [NSString stringWithFormat:@"drop table if exists %@", tableName];
    BOOL result = [_db executeUpdate:sql];
    if (result) {
      NSLog(@"drop table %@ successfully.", tableName);
    }
    [_db close];
  }
}

- (void)createTableWithSQL:(NSString *)sql {
  if ([_db open]) {
    BOOL result = [_db executeUpdate:sql];
    if (result) {
      NSLog(@"create table successfully.");
    }
    [_db close];
  }
}

/// 删除表中所有数据
- (BOOL)deleteDataFromTable:(NSString *)tableName {
  if ([_db open]) {
    NSString *sql = [NSString stringWithFormat:@"delete from %@", tableName];
    BOOL result = [_db executeUpdate:sql];
    if (result) {
      [_db close];
      return YES;
    }
    [_db close];
  }
  return NO;
}

/// 根据键值删除一组数据
- (BOOL)deleteDataFromTable:(NSString *)tableName
                     forKey:(NSString *)keyName
                      value:(id)keyValue {
  if ([_db open]) {
    NSString *sql = [NSString stringWithFormat:@"delete from %@ where %@ = '%@'", tableName, keyName, keyValue];
    BOOL result = [_db executeUpdate:sql];
    if (result) {
      [_db close];
      return YES;
    }
    [_db close];
  }
  return NO;
}

/// 根据两个键值删除一组数据
- (BOOL)deleteDataFromTable:(NSString *)tableName
                     forKey:(NSString *)keyName
                      value:(id)keyValue
                    nextkey:(NSString *)nextKeyName
                  nextvalue:(id)nextKeyValue
{
  if ([_db open]) {
    NSString *sql = [NSString stringWithFormat:@"delete from %@ where %@ = '%@' and %@ = '%@'", tableName, keyName, keyValue, nextKeyName, nextKeyValue];
    BOOL result = [_db executeUpdate:sql];
    if (result) {
      [_db close];
      return YES;
    }
    [_db close];
  }
  return NO;
}

/// 判断数据库中表是否存在
- (BOOL)isExistTable:(NSString *)tableName {
  if ([_db open]) {
    NSString *sql = @"select count(*) as 'count' from sqlite_master where type ='table' and name = ?";
    FMResultSet *rs = [_db executeQuery:sql, tableName];
    while ([rs next]) {
      NSInteger count = [rs intForColumn:@"count"];
      if (count != 0) {
        [_db close];
        return YES;
      }
    }
    [_db close];
  }
  return NO;
}

/// 根据键值查找是否存在这组数据
- (BOOL)isExistModelWithKeyName:(NSString *)keyName keyValue:(id)keyValue tableName:(NSString *)tableName {
  if ([_db open]) {
    NSString *sql = [NSString stringWithFormat:@"select * from %@ where %@ = '%@'", tableName, keyName, keyValue];
    FMResultSet *rs = [_db executeQuery:sql];
    if (rs.next) {
      [_db close];
      return YES;
    }
    [_db close];
  }
  return NO;
}

/// 根据两对键值查找是否存在这组数据
- (BOOL)isExistModelWithKeyName:(NSString *)keyName
                       keyValue:(id)keyValue
                    nextkeyname:(NSString *)nextkeyname
                   nextkeyValue:(id)nextkeyValue
                      tableName:(NSString *)tableName {
  if ([_db open]) {
    NSString *sql = [NSString stringWithFormat:@"select * from %@ where %@ = '%@' and %@ = '%@'", tableName, keyName, keyValue, nextkeyname, nextkeyValue];
    
    
    FMResultSet *rs = [_db executeQuery:sql];
    if (rs.next) {
      [_db close];
      return YES;
    }
    [_db close];
  }
  return NO;
}

#pragma mark - Create tables

- (void)dropTables {
  [self dropTable:STUDENT_TABLE];
}

- (void)createTables {
  if ([_db open]) {
    
    NSMutableString *sql = [NSMutableString string];
    [sql appendString:@"create table if not exists Student ("];
    [sql appendString:@"studentName text primary key, "];
    [sql appendString:@"schoolName text, "];
    [sql appendString:@"className text);"];
    BOOL result = [_db executeUpdate:sql];
    if (result) {
      NSLog(@"create table Student successfully.");
    }
    [_db close];
  }
}

- (NSString *)filterEmpty:(NSString *)empty {
  if (empty == nil || [empty isKindOfClass:[NSNull class]]) {
    return @"";
  }
  return empty;
}

- (void)saveStudent:(NSDictionary *)dict {
  NSString *studentName = [dict objectForKey:@"studentName"];
  BOOL isExists = [self isExistModelWithKeyName:@"studentName" keyValue:studentName tableName:STUDENT_TABLE];
  if (isExists) {
    return;
  }
  NSString *schoolName = [self filterEmpty:[dict objectForKey:@"schoolName"]];
  NSString *className = [self filterEmpty:[dict objectForKey:@"className"]];
  if ([_db open]) {
    NSString *sql = [NSString stringWithFormat:@"insert into %@ (studentName, schoolName, className) values (?, ?, ?)", STUDENT_TABLE];
    BOOL result = [_db executeUpdate:sql
                withArgumentsInArray:@[studentName, schoolName, className]];
    if (result) {
      NSLog(@"Save data successfully.");
    }
    [_db close];
  }
}

- (void)deleteStudentByName:(NSString *)studentName {
  BOOL result = [self deleteDataFromTable:STUDENT_TABLE forKey:@"studentName" value:studentName];
  if (result) {
    NSLog(@"Delete data successfully.");
  }
}

- (NSMutableArray *)getAllStudent {
  NSMutableArray *studentList = [NSMutableArray array];
  if ([_db open]) {
    NSString *sql = [NSString stringWithFormat:@"select * from %@", STUDENT_TABLE];
    FMResultSet *rs = [_db executeQuery:sql];
    while (rs.next) {
      NSMutableDictionary *dict = [NSMutableDictionary dictionary];
      dict[@"studentName"] = [rs stringForColumn:@"studentName"];
      dict[@"schoolName"] = [rs stringForColumn:@"schoolName"];
      dict[@"className"] = [rs stringForColumn:@"className"];
      [studentList addObject:dict];
    }
    [_db close];
    return studentList;
  }
  return nil;
}

- (void)deleteAllStudent {
  [self deleteDataFromTable:STUDENT_TABLE];
}

@end
