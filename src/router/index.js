import { createWebHistory, createRouter, START_LOCATION } from 'vue-router'
import store from '@/store'

const LoginForm = () => import('@/components/Authenticate/LoginForm.vue')
const LoginPage = () => import('@/views/LoginPage.vue')
const AppLayout = () => import('@/views/AppLayout.vue')

const ProfilePage = () => import('@/views/ProfilePage.vue')
const TaiKhoanPage = () => import('@/views/TaiKhoanPage.vue')
const ChinhSuaTKPage = () => import('@/views/ChinhSuaTKPage.vue')
const TaoTaiKhoanPage = () => import('@/views/TaoTaiKhoanPage.vue')
const DanhSachLopPage = () => import('@/views/DanhSachLopPage.vue')
const ChiTietLopPage = () => import('@/views/ChiTietLopPage.vue')
const StreamingPage = () => import('@/views/StreamingPage.vue')
const ChiTietBuoiHoc = () => import('@/views/ChiTietBuoiHoc.vue')

const routes = [
  {
    path: '/',
    redirect: '/profile',
    name: 'Home',
    component: AppLayout,
    meta: {
      isAuth: true
    },
    children: [
      // {
      //   path: 'thong-tin/:id',
      //   name: 'ThongTin',
      //   component: ThongTinPage
      // },
      {
        path: 'profile',
        name: 'ProfileUser',
        component: ProfilePage
      },
      {
        path: 'users/chinh-sua/:id',
        name: 'ChinhSuaTKPage',
        component: ChinhSuaTKPage
      },
      {
        path: 'users',
        name: 'TaiKhoanPage',
        component: TaiKhoanPage
      },
      {
        path: 'users/create',
        name: 'TaoTaiKhoanPage',
        component: TaoTaiKhoanPage
      },
      {
        path: 'classes',
        name: 'DanhSachLopPage',
        component: DanhSachLopPage
      },
      {
        path: 'classes/:id',
        name: 'ChiTietLopPage',
        component: ChiTietLopPage
      },
      {
        path: 'classes/:id/session',
        name: 'StreamingPage',
        component: StreamingPage
      },
      {
        path: 'classes/session/:id',
        name: 'ChiTietBuoiHoc',
        component: ChiTietBuoiHoc
      }
    ]
  },
  // {
  //   path: '/home',
  //   name: 'dashboard',
  //   component: HomePageLayout,
  //   meta: {
  //     isAuth: true
  //   },
  //   children: [
  //     {
  //       path: '',
  //       component: DuAnPage
  //     }
  //   ]
  // },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    children: [
      {
        path: '',
        component: LoginForm,
        meta: {
          isAuth: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isPrivate = to.matched.some((record) => record.meta.isAuth)
  // const isAuth = store.getters['auth/getIsAuthenticated']
  const token = localStorage.getItem('token')
  document.title = 'Have2Grad'
  // Tu dong login neu da co token va chua login
  // if (!isPrivate && ) {

  // }
  // Init route check neu da co token ma chua login thi tu dong login
  if (from === START_LOCATION && token) {
    try {
      await store.dispatch('auth/fetchUser')
      // Neu da login nhung muon quay lai trang login
      if (!isPrivate && store.getters['auth/getIsAuthenticated']) {
        return next({ path: '/profile' })
      }
      return next()
    } catch (error) {
      localStorage.clear()
      return next({ path: '/login' })
    }
  }
  // Neu ko co token nhung muon di vao page private
  if (!token && isPrivate) {
    return next({ path: '/login' })
  }
  return next()
})
export default router
