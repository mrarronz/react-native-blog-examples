import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class SelectDefinitionView extends React.Component {
  
  static defaultProps = {
    selectedIndex: -1
  };
  
  static propTypes = {
    onItemSelected: PropTypes.func,
    onCloseWindow: PropTypes.func
  };
  
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex
    }
  }
  
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, this.props.style]}
        onPress={this._onTapBackground}
      >
        <View style={styles.optionView}>
          {
            optionItems.map((item, index) => {
              let isSelected = (this.state.selectedIndex === index);
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  style={[styles.optionItem, isSelected ? styles.optionItem_active : null]}
                  onPress={() => { this.onTapItemAtIndex(index); }}
                >
                  <Text style={[styles.optionText, isSelected ? styles.optionText_active: null]}>{item}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </TouchableOpacity>
    )
  }
  
  _onTapBackground = () => {
    this.props.onCloseWindow && this.props.onCloseWindow();
  };
  
  onTapItemAtIndex(index) {
    if (this.state.selectedIndex !== index) {
      this.setState({
        selectedIndex: index
      })
    }
    this.props.onItemSelected && this.props.onItemSelected(index);
  }
}

const optionItems = ['蓝光1080P', '超清720P', '高清480P', '标清270P'];

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems:'center',
    justifyContent:'center'
  },
  optionView: {
    alignItems:'center',
    justifyContent:'space-between',
  },
  optionItem: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:10,
    paddingRight: 10,
  },
  optionItem_active: {
    borderWidth: 1,
    borderColor: '#ff5500',
    borderRadius: 20,
    backgroundColor: '#222'
  },
  optionText: {
    fontSize: 15,
    color: 'white'
  },
  optionText_active: {
    color: '#ff5500'
  }
});