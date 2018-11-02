import React, {PureComponent} from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight, PixelRatio} from 'react-native';

export default class MovieCell extends PureComponent {
  render() {
    let {movie} = this.props;
    let averageScore = Number(movie.rating.average);
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.container}>
          <Image
            source={{uri: movie.images.large}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
            {
              averageScore !== 0 ?
                (<View style={styles.horizontalView}>
                  <Text style={styles.titleTag}>评分：</Text>
                  <Text style={styles.score}>{movie.rating.average}</Text>
                </View>) :
                (<View style={styles.horizontalView}>
                  <Text style={styles.titleTag}>暂无评分</Text>
                </View>)
            }
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>导演：</Text>
              <Text style={styles.name}>{movie.directorNames}</Text>
            </View>
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>主演：</Text>
              <Text style={styles.name}>{movie.actorNames}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderBottomWidth: 1/PixelRatio.get(),
    borderColor: '#e0e0e0'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'left',
  },
  year: {
    textAlign: 'left',
    color: '#777777',
    marginTop: 10,
  },
  thumbnail: {
    width: 110,
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  horizontalView: {
    flexDirection: 'row',
    marginTop: 10
  },
  titleTag: {
    color: '#666666',
  },
  score: {
    color: '#ff8800',
    fontWeight: 'bold',
  },
  name: {
    color: '#333333',
    flex: 1
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});