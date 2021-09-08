<template>
  <div class="alone">
    <div class="operation">
      <el-form :model="sreachForm" :inline="true">
        <el-form-item label="状态">
          <el-select v-model="sreachForm.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-select v-model="sreachForm.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="搜索名称 / 地址 / 电话"
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
    <div class="operation">
      <el-form :inline="true">
        <el-form-item label="批量操作">
          <el-button plain class="but">一键处理</el-button>
          <el-button plain>一键处理</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="tableData"
        style="width: 100%"
        :height="table.height"
        v-if="table.height"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.children"
              style="width: 100%"
              :show-header="false"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="id" width="180"> </el-table-column>
              <el-table-column prop="name" width="180"> </el-table-column>
              <el-table-column prop="desc"> </el-table-column>
              <el-table-column prop="desc"> </el-table-column>
              <el-table-column prop="desc"> </el-table-column>
              <el-table-column prop="desc"> </el-table-column>
              <el-table-column prop="desc"> </el-table-column>
              <el-table-column prop="desc"> </el-table-column>
              <el-table-column align="right">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    @click="immediateValue(scope.row)"
                    size="small"
                    plain
                    >立即处理</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="id"> </el-table-column>
        <el-table-column prop="name"> </el-table-column>
        <el-table-column prop="desc"> </el-table-column>
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
    <!-- 添加 -->
    <el-dialog title="新增信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="政策名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="政策类型" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.desc"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="附件" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <div class="upLoadDv">
              <i class="el-icon-circle-plus"></i><span>添加文件</span>
            </div>
            <div>单个文件不超过15M</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >提 交</el-button
        >
      </div>
    </el-dialog>

    <!-- 详情 -->

    <el-dialog title="信息详情" :visible.sync="dialogVisible">
      <div class="dialogDvScroll">
      <div class="head_essential">基本信息</div>
      <el-form :model="form">
        <el-form-item label="公司名称:" :label-width="formLabelWidthDetails">
          <div class="from_item">北京科兴中维生物技术有限公司</div>
        </el-form-item>
        <div class="el_form">
          <el-form-item label="公司法人:" :label-width="formLabelWidthDetails">
            <div class="from_item">王宇</div>
          </el-form-item>
          <el-form-item label="联系方式:" :label-width="formLabelWidthDetails">
            <div class="from_item">1542544445</div>
          </el-form-item>
        </div>
        <el-form-item label="注册地址:" :label-width="formLabelWidthDetails">
          <div class="from_item">北京市大兴区黄村火车站55号楼</div>
        </el-form-item>
        <el-form-item label="附件:" :label-width="formLabelWidthDetails">
          <div class="from_item">大兴区</div>
          <div class="from_item">大兴区</div>
        </el-form-item>
      </el-form>
      <div class="head_essential">政策内容</div>
      <el-form :model="form">
        <el-form-item label="政策名称:" :label-width="formLabelWidthDetails">
          <div>
            对于在应预案编制和管理工作中做出显著成绩的单位和人员给予表彰
            的单位和人员给予表彰
          </div>
        </el-form-item>
        <div class="el_form">
          <el-form-item label="政策类型:" :label-width="formLabelWidthDetails">
            <div class="from_item">行政审批</div>
          </el-form-item>
          <el-form-item label="发布时间:" :label-width="formLabelWidthDetails">
            <div class="from_item">2021.8.16</div>
          </el-form-item>
        </div>
        <div class="lookButton" v-if="!flag">
          <el-button type="text" @click="lookFun"
            >查看全部<i class="el-icon-caret-bottom el-icon--right"></i
          ></el-button>
        </div>
        <div v-if="flag">
          <el-form-item label="内容:" :label-width="formLabelWidthDetails">
            <div>
              1.申请人携带相关材料到苏州工业园区一站式服务中心窗口提出申请:
              <br />
              2.窗口工作人员对材料进行初审，资料齐全完整，符合法定形式，则
              予以受理，出具受理回执;对于资料不齐全，不符台法定形式的，则不
              予受理，并退还申请人的资料，一次性告知需补充的资料料，<br />
              3.苏州工业园区行政审批居工作人员对材料进行审核，审核通讨出具
              《准予弯更登记通知书》打印《营业执照》:4苏州工业型区一站式服
              务中心回复窗口工作人员通知申请人任回执取证。
            </div>
          </el-form-item>
          <el-form-item label="附件:" :label-width="formLabelWidthDetails">
            <div class="from_item">大兴区</div>
            <div class="from_item">大兴区</div>
          </el-form-item>
        </div>
      </el-form>
      <div class="head_essential">立即处理</div>
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidthDetails">
          <el-radio-group v-model="form.resource">
            <el-radio label="通过"></el-radio>
            <el-radio label="不通过"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidthDetails">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.textarea"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
      
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sreachForm: {},
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "120px",
      form: {},
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          children: [
            {
              id: "12987110",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            },
            {
              id: "12987118",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          children: [
            {
              id: "12987111",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          children: [
            {
              id: "12987112",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          children: [
            {
              id: "12987115",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333"
            }
          ]
        }
      ],
      table: {
        height: ""
      },
      expandRowKeys: [],
      formLabelWidthDetails: "150px",
      flag: false
    };
  },
  mounted() {
    let divDom = document.getElementById("tablebox");
    this.table.height = divDom.offsetHeight - 138;
  },
  methods: {
    expandChange(row) {
      console.log(row);
    },
    detailsSpaceValue(row) {
      console.log(row);
      this.dialogVisible = true;
      this.flag=false
    },
    editEnterValue(row) {
      console.log(row);
    },
    deleteEnterValue(row) {
      console.log(row);
    },
    immediateValue(row) {
      console.log(row);
    },
    lookFun() {
      this.flag = true;
    },
    initTable(){
      console.log("搜索")
    }
  }
};
</script>

<style lang="less" scoped>
.operation .el-button:nth-child(2) {
  margin-left: auto;
}
.el-pagination {
  float: right;
  margin-top: 5px;
}
/deep/ .el-upload-dragger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.upLoadDv {
  display: flex;
  align-items: center;
  i {
    font-size: 18px;
    color: #276ce3;
  }
}
.head_essential {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 10px 50px;
}

.el_form {
  display: flex;
}
.from_item {
  width: 200px;
}
.lookButton {
  display: flex;
  justify-content: center;
}
.but{
  margin-right: 10px;
}
.dialogDvScroll {
  width: 100%;
  height:550px;
  overflow: auto;
}
.dialogDvScroll::-webkit-scrollbar {
  display: none;
}
</style>
