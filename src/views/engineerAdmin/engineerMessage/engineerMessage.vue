<template>
  <div class="alone">
    <div class="operation">
      <el-form :model="sreachForm" :inline="true">
        <el-form-item label="工程类型">
          <el-select
            v-model="sreachForm.engineeringTypeCode"
            placeholder="请选择"
            @change="projectInitTable"
            clearable
            @clear="projectCloneTable"
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
            v-model="sreachForm.engineeringSubtypeCode"
            placeholder="请选择"
            @change="initTable"
            clearable
            @clear="initTable"
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
            v-model="sreachForm.engineeringName"
            @clear="initTable"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              @click="initTable"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-form :model="sreachForm" :inline="true">
        <el-form-item label="施工进度">
          <el-select
            v-model="sreachForm.constructionProgress"
            placeholder="请选择"
            @change="initTable"
            clearable
            @clear="initTable"
          >
            <el-option
              v-for="(item, index) in construction"
              :key="index"
              :label="item.name"
              :value="item.description"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款进度">
          <el-select
            v-model="sreachForm.engineeringPaymentProgress"
            placeholder="请选择"
            @change="initTable"
            clearable
            @clear="initTable"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工程验收日期">
          <el-date-picker
            v-model="sreachForm.engineeringAcceptanceDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="initTable"
            clearable
            @clear="initTable"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="addEnginerrMessageFun">添加</el-button>
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
        <el-table-column label="工程简介" prop="engineeringSynopsis">
        </el-table-column>
        <el-table-column label="工程类型" prop="engineeringType">
        </el-table-column>
        <el-table-column label="工程子类型" prop="engineeringSubtype">
          <template slot-scope="scope">
            {{
              scope.row.engineeringSubtype == "null"
                ? ""
                : scope.row.engineeringSubtype
            }}
          </template>
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
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.pageInfo.total"
        @current-change="currentChangeHandle"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
    <!-- 添加 and 编辑 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      @close="dialogClose"
    >
      <el-form
        :model="EngineerForm"
        label-width="180px"
        :rules="rules"
        ref="EnginerrFormRef"
      >
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="工程信息" name="first">
            <div class="dialogDvScroll">
              <div class="header_ddv">工程信息</div>
              <el-form-item label="工程名称:" prop="engineeringName">
                <el-input
                  v-model="EngineerForm.engineeringName"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item label="工程所属项目:" prop="engineeringProject">
                <!-- <el-select
                  v-model="EngineerForm.engineeringProject"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in ProjectType"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select> -->
                <el-input
                  v-model="EngineerForm.engineeringProject"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="工程所属企业:" prop="engineeringProject">
                <el-select v-model="EngineerForm.erere" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in ProjectType"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <div class="dv_call">
                <el-form-item label="工程类型:" prop="engineeringTypeCode">
                  <el-select
                    v-model="EngineerForm.engineeringTypeCode"
                    placeholder="请选择"
                    @change="projectInitFrom"
                  >
                    <el-option
                      v-for="(item, index) in ProjectType"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工程子类型:" prop="engineeringSubtypeCode">
                  <el-select
                    v-model="EngineerForm.engineeringSubtypeCode"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in ProjectSubType"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="施工进度:" prop="constructionProgress">
                <el-select
                  v-model="EngineerForm.constructionProgress"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in construction"
                    :key="index"
                    :label="item.name"
                    :value="item.description"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工程简介" prop="engineeringSynopsis">
                <el-input
                  type="textarea"
                  v-model="EngineerForm.engineeringSynopsis"
                  maxlength="100"
                  show-word-limit
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="施工信息" name="second">
            <div class="dialogDvScroll">
              <div class="header_ddv">施工信息</div>
              <el-form-item label="建设单位:" prop="engineeringBuildUnit">
                <el-input
                  v-model="EngineerForm.engineeringBuildUnit"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <div class="dv_call">
                <el-form-item label="负责人:" prop="engineeringPersonInCharge">
                  <el-input
                    v-model="EngineerForm.engineeringPersonInCharge"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="施工单位:"
                  prop="engineeringConstructionUnit"
                >
                  <el-input
                    v-model="EngineerForm.engineeringConstructionUnit"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>

              <el-form-item label="工程图纸:">
                <el-upload
                  class="upload-demo"
                  action=""
                  :before-upload="beforeAvatarUpload"
                  :http-request="handleAvatarSuccess"
                  :on-remove="RemoveDraw"
                  :file-list="flieList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="工程预算:" prop="engineeringBudget">
                <el-input
                  v-model="EngineerForm.engineeringBudget"
                  placeholder="请输入预算金额"
                  ><template slot="append">元</template></el-input
                >
              </el-form-item>

              <div class="dv_call">
                <el-form-item label="工程周期:" prop="engineeringCycle">
                  <el-date-picker
                    v-model="engineeringCycle"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="datePicker"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="合同签订:"
                  prop="engineeringContractSigning"
                  label-width="140px"
                >
                  <el-select
                    v-model="EngineerForm.engineeringContractSigning"
                    placeholder="请选择"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div
                class="subpackage"
                v-for="(item,
                index) in EngineerForm.engineeringSubcontractingModelList"
                :key="index"
              >
                <div class="subpack">
                  <span>工程分包情况</span>
                  <i class="el-icon-close closeIcon" v-show="index !== 0"></i>
                </div>
                <div class="dv_call">
                  <el-form-item label="承包单位:" prop="contractingUnit">
                    <el-input
                      v-model="item.contractingUnit"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式:" prop="contactInformation">
                    <el-input
                      v-model="item.contactInformation"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="dv_call">
                  <el-form-item
                    label="工程周期:"
                    prop="engineeringCycleDateList"
                  >
                    <el-date-picker
                      v-model="item.engineeringCycleDateList"
                      type="daterange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      class="datePicker"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item
                    label="负责人:"
                    prop="personInCharge"
                    label-width="140px"
                  >
                    <el-input
                      v-model="item.personInCharge"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>

                <el-form-item label="承包内容" prop="contractContent">
                  <el-input
                    type="textarea"
                    v-model="item.contractContent"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="信用代码:" prop="creditCode">
                  <el-input
                    v-model="item.creditCode"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <div class="dv_call">
                  <el-form-item label="公司名称:" prop="corporateName">
                    <el-input
                      v-model="item.corporateName"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="公司类型:" prop="corporateType">
                    <el-input
                      v-model="item.corporateType"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="dv_call">
                  <el-form-item label="公司所在位置:" prop="companyLocation">
                    <el-input
                      v-model="item.companyLocation"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="法人:" prop="legalPerson">
                    <el-input
                      v-model="item.legalPerson"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>

                <el-form-item label="注册资金:" prop="registerCapital">
                  <el-input v-model="item.registerCapital" placeholder="请输入"
                    ><template slot="append">元</template></el-input
                  >
                </el-form-item>
                <div class="dv_call">
                  <el-form-item label="成立日期:" prop="establishDate">
                    <el-date-picker
                      v-model="item.establishDate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="营业期限:" prop="businessTerm">
                    <el-date-picker
                      v-model="item.businessTerm"
                      type="daterange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      class="datePicker"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
                <el-form-item label="经营范围:" prop="natureOfBusiness">
                  <el-input
                    type="textarea"
                    v-model="item.natureOfBusiness"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="plusAdd">
                <el-button
                  type="text"
                  icon="el-icon-circle-plus"
                  @click="addOfNew"
                  >新增一组</el-button
                >
              </div>
            </div></el-tab-pane
          >
          <el-tab-pane label="验收/付款" name="third">
            <div class="dialogDvScroll">
              <div class="header_ddv">验收信息</div>
              <div class="dv_call">
                <el-form-item
                  label="验收日期:"
                  prop="engineeringAcceptanceDate"
                >
                  <el-date-picker
                    v-model="EngineerForm.engineeringAcceptanceDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="验收负责人:"
                  prop="engineeringPersonInCharge"
                >
                  <el-input
                    v-model="EngineerForm.engineeringPersonInCharge"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </div>
              <el-form-item
                label="工程预算书:"
                prop="engineeringBudgetStatement"
              >
                <el-upload
                  class="upload-demo upload_Demo"
                  action=""
                  multiple
                  drag
                  :limit="9"
                  :before-upload="beforeAvatarUpload"
                  :http-request="handleBudgetSuccess"
                  :on-remove="RemoveBudget"
                  :file-list="fileBudgetList"
                >
                  <i class="el-icon-plus"></i>
                  <div class="el-upload__tip" slot="tip">
                    建议尺寸 900*400，最多 9 张，单个图片不超过
                    20M。可以上传附件
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="工程决算书" prop="engineeringFinalStatement">
                <el-upload
                  class="upload-demo upload_Demo"
                  action=""
                  multiple
                  drag
                  :limit="9"
                  :before-upload="beforeAvatarUpload"
                  :http-request="handleFinalSuccess"
                  :on-remove="RemoveFinal"
                  :file-list="fileFinalList"
                >
                  <i class="el-icon-plus"></i>
                  <div class="el-upload__tip" slot="tip">
                    建议尺寸 900*400，最多 9 张，单个图片不超过
                    20M。可以上传附件
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="验收情况" prop="engineeringAcceptance">
                <el-input
                  type="textarea"
                  v-model="EngineerForm.engineeringAcceptance"
                  maxlength="100"
                  show-word-limit
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="工程验收单"
                prop="engineeringAcceptanceSheet"
              >
                <el-upload
                  class="upload-demo upload_Demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  drag
                  :limit="9"
                  :before-upload="beforeAvatarUpload"
                  :http-request="handleCheckSuccess"
                  :on-remove="RemoveCheck"
                  :file-list="fileCheckList"
                >
                  <i class="el-icon-plus"></i>
                  <div class="el-upload__tip" slot="tip">
                    建议尺寸 900*400，最多 9 张，单个图片不超过
                    20M。可以上传附件
                  </div>
                </el-upload>
              </el-form-item>
            </div></el-tab-pane
          >
        </el-tabs>
      </el-form>
      <div class="footer_Dv">
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.visible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addEnginerrFun"
            :loading="addEnginerrFlag"
            >提 交</el-button
          >
          <el-button type="primary" @click="addNextFun">下一步</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" @close="dialogClose">
      <el-form label-width="180px" :model="detailsFrom">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="工程信息" name="first">
            <div class="dialogDvScroll">
              <div class="header_ddv">工程信息</div>
              <el-form-item label="工程名称:" prop="engineeringName">
                <div>{{ detailsFrom.engineeringName }}</div>
              </el-form-item>
              <el-form-item label="工程所属项目:" prop="engineeringProject">
                <div>{{ detailsFrom.engineeringProject }}</div>
              </el-form-item>
              <div class="dv_call">
                <el-form-item label="工程类型:" prop="engineeringType">
                  <div>{{ detailsFrom.engineeringType }}</div>
                </el-form-item>
                <el-form-item label="工程子类型:" prop="engineeringSubtype">
                  <div>{{ detailsFrom.engineeringSubtype }}</div>
                </el-form-item>
              </div>
              <el-form-item label="施工进度:" prop="constructionProgress">
                <div>{{ detailsFrom.constructionProgress }}</div>
              </el-form-item>
              <el-form-item label="工程简介" prop="engineeringSynopsis">
                <div>{{ detailsFrom.engineeringSynopsis }}</div>
              </el-form-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="施工信息" name="second">
            <div class="dialogDvScroll">
              <div class="header_ddv">施工信息</div>
              <el-form-item label="建设单位:" prop="engineeringBuildUnit">
                <div>{{ detailsFrom.engineeringBuildUnit }}</div>
              </el-form-item>
              <div class="dv_call">
                <el-form-item label="负责人:" prop="engineeringPersonInCharge">
                  <div>{{ detailsFrom.engineeringPersonInCharge }}</div>
                </el-form-item>
                <el-form-item
                  label="施工单位:"
                  prop="engineeringConstructionUnit"
                >
                  <div>{{ detailsFrom.engineeringConstructionUnit }}</div>
                </el-form-item>
              </div>

              <el-form-item label="工程图纸:" prop="engineeringDrawing">
                <div>
                  <div v-for="(item, index) in flieList" :key="index">
                    <el-link type="primary" @click="imgFun(item)"
                      >{{ item.name }}.{{ item.suffix }}</el-link
                    >
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="工程预算:" prop="engineeringBudget">
                <div>{{ detailsFrom.engineeringBudget }}</div>
              </el-form-item>

              <div class="dv_call">
                <el-form-item label="工程周期:" prop="engineeringCycle">
                  <div>{{ detailsFrom.engineeringCycle }}</div>
                </el-form-item>
                <el-form-item
                  label="合同签订:"
                  prop="engineeringContractSigning"
                >
                  <div>{{ detailsFrom.engineeringContractSigning }}</div>
                </el-form-item>
              </div>
              <div
                class="subpackage"
                v-for="(item, index) in EngineerForm.engineeringSubcontracting"
                :key="index"
              >
                <div class="subpack">
                  <span>工程分包情况</span>
                  <i class="el-icon-close closeIcon" v-show="index !== 0"></i>
                </div>
                <div class="dv_call">
                  <el-form-item label="承包单位:" prop="name">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>
                  <el-form-item label="联系方式:" prop="name">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>
                </div>
                <div class="dv_call">
                  <el-form-item label="工程周期:" prop="region">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>
                  <el-form-item label="负责人:" prop="name">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>
                </div>

                <el-form-item label="承包内容" prop="desc">
                  <div>市政道路维修市政道路维市政道政市政道路维修</div>
                </el-form-item>
                <el-form-item label="信用代码:" prop="region">
                  <div>市政道路维修市政道路维市政道政市政道路维修</div>
                </el-form-item>
                <div class="dv_call">
                  <el-form-item label="公司名称:" prop="region">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>
                  <el-form-item label="公司类型:" prop="name">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>
                </div>
                <div class="dv_call">
                  <el-form-item label="公司所在位置:" prop="region">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>
                  <el-form-item label="法人:" prop="name">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>
                </div>

                <el-form-item label="注册资金:" prop="region">
                  <div>市政道路维修市政道路维市政道政市政道路维修</div>
                </el-form-item>
                <div class="dv_call">
                  <el-form-item label="成立日期:" prop="name">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>

                  <el-form-item label="营业期限:" prop="name">
                    <div>市政道路维修市政道路维市政道政市政道路维修</div>
                  </el-form-item>
                </div>
                <el-form-item label="经营范围:" prop="name">
                  <div>市政道路维修市政道路维市政道政市政道路维修</div>
                </el-form-item>
              </div>
            </div></el-tab-pane
          >
          <el-tab-pane label="验收/付款" name="third">
            <div class="dialogDvScroll">
              <div class="header_ddv">验收信息</div>
              <div class="dv_call">
                <el-form-item
                  label="验收日期:"
                  prop="engineeringAcceptanceDate"
                >
                  <div>{{ detailsFrom.engineeringAcceptanceDate }}</div>
                </el-form-item>
                <el-form-item
                  label="验收负责人:"
                  prop="engineeringPersonInCharge"
                >
                  <div>{{ detailsFrom.engineeringPersonInCharge }}</div>
                </el-form-item>
              </div>
              <el-form-item
                label="工程预算书:"
                prop="engineeringBudgetStatement"
              >
                <div v-for="(item, index) in fileBudgetList" :key="index">
                  <el-link type="primary" @click="imgFun(item)"
                    >{{ item.name }}.{{ item.suffix }}</el-link
                  >
                </div>
              </el-form-item>
              <el-form-item label="工程决算书" prop="engineeringFinalStatement">
                <div v-for="(item, index) in fileFinalList" :key="index">
                  <el-link type="primary"
                    >{{ item.name }}.{{ item.suffix }}</el-link
                  >
                </div>
              </el-form-item>
              <el-form-item label="验收情况" prop="engineeringAcceptance">
                <div>{{ detailsFrom.engineeringAcceptance }}</div>
              </el-form-item>
              <el-form-item
                label="工程验收单"
                prop="engineeringAcceptanceSheet"
              >
                <div v-for="(item, index) in fileCheckList" :key="index">
                  <el-link type="primary"
                    >{{ item.name }}.{{ item.suffix }}</el-link
                  >
                </div>
              </el-form-item>
            </div></el-tab-pane
          >
          <el-tab-pane label="付款信息" name="fourth">
            <div class="dialogDvScroll">
              <div>
                <div class="header_ddv">付款进度一</div>
                <el-form-item
                  label="付款事项名称:"
                  prop="engineeringAcceptanceDate"
                >
                  <div>付款事项名称</div>
                </el-form-item>
                <div class="dv_call">
                  <el-form-item label="付款金额:" prop="region">
                    <div>500万元</div>
                  </el-form-item>
                  <el-form-item label="付款金额:" prop="region">
                    <div>500万元</div>
                  </el-form-item>
                </div>
                <el-form-item label="未付金额:" prop="region">
                  <div>500万元</div>
                </el-form-item>
                <el-form-item label="付款情况:" prop="region">
                  <div>
                    市政道路维修市政道路，维市政道政市，政道路维修市政道
                    路维修市政道路，维市政道政市
                  </div>
                </el-form-item>
              </div>
            </div></el-tab-pane
          >
        </el-tabs>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { httpPost, httpGet, httpDelete } from "@/http";
