<template>
    <div class="music-playing">
        <div class="songpage">
            <div class="songpage-bg">
                <img :src="pic">
                <div class="mark"></div>
            </div>
            <div class="return" @click="backSong()">
                <i class="fa fa-arrow-left"></i> &nbsp返回
            </div>
            <div class="playing-album" :style="{'backgroundImage':'url('+pic+')'}">
                <div class="album-circle"></div>
            </div>
            <div class="song-info">
                <h2>{{songname}}</h2>
                <h3>{{singer}}</h3>
            </div>
            <div class="album-control">
                <div class="control-btn">
                    <i class="fa fa-step-backward" @click="preMusic()"></i>
                    <i class="fa fa-pause-circle-o" v-if="isPlay" @click="play()"></i>
                    <i class="fa fa-play-circle-o" v-if="!isPlay" @click="play()"></i>
                    <i class="fa fa-step-forward" @click="nextMusic()"></i>
                </div>
                <div class="control-progress">
                    <div class="control-line"></div>
                </div>
            </div>
        </div>
        <footer class="play">
            <div class="play-info " @click="toSong()">
                <img :src="pic" alt="fff">
                <h6 class="play-name">{{songname}}</h6>
                <p class="play-songer">{{singer}}</p>
            </div>
            <ul class="play-control ">
                <li>
                    <i class="fa fa-play fa-2x" v-if="!isPlay" @click="play()"></i>
                    <i class="fa fa-pause fa-2x" v-if="isPlay" @click="play()"></i>
                </li>
                <li>
                    <i class="fa fa-step-forward fa-2x" @click="nextMusic()"></i>
                </li>
                <li @click="changeModal()">
                    <i v-if="musicModal===0" class="fa fa-refresh fa-2x"></i>
                    <i v-if="musicModal===1" class="fa fa-list fa-2x"></i>
                    <i v-if="musicModal===2" class="fa fa-random fa-2x"></i>
                </li>
            </ul>
            <audio id="musicBox" :src="url" ref="audio"></audio>
        </footer>
    </div>
</template>
    
