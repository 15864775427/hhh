<template>
  <div class="alone" id="alone">
    <el-tabs v-model="activeName">
      <el-tab-pane label="合同管理" name="first">
        <div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <el-form-item label="工程类型">
              <el-select
                v-model="sreachForm.engineeringType"
                placeholder="请选择"
                @change="initTable()"
                clearable
                @clear="initTable()"
              >
                <el-option
                  v-for="(item, index) in ProjectType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="签约时间">
              <el-date-picker
                v-model="sreachForm.value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="工程名称"
                clearable
                v-model="sreachForm.engineeringName"
                @clear="initTable()"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                  @click="initTable()"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="operation">
          <el-form :model="sreachForm" :inline="true">
            <el-form-item label="合同周期">
              <el-date-picker
                v-model="sreachForm.value1"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="dataPicker"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="addProjectContractFun"
            >批量审核</el-button
          >
          <el-button type="primary" @click="addProjectContractFun"
            >添加</el-button
          >
        </div>
        <div class="tablebox" id="tablebox">
          <el-table
            :data="table.data"
            style="width: 100%"
            :height="table.height"
            v-if="table.height"
          >
            <el-table-column label="工程名称" prop="engineeringName">
            </el-table-column>
            <el-table-column label="工程类型" prop="engineeringSynopsis">
            </el-table-column>
            <el-table-column label="工程子类型" prop="engineeringType">
            </el-table-column>
            <el-table-column label="工程建设单位" prop="engineeringSubtype">
            </el-table-column>
            <el-table-column label="工程施工单位" prop="constructionProgress">
            </el-table-column>
            <el-table-column label="工程合同周期" prop="constructionProgress">
            </el-table-column>
            <el-table-column label="工程预算" prop="constructionProgress">
            </el-table-column>
            <el-table-column label="合同审核状态" prop="constructionProgress">
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
      <el-tab-pane label="付款进度" name="second">
        <div class="operation">
          <el-form :model="progressForm" :inline="true">
            <el-form-item label="工程类型">
              <el-select
                v-model="progressForm.engineeringType"
                placeholder="请选择"
                @change="projectInitTable"
                clearable
                @clear="projectCloneTable()"
              >
                <el-option
                  v-for="(item, index) in ProjectType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工程子类型">
              <el-select
                v-model="progressForm.engineeringSubtype"
                placeholder="请选择"
                @change="initPropassTable()"
                clearable
                @clear="initPropassTable()"
              >
                <el-option
                  v-for="(item, index) in ProjectSubType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="工程名称"
                clearable
                v-model="progressForm.engineeringName"
                @clear="initPropassTable()"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                  @click="initPropassTable()"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="operation">
          <el-form :model="progressForm" :inline="true">
            <el-form-item label="进度节点">
              <el-cascader v-model="progressForm.value"></el-cascader>
            </el-form-item>
            <el-form-item label="施工进度">
              <el-select v-model="progressForm.value" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="项目名称"
                clearable
                v-model="progressForm.engineeringName"
                @clear="initPropassTable()"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                  @click="initPropassTable()"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>

          <el-button type="primary" @click="addProjectProgress">添加</el-button>
        </div>
        <div class="tablebox" id="tablebox">
          <el-table
            :data="tableProgress.data"
            style="width: 100%"
            :height="tableProgress.height"
            v-if="tableProgress.height"
          >
            <el-table-column label="工程名称" prop="engineeringName">
            </el-table-column>
            <el-table-column label="工程简介" prop="engineeringSynopsis">
            </el-table-column>
            <el-table-column label="工程类型" prop="engineeringType">
            </el-table-column>
            <el-table-column label="工程子类型" prop="engineeringSubtype">
            </el-table-column>
            <el-table-column label="施工进度" prop="constructionProgress">
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-link type="primary" @click="detailsPropassValue(scope.row)"
                  >详情</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="editPropassValue(scope.row)"
                  >编辑</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="deletePropassValue(scope.row)"
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
      <el-tab-pane label="施工进度" name="third">
        <div class="operation">
          <el-form :model="progressForm" :inline="true">
            <el-form-item label="合同周期">
              <el-date-picker
                v-model="progressForm.contractor"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="datePicker"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="施工进度">
              <el-select v-model="progressForm.value" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="搜索合同编号/工程名称"
                clearable
                v-model="progressForm.engineeringName"
                @clear="buildPropassTable()"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                  @click="buildPropassTable()"
                ></i>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tablebox" id="tablebox">
          <el-table
            :data="tableProgress.data"
            style="width: 100%"
            :height="tableProgress.height"
            v-if="tableProgress.height"
          >
            <el-table-column label="工程名称" prop="engineeringName">
            </el-table-column>
            <el-table-column label="工程简介" prop="engineeringSynopsis">
            </el-table-column>
            <el-table-column label="工程类型" prop="engineeringType">
            </el-table-column>
            <el-table-column label="工程子类型" prop="engineeringSubtype">
            </el-table-column>
            <el-table-column label="施工进度" prop="constructionProgress">
            </el-table-column>
            <el-table-column label="操作" align="right">
              <template slot-scope="scope">
                <el-link type="primary" @click="detailsPropassValue(scope.row)"
                  >详情</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="editPropassValue(scope.row)"
                  >编辑</el-link
                >
                <el-divider direction="vertical"></el-divider>
                <el-link type="primary" @click="deletePropassValue(scope.row)"
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

    <!--付款进度 添加 and  编辑 -->
    <el-dialog
      :title="dialogProgress.title"
      :visible.sync="dialogProgress.visible"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="合同名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <div class="dv_call">
          <el-form-item label="工程类型" prop="name">
            <el-select
              v-model="form.region"
              placeholder="请选择"
              @change="projectInitTable"
            >
              <el-option
                v-for="(item, index) in ProjectType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工程子类型" prop="name">
            <el-select v-model="form.ddd" placeholder="请选择">
              <el-option
                v-for="(item, index) in ProjectSubType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <!-- <el-form-item label="进度节点" prop="name">
          <el-select
            v-model="form.region"
            placeholder="请选择"
            @change="projectInitTable"
          >
            <el-option
              v-for="(item, index) in ProjectType"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="施工进度" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="施工单位" prop="name">
          <el-input v-model="form.name" autocomplete="off" readonly></el-input>
        </el-form-item>
        <div class="dv_call">
          <el-form-item label="开工时间">
            <el-date-picker
              v-model="form.value1"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="完工时间">
            <el-date-picker
              v-model="form.value1"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="验收人员" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogProgress.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogProgress.visible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 合同管理 添加 and 编辑 -->
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <el-form :model="contractFrom" label-width="120px">
        <div class="dialogDvScroll">
          <div class="header_ddv">工程信息</div>
          <el-form-item label="工程名称:" prop="engineeringName">
            <el-input
              v-model="contractFrom.engineeringName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <div class="dv_call">
            <el-form-item label="工程类型:" prop="engineeringType">
              <el-select
                v-model="contractFrom.engineeringType"
                placeholder="请选择"
                @change="projectInitTable"
                clearable
                @clear="projectCloneTable()"
              >
                <el-option
                  v-for="(item, index) in ProjectType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工程子类型:" prop="engineeringSubtype">
              <el-select
                v-model="contractFrom.engineeringSubtype"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in ProjectSubType"
                  :key="index"
                  :label="item.name"
                  :value="item.description"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="建设单位:" prop="engineeringProject">
            <el-input
              v-model="contractFrom.engineeringProject"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <div class="dv_call">
            <el-form-item label="负责人:" prop="engineeringProject">
              <el-input
                v-model="contractFrom.engineeringProject"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="联系方式:" prop="engineeringProject">
              <el-input
                v-model="contractFrom.engineeringProject"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="施工单位:" prop="engineeringProject">
            <el-input
              v-model="contractFrom.engineeringProject"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <div class="dv_call">
            <el-form-item label="负责人:" prop="engineeringProject">
              <el-input
                v-model="contractFrom.engineeringProject"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="联系方式:" prop="engineeringProject">
              <el-input
                v-model="contractFrom.engineeringProject"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <div class="header_ddv">
            <span class="header_span">合同信息</span>
          </div>
          <div class="turnkey">
            <el-form-item label="合同编号:" prop="engineeringName">
              <el-input
                v-model="contractFrom.engineeringName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item label="签约时间:" prop="engineeringType">
              <el-date-picker
                v-model="contractFrom.value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="合同周期:" prop="engineeringSubtype">
              <el-date-picker
                v-model="contractFrom.value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="dataPicker"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="合同总金额:" prop="engineeringProject">
              <el-input
                v-model="contractFrom.engineeringProject"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <div class="subpackage">
              <el-form-item label="付款方式:" prop="engineeringProject">
                <el-select
                  v-model="contractFrom.region"
                  placeholder="请选择活动区域"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <div class="dv_call">
                <el-form-item label="付款比例:" prop="engineeringProject">
                  <el-input
                    v-model="contractFrom.engineeringProject"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="付款金额:" prop="engineeringProject">
                  <el-input
                    v-model="contractFrom.engineeringProject"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="plusAdd">
              <el-button type="text" icon="el-icon-circle-plus"
                >新增一组</el-button
              >
            </div>
            <el-form-item label="附件" prop="engineeringProject">
              <el-upload
                class="upload-demo upload_Demo"
                drag
                action=""
                multiple
              >
                <div class="upLoadDv">
                  <i class="el-icon-circle-plus"></i><span>添加文件</span>
                </div>
                <div>单个文件不超过15M</div>
              </el-upload>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.visible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { httpPost, httpGet, httpDelete } from "@/http";
