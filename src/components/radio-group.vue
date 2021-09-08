<template>
  <div class="radioGroup">
    <div
      class="radio"
      @click="change(item)"
      v-for="(item, index) in radioData"
      :key="index"
    >
      {{ item[exhibition] }}
      <i class=" el-icon-close close" @click="close(item)"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "radioGroup",
  props: {
    radioData: {
      // 对象集合
      type: Array,
      default: () => []
    },
    exhibition: {
      // 展示属性值
      type: String,
      default: ""
    }
  },
  methods: {
    change(item) {
      let key = -1;
      for (let i = 0; i < this.radioData.length; i++) {
        if (this.radioData[i][this.exhibition] === item[this.exhibition]) {
          key = i;
        }
      }
      item.index=key
      this.$emit("radioChange", item);
    },
    close(item) {
      this.$emit("radioClose", item);
    }
  }
};
</script>
<style lang="less" scoped>
.radioGroup {
  display: flex;
  margin-bottom: 32px;
  max-width: 800px;
  flex-wrap: wrap;
  .radio {
    padding: 8px 24px;
    width: 80px;
    color: #969799;
    border: 1px solid #dcdee0;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    .close {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 12px;
      height: 12px;
      background-color: #e2eaf8;
      border-radius: 50%;
      display: none;
      font-size: 12px;
      color: #276ce3;
      z-index: 3;
      cursor: pointer;
    }
  }
  .radio:hover {
    color: #276ce3;
    border: 1px solid #276ce3;
    .close {
      display: block;
    }
  }
}
</style>
