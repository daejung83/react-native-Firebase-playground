import { StackNavigator } from 'react-navigation';

import Login from '../screens/Login';
import Register from '../screens/Register';
import EmailVal from '../screens/EmailVal';

import { TabStack } from './TabStack';

export const MainStack = StackNavigator({
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
  EmailVal: {
    screen: EmailVal,
  },
  TabStack: {
    screen: TabStack,
  }
}, {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    }
  })
