<template>
  <swiper :options="swiperOption" style="zIndex:0;">
    <swiper-slide v-for="item,index in banners" :key="index">
      <img class="banner" :src="item.pic" alt="fff">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
    components: {
        swiper,
        swiperSlide,
    },
    name: 'carrousel',

    data() {
        return {
            swiperOption: {
                autoplay: 1500,
                setWrapperSize: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                mousewheelControl: true,
                observeParents: true,
                loop:true,
            },
            banners: [],
        }
    },
    created() {
        this.$http.get('http://localhost:3000/banner')
            .then(function (data) {
                this.banners = data.body.banners
            });

    },
    mounted() {
 
    }
}
</script>

<style>


</style>
