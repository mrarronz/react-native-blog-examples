package com.sqlitestorage.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class DBManager {
    private static final String TAG = "StudentDB";
    private DBHelper dbHelper;

    private final String[] STUDENT_COLUMNS = new String[] {
            "studentName",
            "schoolName",
            "className",
    };

    public DBManager(Context context) {
        this.dbHelper = new DBHelper(context);
    }

    /**
     * 是否存在此条数据
     * @return bool
     */
    public boolean isStudentExists(String studentName) {
        boolean isExists = false;

        SQLiteDatabase db = null;
        Cursor cursor = null;
        try {
            db = dbHelper.getReadableDatabase();
            String sql = "select * from Student where studentName = ?";
            cursor = db.rawQuery(sql, new String[]{studentName});
            if (cursor.getCount() > 0) {
                isExists = true;
            }
        } catch (Exception e) {
            Log.e(TAG, "isStudentExists query error", e);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
            if (db != null) {
                db.close();
            }
        }
        return isExists;
    }

    /**
     * 保存数据
     */
    public void saveStudent(String studentName, String schoolName, String className) {
        SQLiteDatabase db = null;
        try {
            db = dbHelper.getWritableDatabase();

            ContentValues cv = new ContentValues();
            cv.put("studentName", studentName);
            cv.put("schoolName", schoolName);
            cv.put("className", className);

            db.insert(DBHelper.STUDENT_TABLE, null, cv);
        } catch (Exception e) {
            Log.e(TAG, "saveStudent error", e);
        } finally {
            if (db != null) {
                db.close();
            }
        }
    }

    /**
     * 传入参数为一个字典，使用ReadableMap
     * @param map
     */
    public void saveStudentWithMap(ReadableMap map) {
        SQLiteDatabase db = null;
        try {
            db = dbHelper.getWritableDatabase();

            ContentValues cv = new ContentValues();
            cv.put("studentName", map.getString("studentName"));
            cv.put("schoolName", map.getString("schoolName"));
            cv.put("className", map.getString("className"));

            db.insert(DBHelper.STUDENT_TABLE, null, cv);
        } catch (Exception e) {
            Log.e(TAG, "saveStudentWithMap error", e);
        } finally {
            if (db != null) {
                db.close();
            }
        }
    }

    public WritableArray getAllStudent() {
        SQLiteDatabase db = null;
        Cursor cursor = null;

        try {
            db = dbHelper.getReadableDatabase();
            cursor = db.query(DBHelper.STUDENT_TABLE, STUDENT_COLUMNS, null, null, null, null, null);
            if (cursor.getCount() > 0) {
                WritableArray studentList = Arguments.createArray();
                while (cursor.moveToNext()) {
                    WritableMap map = Arguments.createMap();
                    map.putString("studentName", cursor.getString(cursor.getColumnIndex("studentName")));
                    map.putString("schoolName", cursor.getString(cursor.getColumnIndex("schoolName")));
                    map.putString("className", cursor.getString(cursor.getColumnIndex("className")));
                    studentList.pushMap(map);
                }
                return studentList;
            }
        } catch (Exception e) {
            Log.e(TAG, "getAllStudent error", e);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
            if (db != null) {
                db.close();
            }
        }
        return null;
    }

    /**
     * 根据学生名字删除一条数据
     */
    public void deleteStudentByName(String studentName) {
        SQLiteDatabase db = null;
        try {
            db = dbHelper.getWritableDatabase();
            db.delete(DBHelper.STUDENT_TABLE, "studentName = ?", new String[]{studentName});

        } catch (Exception e) {
            Log.e(TAG, "deleteStudentByName error", e);
        } finally {
            if (db != null) {
                db.close();
            }
        }
    }

    /**
     * 删除所有数据
     */
    public void deleteAllStudent() {
        SQLiteDatabase db = null;
        try {
            db = dbHelper.getWritableDatabase();
            db.delete(DBHelper.STUDENT_TABLE, null, null);

        } catch (Exception e) {
            Log.e(TAG, "deleteAllStudent error", e);
        } finally {
            if (db != null) {
                db.close();
            }
        }
    }
}
