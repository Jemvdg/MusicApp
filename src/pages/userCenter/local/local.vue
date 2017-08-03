<template>
    <div class="local-songlist">
        <div class="local-nav">
            <router-link to="/user">
                <i class="fa fa-angle-left"></i>&nbsp本地歌曲</router-link>
        </div>
        <ul class="main-nav">
            <li v-for="item,index in music" :key="index">
                <router-link :to="item.path">{{item.title}}</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
export default {

    data() {
        return {
            music: [
                {
                    path: '/user/local/song',
                    title: '歌曲'
                },
                {
                    path: '/user/local/file',
                    title: "文件夹"
                },
                {
                    path: '/user/local/singer',
                    title: "歌手",
                },
                {
                    path: '/user/local/ablum',
                    title: '专辑'
                }
            ]
        }
    }
}
</script>

<style lang="scss">
@import '../../../scss/_function.scss';
@import '../../../scss/_common.scss';
.local-songlist {
    .local-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: rem(85);
        line-height: rem(85);
        background: $primary-color;
        text-indent: rem(15);
        z-index: 998;
        a {
            font-size: 2rem;
            font-weight: bold;
            color: #fff;
        }
    }

    .main-nav {
        position: fixed;
        top: rem(85);
        display: flex;
        width: 100%;
        height: 3.55rem;
        background: #fdfcfa;
        justify-content: space-around;
        align-items: center;
        z-index: 1;
        li {
            width: 25%;
            height: 100%;
            line-height: 3.55rem;
            text-align: center;
            a {
                display: block;
                width: 100%;
                height: 100%;
                border-bottom: 2px solid rgba(0, 0, 0, .5);
                font-size: 1.55rem;
                font-weight: bold;
                transition: all 1s;
            }
            a.active {
                border-bottom: 2px solid $primary-color;
                color: $primary-color;
            }
        }
    }


}
</style>
