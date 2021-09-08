<template>
  <div class="tabPage" id="tabPage">
    <div @mousedown="move" class="box">
      <ul class="tabs" id="tabs">
        <li
          class="tab"
          v-bind:class="{ isactive: activeIndex == item.url }"
          v-for="(item, index) in tabList"
          :key="index"
          @click="switchTab(item)"
        >
          {{ item.name }}
          <i class="el-icon-close tabClose" @click.stop="closeTab(item)"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  name: "dsTabspage",
  data() {
    return {};
  },
  watch: {
    $route(e) {
      this.initRouter();
    }
  },
  created() {
    this.initRouter();
  },
  computed: {
    tabList() {
      return store.state.tabList;
    },
    activeIndex() {
      return this.$route.path;
    },
    tabKeepAlives() {
      return this.tabList.map(item => {
        return item.name;
      });
    }
  },
  methods: {
    move(e) {
      let odiv = e.currentTarget; //获取目标元素
      let tabPage = document.getElementById("tabPage");
      if (tabPage.offsetWidth > odiv.offsetWidth) {
        return false;
      }
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面
        this.positionX = top;
        this.positionY = left;

        //移动当前元素
        if(left<0){
            odiv.style.left = left + "px";
        }else{
            odiv.style.left = 0 + "px";
        }
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false
    },
    switchTab(e) {
      if (this.activeIndex === e.url) {
        return false;
      }
      this.$router.push({ path: e.url });
    },
    closeTab(e) {
      let key = -1;
      let active = -1;
      for (let i in this.tabList) {
        if (this.tabList[i].url === e.url) {
          key = i;
        }
      }
      for (let i in this.tabList) {
        if (this.tabList[i].url === this.activeIndex) {
          active = i;
        }
      }
      if (key - 1 + 2 === this.tabList.length) {
        this.switchTab(this.tabList[key - 1]);
        store.commit("CLOSE_TAB_VIEW", e);
      } else {
        if (active === key) {
          this.switchTab(this.tabList[key - 1 + 2]);
          store.commit("CLOSE_TAB_VIEW", e);
        } else {
          store.commit("CLOSE_TAB_VIEW", e);
        }
      }
    },
    initRouter() {
      let e = this.$route;
      let activeIndex = e.path;
      let menuList = this.flatten(
        JSON.parse(sessionStorage.getItem("menulist"))
      );
      for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].url == activeIndex) {
          store.commit("ADD_TAB_VIEW", {
            url: menuList[i].url,
            name: menuList[i].name
          });
        }
      }
    },
    flatten(obj) {
      let arr = [];
      for (let i = 0; i < obj.length; i++) {
        arr.push(obj[i]);
        if (obj[i].childs.length > 0) {
          arr = arr.concat(this.flatten(obj[i].childs));
        }
      }
      return arr;
    }
  },
  directives: {
    drag: function(el) {
      let dragBox = el; //获取当前元素
      console.log(dragBox);
      dragBox.onmousedown = e => {
        //算出鼠标相对元素的位置
        let disX = e.clientX - dragBox.offsetLeft;
        document.onmousemove = e => {
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX;
          //   console.log(e.clientX, disX);
          //移动当前元素
          dragBox.style.left = left + "px";
        };
        document.onmouseup = e => {
          //鼠标弹起来的时候不再移动
          document.onmousemove = null;
          //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null;
        };
      };
    }
  }
};
</script>
<style scoped>
.tabPage {
  height: 50px;
  background-color: #fff;
  flex: 1;
  overflow: hidden;
  position: relative;
}
.box {
  position: absolute;
  top: 18px;
  left: 0px;
  height: 32px;
}
.tabs {
  height: 32px;
  width: 9999px;
}
.tab {
  float: left;
  list-style: none;
  background: #f7f8fa;
  border-radius: 2px 2px 0px 0px;
  color: #333;
  height: 32px;
  line-height: 30px;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  text-align: left;
  padding-left: 8px;
  padding-right: 30px;
  margin-left: 24px;
}
.tabClose {
  position: absolute;
  font-size: 12px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
  z-index: 3;
  color: #000;
}
.isactive {
  color: #276ce3;
}
</style>
