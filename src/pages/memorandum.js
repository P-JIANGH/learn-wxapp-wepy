import wepy from 'wepy'
import { connect } from 'wepy-redux'
import Panel from '@/components/panel' // alias example

export default class Memorandum extends wepy.page {
  config = {}
  components = {
    panel: Panel
  }
  data = {
    msg: 'hello world'
  }
}
