<template>
    <div class="sub-hot">
        <div class="list-top">
            <div class="top-left">
                <router-link to="/music">
                    <i class="fa fa-arrow-left"></i>
                </router-link>
                <span>推荐歌单</span>
            </div>
            <div class="top-right">
                <i class="fa fa-search"></i>
                <span>
                    <i class="fa fa-ellipsis-v"></i>
                </span>
            </div>
        </div>
        <div class="c-list-info">
            <div class="c-image-info">
                <img :src="coverImg" alt="">
                <span class="c-play-count">
                    <i class="fa fa-headphones fa-fw"></i>{{playCount}}</span>
                <span class="c-info-icon">
                    <i class="fa fa-info-circle fa-3x"></i>
                </span>
            </div>
            <div class="c-text-info">
                <h3>{{listName}}</h3>
                <div class="c-author">
                    <img :src="avatarUrl" alt="">
                    <span class="c-name">{{listCreator}}
                        <i class="fa fa-angle-right fa-fw"></i>
                    </span>
                </div>
            </div>
        </div>
        <listmenu :listData="listData" :tracks="tracks" :songlist="songlist"></listmenu>
        <loading v-if="!isDone"></loading>
    </div>
</template>
<script>
import listmenu from '../../../../components/top_menu/index';
import loading from '../../../../components/loading/loading2';

export default {
    components: {
        loading,
        listmenu
    },
    data() {
        return {
            listData: [],
            coverImg: '',
            listName: '',
            listCreator: '',
            playCount: '',
            shareCount: '',
            avatarUrl: '',
            tracks: [],
            songlist: [],
            listId: this.$route.params.id,
            isDone: false,
        }
    },
    created() {
        this.$http.get('http://localhost:3000/playlist/detail?id=' + this.listId)
            .then(data => {
                var result = data.body;
                this.listData = result.playlist;
                this.coverImg = result.playlist.coverImgUrl;
                this.listName = result.playlist.name;
                this.listCreator = result.playlist.creator.nickname;
                this.playCount = result.playlist.playCount;
                this.shareCount = result.playlist.shareCount;
                this.avatarUrl = result.playlist.creator.avatarUrl;
                this.tracks = result.playlist.tracks;
                this.isDone = true;
                for (var i in this.tracks) {
                    this.songlist.push(this.tracks[i].id)
                }
            });
    },

}
</script>
<style lang="scss">
@import '../../../../scss/_function.scss';
@import '../../../../scss/_common.scss';
.sub-hot {
    padding-bottom: 9vh;
    .list-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        height: rem(85);
        line-height: rem(85);
        background: $primary-color;
        z-index: 998;
        .top-left {
            padding-left: 20px;
            font-size: 18px;
            color: #fff;
            .fa {
                color: #fff;
            }
        }
        .top-right {
            padding-right: 20px;
            font-size: 18px;
            color: #fff;
            span {
                margin-left: 30px;
                font-size: 18px;
                color: #fff;
            }
        }
    }

    .c-list-info {
        position: relative;
        display: flex;
        justify-content: space-between;
        margin-top: rem(85);
        height: rem(300);
        padding: 20px;
        overflow: hidden;
        z-index: 997;
        background: #fff;
        .c-image-info {
            position: relative;
            width: 48%;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: auto;
                z-index: 1;
            }
            .c-play-count {
                position: absolute;
                top: rem(4);
                right: rem(10);
                z-index: 2;
                font-size: rem(16);
                color: #fff;
            }
            .c-info-icon {
                position: absolute;
                bottom: rem(-30);
                right: rem(10);
                z-index: 2;
                font-size: rem(16);
                color: #fff;
            }
        }
        .c-text-info {
            width: 48%;
            height: 100%;
            h3 {
                margin: 20px 0;
                line-height: rem(40);
                font-size: rem(32);
            }
            .c-author {
                display: flex;
                align-items: center;
                img {
                    display: inline-block;
                    width: rem(50);
                    height: rem(50);
                    border-radius: rem(25);
                    margin-right: 10px;
                }
            }
        }
    }

    .c-menu {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: rem(20) rem(80);
        z-index: 997;
        background-color: #fff;
        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: rem(28);
            .fa {
                font-size: rem(36)
            }
        }
    }

    .c-title {
        position: relative;
        display: flex;
        justify-content: space-between;
        z-index: 997;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;
        background: #fff;
        .c-play-all {
            padding-left: 20px;
            font-size: rem(28);
            span {
                color: gray;
            }
        }
        .c-select {
            padding-right: 20px;
        }
    }

    .c-songs {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        z-index: 997;
        background-color: #fff;
        .c-no {
            padding: 0 20px;
        }
        .c-songs-info {
            width: 90%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
            .c-songs-name {
                font-weight: bold;
            }
            .c-songer {
                padding: 8px 0;
                color: gray;
            }
            .c-ellipsis {
                padding-right: 20px;
            }
        }
    }
}
</style>