<script>
import { mapMutations, mapState } from 'vuex';//引进辅助，使mutations的方法引用和state的参数引用可以简写
let rotates
let rotateVal
let enddingPoint
let enddingLine
export default {

    data() {
        return {
            url: '',
            singer: '',
            songname: '',
            pic: '',
            cuttentTime: 0,
        }
    },
    components: {

    },
    computed: {
        ...mapState({
            musicId: state => state.musicId,
            musicModal: state => state.musicModal,
            isPlay: state => state.isPlay,
            musicModal: state => state.musicModal,
        })
    },
    watch: {
        musicId(newValue, old) {
            if (newValue !== old) {
                this.getId(newValue)
            }
        },
    },

    created() {
        this.getId(this.musicId);
    },
    mounted() {
        var self = this;
        var audio = document.getElementById('musicBox')
        // audio.currentTime = 6;//设置开始时间为第6s
        this.getAudio(audio);
    },
    methods: {
        ...mapMutations([
            'changeId', 'nextMusic', 'preMusic', 'playMusic', 'getAudio','changeModal'
        ]),
        play() {
            var self = this;
            let audio = this.$refs.audio;
            var line = document.getElementsByClassName('control-line')[0]
            clearInterval(enddingPoint)
            clearInterval(enddingLine)
            if (audio.readyState === 4) {
                if (self.isPlay === false) {
                    self.playMusic();
                    audio.play();
                    enddingLine = setInterval(function () {
                        line.style.width = Math.floor(((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100)) + '%';
                    }, 100)
                    enddingPoint = setInterval(function () {
                        // console.log('播放是否结束：' + audio.ended)
                        if (audio.ended) {
                            audio.autoplay = true;
                            self.nextMusic()
                        }
                    }, 1000)
                } else {
                    audio.autoplay = false;
                    self.playMusic();
                    audio.pause();
                }
            }
        },
        getId(id) {
            Promise.all([this.$http.get('http://localhost:3000/music/url?id=' + id),
            this.$http.get('http://localhost:3000/song/detail?ids=' + id)]).
                then(data => {
                    this.url = data[0].body.data[0].url;
                    this.singdata = data[1].data.songs[0];
                    this.songname = this.singdata.name;
                    this.singer = this.singdata.ar[0].name;
                    this.pic = this.singdata.al.picUrl;
                })

        },
        toSong() {
            $('.songpage').fadeIn()
            $('.play').css('bottom', '-5.5rem')
            clearInterval(rotates)
            rotateVal = 0;
            rotates = setInterval(function () {
                if (rotateVal > 360) {
                    rotateVal = 0;
                }
                rotateVal += 0.1;
                // console.log(rotateVal)
                $('.playing-album').css('transform', 'translateX(-50%) rotate(' + rotateVal + 'deg)')
            }, 0)
        },
        backSong() {
            clearInterval(rotates)
            rotateVal = 0;
            $('.songpage').fadeOut()
            $('.play').css('bottom', '0')
        },

    },


};

</script>

<style lang="scss">
@import "../../scss/_common.scss";

.music-playing {
    z-index:99999;
    .songpage {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 998;
        background-color: rgba(0, 0, 0, 1);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        .songpage-bg {
            position: fixed;
            top: 0;
            left: 50%;
            width: 200%;
            height: 200%;
            z-index: 997;
            transform: translateX(-50%);
            img {
                width: 100%;
                filter: blur(10px);
            }
            .mark {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .8);
            }
        }
        .return {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            line-height: 4rem;
            background-color: $primary-color;
            z-index: 999!important;
            font-size: 2rem;
            text-indent: 1rem;
            color: #fff;
        }
        .playing-album {
            position: fixed;
            top: 25vh;
            left: 50%;
            width: 70vw;
            height: 70vw;
            margin: 0 auto;
            border-radius: 100%;
            z-index: 998;
            transform: translateX(-50%);
            .album-circle {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 25vw;
                height: 25vw;
                border-radius: 100%;
                background: url('./playingAblum.jpg') no-repeat center;
                background-size: cover;
                transform: translate(-50%, -50%);
            }
        }
        .song-info {
            position: fixed;
            top: 55vh;
            left: 50%;
            width: 50%;
            z-index: 998;
            background-color: rgba(0, 0, 0, .3);
            transform: translateX(-50%);
            h2,
            h3 {
                line-height: 2.5rem;
                font-size: 2rem;
                text-align: center;
                color: #fff;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .album-control {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 30vh;
            z-index: 998;
            .control-btn {
                display: flex;
                width: 100%;
                justify-content: space-around;
                align-items: center;
                i {
                    font-size: 6rem;
                    color: $primary-color;
                    transition: all .5s;
                }
            }
            .control-progress {
                position: relative;
                top: 5rem;
                left: 50%;
                width: 90%;
                height: 0.5rem;
                border-radius: 4px;
                background-color: rgba(255, 255, 255, .5);
                transform: translateX(-50%);
                .control-line {
                    width: 1%;
                    height: 100%;
                    background-color: $primary-color;
                }
            }
        }
    }
    .play {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5.5rem;
        padding: 0 8px;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, .8);
        z-index: 998;
        transition: all .5s;
        .play-info {
            width: 60%;
            img {
                float: left;
                margin-right: 10px;
                width: 50px;
            }
            .play-name {
                margin-top: 8px;
                font-size: 16px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .play-songer {
                margin-top: 10px;
                font-size: 14px;
                color: #94908b;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
        .play-control {
            display: flex;
            justify-content: space-between;
            position: absolute;
            top: 50%;
            right: 30px;
            width: 30%;
            transform: translateY(-50%);
            li {
                font-size: 1rem;
                color: #b30000;
            }
        }
    }
}
</style>
