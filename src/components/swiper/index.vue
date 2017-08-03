<template>
    <div class="swiper-main">
        <div class="nav">
            <div class="line">
                <span class="lining"></span>
            </div>
            <ul class="main-nav">
                <li class="classify-nav" v-for="item,index in music" :key="index" @click="toIndex(index)">
                    {{item.title}}
                </li>
            </ul>
        </div>
        <swiper class="swiper-container1" :options="swiperOption" ref="mySwiper">
            <swiper-slide>
                <hot></hot>
            </swiper-slide>
            <swiper-slide>
                <top></top>
            </swiper-slide>
            <swiper-slide>
                <list></list>
            </swiper-slide>
            <swiper-slide>
                <radio></radio>
            </swiper-slide>
        </swiper>
        <loading v-if="!isDone"></loading>
    </div>
</template>


<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import hot from '../../pages/music/hot/H_hot'
import list from '../../pages/music/list/C_list'
import top from '../../pages/music/top/S_top'
import radio from '../../pages/music/radio/J_radio'
import loading from '../../components/loading/loading';

let timer
export default {
    data() {
        return {
            music: [
                {
                    title: '热门推荐'
                },
                {
                    title: "榜单"
                },
                {
                    title: "歌单",
                },
                {
                    title: '电台'
                }
            ],
            isDone: false,
            swiperOption: {
                notNextTick: true,
                autoplay: false,
                setWrapperSize: true,
                pagination: false,
                paginationClickable: false,
                mousewheelControl: false,
                observeParents: true,
                loop: false,
                autoHeight: true,
                resistanceRatio: 0.4,



                // 回调函数

                // 当碰触到slider时执行。
                onTouchStart: function (swiper) {
                    clearInterval(timer)
                },
                // 手指触碰Swiper并拖动slide时执行。
                onSliderMove: function (swiper) {
                    var total = 4 * swiper.width;
                    var val = Math.abs(swiper.translate) / total;
                    var progress = document.getElementsByClassName('lining')[0];
                    progress.style.transform = 'translate(' + (100 * val) + 'vw)';
                },
                // 当释放slider时执行。（释放即执行）
                onTouchEnd: function (swiper) {
                    timer = setInterval(function () {
                        var total = 4 * swiper.width;
                        var val = Math.abs(swiper.translate) / total;
                        var progress = document.getElementsByClassName('lining')[0];
                        progress.style.transform = 'translate(' + (100 * val) + 'vw)';
                        // console.log('1')
                    })
                },
                // 当你轻触(tap)Swiper后执行。在移动端，click会有 200~300 ms延迟，所以请用tap代替click作为点击事件
                onTap: function (swiper) {
                    clearInterval(timer)
                },
                // swiper从一个slide过渡到另一个slide结束时执行
                onSlideChangeEnd: function (swiper) {
                    clearInterval(timer)
                },
                // 过渡结束时触发
                onTransitionEnd: function (swiper) {
                    clearInterval(timer)
                },
                onTouchMoveOpposite(swiper, event) {
                    clearInterval(timer)
                    var upDown = setInterval(function () {
                        clearInterval(timer)
                        // console.log('2.1')
                    })
                    setTimeout(function () {
                        clearInterval(upDown)
                    }, 500)
                    // console.log('2')
                },
            },
        }
    },
    components: {
        hot, top, list, radio, loading
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper//获取了swiper,然后可以控制swiper
        }
    },
    mounted() {
        this.init()
        this.toIndex()
    },
    methods: {
        toIndex(index) {
            this.swiper.slideTo(index, 500, true);
            var total = 4 * this.swiper.width;
            var val = Math.abs(this.swiper.translate) / total;
            var progress = document.getElementsByClassName('lining')[0];
            progress.style.transform = 'translate(' + (100 * val) + 'vw)';
        },
        init() {
            var self = this;
            self.swiper.slideTo(3);
            setTimeout(function () {
                self.swiper.slideTo(0);
            }, 500)
            setTimeout(function () {
                self.isDone = true;
            }, 3000)
        }
    }
}

</script>
<style lang="scss">
@import "../../scss/_function.scss";
@import "../../scss/_common.scss";
.swiper-main {
    width: 100%;
    .nav {
        position: fixed;
        top: 4.2rem;
        width: 100%;
        height: 3.65rem;
        z-index: 998;
        .line {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-color: #fdfcfa;
            .lining {
                display: inline-block;
                width: 25%;
                height: 100%;
                border-bottom: 2px solid $primary-color;
                background: rgba(0, 0, 0, 0.05);
                transition: all .3s;
            }
        }
        .main-nav {
            display: flex;
            width: 100%;
            justify-content: space-around;
            align-items: center;
            li {
                width: 25%;
                height: 100%;
                line-height: 3.55rem;
                font-size: 1.55rem;
                font-weight: bold;
                transition: all 1s;
                text-align: center;
            }
            li.active {
                color: $primary-color;
            }
        }
    }
    .swiper-container1 {
        width: 100%;
        margin-top: 7.55rem;
        overflow: hidden;
        .swiper-wrapper {
            width: 100%;
            .swiper-slide {
                width: 100%;
            }
        }
    }
}
</style>

