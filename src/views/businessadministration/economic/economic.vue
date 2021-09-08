<template>
  <div class="alone" id="alone">
    <el-tabs v-model="activeName">
      <el-tab-pane label="指标管理" name="first"
        ><div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <el-form-item label="指标类型">
              <el-select v-model="sreachForm.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="父节点名称">
              <el-select v-model="sreachForm.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="搜索指标名称"
                clearable
                v-model="sreachForm.any"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                  @click="initTable()"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="dialogFormVisible = true"
            >添加</el-button
          >
        </div>
        <div class="tablebox" id="tablebox">
          <el-table
            :data="tableData"
            :height="table.height"
            v-if="table.height"
            :header-cell-style="{ background: '#F7F8FA' }"
          >
            <el-table-column prop="date" label="指标名称" align="left">
            </el-table-column>
            <el-table-column prop="name" label="父节点名称" align="left">
            </el-table-column>
            <el-table-column prop="address" label="指标类型" align="left">
            </el-table-column>
            <el-table-column prop="address" label="指标说明" align="left">
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-link type="primary" @click="editEnterIndex(scope.row)"
                  >编辑</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="deleteEnterIndex(scope.row)"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="1000"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="指标值管理" name="second">
        <div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <el-form-item label="指标类型">
              <el-select v-model="sreachForm.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="搜索指标名称"
                clearable
                v-model="sreachForm.any"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                  @click="initTable()"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="dialogFormTargeted = true"
            >添加</el-button
          >
        </div>
        <div class="tablebox" id="tablebox">
          <el-table
            :data="tableData"
            :height="table.height"
            v-if="table.height"
            :header-cell-style="{ background: '#F7F8FA' }"
          >
            <el-table-column prop="date" label="分类名称" align="left">
            </el-table-column>
            <el-table-column prop="name" label="对应标准" align="left">
            </el-table-column>
            <el-table-column prop="address" label="指标名称" align="left">
            </el-table-column>
            <el-table-column prop="address" label="所属行业" align="left">
            </el-table-column>
            <el-table-column prop="address" label="指标类型" align="left">
            </el-table-column>
            <el-table-column prop="address" label="指标值范围" align="left">
            </el-table-column>
            <el-table-column prop="address" label="指标级别" align="left">
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-link type="primary" @click="detailsSpaceValue(scope.row)"
                  >详情</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="editEnterValue(scope.row)"
                  >编辑</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="deleteEnterValue(scope.row)"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="1000"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 指标管理新增 -->
    <el-dialog title="新增信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="父节点名称" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> </el-form-item
        ><el-form-item label="指标名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="指标类型" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标说明" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.desc"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 指标值新增 -->
    <el-dialog title="新增信息" :visible.sync="dialogFormTargeted">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="对应标准" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类简介" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.desc"
            maxlength="100"
            show-word-limit
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="指标名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <div class="el_form">
          <el-form-item label="指标类型" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指标类型" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="指针级别" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="Ⅰ级(好)"></el-radio>
            <el-radio label="Ⅱ级(较好)"></el-radio>
            <el-radio label="Ⅲ级(较差)"></el-radio>
            <el-radio label="Ⅳ级(差)"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="指标值范围" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.desc"
            maxlength="100"
            show-word-limit
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormTargeted = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormTargeted = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 详情 -->
    <el-dialog title="信息详情" :visible.sync="dialogVisible">
      <div class="dialong_dv">
        <label>分类名称：</label><span>二级分类</span>
      </div>
      <div class="dialong_dv">
        <label>对应名称：</label><span>二级分类</span>
      </div>
      <div class="dialong_dv">
        <label>分类简介：</label><span>二级分级分dsfdsfdsfsdfdsjk撒旦喝个咖啡喝个咖啡的更快的方法空间的疯狂攻击的开发经过多方考虑感觉都快疯了价格的疯狂进攻打开立法机关的付款了价格的风口浪尖过来看对方进攻快递费开发的敢角dfdfjgkfdjgkfdjgklfdjgkldfjgkldfjgkfdjgkfdjkfgjkdfjgk类</span>
      </div>
      <div class="dialong_dv">
        <label>指标名称：</label><span>二级分类</span>
      </div>
      <div class="dialong_dv">
        <label>指标类型：</label><span class="dialog_span">二fdsadf sdfsd jg类</span>
        <label>指标类型：</label><span class="dialog_span">二fasdf sadfdjg类</span>
      </div>
      <div class="dialong_dv">
        <label>指标级别：</label><span>二级asdfsadf df分类</span>
      </div>
      <div class="dialong_dv">
        <label>指标值范围：</label><span>二级分类</span>
      </div>
      <div class="dialong_dv">
        <label>备注：</label><span>二级分类</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Economic",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      value: "",
      sreachForm: {},
      activeName: "first",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
      ],
      table: {
        height: "",
      },
      dialogFormVisible: false,
      dialogFormTargeted: false,
      dialogVisible: false,
      form: {},
      formLabelWidth: "120px",
    };
  },
  created() {},
  mounted() {
    let divDom = document.getElementById("alone");
    this.table.height = divDom.offsetHeight - 204;
  },
  methods: {
    editEnterIndex(row) {
      console.log(row);
      this.dialogFormVisible=true
    },
    deleteEnterIndex(row) {
      console.log(row);
    
    },
    editEnterValue(row) {
      console.log(row);
      this.dialogFormTargeted=true
    },
    deleteEnterValue(row) {
      console.log(row);
    },
    detailsSpaceValue(row) {
      console.log(row);
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
#pane-first {
  width: 100%;
  height: 100%;
}

.el-pagination {
  float: right;
  margin-top: 5px;
}
.el_form {
  display: flex;
}
.dialong_dv {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  label {
    width: 120px;
    display: block;
    text-align: right;
  }
  span {
    width:60%;
    display: block;
  }
  .dialog_span{
      width:32%;
  }
}
</style>>
