import pointAirport from '@/assets/MapPlugin/point-airport.png';
import pointCity from '@/assets/MapPlugin/point-city.png';
import pointRailwayPurple from '@/assets/MapPlugin/point-railway-purple.png';
import pointRailwayOrange from '@/assets/MapPlugin/point-railway-orange.png';
import pointRailwayGreen from '@/assets/MapPlugin/point-railway-green.png';
import pointRailwayBlue from '@/assets/MapPlugin/point-railway-blue.png';
import pointRailwayRed from '@/assets/MapPlugin/point-railway-red.png';

/** 地图中心 */
export const CENTER = [118.830089, 25.88825];

/** 缩放 */
export const ZOOM = 10.5;

/** 福州 */
export const FUZHOU = [119.300537, 26.07991];

/** 永泰 */
export const YONGTAI = [118.93326759338379, 25.863008074133162];

/** 交通 - 点 */
export const TRAFFIC_POINTS = [
  {
    name: '福州市区',
    icon: pointCity,
    distance: '42.9km',
    color: '#DC2921',
    position: [119.29847717285156, 26.069736109561056]
  },
  {
    name: '长乐机场',
    icon: pointAirport,
    distance: '75.3km',
    color: '#FFC000',
    position: [119.66720581054689, 25.927789502547334]
  },
  {
    name: '永泰葛岭 高速入口',
    icon: pointRailwayPurple,
    distance: '14.5km',
    color: '#AE3AF0',
    position: [119.06913757324217, 25.889496316024807]
  },
  {
    name: '永泰东 高速入口',
    icon: pointRailwayBlue,
    distance: '5.9km',
    color: '#0078FF',
    position: [119.00596618652344, 25.87034506238234]
  },
  {
    name: '永泰西 高速入口',
    icon: pointRailwayGreen,
    distance: '2.8km',
    color: '#28D2B0',
    position: [118.92082214355469, 25.856751966503136]
  },
  {
    name: '永泰梧桐 高速入口',
    icon: pointRailwayOrange,
    distance: '21.1km',
    color: '#FF7937',
    position: [118.7574005126953, 25.728776827446488]
  },
  {
    name: '永泰嵩口 高速入口',
    icon: pointRailwayRed,
    distance: '35.8km',
    color: '#FF409E',
    position: [118.57955932617188, 25.812872679567928]
  }
];

/** 交通 - 线 */
export const TRAFFIC_LINES = [];
