package com.sqlitestorage.database;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

public class DBManagerModule extends ReactContextBaseJavaModule {

    private ReactContext mReactContext;

    public DBManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DBManagerModule";
    }

    @ReactMethod
    public void saveStudent(String studentName, String schoolName, String className) {
        DBManager dbManager = new DBManager(mReactContext);
        if (!dbManager.isStudentExists(studentName)) {
            dbManager.saveStudent(studentName, schoolName, className);
        }
    }

    @ReactMethod
    public void saveStudentWithMap(ReadableMap map) {
        DBManager dbManager = new DBManager(mReactContext);
        String studentName = map.getString("studentName");
        if (!dbManager.isStudentExists(studentName)) {
            dbManager.saveStudentWithMap(map);
        }
    }

    @ReactMethod
    public void getAllStudent(Callback callback) {
        DBManager dbManager = new DBManager(mReactContext);
        WritableArray array = dbManager.getAllStudent();
        callback.invoke(array);
    }

    @ReactMethod
    public void deleteStudent(String studentName) {
        DBManager dbManager = new DBManager(mReactContext);
        dbManager.deleteStudentByName(studentName);
    }

    @ReactMethod
    public void deleteAllStudent() {
        DBManager dbManager = new DBManager(mReactContext);
        dbManager.deleteAllStudent();
    }
}