import moment from "moment";
import check from "./check";
export default {
  name: "EngineerMessage",
  props: {},
  components: {},
  mounted() {
    let divDom = document.getElementById("tablebox");
    this.table.height = divDom.offsetHeight - 130;
    this.initTable();
  },
  data() {
    return {
      /**字典类型 */
      ProjectType: [], //工程类型,
      construction: [], //施工进度
      ProjectSubType: [], //工程子类型,
      rowValue: "",
      sreachForm: {},
      engineeringCycle: "", //工程周期
      EngineerForm: {
        constructionProgress: "",
        createTime: "",
        creater: "",
        deleteStatus: "",
        engineeringAcceptance: "",
        engineeringAcceptanceDate: "",
        engineeringAcceptanceSheet: "", //工程验收单
        engineeringBudget: "",
        engineeringBudgetStatement: "", //工程预算书
        engineeringBuildUnit: "",
        engineeringConstructionUnit: "",
        engineeringContractSigning: "",
        engineeringDocumentsModelList: [], //工程图纸集合
        engineeringExplain: "",
        engineeringFinalStatement: "", //工程决算书
        engineeringName: "",
        engineeringPaymentProgress: "",
        engineeringPersonInCharge: "",
        engineeringProject: "",
        engineeringSubcontractingModelList: [
          {
            businessTerm: "", //营业期限
            companyLocation: "", //公司所在位置
            contactInformation: "", //联系方式
            contractContent: "", //承包内容
            contractingUnit: "", //承包单位
            corporateName: "", //公司名称
            corporateType: "", //公司类型
            creditCode: "", //信用代码
            engineeringCycleDateList: "", //工程周期
            establishDate: "", //成立日期
            legalPerson: "", //法人
            natureOfBusiness: "", //经营范围
            personInCharge: "", //负责人
            registerCapital: "" //注册资金
          }
        ],
        engineeringSubtype: "",
        engineeringSubtypeCode: "",
        engineeringSynopsis: "",
        engineeringType: "",
        engineeringTypeCode: "",
        engineeringUploadContract: ""
      },
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
      editId: "",
      dialog: {
        visible: false,
        title: ""
      },
      rules: check,
      activeName: "first",
      flieList: [], //工程图纸文件
      fileBudgetList: [], //工程预算书文件
      fileFinalList: [], //工程决算书文件
      fileCheckList: [], //工程验收单文件
      delFileIdList: [], //删除附件集合,
      dialogVisible: false,
      detailsFrom: {}, //详情
      addEnginerrFlag: false //添加 and 编辑 loading
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 初始化表格
     */
    initTable(flag) {
      if (flag) {
        this.table.pageInfo.pageNum = 1;
        this.table.pageInfo.pageSize = 10;
      }
      const { pageNum, pageSize } = this.table.pageInfo;

      this.tableLoading = true;
      httpPost(
        `/engineering/engineeringInfo/selectEngineeringList/${pageNum}/${pageSize}`,
        this.sreachForm
      ).then(res => {
        console.log(res);
        this.table.pageInfo.total = res.pageInfo.total;
        this.table.data = res.result;
        this.table.loading = false;
      });
    },
    currentChangeHandle(currentPage) {
      this.table.pageInfo.pageNum = currentPage;
      this.initTable();
    },
    handleSizeChange(row) {
      this.table.pageInfo.pageSize = row;
      this.table.pageInfo.pageNum = 1;
      this.initTable();
    },
    // 确定添加按钮
    addEnginerrMessageFun() {
      this.dialog.title = "添加信息";
      this.dialog.visible = true;
      this.activeName = "first";
    },
    /**
     * 关闭模态框回调
     */
    dialogClose() {
      //重置表单
      if (this.$refs.EnginerrFormRef) {
        this.$refs.EnginerrFormRef.resetFields();
      }
      this.EngineerForm = {};
      this.flieList = [];
      this.fileBudgetList = [];
      this.fileFinalList = [];
      this.fileCheckList = [];
      // 重置编辑id
      this.editId = 0;
    },

    /**
     * 添加 and 修改
     */
    addEnginerrFun() {
      this.addEnginerrFlag = true;
      for (const key in this.ProjectType) {
        if (this.rowValue === this.ProjectType[key].value) {
          this.EngineerForm.engineeringType = this.ProjectType[key].description;
        }
      }
      for (const key in this.ProjectSubType) {
        if (
          this.EngineerForm.engineeringSubtypeCode ===
          this.ProjectSubType[key].value
        ) {
          this.EngineerForm.engineeringSubtype = this.ProjectSubType[
            key
          ].description;
        }
      }

      if (this.editId) {
        const { EngineerForm } = this;
        EngineerForm.id = this.editId;
        // 工程图纸
        let flieList = this.flieList.filter(item => !item.id);
        let flieListArr = flieList.map(item => {
          return {
            fileName: item.name,
            filePath: item.path,
            fileSuffix: item.suffix,
            fileType: "1"
          };
        });
        // 工程预算书
        let fileBudgetList = this.fileBudgetList.filter(item => !item.id);
        let fileBudgetListArr = fileBudgetList.map(item => {
          return {
            fileName: item.name,
            filePath: item.path,
            fileSuffix: item.suffix,
            fileType: "2"
          };
        });
        // 工程决算书
        let fileFinalList = this.fileFinalList.filter(item => !item.id);
        let fileFinalListtArr = fileFinalList.map(item => {
          return {
            fileName: item.name,
            filePath: item.path,
            fileSuffix: item.suffix,
            fileType: "3"
          };
        });
        // 工程验收书
        let fileCheckList = this.fileCheckList.filter(item => !item.id);
        let fileCheckListArr = fileCheckList.map(item => {
          return {
            fileName: item.name,
            filePath: item.path,
            fileSuffix: item.suffix,
            fileType: "4"
          };
        });

        EngineerForm.engineeringDocumentsModelList = EngineerForm.engineeringDocumentsModelList.concat(
          flieListArr,
          fileBudgetListArr,
          fileFinalListtArr,
          fileCheckListArr
        );
        EngineerForm.delFileIdList = this.delFileIdList;

        console.log(EngineerForm);
        console.log(EngineerForm.engineeringCycle);
        this.$refs.EnginerrFormRef.validate(valid => {
          if (valid) {
            httpPost(
              `/engineering/engineeringInfo/updateEngineeringInfo`,
              EngineerForm
            ).then(res => {
              if (res.code === "1000000000") {
                this.dialog.visible = false;
                this.addEnginerrFlag = false;
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.initTable();
              } else {
                this.addEnginerrFlag = false;
                this.$message({
                  type: "error",
                  message: "更新失败"
                });
              }
            });
          }
        });
      } else {
        this.$refs.EnginerrFormRef.validate(valid => {
          if (valid) {
            // 工程图纸
            let flieListArr = this.flieList.map(item => {
              return {
                fileName: item.name,
                filePath: item.path,
                fileSuffix: item.suffix,
                fileType: "1"
              };
            });
            // 工程预算书
            let fileBudgetListArr = this.fileBudgetList.map(item => {
              return {
                fileName: item.name,
                filePath: item.path,
                fileSuffix: item.suffix,
                fileType: "2"
              };
            });
            // 工程决算书
            let fileFinalListArr = this.fileFinalList.map(item => {
              return {
                fileName: item.name,
                filePath: item.path,
                fileSuffix: item.suffix,
                fileType: "3"
              };
            });
            // 工程验收书
            let fileCheckListArr = this.fileCheckList.map(item => {
              return {
                fileName: item.name,
                filePath: item.path,
                fileSuffix: item.suffix,
                fileType: "4"
              };
            });
            this.EngineerForm.engineeringDocumentsModelList = [
              ...flieListArr,
              ...fileBudgetListArr,
              ...fileFinalListArr,
              ...fileCheckListArr
            ];
            console.log(this.EngineerForm.engineeringSubcontractingModelList);
            if (this.engineeringCycle != "null") {
              this.EngineerForm.engineeringCycleStartDate = moment(
                this.engineeringCycle[0]
              ).format("YYYY-MM-DD");
              this.EngineerForm.engineeringCycleEndDate = moment(
                this.engineeringCycle[1]
              ).format("YYYY-MM-DD");
            }

            for (const key in this.EngineerForm
              .engineeringSubcontractingModelList) {
              for (const i in this.EngineerForm
                .engineeringSubcontractingModelList[key]
                .engineeringCycleDateList) {
                this.EngineerForm.engineeringSubcontractingModelList[
                  key
                ].engineeringCycleStartDate = moment(
                  this.EngineerForm.engineeringSubcontractingModelList[key]
                    .engineeringCycleDateList[0]
                ).format("YYYY-MM-DD");
                this.EngineerForm.engineeringSubcontractingModelList[
                  key
                ].engineeringCycleEndDate = moment(
                  this.EngineerForm.engineeringSubcontractingModelList[key]
                    .engineeringCycleDateList[1]
                ).format("YYYY-MM-DD");
              }
            }
            console.log(this.EngineerForm);
            httpPost(
              "/engineering/engineeringInfo/addEngineeringInfo",
              this.EngineerForm
            ).then(res => {
              // console.log(res);
              if (res.code === "1000000000") {
                this.dialog.visible = false;
                this.addEnginerrFlag = false;
                this.initTable(this.table.currentPage);
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
              } else {
                this.addEnginerrFlag = false;
                this.$message({
                  type: "error",
                  message: "添加失败"
                });
              }
            });
          }
        });
      }
    },

    /**
     * 详情
     */
    detailsSpaceValue(row) {
      httpGet(
        `/engineering/engineeringInfo/selectEngineeringInfoById/${row.id}`
      ).then(res => {
        console.log(res);
        const { result } = res;
        this.activeName = "first";
        this.detailsFrom = { ...result };
        this.dialogVisible = true;
        for (const key in result.engineeringDocumentsModelList) {
          // console.log(result.engineeringDocumentsModelList[key].fileType);
          if (result.engineeringDocumentsModelList[key].fileType === "1") {
            this.flieList.push({
              name: result.engineeringDocumentsModelList[key].fileName,
              path: result.engineeringDocumentsModelList[key].filePath,
              suffix: result.engineeringDocumentsModelList[key].fileSuffix,
              id: result.engineeringDocumentsModelList[key].id
            });
          } else if (
            result.engineeringDocumentsModelList[key].fileType === "2"
          ) {
            this.fileBudgetList.push({
              name: result.engineeringDocumentsModelList[key].fileName,
              path: result.engineeringDocumentsModelList[key].filePath,
              suffix: result.engineeringDocumentsModelList[key].fileSuffix,
              id: result.engineeringDocumentsModelList[key].id
            });
          } else if (
            result.engineeringDocumentsModelList[key].fileType === "3"
          ) {
            this.fileFinalList.push({
              name: result.engineeringDocumentsModelList[key].fileName,
              path: result.engineeringDocumentsModelList[key].filePath,
              suffix: result.engineeringDocumentsModelList[key].fileSuffix,
              id: result.engineeringDocumentsModelList[key].id
            });
          } else {
            this.fileCheckList.push({
              name: result.engineeringDocumentsModelList[key].fileName,
              path: result.engineeringDocumentsModelList[key].filePath,
              suffix: result.engineeringDocumentsModelList[key].fileSuffix,
              id: result.engineeringDocumentsModelList[key].id
            });
          }
        }
      });
    },
    /**
     * 编辑
     */
    editEnterValue(row) {
      this.dialog.title = "编辑参数";
      httpGet(
        `/engineering/engineeringInfo/selectEngineeringInfoById/${row.id}`
      ).then(res => {
        console.log(res);
        const { code, result, message } = res;
        if (code == "1000000000") {
          this.activeName = "first";

          for (const key in result.engineeringDocumentsModelList) {
            if (result.engineeringDocumentsModelList[key].fileType === "1") {
              this.flieList.push({
                name: result.engineeringDocumentsModelList[key].fileName,
                path: result.engineeringDocumentsModelList[key].filePath,
                id: result.engineeringDocumentsModelList[key].id
              });
            } else if (
              result.engineeringDocumentsModelList[key].fileType === "2"
            ) {
              this.fileBudgetList.push({
                name: result.engineeringDocumentsModelList[key].fileName,
                path: result.engineeringDocumentsModelList[key].filePath,
                id: result.engineeringDocumentsModelList[key].id
              });
            } else if (
              result.engineeringDocumentsModelList[key].fileType === "3"
            ) {
              this.fileFinalList.push({
                name: result.engineeringDocumentsModelList[key].fileName,
                path: result.engineeringDocumentsModelList[key].filePath,
                id: result.engineeringDocumentsModelList[key].id
              });
            } else {
              this.fileCheckList.push({
                name: result.engineeringDocumentsModelList[key].fileName,
                path: result.engineeringDocumentsModelList[key].filePath,
                id: result.engineeringDocumentsModelList[key].id
              });
            }
          }
          if (result.engineeringSubtype == "null") {
            result.engineeringSubtype = "";
            result.engineeringSubtypeCode = "";
          }
          this.engineeringCycle = [
            result.engineeringCycleStartDate,
            result.engineeringCycleEndDate
          ];

          this.projectInitFrom(result.engineeringTypeCode);
          this.EngineerForm = { ...result };
          this.editId = row.id;
          this.dialog.visible = true;
        }
      });
    },
    /**
     * 删除
     */
    deleteEnterValue(row) {
      this.$confirm("此操作将永久删除企业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDelete(
            `/engineering/engineeringInfo/deleteEngineeringInfoById/${row.id}`
          ).then(res => {
            // console.log(res);
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
     * 工程图纸文件上传
     */
    beforeAvatarUpload(file) {
      // this.file = file;
    },
    handleAvatarSuccess(flie) {
      let arr = ["jpg", "jpeg", "png", "gif", "bmp", "wbmp"];
      let params = new FormData();
      params.append("file", flie.file);
      params.append("fileTag", "enginerMessage");
      if (arr.includes(flie.file.type.split("/")[1])) {
        httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
          res => {
            // console.log(res);
            if (res.code == "1000000000") {
              let { filePath, filetype, fileName } = res.result;
              this.flieList.push({
                name: fileName,
                path: filePath,
                suffix: filetype
              });
              this.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              this.$message.error("上传失败");
            }
          }
        );
      } else {
        httpPost("/filesystem/filesystem/uploadMultipartFile", params).then(
          res => {
            if (res.code == "1000000000") {
              // console.log(res);
              let { filePath, filetype, fileName } = res.result;
              this.flieList.push({
                name: fileName,
                path: filePath,
                suffix: filetype
              });
              this.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              this.$message.error("上传失败");
            }
          }
        );
      }
    },
    /**
     * 工程图纸删除文件
     */
    RemoveDraw(flie, flieList) {
      const { engineeringDocumentsModelList } = this.EngineerForm;
      const newinvestmentDocuments = engineeringDocumentsModelList.filter(
        item => item.id != flie.id
      );
      this.flieList = this.flieList.filter(item => {
        return item.path != flie.path;
      });
      for (let i = 0; i < engineeringDocumentsModelList.length; i++) {
        if (engineeringDocumentsModelList[i].id === flie.id) {
          this.delFileIdList.push(engineeringDocumentsModelList[i].id);
        }
      }
      this.EngineerForm.engineeringDocumentsModelList = JSON.parse(
        JSON.stringify(newinvestmentDocuments)
      );
    },
    /**
     * 工程预算书文件上传
     */
    handleBudgetSuccess(flie) {
      let arr = ["jpg", "jpeg", "png", "gif", "bmp", "wbmp"];
      let params = new FormData();
      params.append("file", flie.file);
      params.append("fileTag", "enginerMessage");
      if (arr.includes(flie.file.type.split("/")[1])) {
        httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
          res => {
            if (res.code == "1000000000") {
              let { filePath, filetype, fileName } = res.result;
              this.fileBudgetList.push({
                name: fileName,
                path: filePath,
                suffix: filetype
              });
              this.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              this.$message.error("上传失败");
            }
          }
        );
      } else {
        httpPost("/filesystem/filesystem/uploadMultipartFile", params).then(
          res => {
            if (res.code == "1000000000") {
              let { filePath, filetype, fileName } = res.result;
              this.fileBudgetList.push({
                name: fileName,
                path: filePath,
                suffix: filetype
              });
              this.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              this.$message.error("上传失败");
            }
          }
        );
      }
    },
    /**
     * 工程预算书删除文件
     */
    RemoveBudget(flie, flieList) {
      const { engineeringDocumentsModelList } = this.EngineerForm;
      const newinvestmentDocuments = engineeringDocumentsModelList.filter(
        item => item.id != flie.id
      );
      this.fileBudgetList = this.fileBudgetList.filter(item => {
        return item.path != flie.path;
      });
      for (let i = 0; i < engineeringDocumentsModelList.length; i++) {
        if (engineeringDocumentsModelList[i].id === flie.id) {
          this.delFileIdList.push(engineeringDocumentsModelList[i].id);
        }
      }
      this.EngineerForm.engineeringDocumentsModelList = JSON.parse(
        JSON.stringify(newinvestmentDocuments)
      );
    },
    /**
     * 工程决算书文件上传
     */
    handleFinalSuccess(flie) {
      let arr = ["jpg", "jpeg", "png", "gif", "bmp", "wbmp"];
      let params = new FormData();
      params.append("file", flie.file);
      params.append("fileTag", "enginerMessage");
      if (arr.includes(flie.file.type.split("/")[1])) {
        httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
          res => {
            if (res.code == "1000000000") {
              let { filePath, filetype, fileName } = res.result;
              this.fileFinalList.push({
                name: fileName,
                path: filePath,
                suffix: filetype
              });
              this.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              this.$message.error("上传失败");
            }
          }
        );
      } else {
        httpPost("/filesystem/filesystem/uploadMultipartFile", params).then(
          res => {
            if (res.code == "1000000000") {
              let { filePath, filetype, fileName } = res.result;
              this.fileFinalList.push({
                name: fileName,
                path: filePath,
                suffix: filetype
              });
              this.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              this.$message.error("上传失败");
            }
          }
        );
      }
    },
    /**
     * 工程决算书删除文件
     */
    RemoveFinal(flie, flieList) {
      const { engineeringDocumentsModelList } = this.EngineerForm;
      const newinvestmentDocuments = engineeringDocumentsModelList.filter(
        item => item.id != flie.id
      );
      this.fileFinalList = this.fileFinalList.filter(item => {
        return item.path != flie.path;
      });
      for (let i = 0; i < engineeringDocumentsModelList.length; i++) {
        if (engineeringDocumentsModelList[i].id === flie.id) {
          this.delFileIdList.push(engineeringDocumentsModelList[i].id);
        }
      }
      this.EngineerForm.engineeringDocumentsModelList = JSON.parse(
        JSON.stringify(newinvestmentDocuments)
      );
    },
    /**
     * 工程验收单文件上传
     */
    handleCheckSuccess(flie) {
      let arr = ["jpg", "jpeg", "png", "gif", "bmp", "wbmp"];
      let params = new FormData();
      params.append("file", flie.file);
      params.append("fileTag", "enginerMessage");
      if (arr.includes(flie.file.type.split("/")[1])) {
        httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
          res => {
            if (res.code == "1000000000") {
              let { filePath, filetype, fileName } = res.result;
              this.fileCheckList.push({
                name: fileName,
                path: filePath,
                type: filetype
              });
              this.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              this.$message.error("上传失败");
            }
          }
        );
      } else {
        httpPost("/filesystem/filesystem/uploadMultipartFile", params).then(
          res => {
            if (res.code == "1000000000") {
              let { filePath, filetype, fileName } = res.result;
              this.fileCheckList.push({
                name: fileName,
                path: filePath,
                type: filetype
              });
              this.$message({
                type: "success",
                message: "上传成功"
              });
            } else {
              this.$message.error("上传失败");
            }
          }
        );
      }
    },
    /**
     * 工程验收单删除文件
     */
    RemoveCheck(flie, flieList) {
      const { engineeringDocumentsModelList } = this.EngineerForm;
      const newinvestmentDocuments = engineeringDocumentsModelList.filter(
        item => item.id != flie.id
      );
      this.fileCheckList = this.fileCheckList.filter(item => {
        return item.path != flie.path;
      });
      for (let i = 0; i < engineeringDocumentsModelList.length; i++) {
        if (engineeringDocumentsModelList[i].id === flie.id) {
          this.delFileIdList.push(engineeringDocumentsModelList[i].id);
        }
      }
      this.EngineerForm.engineeringDocumentsModelList = JSON.parse(
        JSON.stringify(newinvestmentDocuments)
      );
    },
    addOfNew() {
      this.EngineerForm.engineeringSubcontractingModelList.push({
        businessTerm: "", //营业期限
        companyLocation: "", //公司所在位置
        contactInformation: "", //联系方式
        contractContent: "", //承包内容
        contractingUnit: "", //承包单位
        corporateName: "", //公司名称
        corporateType: "", //公司类型
        creditCode: "", //信用代码
        engineeringCycle: "", //工程周期
        establishDate: "", //成立日期
        legalPerson: "", //法人
        natureOfBusiness: "", //经营范围
        personInCharge: "", //负责人
        registerCapital: "" //注册资金
      });
    },
    projectInitFrom(row) {
      this.rowValue = row;
      if (row) {
        httpGet("/system/dict/queryDictInfosBydictCode/" + row).then(res => {
          if (res.code === "1000000000") {
            this.ProjectSubType = res.result;
          } else {
            this.$message.error(res.messasge);
          }
        });
      }

      if (this.EngineerForm.engineeringSubtypeCode != undefined) {
        this.EngineerForm.engineeringSubtypeCode = "";
        this.EngineerForm.engineeringSubtype = "null";
      } else if (this.EngineerForm.engineeringSubtypeCode == "null") {
        this.EngineerForm.engineeringSubtypeCode = "";
        this.EngineerForm.engineeringSubtype = "null";
      }
    },
    projectInitTable(row) {
      this.rowValue = row;
      if (row) {
        httpGet("/system/dict/queryDictInfosBydictCode/" + row).then(res => {
          if (res.code === "1000000000") {
            this.ProjectSubType = res.result;
          } else {
            this.$message.error(res.messasge);
          }
        });
      }
      this.table.pageInfo.pageNum = 1;
      this.initTable();
    },
    projectCloneTable() {
      this.ProjectSubType = [];
      this.sreachForm.engineeringSubtype = "";
      this.initTable();
    },
    addNextFun() {
      if (this.activeName == "first") {
        this.activeName = "second";
      } else if (this.activeName == "second") {
        this.activeName = "third";
      }
    },
    imgFun(row) {
      console.log(row);
    }
  },
  created() {
    this.initTable();
    /**
     * 字典数据
     */
    // 工程类型
    this.$store.dispatch("getProjectType").then(() => {
      this.ProjectType = this.$store.state.ProjectType;
      console.log(this.$store.state.ProjectType);
    });
    // 施工进度
    this.$store.dispatch("getConstruCtione").then(() => {
      this.construction = this.$store.state.construction;
      // console.log(this.$store.state.construction);
    });
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
}
.dv_call {
  display: flex;
}
.subpackage {
  .subpack {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 20px 100px;
  }
  margin: 20px auto;
  padding: 0 20px 0 0;
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
.closeIcon {
  cursor: pointer;
}
/deep/ .el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer_Dv {
  display: flex;
  align-items: center;
  justify-content: center;
}
.datePicker {
  width: 240px;
}
</style>
