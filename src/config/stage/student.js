const studentRouter = {
  route: null,
  name: null,
  title: '学生管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/student/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加学生',
      type: 'view',
      name: 'StudentCreate',
      route: '/student/add',
      filePath: 'view/student/student-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '学生列表',
      type: 'view',
      name: 'StudentList',
      route: '/student/list',
      filePath: 'view/student/student-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default studentRouter
