<template>
  <div class="alone">
    <div class="operation">
      <el-form :model="sreachForm" :inline="true">
        <el-form-item label="居住类型">
          <el-select
            v-model="sreachForm.residenceType"
            placeholder="请选择"
            @change="actualTable()"
            clearable
            @clear="actualTable()"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model="sreachForm.sex"
            placeholder="请选择"
            @change="actualTable()"
            clearable
            @clear="actualTable()"
          >
            <el-option value="男"></el-option>
            <el-option value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="搜索姓名/联系方式/地址"
            clearable
            v-model="sreachForm.engineeringName"
            @clear="actualTable()"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              @click="actualTable()"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="addPopulationFun">添加</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        style="width: 100%"
        :height="table.height"
        v-if="table.height"
      >
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column label="性别" prop="sex"> </el-table-column>
        <el-table-column label="联系电话" prop="phoneNumber"> </el-table-column>
        <el-table-column label="籍贯" prop="residenceAddress">
        </el-table-column>
        <el-table-column label="现住址" prop="currentAddress">
        </el-table-column>
        <el-table-column label="居住类型" prop="residenceType">
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
        :total="table.pageInfo.total"
      >
      </el-pagination>
    </div>

    <!-- 添加 and 编辑 -->

    <el-dialog :title="dialog.title" :visible.sync="dialog.actualDialog">
      <el-form :model="actualFunForm" label-width="120px">
        <div class="dialogDvScroll">
          <div class="header_ddv">身份信息</div>
          <div class="dv_call">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="actualFunForm.name"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="actualFunForm.sex" placeholder="请选择">
                <el-option value="男"></el-option>
                <el-option value="女"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="dv_call">
            <el-form-item label="民族" prop="ethnic">
              <el-select
                v-model="actualFunForm.ethnic"
                placeholder="请选择活动区域"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历" label-width="105px" prop="education">
              <el-select
                v-model="actualFunForm.education"
                placeholder="请选择活动区域"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="dv_call">
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input
                v-model="actualFunForm.phoneNumber"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="婚姻状态" prop="maritalStatus">
              <el-input
                v-model="actualFunForm.maritalStatus"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="证件信息">
            <el-input
              placeholder="请输入"
              v-model="actualFunForm.identityNumber"
              class="input-with-select"
            >
              <el-select
                v-model="actualFunForm.idType"
                slot="prepend"
                placeholder="证件类型"
                class="selectEl"
              >
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <div class="dv_call">
            <el-form-item label="政治面貌" prop="politicalStatus">
              <el-select
                v-model="actualFunForm.politicalStatus"
                placeholder="请选择活动区域"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职业类型" prop="jobType">
              <el-select
                v-model="actualFunForm.jobType"
                placeholder="请选择活动区域"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="户籍地址" prop="residenceAddress">
            <el-input
              v-model="actualFunForm.residenceAddress"
              autocomplete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <div class="header_ddv">居住信息</div>
          <el-form-item label="现住址" prop="currentAddress">
            <el-input
              v-model="actualFunForm.currentAddress"
              autocomplete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="居住类型" prop="residenceType">
            <el-select
              v-model="actualFunForm.residenceType"
              placeholder="请选择活动区域"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <div class="dv_call">
            <el-form-item label="迁入日期" prop="moveInDate">
              <el-date-picker
                v-model="actualFunForm.moveInDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="来自国家" prop="fromCountry">
              <el-input
                v-model="actualFunForm.fromCountry"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="迁入理由" prop="moveInReason">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="actualFunForm.moveInReason"
              maxlength="100"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="是否搬离" prop="moveAwayStatus">
            <el-select
              v-model="actualFunForm.moveAwayStatus"
              placeholder="请选择"
            >
              <el-option value="是"></el-option>
              <el-option value="否"></el-option>
            </el-select>
          </el-form-item>
          <div class="dv_call">
            <el-form-item label="迁出日期" prop="moveOutDate">
              <el-date-picker
                v-model="actualFunForm.moveOutDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="去往国家" prop="goToCountry">
              <el-input
                v-model="actualFunForm.goToCountry"
                autocomplete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="迁出理由" prop="moveOutReason">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="actualFunForm.moveOutReason"
              maxlength="100"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="人员标签">
            <el-checkbox-group v-model="personLabel">
              <el-checkbox
                v-for="(item, index) in cities"
                :label="item"
                :key="index"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.actualDialog = false">取 消</el-button>
        <el-button type="primary" @click="addactualPopulationFun"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { httpPost } from "@/http/index";
export default {
  props: {},
  data() {
    return {
      /**字典类型 */
      getDocumentType: [], //证件类型
      personLabel: [], //人员标签
      cities: [
        "社恐人员",
        "在逃人员",
        "常住户",
        "流动户",
        "享受公租房人员",
        "低保户"
      ],
      sreachForm: {},
      table: {
        height: "",
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        loading: false,
        data: []
      },
      dialog: {
        actualDialog: false,
        title: ""
      },
      actualFunForm: {
        currentAddress: "",
        education: "",
        ethnic: "",
        fromCountry: "",
        goToCountry: "",
        identityNumber: "",
        jobType: "",
        maritalStatus: "",
        moveAwayStatus: "",
        moveInDate: "",
        moveInReason: "",
        moveOutDate: "",
        moveOutReason: "",
        name: "",
        personLabel: "",
        phoneNumber: "",
        politicalStatus: "",
        residenceAddress: "",
        residenceType: "",
        sex: "",
        idType: ""
      },
      editid: ""
    };
  },
  computed: {},
  created() {
    this.actualTable();

    // 证件类型
    this.$store.dispatch("getDocumentType").then(() => {
      this.getDocumentType = this.$store.state.getDocumentType;
      console.log(this.$store.state.getDocumentType);
    });
  },
  mounted() {
    let divDom = document.getElementById("tablebox");
    this.table.height = divDom.offsetHeight - 100;
  },
  watch: {},
  methods: {
    /**
     * 获取表格数据
     */
    actualTable() {
      const { pageNum, pageSize } = this.table.pageInfo;
      httpPost(
        `/comprehensive/demographicInfo/queryAll/${pageNum}/${pageSize}`,
        this.sreachForm
      ).then(res => {
        console.log(res);
        this.table.data = res.result;
        this.table.loading = false;
        this.table.pageInfo.total = res.pageInfo.total;
      });
    },
    detailsSpaceValue(row) {
      console.log(row);
    },
    // 编辑
    editEnterValue(row) {
      console.log(row);
    },
    deleteEnterValue(row) {
      console.log(row);
    },
    addPopulationFun() {
      this.dialog.actualDialog = true;
      this.dialog.title = "添加";
    },
    /**
     * 添加 and 编辑
     */
    addactualPopulationFun() {
      this.actualFunForm.personLabel = this.personLabel.join(",");
      console.log(this.actualFunForm);
      // httpPost(
      //   "/comprehensive/demographicInfo/addInfo",
      //   this.actualFunForm
      // ).then(res => {
      //   console.log(res);
      // });
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
.selectEl {
  width: 160px;
}
/deep/ .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
