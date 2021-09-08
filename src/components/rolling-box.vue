<template>
  <!-- 锚点滚动盒子 返回当前位置id -->
  <div>
    <el-scrollbar ref="scroll" :style="{ height: height + 'px' }">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input"
  },
  name: "rollingBox",
  props: {
    height: Number,
    value: String
  },
  data() {
    return {
      active: "",
      timer: null
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.handleScroll();
    });
  },
  watch: {},
  methods: {
    handleScroll() {
      let nodeList = this.$refs["scroll"].wrap.childNodes[0].childNodes;
      let scrollbarEl = this.$refs.scroll.wrap;
      scrollbarEl.onscroll = () => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          let scrollTop = this.$refs.scroll.wrap.scrollTop;
          for (let i = 0; i < nodeList.length - 1; i++) {
            let frontHeight = 0;
            let afterHeight = 0;
            for (let j = 1; j < i + 1; j++) {
              frontHeight += nodeList[j].offsetHeight;
            }
            for (let j = 1; j < i + 2; j++) {
              afterHeight += nodeList[j].offsetHeight;
            }
            if (scrollTop >= frontHeight+200 && scrollTop < afterHeight+200) {
              if (nodeList[i].id) {
                this.active = nodeList[i].id;
                this.$emit("input", nodeList[i].id);
              } else {
                new Error("需要给元素设置id");
              }
            }
          }
        }, 50);
      };
    }
  }
};
</script>