import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ListView,
  DeviceEventEmitter,
  NativeModules
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

const DBManagerModule = NativeModules.DBManagerModule;

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      studentList: []
    };
  }
  
  componentWillMount() {
    this.listener = DeviceEventEmitter.addListener('AddButtonPressed', () => {
      this.props.navigator.push({
        screen: 'AddItem',
        title: 'Add Student'
      });
    });
    this.refreshData();
    this.dbListener = DeviceEventEmitter.addListener('DataChangedEvent', () => {
      this.refreshData();
    });
  }
  
  refreshData() {
    DBManagerModule.getAllStudent((result) => {
      let students = [];
      if (result != null) {
        students = result;
        this.setState({
          studentList: students
        })
      }
    });
  }
  
  componentWillUnmount() {
    this.listener && this.listener.remove();
    this.dbListener && this.dbListener.remove();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          enableEmptySections
          dataSource={this.ds.cloneWithRows(this.state.studentList)}
          renderRow={ (data) => (
            <TouchableOpacity
              activeOpacity={1.0}
              onPress={() => {
                console.log('clicked....')
              }}
              style={styles.rowFront}
            >
              <Text style={styles.itemText}>I am {data.studentName}</Text>
              <Text style={styles.itemText}>I am from {data.schoolName}</Text>
              <Text style={styles.itemText}>I am in {data.className}</Text>
            </TouchableOpacity>
          )}
          renderHiddenRow={ (data, secId, rowId, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ () => this.closeRow(rowMap, `${secId}${rowId}`) }>
                <Text style={styles.backTextWhite}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ () => this.deleteRow(data, rowMap, `${secId}${rowId}`) }>
                <Text style={styles.backTextWhite}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-150}
        />
      </View>
    )
  }
  
  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }
  
  deleteRow(data, rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    DBManagerModule.deleteStudent(data.studentName);
    let index = -1;
    let tempList = this.state.studentList;
    for (let i = 0; i < tempList.length; i++) {
      let obj = tempList[i];
      if (obj.studentName === data.studentName) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      tempList.splice(index, 1);
      this.setState({
        studentList: tempList
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eeeeee'
  },
  rowFront: {
    backgroundColor: 'white',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemText: {
    marginTop: 5,
    marginBottom: 5
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: '#00c06d',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  },
  backTextWhite: {
    fontSize: 17,
    fontWeight:'bold',
    color:'white'
  },
});