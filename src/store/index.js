import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    audio: '',
    musicId: '',
    musicData: {
      singdata: '',
      songname: '',
      singer: '',
      singpic: ''
    },
    isPlay: false,
    musicList: ['26243686','1484889','1921734','28737747','415593530', '5041591', '26758474', '399340511'],
    musicModal: 2,
  },
  mutations: {
    getAudio(state, dom) {
      state.audio = dom;
    },
    changeId(state, id) {
      state.musicId = id;
    },
    initMusic(state) {
      state.musicId = state.musicList[0];
    },
    playMusic(state) {
      state.isPlay = !state.isPlay;
    },
    changeMusiclist(state, newArr) {
      state.musicList = newArr;
      state.musicId = state.musicList[0];
      state.isPlay = true;
      state.audio.autoplay = true;
    },
    nextMusic(state) {
      state.isPlay = true;
      state.audio.autoplay = true;
      var length = state.musicList.length;
      switch (state.musicModal) {
        case 0:
          state.audio.play() //单曲循环 0
          state.audio.currentTime = 0;
          break;
        case 1:
          var index = state.musicList.indexOf(state.musicId);
          if (index === length - 1) {
            index = 0;
          } else {
            index += 1;
          }
          state.musicId = state.musicList[index];
          break;
        case 2:
          var index = Math.floor(Math.random() * length)
          var preSong = state.musicId;
          var nextSong = state.musicList[index];
          if (preSong === nextSong) {
            state.audio.currentTime = 0;
          } else {
            state.musicId = state.musicList[index];
          }
          break;
      }
      // console.log('第' + (index + 1) + '首')
    },
    preMusic(state) {
      state.isPlay = true;
      state.audio.autoplay = true;
      var length = state.musicList.length;
      var index = state.musicList.indexOf(state.musicId);
      switch (state.musicModal) {
        case 0:
          state.audio.play() //单曲循环 0
          state.audio.currentTime = 0;
          break;
        case 1:
          var index = state.musicList.indexOf(state.musicId);
          if (index === 0) {
            index = length - 1;
          } else {
            index -= 1;
          }
          state.musicId = state.musicList[index];
          break;
        case 2:
          var index = Math.floor(Math.random() * length)
          var preSong = state.musicId;
          var nextSong = state.musicList[index];
          if (preSong === nextSong) {
            state.audio.currentTime = 0;
          } else {
            state.musicId = state.musicList[index];
          }
          break;
      }
      // console.log('第' + (index + 1) + '首')
    },
    changeModal(state) {
      switch (state.musicModal) {
        case 0:
          state.musicModal = 1
          break;
        case 1:
          state.musicModal = 2
          break;
        case 2:
          state.musicModal = 0
          break;
      }
    }
  },
})
