<template>
  <div class="alone">
    <div class="operation">
      <el-form :inline="true" :model="sreachForm">
        <el-form-item label="产业类型">
          <el-select
            v-model="sreachForm.industryClass"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="入驻形式">
          <el-select
            v-model="sreachForm.projectType"
            @change="initTable()"
            clearable
            @clear="initTable()"
          >
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="搜索企业名称"
            clearable
            v-model="sreachForm.firmName"
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
      <!-- !!! 方法名不加括号 默认参数是event  参数有默认值不传参数 需加括号 -->
      <el-button
        type="primary"
        @click="
          addEditDialog.flag = true;
          addEditDialog.title = '添加';
        "
        >添加</el-button
      >
      <el-button
        type="primary"
        v-if="userType === '02'"
        @click="other(btn.title)"
        >{{ btn.title }}</el-button
      >
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        :height="table.height"
        v-if="table.height && userType === '01'"
        :header-cell-style="{ background: '#F7F8FA' }"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.policyEnterpriseRs">
              <el-table-column label="企业名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.enterpriseRequest.firmName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="企业法人">
                <template slot-scope="scope">
                  <span>{{ scope.row.enterpriseRequest.legalPerson }}</span>
                </template>
              </el-table-column>
              <el-table-column label="企业类型">
                <template slot-scope="scope">
                  <span>{{ scope.row.enterpriseRequest.registType }}</span>
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.auditStatus === "02"
                      ? "待审核"
                      : scope.row.auditStatus === "03"
                      ? "已通过"
                      : "未通过"
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="驳回理由">
                <template slot-scope="scope">
                  <span>{{ scope.row.rejectRequest }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    v-if="scope.row.auditStatus === '02'"
                    size="mini"
                    @click="handle(scope.row)"
                    plain
                    >立即处理</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="policyName" label="名称"> </el-table-column>
        <el-table-column prop="policyPublishingDepartment" label="发布部门">
        </el-table-column>
        <el-table-column prop="policyReleaseTime" label="发布时间">
        </el-table-column>
        <el-table-column label="政策类型">
          <template slot-scope="scope">
            {{ getPolicyTypeName(scope.row.policyType) }}
          </template>
        </el-table-column>
        <el-table-column label="发布状态">
          <template slot-scope="scope">
            {{ scope.row.releaseStatus === "01" ? "未发布" : "已发布" }}
          </template>
        </el-table-column>
        <el-table-column prop="number" label="申请条数"> </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <template v-if="scope.row.releaseStatus === '01'">
              <el-link type="primary" @click="editPolicy(scope.row)"
                >编辑</el-link
              >
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="deletePolicy(scope.row)"
                >删除</el-link
              >
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="releasePolicy(scope.row)"
                >发布</el-link
              >
              <el-divider direction="vertical"></el-divider>
            </template>
            <el-link type="primary" @click="detailsPolicy(scope.row)"
              >详情</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="table.data"
        :height="table.height"
        v-if="table.height && userType === '02' && btn.title === '其他政策'"
        :header-cell-style="{ background: '#F7F8FA' }"
      >
        <el-table-column  label="名称">
          <template slot-scope="scope">
            {{ scope.row.policyServiceInfoRequest.policyName || ""}}
          </template>
        </el-table-column>
        <el-table-column  label="发布部门">
          <template slot-scope="scope">
            {{ scope.row.policyServiceInfoRequest.policyPublishingDepartment||"" }}
          </template>
        </el-table-column>
        <el-table-column label="发布时间">
          <template slot-scope="scope">
            {{ scope.row.policyServiceInfoRequest.policyReleaseTime||"" }}
          </template>
        </el-table-column>
        <el-table-column label="政策类型">
          <template slot-scope="scope">
            {{
              getPolicyTypeName(scope.row.policyServiceInfoRequest.policyType||"")
            }}
          </template>
        </el-table-column>
        <el-table-column label="审核状态">
          <template slot-scope="scope">
            {{
              scope.row.auditStatus === "02"
                ? "待审核"
                : scope.row.auditStatus === "03"
                ? "已通过"
                : "未通过"
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-link type="primary" @click="detailsApply(scope.row)"
              >详情</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="revokeApply(scope.row)"
              >撤销申请</el-link
            >
            <template  v-if="scope.row.auditStatus === '04'" >
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="againApplyPolicy(scope.row)"
                >再次申请</el-link
              >
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="table.data"
        :height="table.height"
        v-if="table.height && userType === '02' && btn.title === '我的申请'"
        :header-cell-style="{ background: '#F7F8FA' }"
      >
        <el-table-column prop="policyName" label="名称"> </el-table-column>
        <el-table-column prop="policyPublishingDepartment" label="发布部门">
        </el-table-column>
        <el-table-column prop="policyReleaseTime" label="发布时间">
        </el-table-column>
        <el-table-column label="政策类型">
          <template slot-scope="scope">
            {{ getPolicyTypeName(scope.row.policyType) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-link type="primary" @click="applyPolicy(scope.row)"
              >申请</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="detailsPolicy(scope.row.id)"
              >详情</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="table.pageInfo.total"
        @current-change="currentChangeHandle"
      >
      </el-pagination>
    </div>
    <!-- 详情 -->
    <el-dialog
      title="详情"
      :visible.sync="detailsDialog"
      @close="dialogClose"
      width="700px"
    >
      <div class="detailsDialog">
        <div class="infoItem">
          <div class="infoLabel">政策名称：</div>
          <div class="infoContent">
            {{ dForm.policyName }}
          </div>
        </div>
        <div class="infoGroup">
          <div class="infoItem">
            <div class="infoLabel">政策类型：</div>
            <div class="infoContent">{{ dForm.policyType }}</div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">发布时间：</div>
            <div class="infoContent">{{ dForm.policyReleaseTime }}</div>
          </div>
        </div>
        <div class="infoItem">
          <div class="infoLabel">内容：</div>
          <div class="infoContent">
            {{ dForm.policyContent }}
          </div>
        </div>
        <div class="infoItem">
          <div class="infoLabel">政策附件：</div>
          <div class="infoContent">
            <div v-for="(item, index) in dForm.investmentAnnexes" :key="index">
              <el-link type="primary" @click="releasePolicy(scope.row)">{{
                item.annexName
              }}</el-link>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 新增编辑 -->
    <el-dialog
      :title="addEditDialog.title"
      :visible.sync="addEditDialog.flag"
      @close="dialogClose"
      width="800px"
    >
      <el-scrollbar style="height:600px">
        <el-form :model="form" label-width="80px">
          <el-form-item label="政策名称">
            <el-input v-model="form.policyName"> </el-input>
          </el-form-item>
          <el-form-item label="政策类型">
            <el-select v-model="form.policyType">
              <el-option
                v-for="(item, index) in policyType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政策级别">
            <el-select v-model="form.policyLevel">
              <el-option
                v-for="(item, index) in policyRank"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker
              v-model="form.policyReleaseTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker
              v-model="form.policyDeclareDeadline"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="政策内容">
            <el-input v-model="form.policyContent"></el-input>
          </el-form-item>
          <el-form-item label="附件类型">
            <el-select v-model="form.fileType">
              <el-option
                v-for="(item, index) in policyFileType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-upload
            class="uploader"
            :show-file-list="false"
            action=""
            :http-request="uploadFlie"
            :before-upload="beforeImageUpload"
          >
            <el-button size="small" type="primary">上传附件</el-button>
          </el-upload>
          <div class="fileList">
            <div
              class="fileItem"
              v-for="(item, index) in form.investmentAnnexes"
              :key="index"
            >
              {{ getFileType(item.annexType) }}
              <span style="margin-left:8px;">{{ item.annexName }}</span>
              <i
                class="el-icon-close"
                @click="removeFlie('form', 'investmentAnnexes', index)"
              ></i>
            </div>
          </div>
        </el-form>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEditDialog.flag = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 处理 -->
    <el-dialog
      v-if="handleDialog"
      title="立即处理"
      :visible.sync="handleDialog"
      @close="dialogClose"
      width="700px"
      class="handleForm"
    >
      <el-scrollbar style="height:500px">
        <div class="detailsDialog">
          <div class="infoTitle">
            企业信息
          </div>
          <div class="infoItem">
            <div class="infoLabel">公司名称：</div>
            <div class="infoContent">
              {{ handleForm.enterpriseRequest.firmName }}
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <div class="infoLabel">公司法人：</div>
              <div class="infoContent">
                {{ handleForm.enterpriseRequest.legalPerson }}
              </div>
            </div>
            <div class="infoItem">
              <div class="infoLabel">联系方式：</div>
              <div class="infoContent">
                {{ handleForm.enterpriseRequest.legalPersonPhone }}
              </div>
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <div class="infoLabel">企业类型：</div>
              <div class="infoContent">
                {{ handleForm.enterpriseRequest.registType }}
              </div>
            </div>
            <div class="infoItem">
              <div class="infoLabel">注册资金：</div>
              <div class="infoContent">
                {{ handleForm.enterpriseRequest.registeredFund }}
              </div>
            </div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">注册地址：</div>
            <div class="infoContent">
              {{ handleForm.enterpriseRequest.firmRegistAddress }}
            </div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">政策附件：</div>
            <div class="infoContent">
              <div
                v-for="(item, index) in handleForm.enterpriseRequest
                  .investmentAnnexes"
                :key="index"
              >
                <el-link type="primary">{{ item.annexName }}</el-link>
              </div>
            </div>
          </div>
          <div class="infoTitle">
            政策信息
          </div>
          <div class="infoItem">
            <div class="infoLabel">政策名称：</div>
            <div class="infoContent">
              {{ handleForm.policyServiceInfo.policyName }}
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <div class="infoLabel">政策类型：</div>
              <div class="infoContent">
                {{ handleForm.policyServiceInfo.policyType }}
              </div>
            </div>
            <div class="infoItem">
              <div class="infoLabel">发布时间：</div>
              <div class="infoContent">
                {{ handleForm.policyServiceInfo.policyReleaseTime }}
              </div>
            </div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">内容：</div>
            <div class="infoContent">
              {{ handleForm.policyServiceInfo.policyContent }}
            </div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">政策附件：</div>
            <div class="infoContent">
              <div
                v-for="(item, index) in handleForm.policyServiceInfo
                  .investmentAnnexes"
                :key="index"
              >
                <el-link type="primary">{{ item.annexName }}</el-link>
              </div>
            </div>
          </div>
          <div class="infoTitle">
            历史记录
          </div>
          <div
            class="rejectItem"
            v-for="(item, index) in handleForm.rejectReasonHistory"
            :key="index"
          >
            <span class="rejectTitle">已驳回</span>
            <span class="rejectDate">{{ item.createTime }}</span>
            <div class="rejectContent">{{ item.rejectReason }}</div>
          </div>
        </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer-handel">
        <el-scrollbar style="height:260px">
          <div class="infoTitle">
            立即处理
          </div>
          <el-form
            :model="handleForm"
            label-width="80px"
            style="text-align: left;"
          >
            <el-form-item label="审核">
              <el-radio-group v-model="handleForm.auditStatus">
                <el-radio label="03">通过</el-radio>
                <el-radio label="04">拒绝</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="理由">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="handleForm.reasonRejection"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="附件类型">
              <el-select v-model="handleForm.fileType">
                <el-option
                  v-for="(item, index) in policyFileType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-upload
              class="uploader"
              :show-file-list="false"
              action=""
              :http-request="handleuploadFlie"
              :before-upload="beforeImageUpload"
            >
              <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
            <div class="fileList">
              <div
                class="fileItem"
                v-for="(item, index) in handleForm.delInvestmentAnnexes"
                :key="index"
              >
                {{ getFileType(item.annexType) }}
                <span style="margin-left:8px;">{{ item.annexName }}</span>
                <i class="el-icon-close" @click="handleremoveFlie(index)"></i>
              </div>
            </div>
          </el-form>
          <el-button @click="handleDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleSave">确 定</el-button>
        </el-scrollbar>
      </span>
    </el-dialog>
    <!-- 政策申请 or 编辑 -->
    <el-dialog
      v-if="applyDialog.flag"
      :title="applyDialog.title"
      :visible.sync="applyDialog.flag"
      @close="dialogClose"
      width="700px"
      class="handleForm"
    >
      <el-scrollbar style="height:500px">
        <div class="detailsDialog">
          <div class="infoTitle">
            政策信息
          </div>
          <div class="infoItem">
            <div class="infoLabel">政策名称：</div>
            <div class="infoContent">
              {{ applyForm.policyEnterpriseRequest.policyName }}
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <div class="infoLabel">政策类型：</div>
              <div class="infoContent">
                {{ applyForm.policyEnterpriseRequest.policyType }}
              </div>
            </div>
            <div class="infoItem">
              <div class="infoLabel">发布时间：</div>
              <div class="infoContent">
                {{ applyForm.policyEnterpriseRequest.policyReleaseTime }}
              </div>
            </div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">内容：</div>
            <div class="infoContent">
              {{ applyForm.policyEnterpriseRequest.policyContent }}
            </div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">政策附件：</div>
            <div class="infoContent">
              <div
                v-for="(item, index) in applyForm.policyEnterpriseRequest
                  .investmentAnnexes"
                :key="index"
              >
                <el-link type="primary">{{ item.annexName }}</el-link>
              </div>
            </div>
          </div>
          <el-form
            :model="applyForm"
            label-width="80px"
            style="text-align: left;"
          >
            <el-form-item label="附件类型">
              <el-select v-model="applyForm.fileType">
                <el-option
                  v-for="(item, index) in policyFileType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-upload
              class="uploader"
              :show-file-list="false"
              action=""
              :http-request="applyuploadFlie"
              :before-upload="beforeImageUpload"
            >
              <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
            <div class="fileList">
              <div
                class="fileItem"
                v-for="(item, index) in applyForm.investmentAnnexes"
                :key="index"
              >
                {{ getFileType(item.annexType) }}
                <span style="margin-left:8px;">{{ item.annexName }}</span>
                <i class="el-icon-close" @click="applyremoveFlie(index)"></i>
              </div>
            </div>
          </el-form>
        </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer-handel">
        <el-button @click="applyCancel">取 消</el-button>
        <el-button type="primary" @click="applySave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 申请详情 -->
    <el-dialog
      v-if="detailsApplyDialog"
      title="详情"
      :visible.sync="detailsApplyDialog"
      width="700px"
    >
      <div class="detailsDialog">
         <div class="infoTitle">
            政策信息
          </div>
        <div class="infoItem">
          <div class="infoLabel">政策名称：</div>
          <div class="infoContent">
            {{ applyDForm.policyServiceInfo.policyName }}
          </div>
        </div>
        <div class="infoGroup">
          <div class="infoItem">
            <div class="infoLabel">政策类型：</div>
            <div class="infoContent">{{ applyDForm.policyServiceInfo.policyType }}</div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">发布时间：</div>
            <div class="infoContent">{{ applyDForm.policyServiceInfo.policyReleaseTime }}</div>
          </div>
        </div>
        <div class="infoItem">
          <div class="infoLabel">内容：</div>
          <div class="infoContent">
            {{ applyDForm.policyServiceInfo.policyContent }}
          </div>
        </div>
        <div class="infoItem">
          <div class="infoLabel">政策附件：</div>
          <div class="infoContent">
            <div v-for="(item, index) in applyDForm.policyServiceInfo.investmentAnnexes" :key="index">
              <el-link type="primary" @click="releasePolicy(scope.row)">{{
                item.annexName
              }}</el-link>
            </div>
          </div>
        </div>
        <div class="infoTitle">
            申请信息
          </div>
          <div class="infoItem">
          <div class="infoLabel">申请附件：</div>
          <div class="infoContent">
            <div v-for="(item, index) in applyDForm.enterpriseRequest.investmentAnnexes" :key="index">
              <el-link type="primary" @click="releasePolicy(scope.row)">{{
                item.annexName
              }}</el-link>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 再次申请 -->
    <el-dialog
      v-if="againApplyDialog"
      title="申请"
      :visible.sync="againApplyDialog"
      @close="dialogClose"
      width="700px"
      class="handleForm"
    >
      <el-scrollbar style="height:500px">
        <div class="detailsDialog">
          <div class="infoTitle">
            政策信息
          </div>
          <div class="infoItem">
            <div class="infoLabel">政策名称：</div>
            <div class="infoContent">
              {{ againApplyForm.policyServiceInfo.policyName }}
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <div class="infoLabel">政策类型：</div>
              <div class="infoContent">
                {{ againApplyForm.policyServiceInfo.policyType }}
              </div>
            </div>
            <div class="infoItem">
              <div class="infoLabel">发布时间：</div>
              <div class="infoContent">
                {{ againApplyForm.policyServiceInfo.policyReleaseTime }}
              </div>
            </div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">内容：</div>
            <div class="infoContent">
              {{ againApplyForm.policyServiceInfo.policyContent }}
            </div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">政策附件：</div>
            <div class="infoContent">
              <div
                v-for="(item, index) in againApplyForm.policyServiceInfo.
                  investmentAnnexes"
                :key="index"
              >
                <el-link type="primary">{{ item.annexName }}</el-link>
              </div>
            </div>
          </div>
          <div class="infoTitle">
            驳回理由
          </div>
          <div
            class="rejectItem"
            v-for="(item, index) in againApplyForm.rejectReasonHistory"
            :key="index"
          >
            <span class="rejectTitle">已驳回</span>
            <span class="rejectDate">{{ item.createTime }}</span>
            <div class="rejectContent">{{ item.rejectReason }}</div>
          </div>
          <div class="infoItem">
            <div class="infoLabel">驳回附件</div>
            <div class="infoContent">
              <div
                v-for="(item, index) in againApplyForm.enterpriseRequest.
                  investmentAnnexes"
                :key="index"
              >
                <el-link type="primary">{{ item.annexName }}</el-link>
              </div>
            </div>
          </div>
          <div class="infoTitle">
            申请附件
          </div>
          <el-form
            :model="againApplyForm"
            label-width="80px"
            style="text-align: left;"
          >
            <el-form-item label="附件类型">
              <el-select v-model="againApplyForm.fileType">
                <el-option
                  v-for="(item, index) in policyFileType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-upload
              class="uploader"
              :show-file-list="false"
              action=""
              :http-request="againApplyUploadFlie"
              :before-upload="beforeImageUpload"
            >
              <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
            <div class="fileList">
              <div
                class="fileItem"
                v-for="(item, index) in againApplyForm.delInvestmentAnnexes"
                :key="index"
              >
                {{ getFileType(item.annexType) }}
                <span style="margin-left:8px;">{{ item.annexName }}</span>
                <i class="el-icon-close" @click="againApplyRemoveFlie(index)"></i>
              </div>
            </div>
          </el-form>
        </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer-handel">
        <el-button @click="againApplyCancel">取 消</el-button>
        <el-button type="primary" @click="againApplySave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { httpPost, httpDelete, httpPut, httpGet, postDownload } from "@/http";
export default {
  name: "PolicyServices",
  computed:{
    userType(){
      return this.$store.state.userType;
    }
  },
  data() {
    return {
      /**字典 */
      policyType: [], // 政策类型
      policyRank: [], // 政策级别
      policyFileType: [], // 政策附件类型
      sreachForm: {},
      /**新增政策表单 */
      form: {
        policyName: "", // 政策名称
        policyType: "", //政策类型
        policyLevel: "", // 政策级别
        policyReleaseTime: "", // 发布时间
        policyDeclareDeadline: "", // 截止时间
        policyContent: "", // 政策内容
        investmentAnnexes: [], //附件
        fileType: ""
      },
      handleDialog: false,
      /**处理表单 */
      handleForm: {
        fileType: ""
      },
      /**政策详情表单 */
      dForm: {},
      table: {
        data: [],
        height: "",
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      },
      detailsDialog: false,
      detailsApplyDialog: false,
      editId: "",
      addEditDialog: {
        flag: false,
        title: ""
      },
      btn: {
        title: "其他政策"
      },
      applyDialog: {
        flag: false,
        title: "申请"
      },
      applyForm: {
        fileType: "",
        policyEnterpriseRequest: {},
        investmentAnnexes: []
      },
      applyDForm: {},
      againApplyDialog:false,
      againApplyForm:{
        fileType:'',
      }
    };
  },
  created() {
    this.$store.dispatch("getPolicyType").then(() => {
      this.policyType = this.$store.state.policyType;
      console.log("字典1")
    });
    this.$store.dispatch("getPolicyRank").then(() => {
      this.policyRank = this.$store.state.policyRank;
      console.log("字典2")
    });
    this.$store.dispatch("getPolicyFileType").then(() => {
      this.policyFileType = this.$store.state.policyFileType;
      console.log("字典3")
    });
    let menu = JSON.parse(localStorage.getItem("menu"));
    let btnList = [];
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].url === this.$route.path) {
        btnList = menu[i].childs;
      }
    }
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 110;
    this.$nextTick(_ => {
      if (this.userType === "01") {
        this.initTable();
      } else {
        this.renderTable();
      }
    });
  },
  methods: {
    renderTable() {
      const { pageNum, pageSize, total } = this.table.pageInfo;
      httpPost(
        `/policy/enterprise/queryAll/${pageNum}/${pageSize}`,
        this.sreachForm
      ).then(res => {
        this.table.total = res.pageInfo.total;
        this.table.data = res.result;
      });
    },
    other(title) {
      this.table.pageInfo.pageNum = 1;
      const { pageNum, pageSize, total } = this.table.pageInfo;
      if (title === "其他政策") {
        httpPost(
          `/policy/enterprise/queryAllQI/${pageNum}/${pageSize}`,
          this.sreachForm
        ).then(res => {
          this.table.total = res.pageInfo.total;
          this.table.data = res.result;
          this.btn.title = "我的申请";
        });
      } else {
        httpPost(
          `/policy/enterprise/queryAll/${pageNum}/${pageSize}`,
          this.sreachForm
        ).then(res => {
          this.table.total = res.pageInfo.total;
          this.table.data = res.result;
          this.btn.title = "其他政策";
        });
      }
    },
    /**发起申请 */
    applyPolicy(row) {
      httpGet(`/policy/enterprise/selectByAdd/${row.id}`).then(res => {
        if (res.code === "1000000000") {
          this.applyForm.policyEnterpriseRequest =
            res.result.policyEnterpriseRequest;
          this.applyDialog.flag = true;
        } else {
          this.$message.error("系统异常");
        }
      });
    },
    /**申请保存 */
    applySave() {
      let data = JSON.parse(JSON.stringify(this.applyForm));
      data.fileType = undefined;
      httpPost("/policy/enterprise/addInfo", data).then(res => {
        if (res.code === "1000000000") {
          this.$message.success("申请成功");
          this.applyDialog.flag = false;
        }
      });
    },
    /**再次申请 */
    againApplyPolicy(row){
      httpGet(`/policy/policyEnterprise/queryById/${row.id}`).then(res=>{
        if(res.code==="1000000000"){
          this.againApplyForm =res.result;
          this.againApplyDialog=true;
        }
      })
    },
    /**再次申请保存 */
    againApplySave(){
      let data=JSON.parse(JSON.stringify(this.againApplyForm));
      data.auditStatus=undefined;
      data.reasonRejection=undefined;
      data.rejectReasonHistory=undefined;
      data.fileType=undefined;
      httpPost('/policy/policyEnterprise/addRecordAndAccessory',data).then(res=>{
        if(res.code==="1000000000"){
          this.$message.success("提交成功")
          this.againApplyDialog=false;
        }else{
          this.$message.error("系统异常")
        }
      })
      console.log(data)
    },
    againApplyCancel(){

    },
    /**申请取消 */
    applyCancel() {
      this.applyDialog.flag = false;
    },
    /**
     * 初始化表格
     */
    initTable() {
      const { pageNum, pageSize, total } = this.table.pageInfo;
      httpPost(
        `/policy/policyServiceInfo/queryAll/${pageNum}/${pageSize}`,
        this.sreachForm
      ).then(res => {
        this.table.total = res.pageInfo.total;
        this.table.data = res.result;
      });
    },
    currentChangeHandle(currentPage) {
      this.initTable(currentPage);
    },
    /***
     * 立即处理
     */
    handle(row) {
      httpGet(`/policy/policyEnterprise/queryById/${row.id}`).then(res => {
        if (res.code === "1000000000") {
          this.handleDialog = true;
          this.handleForm = res.result;
          this.handleForm.auditStatus = "";
        }
      });
    },
    /**
     * 处理保存
     */
    handleSave() {
      httpPost(
        "/policy/policyEnterprise/addRecordAndAccessory",
        this.handleForm
      ).then(res => {
        if (res.code === "1000000000") {
          this.handleDialog = false;
          this.$message.success("审核成功");
        }
      });
    },
    /**
     * 政策详情
     */
    detailsPolicy(row) {
      if (typeof row === "number") {
        httpGet(`/policy/enterprise/selectByAdd/${row}`).then(res => {
          if (res.code === "1000000000") {
            this.dForm = res.result.policyEnterpriseRequest;
            this.detailsDialog = true;
          } else {
            this.$message.error("系统异常");
          }
        });
      } else {
        this.dForm = JSON.parse(JSON.stringify(row));
        this.detailsDialog = true;
      }
    },
    /***
     * 上传预检
     */
    beforeImageUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const testStr = "jpgpngjpeg";
      if (
        !this.form.fileType &&
        !this.handleForm.fileType &&
        !this.applyForm.fileType&&
        !this.againApplyForm.fileType
      ) {
        this.$message.error("请选择附件类型");
        return false;
      }
      if (testStr.indexOf(testmsg) < 0) {
        this.$message.error("上传图片只能是jpg，jpeg 或 png 格式!");
        return false;
      }
    },
    /**
     * 上传文件
     */
    uploadFlie(flie) {
      let params = new FormData();
      params.append("file", flie.file);
      params.append("fileTag", "user");
      httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
        res => {
          if (res.code == "1000000000") {
            this.$message({
              type: "success",
              message: "上传成功"
            });
            this.form.investmentAnnexes.push({
              annexPath: res.result.filePath,
              annexName: res.result.fileName,
              annexType: this.form.fileType
            });
            console.log(this.form.investmentAnnexes);
          } else {
            this.$message.error("上传失败");
          }
        }
      );
    },
    /**
     * 删除文件
     */
    removeFlie(parnt, item, index) {
      if (this[parnt][item][index].id) {
        this[parnt]["delInvestmentAnnexes"].push({
          id: this[parnt][item][index].id
        });
      }
      this[parnt][item].splice(index, 1);
    },
    /**
     * 审核上传文件
     */
    handleuploadFlie(file) {
      let params = new FormData();
      params.append("file", file.file);
      params.append("fileTag", "user");
      httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
        res => {
          if (res.code == "1000000000") {
            this.$message({
              type: "success",
              message: "上传成功"
            });
            if (!Array.isArray(this.handleForm.delInvestmentAnnexes)) {
              this.handleForm.delInvestmentAnnexes = [];
            }
            this.handleForm.delInvestmentAnnexes.push({
              annexPath: res.result.filePath,
              annexName: res.result.fileName,
              annexType: this.handleForm.fileType
            });
            console.log(this.handleForm.delInvestmentAnnexes);
          } else {
            this.$message.error("上传失败");
          }
        }
      );
    },
    /**
     * 删除
     */
    handleremoveFlie(index) {
      this.handleForm.delInvestmentAnnexes.splice(index, 1);
    },
    /**申请上传附件 */
    applyuploadFlie(file) {
      let params = new FormData();
      params.append("file", file.file);
      params.append("fileTag", "user");
      httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
        res => {
          if (res.code == "1000000000") {
            this.$message({
              type: "success",
              message: "上传成功"
            });
            if (!Array.isArray(this.applyForm.investmentAnnexes)) {
              this.applyForm.investmentAnnexes = [];
            }
            this.applyForm.investmentAnnexes.push({
              annexPath: res.result.filePath,
              annexName: res.result.fileName,
              annexType: this.applyForm.fileType
            });
          } else {
            this.$message.error("上传失败");
          }
        }
      );
    },
    /**
     * 申请删除
     */
    applyremoveFlie(index) {
      this.applyForm.investmentAnnexes.splice(index, 1);
    },
    /**再次申请上传 */
    againApplyUploadFlie(file){
      let params = new FormData();
      params.append("file", file.file);
      params.append("fileTag", "user");
      httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
        res => {
          if (res.code == "1000000000") {
            this.$message({
              type: "success",
              message: "上传成功"
            });
            if (!Array.isArray(this.againApplyForm.delInvestmentAnnexes)) {
              this.againApplyForm.delInvestmentAnnexes = [];
            }
            this.againApplyForm.delInvestmentAnnexes.push({
              annexPath: res.result.filePath,
              annexName: res.result.fileName,
              annexType: this.againApplyForm.fileType
            });
          } else {
            this.$message.error("上传失败");
          }
        }
      );
    },
    againApplyRemoveFlie(index) {
      this.againApplyForm.delInvestmentAnnexes.splice(index, 1);
    },
    /**
     * 撤销申请
     */
    revokeApply(row) {
      httpDelete(`/policy/policyEnterprise/deleteById/${row.id}`).then(res => {
        if (res.code === "1000000000") {
          this.$message.success("撤销成功");
          this.renderTable();
        }
      });
      console.log(row);
    },
    /**申请详情 */
    detailsApply(row) {
      httpGet(`/policy/policyEnterprise/queryById/${row.id}`).then(res => {
        if (res.code === "1000000000") {
          this.applyDForm = res.result;
          this.detailsApplyDialog=true;
          console.log(this.applyDForm)
        }
      });
    },
    editPolicy(row) {
      let data = JSON.parse(JSON.stringify(row));
      data.delInvestmentAnnexes = [];
      this.form = data;
      console.log(this.form);
      this.addEditDialog.flag = true;
      this.addEditDialog.title = "编辑";
    },
    /**保存 */
    save() {
      if (this.addEditDialog.title === "添加") {
        let data = JSON.parse(JSON.stringify(this.form));
        data.fileType = undefined;
        let params = data;
        httpPost("/policy/policyServiceInfo/addInfo", params).then(res => {
          if (res.code === "1000000000") {
            this.$message.success("保存成功");
            this.addEditDialog.flag = false;
            this.initTable();
          }
        });
      } else {
        let data = JSON.parse(JSON.stringify(this.form));
        data.fileType = undefined;
        let params = data;
        httpPost("/policy/policyServiceInfo/updateInfo", params).then(res => {
          if (res.code === "1000000000") {
            this.$message.success("保存成功");
            this.addEditDialog.flag = false;
            this.initTable();
          }
        });
      }
    },
    /**删除 */
    deletePolicy(row) {
      this.$confirm("此操作将永久删除该政策信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          httpDelete(`/policy/policyServiceInfo/deleteById/${row.id}`).then(
            res => {
              if (res.code === "1000000000") {
                this.$message.success("删除成功");
                this.initTable();
              } else {
                this.$message.error("删除失败");
              }
            }
          );
        })
        .catch(() => {});
    },
    /**发布 */
    releasePolicy(row) {
      httpGet(`/policy/policyServiceInfo/updateStates/${row.id}`).then(res => {
        if (res.code === "1000000000") {
          this.$message.success("发布成功");
          this.initTable();
        } else {
          this.$message.error("发布失败");
        }
      });
    },
    /**关闭模态框 */
    dialogClose() {
      this.addEditDialog.title = "";
      Object.assign(
        this.$data.form,
        JSON.parse(JSON.stringify(this.$options.data().form))
      );
      this.dForm = {};
      this.handleForm = {
        fileType: ""
      };
      Object.assign(
        this.$data.applyForm,
        JSON.parse(JSON.stringify(this.$options.data().applyForm))
      );
      Object.assign(
        this.$data.againApplyForm,
        JSON.parse(JSON.stringify(this.$options.data().againApplyForm))
      );
    },
    /**获取附件类型 */
    getFileType(val) {
      for (let i = 0; i < this.policyFileType.length; i++) {
        if (val === this.policyFileType[i].value) {
          return this.policyFileType[i].name;
        }
      }
      return "";
    },
    /**政策类型字典换取 */
    getPolicyTypeName(val) {
      for (let i = 0; i < this.policyType.length; i++) {
        if (val === this.policyType[i].value) {
          return this.policyType[i].name;
        }
      }
      return "";
    }
  }
};
</script>
<style lang="less" scoped>
// /deep/ .el-scrollbar {
//   height: 650px;
// }
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.handleForm /deep/ .el-dialog__footer {
  text-align: center;
  height: 300px;
  padding: 10px 50px;
}
.uploader {
  height: 50px;
}
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
.detailsDialog {
  box-sizing: border-box;
  padding: 0 30px;
}
.infoItem {
  flex: 1;
  display: flex;
  margin-bottom: 24px;
  .infoLabel {
    width: 70px;
    text-align: right;
  }
  .maxWidth {
    width: 200px;
  }
  .infoContent {
    flex: 1;
  }
  .infoFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60px;
    font-size: 20px;
  }
}
.infoTitle {
  font-weight: bold;
  font-size: 16px;
  color: #323233;
  margin-bottom: 24px;
  text-align: left;
}
.infoGroup {
  display: flex;
  justify-content: space-between;
  .el-form-item {
    flex: 1;
  }
}
.fileList {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-left: 20px;
  margin-top: 8px;
  margin-bottom: 22px;
}
.fileItem {
  margin-bottom: 4px;
  height: 20px;
  .el-icon-close {
    display: none;
    float: right;
    margin-top: 3px;
  }
}
.fileItem:hover {
  background-color: #f5f7fa;
  cursor: pointer;
  .el-icon-close {
    display: inline-block;
  }
}
.rejectItem {
  border-left: 2px solid #276ce3;
  padding-left: 8px;
  margin-bottom: 8px;
  margin-left: 70px;
  .rejectTitle {
    color: #d40000;
  }
  .rejectDate {
    color: #969799;
    margin-left: 8px;
  }
  .rejectContent {
    color: #f47575;
  }
}
</style>
