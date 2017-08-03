<template>
    <div>
        <ul class="c-menu">
            <li>
                <i class="fa fa-star-o fa-fw"></i>
                <p>{{listData.subscribedCount}}</p>
            </li>
            <li>
                <i class="fa fa-commenting-o fa-fw"></i>
                <p>{{listData.commentCount}}</p>
            </li>
            <li>
                <i class="fa fa-share-alt fa-fw"></i>
                <p>{{listData.shareCount}}</p>
            </li>
            <li>
                <i class="fa fa-download fa-fw"></i>
                <p>下载</p>
            </li>
        </ul>
        <div class="c-title">
            <div class="c-play-all" @click="changeMusiclist(songlist)">
                <i class="fa fa-play fa-fw"></i>
                播放全部
                <span>(共{{tracks.length}}首)</span>
            </div>
            <div class="c-select">
                <i class="fa fa-list-ul fa-fw"></i>
                多选
            </div>
        </div>
        <div class="c-songs" v-for="item,index in tracks" :key="index">
            <span class="c-no">{{index+1}}</span>
            <div class="c-songs-info" @click="changeAgain(item.id,songlist)">
                <div class="c-songs-info-2">
                    <h4 class="c-songs-name">{{item.name}}</h4>
                    <p class="c-songer">{{item.ar[0].name}}-{{item.al.name}}</p>
                </div>
                <span class="c-ellipsis">
                    <i class="fa fa-ellipsis-v"></i>
                </span>
            </div>
    
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    props: ['listData', 'tracks', 'songlist'],
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        ...mapMutations([
            'changeId', 'changeMusiclist'
        ]),
        changeAgain(id, newArr) {
            var audio = document.getElementById('musicBox')
            this.changeMusiclist(newArr)
            this.changeId(id)
        },
    }
}
</script>
<style lang="scss">
@import "../../scss/_function.scss";
</style>