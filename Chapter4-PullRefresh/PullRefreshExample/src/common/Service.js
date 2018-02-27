/// 查询正在上映的电影
export function queryMovies(city, start, count) {
  return "https://api.douban.com/v2/movie/in_theaters?city=" + city + "&start=" + start + "&count=" + count
}