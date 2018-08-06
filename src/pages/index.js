import wepy from 'wepy'
import { connect } from 'wepy-redux'
import Panel from '@/components/panel' // alias example
import Counter from 'counter' // alias example
import List from '../components/list' // aliasFields example
import moduleA from 'module-a' // aliasFields ignore module example
import Group from '../components/group'
import Toast from 'wepy-com-toast'
import testMixin from '../mixins/test'

// import * as Rx from 'rxjs/Rx'

console.log('moduleA ignored: ', moduleA) // => moduleA ignored: {}

@connect({
  num (state) {
    return state.counter.num
  },
  asyncNum (state) {
    return state.counter.asyncNum
  },
  sumNum (state) {
    return state.counter.num + state.counter.asyncNum
  }
})

export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: '主页'
  }
  components = {
    panel: Panel,
    counter1: Counter,
    counter2: Counter,
    list: List,
    group: Group,
    toast: Toast
  }

  mixins = [testMixin]

  data = {
    mynum: 20,
    userInfo: null,
    normalTitle: '原始标题',
    setTimeoutTitle: '标题三秒后会被修改',
    count: 0,
    netrst: '',
    groupList: [
      {
        id: 1,
        name: '点击改变',
        list: [
          {
            childid: '1.1',
            childname: '子项，点我改变'
          }, {
            childid: '1.2',
            childname: '子项，点我改变'
          }, {
            childid: '1.3',
            childname: '子项，点我改变'
          }
        ]
      },
      {
        id: 2,
        name: '点击改变',
        list: [
          {
            childid: '2.1',
            childname: '子项，点我改变'
          }, {
            childid: '2.2',
            childname: '子项，点我改变'
          }, {
            childid: '2.3',
            childname: '子项，点我改变'
          }
        ]
      },
      {
        id: 3,
        name: '点击改变',
        list: [
          {
            childid: '3.1',
            childname: '子项，点我改变'
          }
        ]
      }
    ]
  }

  computed = {
    now () {
      return +new Date()
    }
  }

  methods = {
    plus () {
      this.mynum++
    },
    toast () {
      let promise = this.$invoke('toast', 'show', {
        title: '自定义标题',
        img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
      })

      promise.then((d) => {
        console.log('toast done')
      })
    },
    tap () {
      console.log('do noting from ' + this.$name)
    },
    communicate () {
      console.log(this.$name + ' tap')

      this.$invoke('counter2', 'minus', 45, 6)
      this.$invoke('counter1', 'plus', 45, 6)

      this.$broadcast('index-broadcast', 1, 3, 4)
    },
    request () {
      let self = this
      let i = 10
      let map = ['MA==', 'MQo=', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ==']
      while (i--) {
        wepy.request({
          url: 'https://www.madcoder.cn/tests/sleep.php?time=1&t=css&c=' + map[i] + '&i=' + i,
          success: function (d) {
            self.netrst += d.data + '.'
            self.$apply()
          }
        })
      }
    },
    counterEmit (...args) {
      let $event = args[args.length - 1]
      console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
    },

    handleViewTap() {
      console.log('tap userInfo')
    },

    loadUserInfo(res) {
      console.log(res.detail.userInfo)
      this.userInfo = res.detail.userInfo
    },

    openMemorandum() {
      wepy.navigateTo({url: '/pages/memorandum'})
    }
  }

  events = {
    'index-emit': (...args) => {
      let $event = args[args.length - 1]
      console.log(`${this.$name} receive ${$event.name} from ${$event.source.$name}`)
    }
  }

  onShow() {
    console.log('index page onShow')
  }

  onLoad() {
    console.log('index page onLoad')
    // console.log(Rx)
    // var o = Rx.Observable.of(1)
    // var powersOfTwo = o
    //   .mapTo(1)
    //   .expand(x => Rx.Observable.of(2 * x).delay(1000))
    //   .take(10)
    // powersOfTwo.subscribe(x => console.log(x))
    this.setTimeoutTitle = '标题三秒后会被修改'
    setTimeout(() => {
      this.setTimeoutTitle = '到三秒了'
      this.normalTitle = '标题已被修改'
      this.$apply()
    }, 3000)
  }
}