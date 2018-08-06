import wepy from 'wepy'
import 'wepy-async-function'

import { setStore } from 'wepy-redux'
import configStore from './store'

const store = configStore()
setStore(store)

export default class extends wepy.app {
  config = {
    pages: [
      'pages/index',
      'pages/memorandum'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ddd',
      navigationBarTitleText: 'Test',
      navigationBarTextStyle: 'black'
    }
  }

  constructor () {
    super()
    this.use('requestfix')
  }

  onLaunch() {
    this.testAsync()
  }

  sleep (s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s * 1000)
    })
  }

  async testAsync () {
    const data = await this.sleep(3)
    console.log(data)
  }
}