export default {
  props: {},
  data() {
    return {
      progressForm: {}, //工程进度管理
      sreachForm: {}, //工程合同管理
      // 工程进度表格
      tableProgress: {
        height: "",
        currentPage: 1,
        total: 0,
        loading: false,
        data: []
      },
      //工程进度模态框
      dialogProgress: {
        visible: false,
        title: ""
      },
      //工程合同模态框
      dialog: {
        visible: false,
        title: ""
      },
      form: {},
      contractFrom: {}, //合同
      ProjectType: [], //工程类型
      ProjectSubType: [], //工程子类型
      activeName: "first",
      options: [],
      table: {
        height: "",
        currentPage: 1,
        total: 0,
        loading: false,
        data: []
      },
      radio2: "总包"
    };
  },
  computed: {},
  created() {
    // 工程类型
    this.$store.dispatch("getProjectType").then(() => {
      this.ProjectType = this.$store.state.ProjectType;
    });
  },
  mounted() {
    let divDom = document.getElementById("alone");
    this.table.height = divDom.offsetHeight - 224;
    this.tableProgress.height = divDom.offsetHeight - 224;
    this.$nextTick(_ => {
      this.initPropassTable();
    });
  },
  watch: {},
  methods: {
    /**
     * 初始化工程进度表格
     */
    initPropassTable(pageNum = 1) {
      this.tableProgress.currentPage = pageNum;
      this.tableLoading = true;
      httpPost(
        `/engineering/engineeringProgressInfo/selectEngineeringProgressList/${pageNum}/10`,
        this.sreachForm
      ).then(res => {
        console.log(res);
        this.tableProgress.total = res.pageInfo.total;
        this.tableProgress.data = res.result;
        this.tableProgress.loading = false;
      });
    },
    currentChangeHandle(currentPage) {
      this.initPropassTable(currentPage);
    },

    // 工程进度详情
    detailsPropassValue(row) {
      console.log(row);
    },
    // 工程进度编辑
    editPropassValue(row) {
      console.log(row);
      this.dialog.visible = true;
    },
    // 工程进度删除
    deletePropassValue(row) {
      console.log(row);
    },
    projectInitTable(row) {
      if (row) {
        httpGet("/system/dict/queryDictInfosBydictCode/" + row).then(res => {
          if (res.code === "1000000000") {
            this.ProjectSubType = res.result;
          } else {
            this.$message.error(res.messasge);
          }
        });
      }
    },
    projectCloneTable(pageNum = 1) {
      this.ProjectSubType = [];
      this.sreachForm.engineeringSubtype = "";
      this.table.currentPage = pageNum;
      this.tableLoading = true;
      httpPost(
        `/engineering/engineeringInfo/selectEngineeringList/${pageNum}/10`,
        this.sreachForm
      ).then(res => {
        console.log(res);
        this.table.total = res.pageInfo.total;
        this.table.data = res.result;
        this.table.loading = false;
      });
    },

    /**
     * 工程进度添加确定
     */
    addProjectProgress() {
      this.dialogProgress.visible = true;
      this.dialogProgress.title = "添加";
    },

    /**
     * 工程合同
     */
    // 详情
    detailsSpaceValue(row) {
      console.log(row);
    },
    // 编辑
    editEnterValue(row) {
      console.log(row);
    },
    // 删除
    deleteEnterValue(row) {
      console.log(row);
    },
    // 添加按钮
    addProjectContractFun() {
      this.dialog.title = "添加";
      this.dialog.visible = true;
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
.el-pagination {
  float: right;
  margin-top: 5px;
}
.dv_call {
  display: flex;
}
.dataPicker {
  width: 400px;
}
.dialogDvScroll {
  width: 100%;
  height: 550px;
  overflow: auto;
}
.dialogDvScroll::-webkit-scrollbar {
  display: none;
}
.header_ddv {
  width: 100%;
  margin: 20px 40px;
  font-size: 16px;
  font-weight: bold;
  .header_span {
    margin-right: 30px;
  }
}
.dv_call {
  display: flex;
}
/deep/ .el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 240px;
  height: 120px;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.upLoadDv {
  display: flex;
  align-items: center;
  i {
    font-size: 18px;
    color: #276ce3;
  }
}

.subpackage {
  margin: 20px auto;
  padding: 20px 20px 0 0;
  box-sizing: border-box;
  border: 1px solid #dcdee0;
}
.plusAdd {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.datePicker {
  width: 280px;
}
</style>
