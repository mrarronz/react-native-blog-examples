import  React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import * as MovieAction from '../actions/GetMovieAction';
import MovieCell from "../components/MovieCell";

class HomeScreen extends React.PureComponent {
  
  componentDidMount() {
    console.log('Home mounted');
    this.props.loadMovies();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.movieList}
          keyExtractor={(item, index) => String(index)}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
  
  _renderItem = ({item}) => {
    return (
      <MovieCell
        movie={item}
        onPress={() => {
          console.log('点击了电影：' + item.title);
          this.props.navigation.navigate('Detail');
        }}
      />
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(
  (state) => ({
    loading: state.getMovieList.loading,
    errorMessage: state.getMovieList.errorMessage,
    isSuccess: state.getMovieList.isSuccess,
    movieList: state.getMovieList.movieList
  }),
  (dispatch) => ({
    loadMovies: () => dispatch(MovieAction.getMovies())
  })
)(HomeScreen)