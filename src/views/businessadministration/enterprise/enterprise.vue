<template>
  <div class="alone" id="alone">
    <div class="operation">
      <el-form :model="sreachForm" style="display:flex;" label-width="85px">
        <el-form-item label="行业类型">
          <el-select
            v-model="sreachForm.businessType"
            @change="renderTable"
            clearable
            @clear="renderTable"
            placeholder="行业类型"
          >
            <el-option
              v-for="(item, index) in hindustryType"
              :key="index"
              :label="item.name"
              :value="item.value"
              @change="renderTable"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属产业">
          <el-select
            v-model="sreachForm.industryClass"
            @change="renderTable"
            clearable
            @clear="renderTable"
            placeholder="所属产业"
          >
            <el-option
              v-for="(item, index) in industryType"
              :key="index"
              :label="item.name"
              :value="item.value"
              @change="renderTable"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业状态">
          <el-select
            v-model="sreachForm.settleInIncubatorStatus"
            @change="renderTable"
            clearable
            @clear="renderTable"
            placeholder="企业状态"
          >
            <el-option
              v-for="(item, index) in inparkStatus"
              :key="index"
              :label="item.name"
              :value="item.value"
              @change="renderTable"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="exportInfo">导出</el-button>
      <el-button type="primary" @click="addEnterpriseInfo">添加</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        :height="table.height"
        v-if="table.height"
        :header-cell-style="{ background: '#F7F8FA' }"
      >
        <el-table-column prop="firmName" label="公司名称" align="left">
        </el-table-column>
        <el-table-column prop="legalPerson" label="公司法人" align="left">
        </el-table-column>
        <el-table-column prop="businessType" label="所属行业" align="left">
        </el-table-column>
        <el-table-column prop="firmRegistAddress" label="注册地址" align="left">
        </el-table-column>
        <el-table-column
          prop="registeredFund"
          label="注册资金(万元)"
          align="left"
        >
        </el-table-column>
        <el-table-column prop="address" label="土地使用方式" align="left">
        </el-table-column>
        <el-table-column label="操作" align="right" width="350">
          <template slot-scope="scope">
            <el-link type="primary" @click="editInfo(scope.row, 'cList')"
              >工商变更</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="editInfo(scope.row, 'aList')"
              >审计信息</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="editInfo(scope.row, 'iList')"
              >知识产权</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="editInfo(scope.row, 'mList')"
              >经营信息</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-popover popper-class="morePopover" placement="bottom-end" width="120" trigger="hover">
              <ul class="moreBox">
                <li @click="detailsSpaceValue(scope.row)">详情</li>
                <li @click="editEnterValue(scope.row)">编辑</li>
                <li @click="deleteEnterValue(scope.row)">删除</li>
              </ul>
              <span
                class="more"
                style="color:#276ce3;cursor: pointer"
                slot="reference"
              >
                <i class="el-icon-more"></i>
              </span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.pageInfo.total"
      >
      </el-pagination>
    </div>
    <!-- 新增信息page -->
    <transition name="el-fade-in">
      <div class="addPage" v-if="pageModal.flag">
        <div class="addPageTitle">{{ pageModal.title }}</div>
        <div class="page">
          <div class="formMain">
            <el-scrollbar ref="scroll" style="height:720px">
              <el-form :model="form" label-width="100px">
                <div id="jiben">
                  <div class="infoItemTitle">基本信息</div>

                  <div class="infoItem">
                    <el-form-item label="企业名称">
                      <el-input
                        v-model="form.firmName"
                        :disabled="form.id"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="企业类型">
                        <el-select
                          :disabled="form.id"
                          v-model="form.registType"
                          placeholder="请选择活动区域"
                        >
                          <el-option
                            v-for="(item, index) in enterpriseType"
                            :key="index"
                            :value="item.value"
                            :label="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="成立日期">
                        <el-date-picker
                          v-model="form.dateEstablishment"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="证书编号">
                        <el-input v-model="form.firmCertNumber"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="信用代码">
                        <el-input v-model="form.creditCode"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="企业所在地">
                      <el-input v-model="form.businessLocation"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="企业法人">
                        <el-input
                          v-model="form.legalPerson"
                          :disabled="form.id"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="身份证号">
                        <el-input
                          v-model="form.legalPersonIdentityNumber"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="联系方式">
                      <el-input v-model="form.legalPersonPhone"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="注册地址">
                      <el-input
                        :disabled="form.id"
                        v-model="form.firmRegistAddress"
                        placeholder="注册地址"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="注册资金">
                      <el-input
                        :disabled="form.id"
                        v-model="form.registeredFund"
                      >
                        <span slot="suffix">万元</span>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="联系人">
                        <el-input v-model="form.contactPerson"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="身份证号">
                        <el-input
                          v-model="form.contactPersonIdentityNumber"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="联系方式">
                      <el-input v-model="form.contactPersonPhone"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="电子邮箱">
                        <el-input v-model="form.email"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="公司座机号">
                        <el-input v-model="form.landlineNumber"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>

                <div id="jingying">
                  <div class="infoItemTitle">经营信息</div>
                  <div class="infoItem">
                    <el-form-item label="经营地址">
                      <el-input v-model="form.actualManageAddress"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="规上企业">
                      <el-select v-model="form.isRules">
                        <el-option
                          v-for="(item, index) in guishangType"
                          :key="index"
                          :label="item.name"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="行业类型">
                        <el-select v-model="form.businessType">
                          <el-option
                            v-for="(item, index) in hindustryType"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="产业类型">
                        <el-select v-model="form.industryClass">
                          <el-option
                            v-for="(item, index) in industryType"
                            :key="index"
                            :value="item.value"
                            :label="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="入住形式">
                        <el-select v-model="form.projectType">
                          <el-option
                            v-for="(item, index) in settledType"
                            :key="index"
                            :value="item.value"
                            :label="item.name"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="场地类型">
                        <el-select v-model="form.venueType">
                          <el-option
                            v-for="(item, index) in landType"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="项目简介">
                      <el-input v-model="form.projectBrief"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div id="zulin">
                  <div class="infoItemTitle">租赁信息</div>

                  <div class="infoItem">
                    <el-form-item label="租赁地址">
                      <el-input v-model="form.address"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="租赁面积">
                      <el-input v-model="form.rentalArea"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="租赁时间">
                      <el-date-picker
                        v-model="form.startTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="入园时间">
                        <el-date-picker
                          v-model="form.intime"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期时间"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="入孵状态">
                        <el-select v-model="form.settleInIncubatorStatus">
                          <el-option
                            v-for="(item, index) in inparkStatus"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="是否投产">
                        <el-select v-model="form.intoProductionCode">
                          <el-option
                            v-for="(item, index) in inProduction"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="预计投产时间">
                        <el-date-picker
                          v-model="form.intoProductionDate"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期时间"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="投资额">
                      <el-input v-model="form.investmentVolume"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div id="yingye">
                  <div class="infoItemTitle">营业执照</div>
                  <div class="infoItem">
                    <el-form-item label="营业期限">
                      <el-input v-model="form.operatingPeriod"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="经营范围">
                      <el-input
                        v-model="form.businessScope"
                        :disabled="form.id"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="营业执照">
                      <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        action=""
                        :http-request="
                          flie => {
                            uploadPicture(flie, 'businessLicense');
                          }
                        "
                        :before-upload="beforeImageUpload"
                      >
                        <img
                          v-if="form.businessLicense"
                          :src="imgBaseUrl + form.businessLicense"
                          class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </div>
                </div>
                <div id="chanpin">
                  <div class="infoItemTitle">产品信息</div>
                  <div
                    class="infoCard"
                    v-for="(item, index) in form.fList"
                    :key="index"
                  >
                    <div class="infoItem">
                      <el-form-item label="产品名称">
                        <el-input v-model="item.productName"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="产品领域">
                          <el-input v-model="item.productField"></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="产品进度">
                          <el-select v-model="item.productSchedule">
                            <el-option
                              v-for="(item, index) in productProgress"
                              :key="index"
                              :label="item.name"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="技术水平">
                          <el-input v-model="item.technicalLevel"></el-input>
                        </el-form-item>
                      </div>
                      <i
                        v-if="index > 0"
                        class="el-icon-close"
                        @click="deleteOne('fList', index)"
                      ></i>
                    </div>
                  </div>
                  <div class="addProduct" @click="productAddOne">
                    <i class="el-icon-plus"></i>
                    <span class="addProductWord">新增一条</span>
                  </div>
                </div>
                <div id="qita">
                  <div class="infoItemTitle">其他</div>
                  <div class="infoItem">
                    <el-form-item label="企业参与指定国家、行业标准情况">
                      <el-input v-model="form.participation"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="在基地内产业链上下游企业">
                      <el-input v-model="form.industryChain"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="企业与高校院所开展学研情况">
                      <el-input v-model="form.research"></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="备注">
                      <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
            </el-scrollbar>
          </div>
          <div class="formNav">
            <el-timeline>
              <el-timeline-item>
                <span @click="custormAnchor('jiben')">基本信息</span>
              </el-timeline-item>
              <el-timeline-item>
                <span @click="custormAnchor('jingying')">经营信息</span>
              </el-timeline-item>
              <el-timeline-item>
                <span @click="custormAnchor('zulin')">租赁信息</span>
              </el-timeline-item>
              <el-timeline-item>
                <span @click="custormAnchor('yingye')">营业信息</span>
              </el-timeline-item>
              <el-timeline-item>
                <span @click="custormAnchor('chanpin')">产品信息</span>
              </el-timeline-item>
              <el-timeline-item>
                <span @click="custormAnchor('qita')">其他</span>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        <div class="footer">
          <el-button @click="addCancel">取消</el-button>
          <el-button type="primary" @click="addSave">保存</el-button>
        </div>
      </div>
    </transition>
    <!-- 工商变更 -->
    <el-dialog
      v-if="cList"
      title="工商变更记录"
      :visible.sync="cList"
      width="1000px"
      @close="dialogClose"
    >
      <el-scrollbar style="height:600px">
        <el-form :model="changeForm" label-width="100px">
          <div class="infoGroup">
            <div class="infoItem">
              <el-form-item label="名称">
                <el-input
                  v-model="changeForm.firmName.value"
                  :placeholder="form.firmName || ''"
                  :disabled="changeType !== 'name'"
                ></el-input>
              </el-form-item>
            </div>
            <span
              v-bind:style="{
                visibility: changeType === 'name' ? 'hidden' : 'visible'
              }"
              class="startChange"
              @click="startChange('name')"
              >更改</span
            >
            <div
              class="infoItem"
              v-bind:style="{
                visibility: changeType === 'name' ? 'visible' : 'hidden'
              }"
            >
              <el-form-item label="变更时间">
                <el-date-picker
                  v-model="changeForm.firmName.changeDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div
              class="changeSave"
              v-bind:style="{
                visibility: changeType === 'name' ? 'visible' : 'hidden'
              }"
            >
              <span @click="changeSave('name')">保存</span>
              <span @click="changeCancel('name')">取消</span>
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <el-form-item label="类型">
                <el-select
                  v-model="changeForm.businessType.value"
                  :placeholder="getEnterpriseTypeName(form.businessType)"
                  :disabled="changeType !== 'businessType'"
                >
                  <el-option
                    v-for="(item, index) in enterpriseType"
                    :key="index"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <span
              v-bind:style="{
                visibility: changeType === 'businessType' ? 'hidden' : 'visible'
              }"
              class="startChange"
              @click="startChange('businessType')"
              >更改</span
            >
            <div
              class="infoItem"
              v-bind:style="{
                visibility: changeType === 'businessType' ? 'visible' : 'hidden'
              }"
            >
              <el-form-item label="变更时间">
                <el-date-picker
                  v-model="changeForm.businessType.changeDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div
              class="changeSave"
              v-bind:style="{
                visibility: changeType === 'businessType' ? 'visible' : 'hidden'
              }"
            >
              <span @click="changeSave('businessType')">保存</span>
              <span @click="changeCancel('businessType')">取消</span>
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <el-form-item label="住所">
                <el-input
                  v-model="changeForm.firmRegistAddress.value"
                  :placeholder="form.firmRegistAddress || ''"
                  :disabled="changeType !== 'firmRegistAddress'"
                ></el-input>
              </el-form-item>
            </div>
            <span
              v-bind:style="{
                visibility:
                  changeType === 'firmRegistAddress' ? 'hidden' : 'visible'
              }"
              class="startChange"
              @click="startChange('firmRegistAddress')"
              >更改</span
            >
            <div
              class="infoItem"
              v-bind:style="{
                visibility:
                  changeType === 'firmRegistAddress' ? 'visible' : 'hidden'
              }"
            >
              <el-form-item label="变更时间">
                <el-date-picker
                  v-model="changeForm.firmRegistAddress.changeDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div
              class="changeSave"
              v-bind:style="{
                visibility:
                  changeType === 'firmRegistAddress' ? 'visible' : 'hidden'
              }"
            >
              <span @click="changeSave('firmRegistAddress')">保存</span>
              <span @click="changeCancel('firmRegistAddress')">取消</span>
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <el-form-item label="法人">
                <el-input
                  v-model="changeForm.legalPerson.value"
                  :placeholder="form.legalPerson || ''"
                  :disabled="changeType !== 'legalPerson'"
                ></el-input>
              </el-form-item>
            </div>
            <span
              v-bind:style="{
                visibility: changeType === 'legalPerson' ? 'hidden' : 'visible'
              }"
              class="startChange"
              @click="startChange('legalPerson')"
              >更改</span
            >
            <div
              class="infoItem"
              v-bind:style="{
                visibility: changeType === 'legalPerson' ? 'visible' : 'hidden'
              }"
            >
              <el-form-item label="变更时间">
                <el-date-picker
                  v-model="changeForm.legalPerson.changeDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div
              class="changeSave"
              v-bind:style="{
                visibility: changeType === 'legalPerson' ? 'visible' : 'hidden'
              }"
            >
              <span @click="changeSave('legalPerson')">保存</span>
              <span @click="changeCancel('legalPerson')">取消</span>
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <el-form-item label="注册资金">
                <el-input
                  v-model="changeForm.registeredFund.value"
                  :placeholder="form.registeredFund || ''"
                  :disabled="changeType !== 'registeredFund'"
                ></el-input>
              </el-form-item>
            </div>
            <span
              v-bind:style="{
                visibility:
                  changeType === 'registeredFund' ? 'hidden' : 'visible'
              }"
              class="startChange"
              @click="startChange('registeredFund')"
              >更改</span
            >
            <div
              class="infoItem"
              v-bind:style="{
                visibility:
                  changeType === 'registeredFund' ? 'visible' : 'hidden'
              }"
            >
              <el-form-item label="变更时间">
                <el-date-picker
                  v-model="changeForm.registeredFund.changeDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div
              class="changeSave"
              v-bind:style="{
                visibility:
                  changeType === 'registeredFund' ? 'visible' : 'hidden'
              }"
            >
              <span @click="changeSave('registeredFund')">保存</span>
              <span @click="changeCancel('registeredFund')">取消</span>
            </div>
          </div>
          <div class="infoGroup">
            <div class="infoItem">
              <el-form-item label="经营范围">
                <el-input
                  v-model="changeForm.businessScope.value"
                  :placeholder="form.businessScope || ''"
                  :disabled="changeType !== 'businessScope'"
                ></el-input>
              </el-form-item>
            </div>
            <span
              v-bind:style="{
                visibility:
                  changeType === 'businessScope' ? 'hidden' : 'visible'
              }"
              class="startChange"
              @click="startChange('businessScope')"
              >更改</span
            >
            <div
              class="infoItem"
              v-bind:style="{
                visibility:
                  changeType === 'businessScope' ? 'visible' : 'hidden'
              }"
            >
              <el-form-item label="变更时间">
                <el-date-picker
                  v-model="changeForm.businessScope.changeDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div
              class="changeSave"
              v-bind:style="{
                visibility:
                  changeType === 'businessScope' ? 'visible' : 'hidden'
              }"
            >
              <span @click="changeSave('businessScope')">保存</span>
              <span @click="changeCancel('businessScope')">取消</span>
            </div>
          </div>
        </el-form>
        <el-table :data="this.form.cList" style="width: 100%" height="200">
          <el-table-column prop="changeType" label="变更项"> </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div class="changeTable">
                <span class="el-icon-top"></span>
                <div class="text">
                  <div class="changeAfter">{{ scope.row.changeAfter }}</div>
                  <div class="changeBefore">{{ scope.row.changeBefore }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="changeDate" label="变更时间">
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-dialog>
    <!-- 审计信息 -->
    <el-dialog
      v-if="aList"
      title="审计信息"
      :visible.sync="aList"
      width="800px"
      @close="dialogClose"
    >
      <el-scrollbar style="height:500px">
        <el-form :model="form" label-width="100px">
          <div
            class="infoCard"
            v-for="(item, index) in form.aList"
            :key="index"
          >
            <i
              v-if="index > 0"
              class="el-icon-close"
              @click="deleteOne('aList', index)"
            ></i>
            <div class="infoItem">
              <el-form-item label="专项审计事务所名称">
                <el-input v-model="item.accountantName"></el-input>
              </el-form-item>
            </div>
            <div class="infoGroup">
              <div class="infoItem">
                <el-form-item label="职业证书编号">
                  <el-input v-model="item.certificateNumber"></el-input>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="年份">
                  <el-input v-model="item.year"></el-input>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="签字会计师或税务师">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action=""
                :http-request="
                  flie => {
                    uploadPicture(flie, 'aList', index, 'accountantPic1');
                  }
                "
                :before-upload="beforeImageUpload"
              >
                <img
                  v-if="item.accountantPic1"
                  :src="imgBaseUrl + item.accountantPic1"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="签字会计师或税务师">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action=""
                :http-request="
                  flie => {
                    uploadPicture(flie, 'aList', index, 'accountantPic2');
                  }
                "
                :before-upload="beforeImageUpload"
              >
                <img
                  v-if="item.accountantPic2"
                  :src="imgBaseUrl + item.accountantPic2"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="营业执照">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action=""
                :http-request="
                  flie => {
                    uploadPicture(flie, 'aList', index, 'businessLicense');
                  }
                "
                :before-upload="beforeImageUpload"
              >
                <img
                  v-if="item.businessLicense"
                  :src="imgBaseUrl + item.businessLicense"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="会计师事务所职业证书">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action=""
                :http-request="
                  flie => {
                    uploadPicture(flie, 'aList', index, 'certificate');
                  }
                "
                :before-upload="beforeImageUpload"
              >
                <img
                  v-if="item.certificate"
                  :src="imgBaseUrl + item.certificate"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
          <div class="addProduct" @click="auditAddOne">
            <i class="el-icon-plus"></i>
            <span class="addProductWord">新增一条</span>
          </div>
        </el-form>
      </el-scrollbar>
      <span slot="footer">
        <el-button @click="aList = false">取消</el-button>
        <el-button type="primary" @click="auditSave">保存</el-button>
      </span>
    </el-dialog>
    <!-- 知识产权 -->
    <el-dialog
      v-if="iList"
      title="知识产权"
      :visible.sync="iList"
      width="800px"
      @close="dialogClose"
    >
      <el-scrollbar style="height:500px">
        <el-form :model="form" label-width="100px">
          <div
            class="infoCard"
            v-for="(item, index) in form.iList"
            :key="index"
          >
            <i
              v-if="index > 0"
              class="el-icon-close"
              @click="deleteOne('iList', index)"
            ></i>
            <div class="infoItem">
              <el-form-item label="知识产权名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
            </div>
            <div class="infoGroup">
              <div class="infoItem">
                <el-form-item label="行业类型">
                  <el-select v-model="item.businessType">
                    <el-option
                      v-for="(item, index) in hindustryType"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="产业类型">
                  <el-select v-model="item.industryClass">
                    <el-option
                      v-for="(item, index) in industryType"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="infoGroup">
              <div class="infoItem">
                <el-form-item label="知识产权类型">
                  <el-select v-model="item.propertyRightType"  @change="propertyTypeChange($event,index)">
                    <el-option
                      v-for="(item, index) in propertyType"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="取得方式">
                  <el-select v-model="item.assess">
                    <el-option
                      v-for="(item, index) in obtainMode"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="infoGroup">
              <div class="infoItem">
                <el-form-item label="获取时间">
                  <el-date-picker
                    @change="getTimeChange($event,index)"
                    v-model="item.acquisitionTime"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="有效期至">
                  <el-input v-model="item.startTime" ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="addProduct" @click="propertyAddOne">
            <i class="el-icon-plus"></i>
            <span class="addProductWord">新增一条</span>
          </div>
        </el-form>
      </el-scrollbar>
      <span slot="footer">
        <el-button @click="iList = false">取消</el-button>
        <el-button type="primary" @click="propertySave">保存</el-button>
      </span>
    </el-dialog>
    <!-- 经营信息 -->
    <el-dialog
      v-if="mList"
      title="经营信息"
      :visible.sync="mList"
      width="1200px"
      @close="dialogClose"
    >
      <el-scrollbar style="height:500px">
        <el-form :model="form" label-width="100px">
          <div
            class="infoCard"
            v-for="(item, index) in form.mList"
            :key="index"
          >
            <i
              v-if="index > 0"
              class="el-icon-close"
              @click="deleteOne('mList', index)"
            ></i>
            <div class="infoGroup">
              <div class="infoItem">
                <el-form-item label="年份">
                  <el-input v-model="item.time"></el-input>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="季度">
                  <ds-quarter
                    v-model="item.quarter"
                  ></ds-quarter>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="利润总额（万元）">
                  <el-input v-model="item.grossProfit"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="infoGroup">
              <div class="infoItem">
                <el-form-item label="总收入（万元）">
                  <el-input v-model="item.generalIncome"></el-input>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="工业总产值">
                  <el-input v-model="item.productionValue"></el-input>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="税收（万元）">
                  <el-input v-model="item.inTax"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="infoGroup">
              <div class="infoItem">
                <el-form-item label="职工总数">
                  <el-input v-model="item.workForce"></el-input>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="科技人员数">
                  <el-input v-model="item.scienceCount"></el-input>
                </el-form-item>
              </div>
              <div class="infoItem">
                <el-form-item label="本地职工人数">
                  <el-input v-model="item.accountConut"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="addProduct" @click="managementAddOne">
            <i class="el-icon-plus"></i>
            <span class="addProductWord">新增一条</span>
          </div>
        </el-form>
      </el-scrollbar>
      <span slot="footer">
        <el-button @click="mList = false">取消</el-button>
        <el-button type="primary" @click="managementSave">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  httpPost,
  httpDelete,
  postDownload,
  httpGet,
  imgBaseUrl
} from "@/http";

