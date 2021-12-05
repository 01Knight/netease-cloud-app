import { createRouter, createWebHistory } from 'vue-router'

const home = () => import("@/views/home.vue")
const songList = () => import("@/views/songList.vue")
const searchSong = () => import("@/views/searchSong.vue")

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/songList',
    name: 'songList',
    component: songList
  },
  {
    path: '/searchSong',
    name: 'searchSong',
    component: searchSong
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
