import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页概览', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/material',
    component: Layout,
    redirect: '/material',
    alwaysShow: true,
    name: 'Material',
    meta: { title: '素材管理', icon: 'el-icon-picture' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/material/list/index'), // Parent router-view
        name: 'MaterialList',
        meta: { title: '素材列表', icon: 'list' }
      }
    ]
  },

  {
    path: '/program',
    component: Layout,
    redirect: '/program',
    name: 'Program',
    meta: { title: '节目制作与发布', icon: 'el-icon-tickets' },
    children: [
      {
        path: 'list',
        name: 'ProgramList',
        component: () => import('@/views/program/list/index'),
        meta: { title: '发布节目', icon: 'el-icon-film' }
      },
      {
        path: 'list/new',
        name: 'New',
        component: () => import('@/views/program/list/new'),
        meta: { title: '新建节目' },
        hidden: true,
      },
      {
        path: 'noticeList',
        name: 'NoticeList',
        component: () => import('@/views/program/noticeList/index'),
        meta: { title: '发布公告', icon: 'el-icon-data-board' }
      },
      {
        path: 'noticeList/new',
        name: 'New',
        component: () => import('@/views/program/noticeList/new'),
        meta: { title: '新建公告' },
        hidden: true,
      },
      {
        path: 'noticeList/equipment',
        name: 'Equipment',
        component: () => import('@/views/program/noticeList/equipment'),
        meta: { title: '选择设备' },
        hidden: true,
      },
    ]
  },

  {
    path: '/plan',
    component: Layout,
    redirect: '/plan',
    name: 'Plan',
    meta: { title: '计划管理', icon: 'el-icon-date' },
    children: [
      {
        path: 'list',
        name: 'PlanList',
        component: () => import('@/views/plan/list/index'),
        meta: { title: '计划列表', icon: 'list' },
      },
      {
        path: 'list/new',
        name: 'New',
        component: () => import('@/views/plan/list/new'),
        meta: { title: '新建计划' },
        hidden: true,
      },
      {
        path: 'review',
        name: 'Review',
        component: () => import('@/views/plan/review/index'),
        meta: { title: '计划审核', icon: 'el-icon-s-claim' }
      },
    ]
  },

  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment',
    name: 'Equipment',
    meta: { title: '设备管理', icon: 'el-icon-monitor' },
    children: [
      {
        path: 'list',
        name: 'EquipmentList',
        component: () => import('@/views/equipment/list/index'),
        meta: { title: '设备列表', icon: 'list' }
      },
      {
        path: 'groupList',
        name: 'EquipmentGroupList',
        component: () => import('@/views/equipment/groupList/index'),
        meta: { title: '分组管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: 'System',
    alwaysShow: true,
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index'),
        meta: { title: '账户管理', icon: 'el-icon-user-solid' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
