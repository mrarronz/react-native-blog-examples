import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import glyphMap from './iconfont.json';

// glyphMap, fontFamily, fontFile三个参数，注意看方法注释，
// Android中fontFamily可以随便写，iOS必须是正确的名字否则运行报错，iOS可以直接双击iconfont.ttf打开看字体实际叫什么名字
const iconSet = createIconSet(glyphMap, 'iconFont', 'iconfont.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;