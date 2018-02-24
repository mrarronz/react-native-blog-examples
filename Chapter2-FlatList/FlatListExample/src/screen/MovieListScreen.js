import React, {Component} from 'react';
import {View, FlatList, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {queryMovies, comingMovies} from '../common/Service';
import MovieItemCell from "../widgets/MovieItemCell";

export default class MovieListScreen extends Component {
  
  static navigationOptions = {
    headerTitle: '豆瓣电影'
  };
  
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],  // 电影列表的数据源
      loaded: false,  // 用来控制loading视图的显示，当数据加载完成，loading视图不再显示
    };
  }
  
  componentDidMount() {
    /// 根据routeName来判断当前是哪个界面，react-navigation中可以通过navigation.state.routeName来获取
    let routeName = this.props.navigation.state.routeName;
    if (routeName === 'First') {
      this.loadDisplayingMovies();
    } else {
      this.loadComingMovies();
    }
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
      <FlatList
        data={this.state.movieList}
        renderItem={this._renderItem}
        keyExtractor={(item) => item.id}
      />
    )
  }
  
  _renderItem = (item) => {
    return (
      <MovieItemCell movie={item.item} onPress={() => {
        console.log('点击了电影----' + item.item.title);
      }}/>
    )
  };
  
  /**
   * 加载正在上映的电影列表，此处默认城市为北京，取20条数据显示
   */
  loadDisplayingMovies() {
    let that = this;
    fetch(queryMovies('北京', 0, 20)).then((response) => response.json()).then((json) => {
      console.log(json);
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
      that.setState({
        movieList: movies,
        loaded: true
      })
    }).catch((e) => {
      console.log("加载失败");
      that.setState({
        loaded: true
      })
    }).done();
  }
  
  /**
   * 加载即将上映的电影列表，此处默认城市为北京，取20条数据显示
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
      that.setState({
        movieList: movies,
        loaded: true,
      })
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
  }
});
