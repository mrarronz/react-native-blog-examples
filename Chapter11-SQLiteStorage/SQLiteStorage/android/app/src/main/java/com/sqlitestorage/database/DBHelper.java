package com.sqlitestorage.database;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {

    private static final String DB_NAME = "StudentDB.db"; //数据库名称
    private static final int version = 1; //数据库版本
    public static final String STUDENT_TABLE = "Student";

    public DBHelper(Context context) {
        super(context, DB_NAME, null, version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String sql = "create table if not exists " + STUDENT_TABLE +
                " (studentName text primary key, schoolName text, className text)";
        db.execSQL(sql);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        String sql = "DROP TABLE IF EXISTS " + STUDENT_TABLE;
        db.execSQL(sql);
        onCreate(db);
    }
}
