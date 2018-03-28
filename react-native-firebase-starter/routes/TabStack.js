import { TabNavigator } from 'react-navigation';

import Temp1 from '../screens/Temp1';
import Temp2 from '../screens/Temp2';
import Setting from '../screens/Setting';

export const TabStack = TabNavigator({
  Temp1: {
    screen: Temp1,
  },
  Temp2: {
    screen: Temp2,
  },
  Setting: {
    screen: Setting,
  }
}, {
  animationEnabled: true,
  swipeEnabled: false,
})