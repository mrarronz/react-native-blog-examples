import React, {Component} from 'react';
import {View, SectionList, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {queryMovies, comingMovies} from '../common/Service';
import MovieItemCell from "../widgets/MovieItemCell";

export default class MovieListScreen extends Component {
  
  static navigationOptions = {
    headerTitle: '豆瓣电影'
  };
  
  constructor(props) {
    super(props);
    this.state = {
      displayingMovies: [],  // 正在上映的电影数据
      incomingMovies: [],    // 即将上映的电影数据
      sectionData: [],      // SectionList数据源
      loaded: false,  // 用来控制loading视图的显示，当数据加载完成，loading视图不再显示
    };
  }
  
  componentDidMount() {
    this.loadDisplayingMovies();
  }
  
  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator animating={true} size="small"/>
          <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
        </View>
      )
    }
    return (
      <SectionList
        keyExtractor={this._keyExtractor}
        renderSectionHeader={this._renderSectionHeader}
        renderItem={this._renderItem}
        sections={this.state.sectionData}
      />
    )
  }
  
  _keyExtractor = (item) => item.id;
  
  _renderSectionHeader = (item) => {
    let sectionObj = item.section;
    let sectionIndex = sectionObj.index;
    let title = (sectionIndex === 0) ? "正在上映" : "即将上映";
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    )
  };
  
  _renderItem = (item) => {
    return (
      <MovieItemCell movie={item.item} onPress={() => {
        console.log('点击了电影----' + item.item.title);
      }}/>
    )
  };
  
  /**
   * 先加载正在上映的电影列表，如果加载成功，接着获取即将上映的电影数据
   */
  loadDisplayingMovies() {
    let that = this;
    fetch(queryMovies('北京', 0, 20)).then((response) => response.json()).then((json) => {
      console.log(json);
      let movies = [];
      for (let idx in json.subjects) {
        let movieItem = json.subjects[idx];
        let directors = ""; // 导演
        for (let index in movieItem.directors) {
          // 得到每一条电影的数据
          let director = movieItem.directors[index];
          // 将多个导演的名字用空格分隔开显示
          if (directors === "") {
            directors = directors + director.name
          } else {
            directors = directors + " " + director.name
          }
        }
        movieItem["directorNames"] = directors;
        
        // 拼装主演的演员名字，多个名字用空格分隔显示
        let actors = "";
        for (let index in movieItem.casts) {
          let actor = movieItem.casts[index];
          if (actors === "") {
            actors = actors + actor.name
          } else {
            actors = actors + " " + actor.name
          }
        }
        movieItem["actorNames"] = actors;
        movies.push(movieItem)
      }
      that.setState(
        {
          displayingMovies: movies,
        },
        () => {
          // 加载完正在上映的电影后再接着加载即将上映的电影数据
          that.loadComingMovies();
        }
      )
    }).catch((e) => {
      console.log("加载失败");
      that.setState({
        loaded: true
      })
    }).done();
  }
  
  /**
   * 加载即将上映的电影列表，并更新sectionData刷新列表
   */
  loadComingMovies() {
    let that = this;
    fetch(comingMovies('北京', 0, 20)).then((response) => response.json()).then((json) => {
      console.log(json);
      if (json == null) {
        that.setState({
          loaded: true,
        });
        return
      }
      let movies = [];
      for (let idx in json.subjects) {
        let movieItem = json.subjects[idx];
        let directors = "";
        for (let index in movieItem.directors) {
          let director = movieItem.directors[index];
          if (directors === "") {
            directors = directors + director.name
          } else {
            directors = directors + " " + director.name
          }
        }
        movieItem["directorNames"] = directors;
        
        let actors = "";
        for (let index in movieItem.casts) {
          let actor = movieItem.casts[index];
          if (actors === "") {
            actors = actors + actor.name
          } else {
            actors = actors + " " + actor.name
          }
        }
        movieItem["actorNames"] = actors;
        movies.push(movieItem)
      }
      // 两个电影数据都加载完成后需要更新sectionData，将数据在界面上显示出来
      let sectionList = [
        {data: that.state.displayingMovies, index: 0},
        {data: movies, index: 1},
      ];
      that.setState({
        loaded: true,
        incomingMovies: movies,
        sectionData: sectionList
      });
    }).catch((error) => {
      console.log("加载失败");
      that.setState({
        loaded: true
      })
    }).done();
  }
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#f3c2a1'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight:'bold'
  }
});