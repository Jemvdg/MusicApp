<template>
  <div id="app">
    <navTop></navTop>
    <router-view></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
import navTop from './components/J_navTop/navTop'
import footer from './components/J_footer/footer'
import jquery from '../static/jquery'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'app',
  jquery,
  components: {
    navTop: navTop,
    myfooter: footer,
  },
  computed: {
    ...mapState({
      musicId: state => state.musicId
    })
  },
  created() {
    this.initMusic()
  },
  methods: {
    ...mapMutations([
      'initMusic'
    ])
  },
}
</script>

<style lang="scss">

</style>
