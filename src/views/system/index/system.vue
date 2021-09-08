<template>
  <div class="childrenBox">
    <div class="childrenTabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="item.label"
          :name="item.url"
          v-for="(item, index) in tabList"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="childrenMain">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import utilMmenu from "@/utils/menu";
export default {
  name: "system",
  created() {
    this.tabList = utilMmenu.system;
    this.activeName = utilMmenu.system[0].url;
  },
  data() {
    return {
      activeName: "/first",
      tabList: []
    };
  },
  watch: {
    $route(to, from) {
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({path:tab.name})
    }
  }
};
</script>
<style lang="less" scoped>
.childrenBox {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 4px 4px 0 0;
  padding: 20px;
}
.childrenTabs {
  float: left;
  width: 100%;
}
.childrenMain {
  height: 100%;
  box-sizing: border-box;
  padding-top: 60px;
}
div /deep/ .el-tabs__item {
  height: 50px;
}
</style>
