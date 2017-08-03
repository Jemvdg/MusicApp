import Music from '../pages/music/music';

import List from '../pages/music/list/C_list';
import Radio from '../pages/music/radio/J_radio';
import Top from '../pages/music/top/S_top';
import swiper from '../components/swiper/index.vue';
import SubList from "../pages/music/list/subPage/subList"
import SubTop from "../pages/music/top/subPage/SubTop"
import SubHot from "../pages/music/hot/subPage/subHot.vue"
import Songpage from '../pages/music/songpage'

export default {
  path: '/music',
  component: Music,
  redirect: '/music/main',
  children: [{
      path: '/music/main',
      component: swiper
    },
    {
      path: '/subList/:id',
      component: SubList
    },
    {
      path: '/subTop/:id',
      component: SubTop
    },
    {
      path: '/songpage',
      component: Songpage
    },
    {
      path: '/subHot/:id',
      component: SubHot
    },
  ]
}