import dsQuarter from "@/components/ds-quarter.vue";
export default {
  name: "Enterprise",
  components: {
    dsQuarter
  },
  data() {
    return {
      imgBaseUrl: imgBaseUrl,
      sreachForm: {
        businessType: "",
        industryClass: "",
        settleInIncubatorStatus: ""
      },
      table: {
        height: "",
        data: [],
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      },
      /**字典 */
      settledType: [], // 入驻类型
      industryType: [], // 产业类型
      productProgress: [], // 产品进度
      whetherProduction: [], // 是否投产
      enterpriseType: [], // 企业类型
      hindustryType: [], // 行业类型
      guishangType: [], // 是否上规企业
      inparkStatus: [], // 入园状态
      inProduction: [], // 是否已投产
      landType: [], // 场地类型
      propertyType: [], // 知识产权类型
      obtainMode: [], // 取得方式
      pageModal: {
        flag: false,
        title: ""
      },
      tabsActive: "basics",
      form: {
        firmName: "", // 企业名称
        registType: "", // 企业类型（字典）
        creditCode: "", // 社会统一信用代码
        businessLocation: "", // 企业所在地(区/园区）
        legalPerson: "", // 企业法人
        firmRegistAddress: "", // 企业注册地址
        actualManageAddress: "", // 企业实际经营（研发）地址
        isRules: "", // 是否规上企业（字典）
        industryClass: "", // 产业类型（字典）
        businessType: "", //行业类型（字典）
        projectType: "", // 入住形式(字典)
        projectBrief: "", // 项目简介
        address: "", // 租赁地址
        rentalArea: "", // 租赁面积
        startTime: "", // 租赁开始时间
        endTime: "", // 租赁结束时间
        intime: "", // 入园时间（在园区注册或注册迁入园区时间）
        intoProductionCode: "", // 是否已投产（已达产，未达产 填写预计达产时间，非产业行企业）
        registeredFund: "", // 注册资金（万元）
        investmentVolume: "", // 投资额（万元）
        settleInIncubatorStatus: "", // 入孵状态(待入园企业,正式入园企业)
        businessScope: "", // 经营范围
        // 企业可更改基本信息
        legalPersonIdentityNumber: "", // 法人身份证号
        legalPersonPhone: "", // 法人联系方式（手机）
        contactPerson: "", //联系人
        contactPersonIdentityNumber: "", // 联系人身份证号
        contactPersonPhone: "", // 联系人手机号
        dateEstablishment: "", // 成立日期
        email: "", // 电子邮箱
        firmCertNumber: "", // 原高新技术企业证书编号
        industryChain: "", // 在基地内产业链上下游企业
        intoProductionDate: "", // 预计投产时间（已投产企业不用填写）
        landlineNumber: "", // 公司座机号
        operatingPeriod: "", // 营业期限（年月日-年月日或长期）
        participation: "", //企业参与指定国家、行业标准情况
        research: "", // 企业与高校院所开展学研情况
        userType: "", // 用户类型
        venueType: "", // 场地类型（字典）
        remark: "", // 备注
        businessLicense: "", // 营业执照图片
        fList: [
          {
            productField: "",
            productName: "",
            productSchedule: "",
            technicalLevel: ""
          }
        ],
        aList: [],
        cList: [],
        iList: [],
        mList: []
      },
      cList: false, // 工商变更
      aList: false, // 审计信息
      iList: false, // 知识产权
      mList: false, // 经营信息
      changeForm: {
        firmName: {
          changeType: "01",
          value: "",
          changeDate: ""
        },
        businessType: {
          changeType: "02",
          value: "",
          changeDate: ""
        },
        firmRegistAddress: {
          changeType: "03",
          value: "",
          changeDate: ""
        },
        legalPerson: {
          changeType: "04",
          value: "",
          changeDate: ""
        },
        registeredFund: {
          changeType: "05",
          value: "",
          changeDate: ""
        },
        businessScope: {
          changeType: "06",
          value: "",
          changeDate: ""
        }
      },
      changeType: ""
    };
  },
  created() {
    this.renderTable();
    // 入驻类型
    this.$store.dispatch("getSettledType").then(() => {
      this.settledType = this.$store.state.settledType;
    });
    // 产业类型
    this.$store.dispatch("getIndustryType").then(() => {
      this.industryType = this.$store.state.industryType;
      console.log(this.$store.state);
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
    // 规上企业
    this.$store.dispatch("getGuishangType").then(() => {
      this.guishangType = this.$store.state.guishangType;
    });
    // 行业类型
    this.$store.dispatch("getHindustryType").then(() => {
      this.hindustryType = this.$store.state.hindustryType;
    });
    // 入园状态
    this.$store.dispatch("getInparkStatus").then(() => {
      this.inparkStatus = this.$store.state.inparkStatus;
    });
    // 是否已投产
    this.$store.dispatch("getInProduction").then(() => {
      this.inProduction = this.$store.state.inProduction;
    });
    // 场地类型
    this.$store.dispatch("getLandType").then(() => {
      this.landType = this.$store.state.landType;
    });
    // 知识产权类型
    this.$store.dispatch("getPropertyType").then(() => {
      this.propertyType = this.$store.state.propertyType;
    });

    // 取得知识产权方式
    this.$store.dispatch("getObtainMode").then(() => {
      this.obtainMode = this.$store.state.obtainMode;
    });
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    let pageHeight = document.getElementById("alone");
    console.log(pageHeight.offsetHeight - 200);
    this.table.height = tableDom.offsetHeight - 110;
    this.renderTable();
  },
  watch: {
    // 关闭添加模态框
    "pageModal.flag": {
      handler(val) {
        console.log(val);
        if (!val) {
          Object.assign(
            this.$data.form,
            JSON.parse(JSON.stringify(this.$options.data().form))
          );
          if (this.form.id) {
            this.form.id = undefined;
          }
        }
      }
    }
  },
  methods: {
    /**添加信息 */
    addEnterpriseInfo() {
      this.pageModal.flag = true;
      this.pageModal.title = "新增信息";
    },
    /**编辑信息 */
    editEnterValue(row) {
      httpGet(`/firm/firmInfo/queryById/${row.id}`).then(res => {
        this.form = res.result;
        if (!this.form.fList || this.form.fList.length === 0) {
          this.form.fList = [
            {
              productField: "",
              productName: "",
              productSchedule: "",
              technicalLevel: ""
            }
          ];
        }
        this.pageModal.flag = true;
        this.pageModal.title = "编辑信息";
      });
    },
    /**添加保存 */
    addSave() {
      let data = JSON.parse(JSON.stringify(this.form));
      console.log(this.form);
      let fList = data.fList;
      for (let i = 0; i < fList.length; i++) {
        let str = "";
        for (let key in fList[i]) {
          str += fList[i][key];
        }
        if (!str) {
          fList.splice(i, 1);
        }
      }
      data.fList = fList;
      if (this.form.id) {
        httpPost("/firm/firmInfo/updateInfo", data).then(res => {
          if (res.code === "1000000000") {
            this.renderTable(true);
            this.$message.success("修改成功");
            this.pageModal.flag = false;
            this.pageModal.title = "";
          } else {
            this.$message.error("修改失败");
          }
        });
      } else {
        httpPost("/firm/firmInfo/addInfo", data).then(res => {
          if (res.code === "1000000000") {
            this.renderTable(true);
            this.$message.success("添加成功");
            this.pageModal.flag = false;
            this.pageModal.title = "";
          } else {
            this.$message.error("添加失败");
          }
        });
      }
    },
    /**编辑信息 */
    editInfo(row, item) {
      let data = [];
      if (item === "iList") {
        data.push({
          acquisitionTime: "",
          assess: "",
          businessType: "",
          industryClass: "",
          name: "",
          propertyRightType: "",
          startTime: ""
        });
      } else if (item === "aList") {
        data.push({
          accountantName: "",
          accountantPic1: "",
          accountantPic2: "",
          businessLicense: "",
          certificate: "",
          certificateNumber: "",
          year: ""
        });
      } else if (item === "cList") {
        data = [];
      } else if (item === "mList") {
        data.push({
          accountConut: "",
          generalIncome: "",
          grossProfit: "",
          inTax: "",
          productionValue: "",
          scienceCount: "",
          time: "",
          year: "",
          quarter: "",
          workForce: ""
        });
      }
      httpGet(`/firm/firmInfo/queryById/${row.id}`).then(res => {
        this.form = res.result;
        if (!this.form[item]) {
          this.form[item] = data;
        }
        this[item] = true;
      });
    },
    /**经营保存 */
    managementSave() {
      let data = JSON.parse(JSON.stringify(this.form));
      let mList = data.mList;
      for (let i = 0; i < mList.length; i++) {
        let str = "";
        for (let key in mList[i]) {
          str += mList[i][key];
        }
        if (!str) {
          mList.splice(i, 1);
        }
      }
      data.mList = mList;
      httpPost("/firm/firmInfo/updateInfo", data).then(res => {
        if (res.code === "1000000000") {
          this.$message.success("保存成功");
          this.renderTable();
          this.mList = false;
        }
      });
    },
    /**审计保存 */
    auditSave() {
      let data = JSON.parse(JSON.stringify(this.form));
      let aList = data.aList;
      for (let i = 0; i < aList.length; i++) {
        let str = "";
        for (let key in aList[i]) {
          str += aList[i][key];
        }
        if (!str) {
          aList.splice(i, 1);
        }
      }
      data.aList = aList;
      httpPost("/firm/firmInfo/updateInfo", data).then(res => {
        if (res.code === "1000000000") {
          this.$message.success("保存成功");
          this.renderTable();
          this.aList = false;
        }
      });
    },
    /**产权保存 */
    propertySave() {
      let data = JSON.parse(JSON.stringify(this.form));
      let iList = data.iList;
      for (let i = 0; i < iList.length; i++) {
        let str = "";
        for (let key in iList[i]) {
          str += iList[i][key];
        }
        if (!str) {
          iList.splice(i, 1);
        }
      }
      data.iList = iList;
      httpPost("/firm/firmInfo/updateInfo", data).then(res => {
        if (res.code === "1000000000") {
          this.$message.success("保存成功");
          this.renderTable();
          this.iList = false;
        }
      });
    },
    /**添加取消 */
    addCancel() {
      this.pageModal.flag = false;
    },
    /**更改 */
    startChange(name) {
      this.changeType = name;
    },
    /**更改保存 */
    changeSave(name) {
      let data = JSON.parse(JSON.stringify(this.form));
      data.cList = [
        {
          changeBefore: this.form[name],
          changeAfter: this.changeForm[name].value,
          changeDate: this.changeForm[name].changeDate,
          changeType: this.changeForm[name].changeType
        }
      ];
      httpPost("/firm/firmInfo/updateInfo", data).then(res => {
        if (res.code === "1000000000") {
          this.editInfo(this.form, "cList");
          setTimeout(() => {
            this.changeType = "";
            this.changeForm[name].value = "";
            this.changeForm[name].changeDate = "";
          }, 500);
        }
      });
    },
    /**更改取消 */
    changeCancel(name) {
      this.changeType = "";
      this.changeForm[name].value = "";
      this.changeForm[name].changeDate = "";
    },
    /**
     * 渲染表格
     */
    renderTable(flag) {
      if (flag) {
        this.table.pageInfo.pageNum = 1;
        this.table.pageInfo.pageSize = 10;
      }
      const { pageNum, pageSize } = this.table.pageInfo;
      httpPost(
        `/firm/firmInfo/queryAll/${pageNum}/${pageSize}`,
        this.sreachForm
      ).then(res => {
        this.table.pageInfo.total = res.pageInfo.total;
        this.table.data = res.result;
      });
    },
    /**
     * 切换每页条数
     */
    handleSizeChange(val) {
      this.table.pageInfo.pageSize = val;
      this.table.pageInfo.pageNum = 1;
      this.renderTable();
    },
    handleCurrentChange(val) {
      this.table.pageInfo.pageNum = val;
      this.renderTable();
    },

    deleteEnterValue(row) {
      httpDelete(`/firm/firmInfo/deleteById/${row.id}`)
        .then(res => {
          if (res.code === "1000000000") {
            this.$message.success("删除成功");
            this.renderTable();
          } else {
            this.$message.error("删除失败");
          }
        })
        .cacth(err => {
          this.$message.error("删除失败");
        });
    },
    /***
     * 上传预检
     */
    beforeImageUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const testStr = "jpgpngjpeg";
      if (testStr.indexOf(testmsg) < 0) {
        this.$message.error("上传图片只能是jpg，jpeg 或 png 格式!");
        return false;
      }
    },
    /**
     * 上传头像
     */
    uploadPicture(image, field, index, son) {
      let params = new FormData();
      params.append("file", image.file);
      params.append("fileTag", "user");
      httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
        res => {
          if (res.code == "1000000000") {
            this.$message({
              type: "success",
              message: "上传成功"
            });
            if (index > -1) {
              this.form[field][index][son] = res.result.filePath;
            } else {
              this.form[field] = res.result.filePath;
            }
          } else {
            this.$message.error("上传失败");
          }
        }
      );
    },
    /**
     * 导出
     */
    exportInfo() {
      postDownload("/firm/excel/downExcelFile", this.sreachForm).then(res => {
        let flieName = decodeURIComponent(
          res.headers["content-disposition"].split(";")[1].split("filename=")[1]
        );
        const blob = new Blob([res.data]);
        const objecturl = window.URL.createObjectURL(blob);
        const creEleA = document.createElement("a");
        creEleA.setAttribute("href", objecturl);
        creEleA.setAttribute("download", flieName);
        creEleA.click();
      });
    },
    /**
     * 产品信息新增一行
     */
    productAddOne() {
      this.form.fList.push({
        productField: "",
        productName: "",
        productSchedule: "",
        technicalLevel: ""
      });
    },
    /**经营信息新增一行 */
    managementAddOne() {
      this.form.mList.push({
        accountConut: "",
        generalIncome: "",
        grossProfit: "",
        inTax: "",
        productionValue: "",
        scienceCount: "",
        time: "",
        year: "",
        quarter: "",
        workForce: ""
      });
    },
    /**产权新增一行 */
    propertyAddOne() {
      this.form.iList.push({
        acquisitionTime: "",
        assess: "",
        businessType: "",
        industryClass: "",
        name: "",
        propertyRightType: "",
        startTime: ""
      });
    },
    /**审计新增一行 */
    auditAddOne() {
      this.form.aList.push({
        accountantName: "",
        accountantPic1: "",
        accountantPic2: "",
        businessLicense: "",
        certificate: "",
        certificateNumber: "",
        year: ""
      });
    },
    /**
     * 删除一行
     */
    deleteOne(item, index) {
      if (this.form[item][index].id) {
        if (item === "aList") {
          this.delAList.push(this.form[item][index].id);
        } else if (item === "fList") {
          this.delFList.push(this.form[item][index].id);
        } else if (item === "iList") {
          this.delIList.push(this.form[item][index].id);
        } else if (item === "mList") {
          this.delMList.push(this.form[item][index].id);
        }
      }
      this.form[item].splice(index, 1);
    },
    // 导航定位
    custormAnchor(anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    // 模态框关闭回调
    dialogClose() {},
    /**换取企业类型字典 */
    getEnterpriseTypeName(val) {
      for (let i = 0; i < this.enterpriseType.length; i++) {
        if (this.enterpriseType[i].value === val) {
          return this.enterpriseType[i].name;
        }
      }
      return "";
    },
    /**知识产权类型选择 */
    propertyTypeChange(val,index){
      if(this.form.iList[index].acquisitionTime){
        let time='';
        for(let i=0;i<this.propertyType.length;i++){
          if(this.propertyType[i].value===val){
            time=this.propertyType[i].description;
          }
        }
        let str =this.form.iList[index].acquisitionTime;
        let year =Number(str.slice(0, 4))+Number(time);
        let son=str.substring(4);
        this.form.iList[index].startTime=year+son
      }
    },
    /**获得时间选择 */
    getTimeChange(val,index){
      if(this.form.iList[index].propertyRightType){
        let time='';
        for(let i=0;i<this.propertyType.length;i++){
          if(this.propertyType[i].value===this.form.iList[index].propertyRightType){
            time=this.propertyType[i].description;
          }
        }
        let str =val;
        let year =Number(str.slice(0, 4))+Number(time);
        let son=str.substring(4);
        this.form.iList[index].startTime=year+son
      }

    }
  }
};
</script>
<style lang="less">

.morePopover[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #276ce3;
}
</style>
<style lang="less" scoped>
.moreBox {
  background-color: #276ce3;
  color: #fff;
  li {
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
  li:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.addPage {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 10;
  box-sizing: border-box;
  /deep/ .el-tabs--card > .el-tabs__header {
    padding-left: 30px;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
    overflow: hidden;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #276ce3;
    color: #fff;
  }
  .page {
    display: flex;
    box-sizing: border-box;
    padding: 20px;
    .formNav {
      width: 250px;
    }
    .formMain {
      flex: 1;
      .infoItemTitle {
        padding: 20px;
        font-size: 16px;
        font-weight: bold;
        color: #323233;
      }
      .infoItem {
        max-width: 500px;
        box-sizing: border-box;
        padding-left: 30px;
      }
      .infoGroup {
        display: flex;
        div {
          flex: 1;
        }
      }
    }
  }

  .addPageTitle {
    padding: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #323233;
  }
  .footer {
    text-align: center;
  }
}
.addProduct {
  cursor: pointer;
  display: flex;
  justify-content: center;
  .el-icon-plus {
    background-color: #276ce3;
    color: #fff;
    display: inline-block;
    text-align: center;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    line-height: 20px;
  }
  .addProductWord {
    margin-left: 8px;
    color: #276ce3;
  }
}
.infoCard {
  border: 1px solid #dcdee0;
  border-radius: 4px;
  position: relative;
  box-sizing: border-box;
  padding: 30px;
  margin-bottom: 22px;
  .infoItem {
    max-width: 500px;
    box-sizing: border-box;
    padding-left: 30px;
  }
  .infoGroup {
    display: flex;
    div {
      flex: 1;
    }
  }
  .el-icon-close {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
}
.infoItem {
  max-width: 500px;
  box-sizing: border-box;
  padding-left: 30px;
}
.infoGroup {
  display: flex;
  div {
    flex: 1;
  }
}

.operation .el-button:nth-child(2) {
  margin-left: auto;
}
.el-pagination {
  float: right;
  margin-top: 5px;
}

.head_essential {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
.el_form {
  display: flex;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.tableClass {
  margin: 10px auto;
}
.tableToTal {
  display: flex;
  justify-content: center;
}
.dialogDv {
  width: 100%;
  height: 550px;
  overflow: auto;
}
.dialogDv::-webkit-scrollbar {
  display: none;
}
// .alone /deep/ .el-tabs__item.is-active {
//   background: #276ce3;
//   color: white;
//   border-radius: 5px 5px 0 0;
// }
.from_item {
  width: 200px;
}
/deep/ .el-form-item__label {
  white-space: pre-line;
}
.formBox {
  height: 600px;
}
/deep/ .el-scrollbar {
  height: 100%;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
  position: relative;
}
.addDelete {
  display: flex;
  height: 40px;
  align-items: center;
  margin-left: 24px;
  justify-content: space-between;
  width: 50px;
  font-size: 20px;
}
.el-form {
  padding-right: 20px;
}
.auditItem {
  .auditItemLabel {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-weight: bold;
      font-size: 16px;
      color: #323233;
    }
    .del {
      color: #276ce3;
      cursor: pointer;
      margin-left: 24px;
    }
  }
}
.auditAddOne {
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    cursor: pointer;
    color: #276ce3;
  }
}
.startChange {
  line-height: 40px;
  text-align: center;
  margin: 0 8px;
  cursor: pointer;
  color: #276ce3;
}
.changeSave {
  display: flex;
  height: 40px;
  align-items: center;
  span {
    margin-left: 8px;
    cursor: pointer;
    color: #276ce3;
  }
  span + span {
    color: #d40000;
  }
}
.changeTable {
  display: flex;
  align-items: center;
  span {
    margin-right: 8px;
    color: #01bbb5;
  }
  .changeAfter {
    font-size: 16px;
  }
  .changeBefore {
    color: #969799;
  }
}
</style>
