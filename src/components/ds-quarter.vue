<template>
  <div>
    <el-popover
      placement="bottom"
      width="200"
      trigger="focus"
      v-model="visible"
    >
      <div class="optionBox">
        <span
          v-for="(item, index) in options"
          :key="index"
          :class="{ color: query === item }"
          @click="selected(item)"
          >{{ item.label }}</span
        >
      </div>
      <el-input slot="reference" v-model="query"></el-input>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "ds-quarter",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: String
  },
  components: {},
  data() {
    return {
      visible: false,
      query: "",
      options: [
        { label: "第一季度", value: "1" },
        { label: "第二季度", value: "2" },
        { label: "第三季度", value: "3" },
        { label: "第四季度", value: "4" }
      ]
    };
  },
  created() {
    this.query = this.filtered(this.value);
  },
  watch: {
    value(newVal) {
      this.query =this.filtered(newVal);
    }
  },
  methods: {
    selected(item) {
      this.visible = false;
      this.query = item.label;
      this.$emit("input", item.value);
    },
    filtered(val){
      for(let i=0;i<this.options.length;i++){
        if(this.options[i].value===val){
          return this.options[i].label
        }
      }
      return val
    }
  }
};
</script>
<style lang="less" scoped>
.optionBox {
  display: flex;
  padding: 10px 25px;
  flex-wrap: wrap;
  justify-content: space-between;
  span {
    cursor: pointer;
    margin: 8px 0;
  }
  span:hover {
    color: #276ce3;
  }
}
.color {
  color: #276ce3;
}
</style>
