<template>
  <div class="index-page">
    <el-container>
      <el-aside width="176px">
        <div class="el-header-title">
          <img src="../../assets/image/logo.png" alt="" />
          <span>园区管理系统</span>
        </div>
        <ds-header :menu-list="menuList"></ds-header>
      </el-aside>
      <el-container>
        <el-header height="56px">
          <ds-tabspage></ds-tabspage>
          <div class="user">
            <el-avatar
              :size="40"
              :src="userInfo.picUrl"
              @error="errorHandler"
            >
              <img :src="require('assets/image/fail.png')" />
            </el-avatar>
            <el-dropdown>
              <span class="el-dropdown-link">
                <span>{{userInfo.user_name}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="loginout"
                  >loginout</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import dsHeader from "@/components/header.vue";
import dsTabspage from "@/components/ds-tabspage.vue";
import { httpGet } from "@/http";
import jwt_decode from "jwt-decode";
export default {
  name: "Index",
  components: {
    dsHeader,
    dsTabspage
  },
  data() {
    return {
      menuList: [],
      userInfo: {}
    };
  },
  created() {
    let token = sessionStorage.getItem("token");
    this.userInfo = jwt_decode(token);
    // this.$store.state.userType=this.userInfo;
    httpGet("/ucenter/menu/queryUserMenusTrees")
      .then(r => {
        if (r.code === "1000000000") {
          this.menuList = r.result;
        }
      })
      .catch(err => {
        this.$message.error(err);
      });
  },
  methods: {
    errorHandler() {
      return true;
    },
    loginout() {
      window.sessionStorage.clear();
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.index-page {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
}
.el-aside {
  background-color: #276ce3;
  position: relative;
  box-sizing: border-box;
  padding-top: 56px;
}
.el-header {
  display: flex;
  height: 56px;
  align-items: center;
  .user {
    margin-left: 20px;
    display: flex;
    align-items: center;
    .el-dropdown {
      margin-left: 20px;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-menu.el-menu--horizontal {
  border: none;
}
.el-main {
  background-color: #F7F8FA;
  padding: 16px 16px 10px 16px;
}
.el-header-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 32px;
    height: auto;
    margin-right: 4px;
  }
  span {
    color: #fff;
  }
}
</style>