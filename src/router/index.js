import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true }
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     component: _import('dashboard/index'),
  //     name: 'dashboard',
  //     meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  //   }]
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  // 首页
  {
    path: '',
    component: Layout,
    redirect: 'teacherHomepage',
    meta: { roles: ['teacher'] },
    children: [{
      path: 'teacherHomepage',
      component: _import('teacherHomepage/index'),
      name: 'teacherHomepage',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'studentHomepage',
    meta: { roles: ['student'] },
    children: [{
      path: 'studentHomepage',
      component: _import('studentHomepage/index'),
      name: 'studentHomepage',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },

  {
    path: '/tests',
    component: Layout,
    meta: {
      icon: 'test',
      title: '学生测试管理',
      roles: ['teacher']
    },
    children: [
      { path: 'index', component: _import('testManagement/testManagementIndex'), name: 'testManagementIndex', meta: { title: '测试管理', icon: 'test' }},
      { path: 'testAdd', component: _import('testManagement/testAdd'), name: 'testAdd', hidden: true, meta: { title: '制作试卷', icon: 'icon', noCache: true }}
    ]
  },
  {
    path: '/tests',
    component: Layout,
    hidden: true,
    // meta: { roles: ['student'] },
    children: [{
      path: ':id',
      component: _import('testManagement/testDetail'),
      name: 'testDetail',
      meta: { title: '试卷详情', icon: 'icon', noCache: true }
    }]
  },

  // {
  //   path: '/studentTeam',
  //   component: Layout,
  //   name: 'studentTeam',
  //   hidden: true,
  //   meta: {
  //     title: '测评小组投票',
  //     icon: 'icon',
  //     roles: ['student']
  //   },
  //   children: [
  //     { path: 'none', component: _import('studentTeam/none'), name: 'student-none', meta: { title: '测评小组投票', icon: 'icon' }}
  //   ]
  // },

  // {
  //   path: '/information',
  //   component: Layout,
  //   name: 'information',
  //   meta: {
  //     title: '学生信息',
  //     icon: 'icon'
  //   },
  //   children: [
  //     { path: 'alter', component: _import('information/alter'), name: 'alter-information', meta: { title: '个人信息', icon: 'icon' }},
  //     { path: 'index', component: _import('information/index'), name: 'Personal-information', meta: { title: '测评报告', icon: 'icon' }}
  //   ]
  // },

  // {
  //   path: '/studentManager',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'studentManager',
  //   meta: {
  //     title: '教学管理',
  //     icon: 'excel'
  //   },
  //   children: [
  //     { path: 'basicInfo', component: _import('studentManager/basicInfo/basicInfo'), name: 'basicInfo', meta: { title: '学生基本信息管理' }},
  //     { path: 'participation', component: _import('studentManager/participation/participation'), name: 'participation', meta: { title: '出勤管理' }},
  //     { path: 'breakTheRule', component: _import('studentManager/breakTheRule/breakTheRule'), name: 'breakTheRule', meta: { title: '违纪管理' }},
  //     { path: 'leave', component: _import('studentManager/leave/leave'), name: 'leave', meta: { title: '请假登记' }},
  //     {
  //       path: 'workManager',
  //       component: _import('studentManager/workManager/index'),
  //       name: 'workManager',
  //       meta: {
  //         title: '作业管理'
  //       }
  //     },
  //     { path: 'otherImportant', component: _import('studentManager/otherImportant/otherImportant'), name: 'otherImportant', meta: { title: '重大事项管理' }}
  //   ]
  // },

  // {
  //   path: '/homework',
  //   component: Layout,
  //   redirect: '/homework/daliyTask',
  //   alwaysShow: true,
  //   name: 'homework',
  //   meta: { title: 'homework', icon: 'test' },
  //   children: [
  //     { path: 'daliyTask', component: _import('homework/daliyTask'), name: 'daliyTask', meta: { title: 'daliytask' }}
  //   ]
  // },
  // {
  //   path: '/reveiewSystem',
  //   component: Layout,
  //   redirect: '/reveiewSystem/teacherReview',
  //   alwaysShow: true,
  //   name: 'reveiewSystem',
  //   meta: { title: 'reveiewsystem', icon: 'example' },
  //   children: [
  //     { path: 'teacherReview', component: _import('reviewSystem/teacherReview'), name: 'teacherReview', meta: { title: 'teacherreview' }},
  //     { path: 'selfReview', component: _import('reviewSystem/selfReview'), name: 'selfReview', meta: { title: 'selfreview' }},
  //     { path: 'technologyReview', component: _import('reviewSystem/technologyReview'), name: 'technologyReview', meta: { title: 'technologyreview' }}
  //   ]
  // },

  // {
  //   path: '/technologyManager',
  //   component: Layout,
  //   children: [{
  //     path: 'technologyManager',
  //     component: _import('technologyManager/index'),
  //     name: 'teacherHomepage',
  //     meta: { title: 'technologyManager', icon: 'dashboard', noCache: true }
  //   }]
  // },

  // {
  //   path: '/system',
  //   component: Layout,
  //   name: 'system',
  //   meta: {
  //     title: '系统管理',
  //     icon: 'clipboard'
  //   },
  //   children: [
  //     { path: 'teacherManager', component: _import('system/teacherManager/index'), name: 'teacherManager', meta: { title: '教师管理' }},
  //     { path: 'navigationManager', component: _import('system/navigationManager/index'), name: 'navigationManager', meta: { title: '导航管理' }},
  //     { path: 'roleManager', component: _import('system/roleManager/index'), name: 'roleManager', meta: { title: '权限管理' }},
  //     { path: 'announcementManager', component: _import('system/announcementManager/index'), name: 'announcementManager', meta: { title: '公告管理' }},
  //     { path: 'parameterManager', component: _import('system/parameterManager/index'), name: 'parameterManager', meta: { title: '系统参数管理' }}
  //   ]
  // },
  // 学生端
  {
    path: '/studentWork',
    component: Layout,
    name: 'studentWork',
    meta: {
      icon: 'homework',
      roles: ['student']
    },
    children: [{
      path: 'index',
      component: _import('homework/daliyTask'),
      name: 'daliyTask',
      meta: { title: '学生作业', icon: 'homework', noCache: true }
    }]
  },
  {
    path: '/studentTest',
    component: Layout,
    name: 'studentTest',
    meta: {
      icon: 'test',
      title: '学生测试',
      roles: ['student']
    },
    children: [
      { path: 'dailyTest', component: _import('studentTest/dailyTest/index'), name: 'dailyTestIndex', meta: { title: '日常测试', icon: 'test' }},
      { path: 'admissionTest', component: _import('studentTest/Admissiontest/index'), name: 'admissionTestIndex', meta: { title: '入学测试', icon: 'test' }},
      {
        path: '/admissionTestIndex/midProfessionalKnowledgeTest',
        component: _import('studentTest/index'),
        name: 'midProfessionalKnowledgeTest',
        meta: { title: '专业测试(智育)', icon: 'test' },
        children: [
          { path: 'midTest', component: _import('studentTest/systemTest/midTest'), name: 'systemTest-midTest', meta: { title: '笔试题', icon: 'icon' }},
          { path: 'index', component: _import('projectDefense/index'), name: 'projectDefense', meta: { title: '项目答辩', icon: 'mic', noCache: true }}
        ] },
      { path: 'finProfessionalKnowledgeTest', component: _import('studentTest/midTest/index'), name: 'finalProfessionalKnowledgeTest', meta: { title: '专业集中测试', icon: 'test' }}

    ]
    // D:\CODE\Git\QualityEvaluationSys\src\views\studentTest\index.vue
    // { path: 'admissionTest', component: _import('studentTest/Admissiontest/index'), name: 'admissionTestIndex', meta: { title: '入学测试', icon: 'test' }},
    //   { path: 'midProfessionalKnowledgeTest', name: 'midProfessionalKnowledgeTest', meta: { title: '专业知识测试(智育)', icon: 'test' }, children: [
    //     { path: 'midTest', component: _import('studentTest/systemTest/midTest'), name: 'systemTest-midTest', meta: { title: '笔试题', icon: 'icon' }},
    //     {
    //       path: 'index',
    //       component: _import('projectDefense/index'),
    //       name: 'projectDefense',
    //       meta: { title: '项目答辩', icon: 'mic', noCache: true }
    //     }
    //   ] },
    //   { path: 'finalProfessionalKnowledgeTest', component: _import('studentTest/midTest/index'), name: 'finalProfessionalKnowledgeTest', meta: { title: '专业知识集中测试', icon: 'test' }}

  },
  {
    path: '/Admissiontest',
    component: Layout,
    name: 'Admissiontest',
    hidden: true,
    meta: {
      icon: 'component',
      title: '入学测试'
    },
    children: [
      { path: 'character', component: _import('studentTest/Admissiontest/Character'), name: 'Admissiontest-character', meta: { title: '性格测试', icon: 'icon' }},
      { path: 'professional', component: _import('studentTest/Admissiontest/Professional'), name: 'Admissiontest-professional', meta: { title: '专业测试', icon: 'icon' }},
      { path: 'thinking', component: _import('studentTest/Admissiontest/Thinking'), name: 'Admissiontest-thinking', meta: { title: '思维测试', icon: 'icon' }}
    ]
  },
  {
    path: '/reviewSystem',
    component: Layout,
    name: 'reviewSystem',
    meta: {
      title: '评定系统',
      icon: 'review',
      roles: ['student']
    },
    children: [
      { path: 'votw', component: _import('studentTeam/index'), name: 'student-team', meta: { title: '评定小组投票', icon: 'vote' }},
      { path: 'studentsReview', component: _import('review/studentGroupReview'), name: 'groupReview', meta: { title: '学生小组评定', icon: 'review', noCache: true }}
    ]
  },
  {
    path: '/systemTest',
    component: Layout,
    name: 'systemTest',
    hidden: true,
    meta: {
      title: 'systemTest',
      roles: ['student']
    },
    children: [

      { path: 'lastTest1', component: _import('studentTest/systemTest/lastTest1'), name: 'systemTest-lastTest1', meta: { title: '期末测试（1）', icon: 'icon' }},
      { path: 'lastTest2', component: _import('studentTest/systemTest/lastTest2'), name: 'systemTest-lastTest2', meta: { title: '期末测试（2）', icon: 'icon' }},
      { path: 'lastTest3', component: _import('studentTest/systemTest/lastTest3'), name: 'systemTest-lastTest3', meta: { title: '期末测试（3）', icon: 'icon' }},
      { path: 'lastTest4', component: _import('studentTest/systemTest/lastTest4'), name: 'systemTest-lastTest4', meta: { title: '期末测试（4）', icon: 'icon' }},
      { path: 'lastTest5', component: _import('studentTest/systemTest/lastTest5'), name: 'systemTest-lastTest5', meta: { title: '期末测试（5）', icon: 'icon' }}
    ]
  },
  {
    path: '/projectDefense',
    component: Layout,
    meta: {
      roles: ['student']
    },
    hidden: true,
    children: [{
      path: 'detail',
      component: _import('projectDefense/detail'),
      name: 'projectDefenseDetail',
      meta: { title: '项目详情', icon: 'dashboard', noCache: true }
    }]
  },

  // {
  //   path: '/secondEvaluationReport',
  //   component: Layout,
  //   name: 'secondEvaluationReport',
  //   meta: {
  //     roles: ['student']
  //   },
  //   children: [
  //     { path: 'index', component: _import('review/secondEvaluationReport'), name: 'secondEvaluationReport', meta: { title: '学中测评报告', icon: 'icon' }}
  //   ]
  // },
  // {
  //   path: '/thirdlyEvaluationReport',
  //   component: Layout,
  //   name: 'thirdlyEvaluationReport',
  //   meta: {
  //     roles: ['student']
  //   },
  //   children: [
  //     { path: 'index', component: _import('review/thirdlyEvaluationReport'), name: 'thirdlyEvaluationReport', meta: { title: '结业测评报告', icon: 'icon' }}
  //   ]
  // },
  // {
  //   path: '/selfReview',
  //   component: Layout,
  //   meta: {
  //     roles: ['student']
  //   },
  //   children: [{ path: 'index', component: _import('review/selfReview'), name: 'selfReview', meta: { title: '学生自评', icon: 'dashboard' }}]
  // },
  // {
  //   path: '/imformationn',
  //   component: Layout,
  //   meta: {
  //     roles: ['student']
  //   },
  //   children: [{
  //     path: 'index',
  //     component: _import('information/dailysummary'),
  //     name: 'imformation',
  //     meta: { title: '日常信息汇总', icon: 'dashboard', noCache: true }
  //   }]
  // },
  {
    path: '/evaluationReport',
    component: Layout,
    name: 'evaluationReport',
    meta: {
      title: '学生测评报告',
      icon: 'report',
      roles: ['student']
    },
    children: [
      { path: 'admissionAssessment', component: _import('report/firstEvaluationReport'), name: 'firstEvaluationReport', meta: { title: '入学测评报告', icon: 'report' }},
      { path: 'midtermAssessment', component: _import('review/secondEvaluationReport'), name: 'secondEvaluationReport', meta: { title: '学中测评报告', icon: 'report' }},
      { path: 'endAssessment', component: _import('review/thirdlyEvaluationReport'), name: 'thirdlyEvaluationReport', meta: { title: '结业测评报告', icon: 'report' }}
    ]
  },
  {
    path: '/studentInformation',
    component: Layout,
    meta: {
      title: '学生信息',
      icon: 'information',
      roles: ['student']
    },
    children: [
      { path: 'information', component: _import('information/alter'), name: 'alter-information', meta: { title: '个人信息', icon: 'information' }},
      { path: 'daliyReport', component: _import('information/dailysummary'), name: 'imformation', meta: { title: '日常表现汇总', icon: 'daliyreport', noCache: true }}
    ]
  },
  // 老师端

  {
    path: '/workManager',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{
      path: 'index',
      component: _import('studentManager/workManager/index'),
      name: 'workManager',
      meta: {
        title: '作业管理',
        icon: 'homework'
      }
    }]
  },
  {
    path: '/projectDefense',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{
      path: 'review',
      component: _import('review/examinationReview'),
      name: 'projectDefenseReview',
      meta: { title: '项目答辩评定', icon: 'dashboard', noCache: true }
    }]
  },

  {
    path: '/dailyPerformance',
    component: Layout,
    meta: {
      title: '学生日常管理',
      icon: 'daliy',
      roles: ['teacher']
    },
    children: [
      { path: 'participation', component: _import('studentManager/participation/participation'), name: 'participation', meta: { title: '出勤管理', icon: 'late' }},
      { path: 'breakTheRule', component: _import('studentManager/breakTheRule/breakTheRule'), name: 'breakTheRule', meta: { title: '违纪管理', icon: 'danger' }},
      { path: 'highlighting', component: _import('studentManager/highlighting/highlighting'), name: 'highlighting', meta: { title: '突出表现管理', icon: 'good' }},
      { path: 'otherImportant', component: _import('studentManager/otherImportant/otherImportant'), name: 'otherImportant', meta: { title: '重大事项管理', icon: 'warning' }},
      { path: 'index', component: _import('studentManager/leave/leave'), name: 'leave', meta: { title: '请假登记', icon: 'leave' }}
    ]
  },
  {
    path: '/reviewSystem',
    component: Layout,
    meta: {
      title: '综合评定系统',
      icon: 'review',
      roles: ['teacher']
    },
    children: [
      { path: 'midReviewIndex', component: _import('review/midReviewIndex'), name: 'midReviewIndex', meta: { title: '学中综合评定', icon: 'review' }},
      { path: 'finalReviewIndex', component: _import('review/finalReviewIndex'), name: 'finalReviewIndex', meta: { title: '学末综合评定', icon: 'review' }},
      { path: 'HRReview', component: _import('review/HRReview'), name: 'HRReview', meta: { title: '人事经理面试', icon: 'Interview' }},
      { path: 'technologyReview', component: _import('review/projectManagerReview'), name: 'technologyReview', meta: { title: '项目经理面试', icon: 'Interview' }}
    ]
  },
  {
    path: '/teacherReview',
    component: Layout,
    hidden: true,
    meta: {
      roles: ['schoolManager', 'teacher']
    },
    children: [
      { path: 'midTeacherReview', component: _import('review/midTeacherReview'), name: 'midTeacherReview', meta: { title: '学中综合评定' }},
      { path: 'finalTeacherReview', component: _import('review/finalTeacherReview'), name: 'finalTeacherReview', meta: { title: '结业综合评定' }}
    ]
  },
  {
    path: '/studentsInformation',
    component: Layout,
    meta: {
      roles: ['schoolManager', 'teacher']
    },
    children: [
      { path: 'index', component: _import('studentManager/basicInfo/basicInfo'), name: 'basicInfo', meta: { title: '学生信息管理', icon: 'studentList', noCache: true }}
    ]
  },
  {
    path: '/teacherinformation',
    component: Layout,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('teacherinformation/teacherinformation'), name: 'teacherinformation', meta: { title: '教师信息', icon: 'information' }}]
  },
  {
    path: '/other',
    component: Layout,
    name: 'other',
    meta: {
      icon: 'other',
      roles: ['teacher', 'student']
    },
    children: [{ path: 'announcement', component: _import('system/announcementBrowsing/index'), name: 'announcementBrowsing', meta: { title: '系统公告', icon: 'announcement' }}]
  },
  // 学校管理员的权限
  {
    path: '',
    component: Layout,
    meta: {
      roles: ['schoolManager']
    },
    children: [{
      path: 'index',
      component: _import('system/teacherManager/index'),
      name: 'teacherManager',
      meta: { title: '教师管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/classManager',
    component: Layout,
    meta: {
      roles: ['schoolManager']
    },
    children: [{
      path: 'index',
      component: _import('studentManager/classManager/classManager'),
      name: 'classManager',
      meta: { title: '班级管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/announcementManager',
    component: Layout,
    meta: {
      roles: ['schoolManager']
    },
    children: [{
      path: 'index',
      component: _import('system/announcementManager/index'),
      name: 'announcementManager',
      meta: { title: '公告管理', icon: 'dashboard', noCache: true }
    }]
  },
  // 管理员的权限
  // {
  //   path: '',
  //   component: Layout,
  //   name: 'userManager',
  //   meta: {
  //     roles: ['admin']
  //   },
  //   children: [{
  //     path: 'userManager',
  //     component: _import('system/userManager/index'),
  //     name: 'userManager',
  //     meta: { title: '用户管理', icon: 'dashboard', noCache: true }
  //   }]
  // },
  {
    path: '',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('system/userManager/index'),
      name: 'userManager',
      meta: { title: '用户管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/navigationManager',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('system/navigationManager/index'),
      name: 'navigationManager',
      meta: { title: '导航管理', icon: 'dashboard', noCache: true }
    }]
  },

  {
    path: '/parameterManager',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('system/parameterManager/index'),
      name: 'parameterManager',
      meta: { title: '参数管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/logManager',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('system/logManager/index'),
      name: 'logManager',
      meta: { title: '日志管理', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/workdetail',
    component: Layout,
    hidden: true,
    meta: {
      roles: ['teacher']
    },
    children: [{ path: 'index', component: _import('studentManager/workManager/workdetail'), name: 'workdetail', meta: { title: '作业详情', icon: '2' }}]
  },
  { path: '*', redirect: '/404', hidden: true }
]
