import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import ContentBody from '@/components/contentBody/contentBody'
import MUserName from '@/components/m-userName/m-userName'
import MSoltApply from '@/components/m-soltApply/m-soltApply'
import MSoltComplete from '@/components/m-soltComplete/m-soltComplete'
import NoticeList from '@/components/noticeList/noticeList'
import AddNotice from '@/components/addNotice/addNotice'
import ModifyUser from '@/components/modifyUser/modifyUser'
import MShotList from '@/components/m-shotList/m-shotList'
import MShotComplete from '@/components/m-shotComplete/m-shotComplete'
import MShotMiddle from '@/components/m-shotMiddle/m-shotMiddle'
import BalanceMoney from '@/components/balanceMoney/balanceMoney'
import ApplyMoney from '@/components/applyMoney/applyMoney'
import RecordMoney from '@/components/recordMoney/recordMoney'
import MNotGoods from '@/components/m-notGoods/m-notGoods'
import DeleverGoods from '@/components/deleverGoods/deleverGoods'
import CompleteGoods from '@/components/completeGoods/completeGoods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/contentBody',
      redirect: '/contentBody/userName',
      name: 'ContentBody',
      component: ContentBody,
      children: [
        {
          path: '/contentBody/userName',
          component: MUserName
        },
        {
          path: '/contentBody/MSoltApply',
          component: MSoltApply
        },
        {
          path: '/contentBody/MSoltComplete',
          component: MSoltComplete
        },
        {
          path: '/contentBody/noticeList',
          component: NoticeList
        },
        {
          path: '/contentBody/addNotice',
          component: AddNotice
        },
        {
          path: '/contentBody/modifyUser',
          component: ModifyUser
        },
        {
          path: '/contentBody/mShotList',
          name: '拍摄申请',
          component: MShotList
        },
        {
          path: '/contentBody/MShotComplete',
          name: '拍摄完成',
          component: MShotComplete
        },
        {
          path: '/contentBody/MShotMiddle',
          name: '拍摄中',
          component: MShotMiddle
        },
        {
          path: '/contentBody/BalanceMoney',
          name: '查询余额',
          component: BalanceMoney
        },
        {
          path: '/contentBody/ApplyMoney',
          name: '提现申请',
          component: ApplyMoney
        },
        {
          path: '/contentBody/RecordMoney',
          name: '提现记录',
          component: RecordMoney
        },
        {
          path: '/contentBody/MNotGoods',
          name: '未发货',
          component: MNotGoods
        },
        {
          path: '/contentBody/DeleverGoods',
          name: '已发货',
          component: DeleverGoods
        },
        {
          path: '/contentBody/CompleteGoods',
          name: '已发货',
          component: CompleteGoods
        }
      ]
    }
  ]
})
