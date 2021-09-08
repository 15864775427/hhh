<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm"> </el-form>
      <!-- !!! 方法名不加括号 默认参数是event  参数有默认值不传参数 需加括号 -->
      <el-button type="primary" @click="admissionApplication"
        >添加申请</el-button
      >
      <el-button type="primary" @click="batchExport">批量导出</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        v-loading="table.loading"
        :height="table.height"
        v-if="table.height"
        :header-cell-style="{ background: '#F7F8FA' }"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="firm.firmName" label="企业名称" align="left">
        </el-table-column>
        <el-table-column prop="firm.legalPerson" label="企业法人" align="left">
        </el-table-column>
        <el-table-column
          prop="firm.planTotalInvestment"
          label="联系方式"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="firm.industryClass"
          label="产业类型"
          align="left"
        >
          <template slot-scope="scope">
            <span>{{ getIndustryTypeName(scope.row.firm.industryClass) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="firm.projectType" label="入驻形式" align="left">
          <template slot-scope="scope">
            <span>{{ getSettledTypeName(scope.row.firm.projectType) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="firm.registeredFund"
          label="注册资金"
          align="left"
        >
        </el-table-column>
        <el-table-column prop="progress" label="当前进度" align="left">
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-link type="primary">编辑</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="deleteEnterpriseEnter(scope.row.id)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="table.total"
        @current-change="currentChangeHandle"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      @close="dialogClose"
      width="100%"
    >
      <div>
        <div>
          <el-form :inline="true" label-width="80px">
            <el-form-item label="目标企业">
              <el-select
                v-model="form.id"
                v-el-select-loadmore="loadmore"
                :disabled="formSwitchData.flag"
              >
                <el-option
                  v-for="(item, index) in selectOption.data"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="switch" @click="formSwitch">{{
                formSwitchData.val
              }}</span>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-form
            label-width="160px"
            :model="EnterpriseForm"
            :inline="true"
            ref="EnterpriseFormRef"
            v-if="formSwitchData.flag"
          >
            <div>
              <el-form-item label="租赁地址" prop="address">
                <el-input
                  v-model="EnterpriseForm.address"
                  placeholder="租赁地址"
                ></el-input>
              </el-form-item>
              <el-form-item label="企业联系人" prop="contactPerson">
                <el-input
                  v-model="EnterpriseForm.contactPerson"
                  placeholder="企业联系人"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="企业联系人身份证号"
                prop="contactPersonIdentityNumber"
              >
                <el-input
                  v-model="EnterpriseForm.contactPersonIdentityNumber"
                  placeholder="企业联系人身份证号"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="企业联系人手机号" prop="contactPersonPhone">
                <el-input
                  v-model="EnterpriseForm.contactPersonPhone"
                  placeholder="企业联系人手机号"
                ></el-input>
              </el-form-item>
              <el-form-item label="社会统一信用代码" prop="creditCode">
                <el-input
                  v-model="EnterpriseForm.creditCode"
                  placeholder="社会统一信用代码"
                ></el-input>
              </el-form-item>
              <el-form-item label="租赁结束时间" prop="endTime">
                <el-date-picker
                  v-model="EnterpriseForm.endTime"
                  type="date"
                  placeholder="租赁结束时间"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="融资情况" prop="financingSituation">
                <el-input
                  v-model="EnterpriseForm.financingSituation"
                  placeholder="融资情况"
                ></el-input>
              </el-form-item>
              <el-form-item label="企业名称" prop="firmName">
                <el-input
                  v-model="EnterpriseForm.firmName"
                  placeholder="企业名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="年税收(万元)" prop="inTax">
                <el-input
                  v-model="EnterpriseForm.inTax"
                  placeholder="年税收(万元)"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="上下游企业" prop="industryChain">
                <el-input
                  v-model="EnterpriseForm.industryChain"
                  placeholder="上下游企业"
                ></el-input>
              </el-form-item>
              <el-form-item label="产业类型" prop="industryClass">
                <el-select
                  v-model="EnterpriseForm.industryClass"
                  placeholder="产业类型"
                >
                  <el-option
                    v-for="(item, index) in industryType"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="入园时间" prop="intime">
                <el-date-picker
                  v-model="EnterpriseForm.intime"
                  type="date"
                  placeholder="入园时间"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="是否已投产" prop="intoProductionCode">
                <el-select
                  v-model="EnterpriseForm.intoProductionCode"
                  placeholder="是否已投产"
                >
                  <el-option
                    v-for="(item, index) in whetherProduction"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="预计投产时间" prop="intoProductionDate">
                <el-date-picker
                  v-model="EnterpriseForm.intoProductionDate"
                  type="date"
                  placeholder="预计投产时间"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="企业法人" prop="legalPerson">
                <el-input
                  v-model="EnterpriseForm.legalPerson"
                  placeholder="企业法人"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                label="法人身份证号"
                prop="legalPersonIdentityNumber"
              >
                <el-input
                  v-model="EnterpriseForm.legalPersonIdentityNumber"
                  placeholder="法人身份证号"
                ></el-input>
              </el-form-item>
              <el-form-item label="法人联系方式" prop="legalPersonPhone">
                <el-input
                  v-model="EnterpriseForm.legalPersonPhone"
                  placeholder="法人联系方式"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目简介" prop="projectBrief">
                <el-input
                  v-model="EnterpriseForm.projectBrief"
                  placeholder="项目简介"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="入驻形式" prop="projectType">
                <el-select
                  v-model="EnterpriseForm.projectType"
                  placeholder="入驻形式"
                >
                  <el-option
                    v-for="(item, index) in settledType"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业类型" prop="registType">
                <el-select
                  v-model="EnterpriseForm.registType"
                  placeholder="企业类型"
                >
                  <el-option
                    v-for="(item, index) in enterpriseType"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="注册资金(万元)" prop="registeredFund">
                <el-input
                  v-model="EnterpriseForm.registeredFund"
                  placeholder="注册资金(万元)"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="EnterpriseForm.remark"
                  placeholder="备注"
                ></el-input>
              </el-form-item>
              <el-form-item label="租赁面积" prop="rentalArea">
                <el-input
                  v-model="EnterpriseForm.rentalArea"
                  placeholder="租赁面积"
                ></el-input>
              </el-form-item>
              <el-form-item label="企业与高校院所开展学研情况" prop="research">
                <el-input
                  v-model="EnterpriseForm.research"
                  placeholder="企业与高校院所开展学研情况"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="入孵状态" prop="settleInIncubatorStatus">
                <el-input
                  v-model="EnterpriseForm.settleInIncubatorStatus"
                  placeholder="入孵状态"
                ></el-input>
              </el-form-item>
              <el-form-item label="租赁开始时间" prop="startTime">
                <el-date-picker
                  v-model="EnterpriseForm.startTime"
                  type="date"
                  placeholder="租赁开始时间"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="企业科技人员数" prop="technicianForce">
                <el-input
                  v-model="EnterpriseForm.technicianForce"
                  placeholder="企业科技人员数"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="企业职工总数" prop="workForce">
                <el-input
                  v-model="EnterpriseForm.workForce"
                  placeholder="企业职工总数"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="年企业总收入（万元）"
                prop="yearGeneralIncome"
              >
                <el-input
                  v-model="EnterpriseForm.yearGeneralIncome"
                  placeholder="年企业总收入（万元）"
                ></el-input>
              </el-form-item>
              <el-form-item label="年销售收入（万元）" prop="yearGrossSales">
                <el-input
                  v-model="EnterpriseForm.yearGrossSales"
                  placeholder="年销售收入（万元）"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item
                style="width:100%"
                label="企业参与指定国家、行业标准情况"
                prop="participation"
              >
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="EnterpriseForm.participation"
                  placeholder="企业参与指定国家、行业标准情况"
                ></el-input>
              </el-form-item>
              <el-form-item label="投资额(万元)" prop="investmentVolume">
                <el-input
                  v-model="EnterpriseForm.investmentVolume"
                  placeholder="投资额(万元)"
                ></el-input>
              </el-form-item>
            </div>
            <div
              class="listBox"
              v-for="(item, index) in EnterpriseForm.enterSubList"
              :key="index"
            >
              <el-form-item label="主要产品名称" prop="productName">
                <el-input
                  v-model="item.productName"
                  placeholder="主要产品名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="产品所属领域" prop="productField">
                <el-input
                  v-model="item.productField"
                  placeholder="产品所属领域"
                ></el-input>
              </el-form-item>
              <el-form-item label="主要产品进度" prop="productSchedule">
                <el-select
                  v-model="item.productSchedule"
                  placeholder="主要产品进度"
                >
                  <el-option
                    v-for="(item, index) in productProgress"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品技术水平" prop="technicalLevel">
                <el-input
                  v-model="item.technicalLevel"
                  placeholder="产品技术水平"
                ></el-input>
              </el-form-item>
              <i
                class="el-icon-remove-outline"
                @click="removeEnterSubListItem"
                v-show="EnterpriseForm.enterSubList.length - 1 === index"
              ></i>
              <i
                class="el-icon-circle-plus-outline"
                @click="addEnterSubListItem"
                v-show="EnterpriseForm.enterSubList.length - 1 === index"
              ></i>
            </div>
          </el-form>
        </div>
        <div>
          <el-form :model="applyForm" :inline="true" label-width="auto">
            <el-form-item label="入园时间" prop="admissionTime">
              <el-input
                v-model="applyForm.admissionTime"
                placeholder="入园时间"
              ></el-input>
            </el-form-item>
            <el-form-item label="面积需求" prop="areaRequirement">
              <el-input
                v-model="applyForm.areaRequirement"
                placeholder="面积需求"
              ></el-input>
            </el-form-item>
            <el-form-item label="入驻形式" prop="incubatorUseManner">
              <el-input
                v-model="applyForm.incubatorUseManner"
                placeholder="入驻形式"
              ></el-input>
            </el-form-item>
            <el-form-item label="主要建设内容" prop="mainConstructionContent">
              <el-input
                v-model="applyForm.mainConstructionContent"
                placeholder="主要建设内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="预计年产值" prop="planAnnualOutputValue">
              <el-input
                v-model="applyForm.planAnnualOutputValue"
                placeholder="预计年产值"
              ></el-input>
            </el-form-item>
            <el-form-item label="预计年税收" prop="planAnnualTax">
              <el-input
                v-model="applyForm.planAnnualTax"
                placeholder="预计年税收"
              ></el-input>
            </el-form-item>
            <el-form-item label="计划总投资" prop="planTotalInvestment">
              <el-input
                v-model="applyForm.planTotalInvestment"
                placeholder="计划总投资"
              ></el-input>
            </el-form-item>
            <el-form-item label="问题" prop="problem">
              <el-input
                v-model="applyForm.problem"
                placeholder="问题"
              ></el-input>
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress">
              <el-input
                v-model="applyForm.registeredAddress"
                placeholder="注册地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="空间类型" prop="spaceType">
              <el-input
                v-model="applyForm.spaceType"
                placeholder="空间类型"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="applyForm.remark"
                placeholder="备注"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { httpPost, httpDelete, httpPut, httpGet, postDownload } from "@/http";
export default {
  name: "publicityInformationRelease",
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector(
          ".el-scrollbar__wrap.el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function() {
          /**
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  data() {
    return {
      settledType: [], // 入驻类型
      industryType: [], // 产业类型
      productProgress: [], // 产品进度
      whetherProduction: [], // 是否投产
      enterpriseType: [], // 企业类型
      sreachForm: {},
      table: {
        data: [],
        height: 0,
        total: 0,
        loading: false,
        currentPage: 1
      },
      EnterpriseForm: {
        address: "",
        contactPerson: "",
        contactPersonIdentityNumber: "",
        contactPersonPhone: "",
        creditCode: "",
        endTime: "",
        enterSubList: [
          {
            productField: "", // 领域
            productName: "", // 名称
            productSchedule: "", // 进度
            technicalLevel: "" // 技术
          }
        ],
        financingSituation: "",
        firmName: "",
        inTax: "",
        industryChain: "",
        industryClass: "",
        intime: "",
        intoProductionCode: "",
        intoProductionDate: "",
        legalPerson: "",
        legalPersonIdentityNumber: "",
        legalPersonPhone: "",
        participation: "",
        productName: "",
        productSchedule: "",
        projectBrief: "",
        projectType: "",
        registType: "",
        registeredFund: "",
        remark: "",
        rentalArea: "",
        research: "",
        settleInIncubatorStatus: "",
        startTime: "",
        technicianForce: "",
        workForce: "",
        yearGeneralIncome: "",
        yearGrossSales: "",
        investmentVolume: ""
      },
      form: {
        id: ""
      },
      applyForm: {
        admissionTime: "", //入园时间
        areaRequirement: "", // 面积需求
        firmId: "", // 企业id
        incubatorUseManner: "", // 入驻形式(数据字典)
        mainConstructionContent: "", // 主要建设内容
        planAnnualOutputValue: "", // 预计年产值
        planAnnualTax: "", // 预计年税收
        planTotalInvestment: "", // 计划总投资
        problem: "", // 推进遇到的问题
        registeredAddress: "", // 注册地址
        remark: "", // 备注
        spaceType: "" // 空间类型
      },
      selectOption: {
        data: [],
        page: 1,
        pageNum: 10,
        total: 0
      },
      dialog: {
        visible: false,
        title: ""
      },
      formSwitchData: {
        flag: false,
        val: "手动填写"
      },
      editId: 0,
      logList: [],
      logIdList: [],
      logPageList: {}
    };
  },
  computed: {
    disabled() {
      return this.selectOption.data.length >= this.selectOption.total;
    }
  },
  created() {
    /**
     * 初始化字典
     */
    // 入驻类型
    this.$store.dispatch("getSettledType").then(() => {
      this.settledType = this.$store.state.settledType;
    });
    // 产业类型
    this.$store.dispatch("getIndustryType").then(() => {
      this.industryType = this.$store.state.industryType;
    });
    // 产品进度
    this.$store.dispatch("getProductProgress").then(() => {
      this.productProgress = this.$store.state.productProgress;
    });
    // 是否投产
    this.$store.dispatch("getWhetherProduction").then(() => {
      this.whetherProduction = this.$store.state.whetherProduction;
    });
    // 企业类型
    this.$store.dispatch("getEnterpriseType").then(() => {
      this.enterpriseType = this.$store.state.enterpriseType;
    });
    this.getTargetEnterpriseList();
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 150;
    this.$nextTick(_ => {
      this.initTable();
    });
  },
  methods: {
    /**
     * 初始化表格
     */
    initTable(pageNum = 1) {
      this.table.currentPage = pageNum;
      this.tableLoading = true;
      httpPost(
        `/firmAdmission/investment/firmAdmission/queryAll/${pageNum}/10`,
        this.sreachForm
      ).then(res => {
        this.table.total = res.pageInfo.total;
        this.table.data = res.result;
        this.table.loading = false;
      });
    },
    /**
     * 切换分页
     */
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
    },
    /**
     * 切换 手动填写
     */
    formSwitch() {
      if (!this.formSwitchData.flag) {
        this.form.id = "";
        Object.assign(
          this.$data.EnterpriseForm,
          this.$options.data().EnterpriseForm
        );
      } else {
        this.formSwitchData.val = "选择企业";
        this.formSwitchData.val = "手动填写";
      }
      this.formSwitchData.flag = !this.formSwitchData.flag;
    },
    /**
     * 添加入园申请
     */
    admissionApplication() {
      this.dialog.title = "添加入园申请";
      this.dialog.visible = true;
    },
    /**
     * 无限滚动
     */
    loadmore() {
      this.selectOption.page += 1;
      if (
        this.selectOption.page * this.selectOption.pageNum -
          this.selectOption.total >
        10
      ) {
        return false;
      }
      this.getTargetEnterpriseList();
    },
    /**
     * 获取目标企业
     */
    getTargetEnterpriseList() {
      httpPost(
        `/enterprise/Enterprise/queryAll/${this.selectOption.page}/${this.selectOption.pageNum}`,
        {}
      ).then(res => {
        this.selectOption.total = res.pageInfo.total;
        this.selectOption.data = this.selectOption.data.concat(
          res.result.map(item => {
            return {
              name: item.firmName,
              value: item.id
            };
          })
        );
      });
    },
    /**
     * 新增子集合
     */
    addEnterSubListItem() {
      this.EnterpriseForm.enterSubList.push({
        productField: "", // 领域
        productName: "", // 名称
        productSchedule: "", // 进度
        technicalLevel: "" // 技术
      });
    },
    /**
     * 删除子集合
     */
    removeEnterSubListItem() {
      if (this.EnterpriseForm.enterSubList.length > 1) {
        this.EnterpriseForm.enterSubList.pop();
      } else {
        this.$message.error("最少填写一行");
      }
    },
    /**
     * 确定
     */
    determine() {
      if (this.formSwitchData.flag) {
        console.log("手动")
        httpPost(
          "/firmAdmission/investment/firmAdmission/addAdmissionFirm",
          this.EnterpriseForm
        ).then(res => {
          if (res.code === "1000000000") {
            let dataForm = this.applyForm;
            dataForm.firmId = res.result;
            httpPost(
              "/firmAdmission/investment/firmAdmission/addSettledInfo",
              dataForm
            ).then(res => {
              if (res.code === "1000000000") {
                this.$message.success("申请成功");
                this.dialog.visible=false;
              }
            });
          } else {
            this.$message.error("申请失败");
          }
        });
      } else {
        console.log("选择")
        httpPost(
          "/firmAdmission/investment/firmAdmission/addAdmissionFirm",
          this.form
        ).then(res => {
          if (res.code === "1000000000") {
            let dataForm = this.applyForm;
            dataForm.firmId = res.result;
            httpPost(
              "/firmAdmission/investment/firmAdmission/addSettledInfo",
              dataForm
            ).then(res => {
              if (res.code === "1000000000") {
                this.$message.success("申请成功");
                this.dialog.visible = false;
                this.dialog.title = "";
              }
            });
          } else {
            this.$message.error("申请失败");
          }
        });
      }
    },
    /**
     * 删除
     */
    deleteEnterpriseEnter(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDelete(
            `/firmAdmission/investment/firmAdmission/deleteById/${id}`
          ).then(res => {
            if (res.code === "1000000000") {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.initTable(this.currentPage);
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {});
    },
    /**
     * 模态框关闭回调
     */
    dialogClose() {
      Object.assign(
        this.$data.EnterpriseForm,
        this.$options.data().EnterpriseForm
      );
      Object.assign(this.$data.applyForm, this.$options.data().applyForm);
      Object.assign(this.$data.form, this.$options.data().form);
      Object.assign(
        this.$data.formSwitchData,
        this.$options.data().formSwitchData
      );
      Object.assign(this.$data.selectOption, this.$options.data().selectOption);
      this.getTargetEnterpriseList();
    },
    /**
     * 表格复选
     */
    handleSelectionChange(row) {
      // 当前页面选中的
      let checkArr = row.map(item => item.id);
      // 当前页面未选中的
      let deCheckArr = this.table.data.map(item=>item.id).filter(
        item => !checkArr.includes(item)
      );
      this.logList = row;
      this.logIdList = this.logIdList.concat(row.map(item => item.id));
      // 过滤掉未选中的
      this.logIdList = this.logIdList.filter(item =>{
        return !deCheckArr.includes(item.id)
      });
      if (row.length > 0) {
        this.logPageList[this.table.currentPage] = row;
      }
    },
    /**
     * 批量导出
     */
    batchExport() {
      let set = new Set(this.logIdList);
      let data = Array.from(set);
      if (data.length > 0) {
        postDownload("/firmAdmission/investment/firmAdmission/exportTargetFirmDetails", data).then(res => {
          let flieName = decodeURIComponent(
            res.headers["content-disposition"]
              .split(";")[1]
              .split("filename=")[1]
          );
          const blob = new Blob([res.data]);
          const objecturl = window.URL.createObjectURL(blob);
          const creEleA = document.createElement("a");
          creEleA.setAttribute("href", objecturl);
          creEleA.setAttribute("download", flieName);
          creEleA.click();
        });
      } else {
        this.$message.error("请选择需要导出的日志");
      }
    },
    /**
     * 入驻类型 换取字典值
     */
    getSettledTypeName(val) {
      for (let i = 0; i < this.settledType.length; i++) {
        if (val === this.settledType[i].value) {
          return this.settledType[i].name;
        }
      }
    },

    /**
     * 产业类型 换取字典值
     */
    getIndustryTypeName(val) {
      for (let i = 0; i < this.industryType.length; i++) {
        if (val === this.industryType[i].value) {
          return this.industryType[i].name;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
.el-button {
  height: 40px;
}
.el-pagination {
  float: right;
  margin-top: 5px;
}
.switch {
  cursor: pointer;
  margin-left: 10px;
  color: #276ce3;
}
</style>
