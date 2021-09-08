<template>
  <div class="alone">
    <div class="operation">
      <el-form :model="sreachForm" :inline="true">
        <el-form-item label="类型">
          <el-select
            v-model="sreachForm.constructionProgress"
            placeholder="请选择"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目阶段">
          <el-select
            v-model="sreachForm.engineeringPaymentProgress"
            placeholder="请选择"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="搜索工程名称">
          <el-input
            placeholder="搜索工程名称"
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
      <el-button type="primary" @click="addEnginerrMessageFun">添加</el-button>
    </div>
    <div class="operation">
      <el-form :model="sreachForm" :inline="true">
        <el-form-item label="周期">
          <el-date-picker
            v-model="sreachForm.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="dataPicker"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span class="spanRight">
        <el-select
          v-model="value"
          placeholder="请选择"
          @change="headChangeSlab"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </span>
    </div>
    <div class="tablebox" id="tablebox">
      <div v-show="flagCut == 1">
        <el-table
          :data="table.data"
          style="width: 100%"
          :height="table.height"
          v-if="table.height"
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
      </div>

      <!-- 卡片 -->
      <el-row :gutter="20" id="Row" v-show="flagCut == 2">
        <el-col
          :span="8"
          v-for="(item, index) in arr"
          :key="index"
          class="col_bg"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="CardSpan">{{ item.nameContet }}</span>
              <el-dropdown trigger="click" style="float: right; padding: 3px 0">
                <i class="el-icon-more iconMore"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>编辑</el-dropdown-item>
                  <el-dropdown-item>详情</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card_describe" v-for="(v, i) in item.children" :key="i">
              <div class="card_describe_lef">
                <i :class="v.icon"></i> <span>{{ v.type }}:</span>
              </div>
              <div class="card_describe_rig">
                {{ v.name }}
              </div>
            </div>
            <el-progress :percentage="100"></el-progress>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.total"
        @current-change="currentChangeHandle"
      >
      </el-pagination>
    </div>

    <!-- 添加 and 编辑 -->

    <el-dialog :title="dialog.title" :visible.sync="dialog.slabDialog">
      <el-form :model="slaBFunForm" label-width="120px">
        <el-form-item label="工程名称">
          <el-input v-model="slaBFunForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="slaBFunForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="责任单位">
          <el-input v-model="slaBFunForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="周期">
          <el-date-picker
            v-model="slaBFunForm.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目阶段">
          <el-steps :space="200" :active="active" process-status="wait">
            <el-step
              v-for="(item, index) of stepTitle"
              :key="index"
              :title="item"
              @click.native="handleStep(index)"
            />
          </el-steps>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="slaBFunForm.textarea"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="工程资料" prop="engineeringProject">
          <el-upload class="upload-demo upload_Demo" drag action="" multiple>
            <div class="upLoadDv">
              <i class="el-icon-circle-plus"></i><span>添加文件</span>
            </div>
            <div>单个文件不超过15M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.slabDialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog.slabDialog = false"
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
      sreachForm: {},
      options: [
        {
          value: "1",
          label: "列表模式"
        },
        {
          value: "2",
          label: "卡片模式"
        }
      ],
      value: "1",
      flagCut: 1,
      table: {
        height: "",
        currentPage: 1,
        total: 0,
        loading: false,
        data: []
      },
      arr: [
        {
          nameContet: "的地方的",
          children: [
            {
              type: "类型",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "周期",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "负责人",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "责任单位",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "项目阶段",
              name: "市政道路",
              icon: "el-icon-s-tools"
            }
          ]
        },
        {
          nameContet: "的地方的",
          children: [
            {
              type: "类型",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "周期",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "负责人",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "责任单位",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "项目阶段",
              name: "市政道路",
              icon: "el-icon-s-tools"
            }
          ]
        },
        {
          nameContet: "的地方的",
          children: [
            {
              type: "类型",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "周期",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "负责人",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "责任单位",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "项目阶段",
              name: "市政道路",
              icon: "el-icon-s-tools"
            }
          ]
        },
        {
          nameContet: "的地方的",
          children: [
            {
              type: "类型",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "周期",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "负责人",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "责任单位",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "项目阶段",
              name: "市政道路",
              icon: "el-icon-s-tools"
            }
          ]
        },
        {
          nameContet: "的地方的",
          children: [
            {
              type: "类型",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "周期",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "负责人",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "责任单位",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "项目阶段",
              name: "市政道路",
              icon: "el-icon-s-tools"
            }
          ]
        },
        {
          nameContet: "的地方的",
          children: [
            {
              type: "类型",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "周期",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "负责人",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "责任单位",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "项目阶段",
              name: "市政道路",
              icon: "el-icon-s-tools"
            }
          ]
        },
        {
          nameContet: "的地方的",
          children: [
            {
              type: "类型",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "周期",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "负责人",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "责任单位",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "项目阶段",
              name: "市政道路",
              icon: "el-icon-s-tools"
            }
          ]
        },
        {
          nameContet: "的地方的",
          children: [
            {
              type: "类型",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "周期",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "负责人",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "责任单位",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "项目阶段",
              name: "市政道路",
              icon: "el-icon-s-tools"
            }
          ]
        },
        {
          nameContet: "的地方的",
          children: [
            {
              type: "类型",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "周期",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "负责人",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "责任单位",
              name: "市政道路",
              icon: "el-icon-s-tools"
            },
            {
              type: "项目阶段",
              name: "市政道路",
              icon: "el-icon-s-tools"
            }
          ]
        }
      ],
      dialog: {
        slabDialog: false,
        title: ""
      },
      slaBFunForm: {},
      stepTitle: ["步骤一", "步骤二", "步骤三", "步骤四"],
      // 步骤
      active: 1
    };
  },
  computed: {},
  created() {
    httpPost("/engineering/engineeringInfo/selectEngineeringList/1/10").then(
      res => {
        console.log(res);
      }
    );
  },
  mounted() {
    let divDom = document.getElementById("tablebox");
    this.table.height = divDom.offsetHeight - 130;
    let rowDom = document.getElementById("Row");
    rowDom.style.height = divDom.offsetHeight - 130 + "px";
  },
  watch: {},
  methods: {
    // 模式的切换
    headChangeSlab(row) {
      this.flagCut = row;
    },
    /**
     * 添加
     */
    addEnginerrMessageFun() {
      this.dialog.slabDialog = true;
      this.dialog.title = "添加";
    },
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
    },
    handleStep(val) {
      this.active = val + 1;
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
.dataPicker {
  width: 400px;
}

.spanRight {
  margin-left: auto;
}
.iconMore {
  color: #276ce3;
  font-size: 18px;
  cursor: pointer;
}
.CardSpan {
  display: inline-block;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
}
.card_describe {
  width: 100%;
  display: flex;
  margin: 0 0 10px 0;
  .card_describe_rig {
    flex: 1;
  }
}
.col_bg {
  margin: 10px 0;
}
#Row {
  overflow: auto;
  border-bottom: 1px solid #fff;
}
#Row::-webkit-scrollbar {
  display: none;
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
</style>
