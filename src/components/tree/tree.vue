<template>
  <!--  nodeOpen 展开回调 
        nodeClick 点击节点回调
        activeId 默认选中ID 
        treeData 数据
        <ds-tree
          :treeData="treeData"
          @node-click="nodeClick"
          @node-open="nodeOpen"
          :active-id="activeId"
        ></ds-tree> 
  -->
  <div class="ds-tree">
    <ds-tree-node
      v-for="(item, index) in nodeData"
      :node-data="item"
      :key="index"
      :active-id="activeIdData"
      @nodeOpen="nodeOpen"
      @nodeClick="nodeClick"
    >
    </ds-tree-node>
  </div>
</template>
<script>
import dsTreeNode from "@/components/tree/tree-node.vue";
import multiarr from "./node";
export default {
  name: "dsTree",
  components: {
    dsTreeNode
  },
  props: {
    treeData: {
      type: Array
    },
    activeId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeIdData: this.activeId
    };
  },
  computed: {
    nodeData() {
      return multiarr(this.treeData);
    }
  },
  methods: {
    nodeOpen(data) {
      this.$emit("node-open", data);
    },
    nodeClick(data) {
      this.activeIdData = data.id;
      this.$emit("node-click", data);
    }
  }
};
</script>
<style lang="less" scoped>
.a {
  font-weight: bold;
}
</style>
