<template>
  <el-menu
    :default-active="$route.path"
    router
    class="el-menu-demo"
    mode="vertical"
    :unique-opened="true"
  >
    <template v-for="(item, index) in menuList">
      <el-submenu :key="index" :index="item.url" v-if="item.childs.length>0">
        <template slot="title">{{ item.name }}</template>
        <el-menu-item
          v-for="(sonItem, key) in item.childs"
          :key="key"
          :index="sonItem.url"
          >{{ sonItem.name }}</el-menu-item
        >
      </el-submenu>
      <el-menu-item :key="index" v-else :index="item.url">{{
        item.name
      }}</el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import "assets/styles/el-menu.css";
export default {
  name: "dsHeader",
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
};
</script>
