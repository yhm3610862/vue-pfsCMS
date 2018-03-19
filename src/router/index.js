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
      name: 'Login',
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
          name: '拍摄完成',
          component: MShotMiddle
        },
        {
          path: '/contentBody/BalanceMoney',
          name: '拍摄完成',
          component: BalanceMoney
        }
      ]
    }
  ]
})
