<template>
  <div
    class="modal-backdrop"
    v-show="visible"
    @keyup.esc="CancelHandler"
    @click.self="CancelHandler"
  >
    <i class="el-icon-close" @click="CancelHandler"></i>
    <div class="previewMediaBox">
      <div class="title">{{ activeName }}</div>
      <template v-for="(item, index) in list">
        <div class="media" :key="index" v-if="index == page">
          <video
            class="imageVideo"
            ref="video"
            :src="imgBaseUrl + item.annexPath"
            v-if="isVideo(item.annexType)"
          ></video>
          <img
            class="imageVideo"
            :src="imgBaseUrl + item.annexPath"
            v-if="isImg(item.annexType)"
          />
        </div>
      </template>
      <div class="pagedown">
        <span @click="prev">上一张</span>
        <span @click="next">下一张</span>
      </div>
    </div>
  </div>
</template>
<script>
import { imgBaseUrl } from "@/http";
export default {
  name: "dsModal",
  props: {
    visible: { type: Boolean, default: false },
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      page: 0,
      imgBaseUrl: imgBaseUrl
    };
  },
  computed: {
    activeName() {
      if (this.list.length > 0) {
        return this.list[this.page].annexName;
      } else {
        return "";
      }
    }
  },
  methods: {
    CancelHandler() {
      if (this.$refs.video) {
        this.$refs.video[0].pause();
      }
      this.$emit("update:visible", false);
    },
    isVideo(suffix) {
      if (suffix === "mp4") {
        return true;
      } else {
        return false;
      }
    },
    isImg(suffix) {
      let formatList = ["png", "jpg", "jpeg"];
      return formatList.includes(suffix);
    },
    prev() {
      if (this.$refs.video) {
        this.$refs.video[0].pause();
      }
      if (this.page === 0) {
        this.page = this.list.length - 1;
      } else {
        this.page = this.page - 1;
      }
    },
    next() {
      if (this.page + 1 === this.list.length) {
        this.page = 0;
      }else{
        this.page = this.page + 1;
      }
      if (this.$refs.video) {
        this.$refs.video[0].pause();
      }
      
    }
  }
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 176px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2030;
}
.el-icon-close {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  color: #fff;
  z-index: 2031;
  cursor: pointer;
}
.previewMediaBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  color: #ffffff;
  margin-top: -100px;
}
.imageVideo {
  height: 360px;
  width: auto;
  margin: 100px 0 40px 0;
}
.pagedown {
  width: 240px;
  height: 40px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30px;
  justify-content: space-between;
}
.pagedown span {
  cursor: pointer;
}
</style>
