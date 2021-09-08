<template>
  <div class="ds-node">
    <div
      class="node-title"
      :style="'padding-left:' + nodeData.lv * 20 + 'px'"
      v-bind:class="{ active: active }"
    >
      <span class="node-title-name" @click="test">{{ nodeData.data.name }}</span>
      <span
        class="node-title-icon el-icon-arrow-right"
        :class="{ isOpen: isOpen }"
        v-if="isFolder"
        @click="toggle"
      ></span>
    </div>
    <div class="ds-tree-content" v-if="isFolder" v-show="isOpen">
      <ds-tree-node
        v-for="(item, index) in nodeData.childDepts"
        :node-data="item"
        :key="index"
        :active-id="activeId"
        @nodeOpen="nClick"
        @nodeClick="nodeClick"
      ></ds-tree-node>
    </div>
  </div>
</template>
<script>
export default {
  name: "dsTreeNode",
  props: {
    nodeData: {
      type: Object,
      default: () => {}
    },
    activeId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    isFolder: function() {
      return this.nodeData.childDepts && this.nodeData.childDepts.length;
    },
    active: function() {
      return this.activeId === this.nodeData.id;
    }
  },
  mounted() {},
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      this.$emit("nodeOpen", this.nodeData);
    },
    nClick(data) {
      this.$emit("nodeOpen", data);
    },
    nodeClick(data){
      this.$emit("nodeClick", data);
    },
    test() {
      this.$emit("nodeClick", this.nodeData);
    }
  }
};
</script>
<style lang="less" scoped>
.ds-node {
  box-sizing: border-box;
  box-sizing: border-box;
  background-color: aqua;
}
.node-title {
  display: inline-block;
  cursor: pointer;
  padding: 10px 0;
}
.node-title-icon {
  transition: all 0.3s;
  margin-left: 10px;
}
.isOpen {
  transform: rotateZ(90deg);
}
.active {
  color: rgb(230, 9, 9);
}
</style>
