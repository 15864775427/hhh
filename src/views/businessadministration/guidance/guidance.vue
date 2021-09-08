<template>
  <div class="alone">
    <div class="operation">
      <el-form :model="sreachForm" :inline="true">
        <el-form-item label="信息类型">
          <el-select v-model="sreachForm.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布部门">
          <el-select v-model="sreachForm.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-input
            placeholder="请选择日期"
            suffix-icon="el-icon-date"
            v-model="sreachForm.input1"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="openPage">添加</el-button>
    </div>
    <div class="tablebox" id="tablebox">
      <el-table
        :data="table.data"
        :height="table.height"
        v-if="table.height"
        :header-cell-style="{ background: '#F7F8FA' }"
        row-key="id"
        :tree-props="{ children: 'itemInfoModels' }"
      >
        <el-table-column prop="taskName" label="信息名称" align="left">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="办理委办局"
          width="200"
          align="left"
        >
        </el-table-column>
        <el-table-column label="操作" width="300" align="right">
          <template slot-scope="scope">
            <el-link type="primary" @click="detailsSpaceValue(scope.row)"
              >详情</el-link
            >
            <template v-if="scope.row.sourceOfAcquisition !== '00'">
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="editEnterValue(scope.row)"
                >编辑</el-link
              >
            </template>
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary" @click="deleteEnterValue(scope.row)"
              >删除</el-link
            >
            <el-divider direction="vertical"></el-divider>
            <el-link type="primary">网上办理</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.pageInfo.total"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
      </el-pagination>
    </div>
    <!-- 详情 -->
    <el-dialog
      title="详情"
      v-if="detailsDialog"
      :visible.sync="detailsDialog"
      width="1100px"
      @close="dialogClsoe"
    >
      <div class="page">
        <div class="formMain">
          <rolling-box :height="650" v-model="detailsAnchor">
            <div id="jiben">
              <div class="infoItemTitle">基本信息</div>
              <table>
                <tbody>
                  <tr>
                    <td class="td-name">基本编码</td>
                    <td>{{ form.basicCode }}</td>
                    <td class="td-name">事项编码</td>
                    <td>{{ form.itemCode }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">业务办理项编码</td>
                    <td>{{ form.businessHandlingItemCode }}</td>
                    <td class="td-name">事项类型</td>
                    <td>{{ form.itemType }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">实施主体</td>
                    <td>{{ form.implementationSubject }}</td>
                    <td class="td-name">服务对象</td>
                    <td>{{ form.serviceObject }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">办理时间</td>
                    <td colspan="3">{{ form.processingTime }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">办理地点</td>
                    <td colspan="3">{{ form.handlingPlace }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">权力来源</td>
                    <td>{{ form.powerSource }}</td>
                    <td class="td-name">网上支付</td>
                    <td>{{ form.onlinePayment }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">所属机构</td>
                    <td>{{ form.affiliation }}</td>
                    <td class="td-name">委托部门</td>
                    <td>{{ form.entrustedDepartment }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">联办机构</td>
                    <td>{{ form.jointAgency }}</td>
                    <td class="td-name">实施主体性质</td>
                    <td>{{ form.implementationSubjectProperty }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">进驻大厅类型</td>
                    <td>{{ form.entryHallType }}</td>
                    <td class="td-name">办理进程查询途径</td>
                    <td>{{ form.queryWay }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">行使层级</td>
                    <td>{{ form.performHierarchy }}</td>
                    <td class="td-name">运行系统</td>
                    <td>{{ form.operationSystem }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">物流快递</td>
                    <td>{{ form.logisticsExpress }}</td>
                    <td class="td-name">办理方式</td>
                    <td>{{ form.manageType }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">预约办理</td>
                    <td>{{ form.reservationTransact }}</td>
                    <td class="td-name">办理形式</td>
                    <td>{{ form.processingForm }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">中介服务</td>
                    <td>{{ form.intermediaryService }}</td>
                    <td class="td-name">数量限制</td>
                    <td>{{ form.quantitativeRestric }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">通办范围</td>
                    <td>{{ form.generalScope }}</td>
                    <td class="td-name">行使内容</td>
                    <td>{{ form.exerciseContent }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">权限划分</td>
                    <td>{{ form.jurisdictionDivide }}</td>
                    <td class="td-name">特别程序</td>
                    <td>{{ form.formality }}</td>
                  </tr>
                  <tr>
                    <td class="td-name">受理条件</td>
                    <td colspan="3">{{ form.acceptCondition }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="banli">
              <div class="infoItemTitle">办理流程</div>
              <table>
                <thead>
                  <tr>
                    <th style="width: 120px">办理环节</th>
                    <th style="width: 120px">办理步骤</th>
                    <th style="width: 120px">办理时限</th>
                    <th style="width: 120px">办理人员</th>
                    <th>审查标准</th>
                    <th style="width: 120px">办理结果</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td :rowspan="form.handlingProcedures.links.a.length + 1">
                      申请受理
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.handlingProcedures.links.a"
                    :key="index"
                  >
                    <td>{{ item.handleStep }}</td>
                    <td>{{ item.handleTiming }}</td>
                    <td>{{ item.handleStaff }}</td>
                    <td>{{ item.examinationStandard }}</td>
                    <td>{{ item.handlePersonnel }}</td>
                  </tr>
                  <tr>
                    <td :rowspan="form.handlingProcedures.links.b.length + 1">
                      审查与决定
                    </td>
                  </tr>
                  <tr
                    v-for="(item, index) in form.handlingProcedures.links.b"
                    :key="index + 'b'"
                  >
                    <td>{{ item.handleStep }}</td>
                    <td>{{ item.handleTiming }}</td>
                    <td>{{ item.handleStaff }}</td>
                    <td>{{ item.examinationStandard }}</td>
                    <td>{{ item.handlePersonnel }}</td>
                  </tr>
                  <tr>
                    <td :rowspan="3">颁证与送达</td>
                  </tr>
                  <tr v-if="form.handlingProcedures.accreditationTiming">
                    <td>制证</td>
                    <td>{{ form.handlingProcedures.accreditationTiming }}</td>
                    <td>
                      {{ form.handlingProcedures.accreditationPersonnelType }}
                    </td>
                    <td
                      v-if="form.handlingProcedures.accreditationTiming"
                      colspan="2"
                      rowspan="2"
                      style="padding: 0"
                    >
                      <table style="margin: 0">
                        <tbody>
                          <tr>
                            <td>结果名称</td>
                          </tr>
                          <tr>
                            <td>
                              {{ form.handlingProcedures.resultsName }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr v-if="form.handlingProcedures.certificateTiming">
                    <td>发证</td>
                    <td>{{ form.handlingProcedures.certificateTiming }}</td>
                    <td>
                      {{ form.handlingProcedures.certificatePersonnelType }}
                    </td>
                    <td
                      v-if="!form.handlingProcedures.accreditationTiming"
                      colspan="2"
                      style="padding: 0"
                    >
                      <table style="margin: 0">
                        <tbody>
                          <tr>
                            <td>结果名称</td>
                          </tr>
                          <tr>
                            <td>
                              {{ form.handlingProcedures.resultsName }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6">
                      送达方式：{{ form.handlingProcedures.deliveryWay }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="shenqing">
              <div class="infoItemTitle">申请材料</div>
              <table>
                <thead>
                  <th style="width: 40px">序号</th>
                  <th style="width: 80px">材料名称</th>
                  <th style="width: 100px">材料来源</th>
                  <th style="width: 80px">材料必要性</th>
                  <th style="width: 80px">数量要求</th>
                  <th style="width: 80px">介质要求</th>
                  <th style="width: 80px">表格及样表下载</th>
                  <th>其他要求</th>
                </thead>
                <tbody>
                  <template
                    v-for="(item, index) in form.applicationMaterial
                      .materialList"
                  >
                    <tr :key="index" v-if="item.title">
                      <td colspan="8">{{ item.title }}</td>
                    </tr>
                    <tr :key="index" v-else>
                      <td>{{ item.serialNumber }}</td>
                      <td>{{ item.materialName }}</td>
                      <td>{{ item.materialSource }}</td>
                      <td>{{ item.materialNecessity }}</td>
                      <td>{{ item.quantityRequirement }}</td>
                      <td>{{ item.mediumRequirements }}</td>
                      <td>
                        <template v-if="item.notInvolving">
                          <span>{{ item.notInvolving }}</span>
                        </template>
                        <template v-else>
                          <template
                            v-for="(item, index) in item.sampleDownloadInfoList"
                          >
                            <div
                              v-if="form.sourceOfAcquisition !== '00'"
                              :key="index"
                            >
                              <a
                                class="kb"
                                @click="templateDownload($event, item.aInfo)"
                                >{{ item.name }}</a
                              >
                            </div>
                            <div
                              v-else
                              :key="index"
                              v-html="item.aInfo"
                              @click="templateDownload($event)"
                            ></div>
                          </template>
                        </template>
                      </td>
                      <td>
                        <p
                          class="skin"
                          v-if="item.otherRequirements.acceptanceCriteria"
                          @click="
                            openOther(
                              item.otherRequirements.acceptanceCriteria,
                              '受理标准'
                            )
                          "
                        >
                          受理标准>
                        </p>
                        <p
                          class="skin"
                          v-if="item.otherRequirements.provideMaterialBasis"
                          @click="
                            openOther(
                              item.otherRequirements.provideMaterialBasis,
                              '提供材料依据'
                            )
                          "
                        >
                          提供材料依据>
                        </p>
                        <p
                          class="skin"
                          v-if="item.otherRequirements.materialSpecifications"
                          @click="
                            openOther(
                              item.otherRequirements.materialSpecifications,
                              '材料规格'
                            )
                          "
                        >
                          材料规格>
                        </p>
                        <p v-if="item.otherRequirements.scslTitle">
                          {{ item.otherRequirements.scslTitle }}
                        </p>
                      </td>
                    </tr>
                  </template>
                  <tr>
                    <td>申请材料总要求</td>
                    <td colspan="7">
                      {{ form.applicationMaterial.generalRequirements }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="jieguo">
              <div class="infoItemTitle">结果名称及样本</div>
              <table
                v-for="(item, index) in form.resultNameAndSampleList"
                :key="index"
              >
                <tbody>
                  <tr>
                    <td colspan="2">{{ item.title }}</td>
                  </tr>
                  <tr>
                    <td>结果名称</td>
                    <td>{{ item.resultName }}</td>
                  </tr>
                  <tr>
                    <td>结果文书类型</td>
                    <td>{{ item.resultDocumentType }}</td>
                  </tr>
                  <tr>
                    <td>结果样本</td>
                    <td>
                      <a
                        v-if="form.sourceOfAcquisition !== '00'"
                        class="skin"
                        target="_blank"
                        :href="
                          'http://172.22.8.95:9010/' +
                          item.resultSample.samplePath
                        "
                        >{{ item.resultSample.sampleName }}</a
                      >
                      <a
                        v-else
                        class="skin"
                        target="_blank"
                        :href="item.resultSample.samplePath"
                        >{{ item.resultSample.sampleName }}</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>有效时间</td>
                    <td>{{ item.effectiveTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="yiju">
              <div class="infoItemTitle">设定依据</div>
              <table
                v-for="(item, index) in form.settingBasisList"
                :key="index"
              >
                <tbody>
                  <tr>
                    <td colspan="2">{{ item.title }}</td>
                  </tr>
                  <tr>
                    <td style="width: 100px">制定机关</td>
                    <td>{{ item.formulatingAgency }}</td>
                  </tr>
                  <tr>
                    <td>依据名称</td>
                    <td>{{ item.accordingName }}</td>
                  </tr>
                  <tr>
                    <td>发布号令（文号）</td>
                    <td>{{ item.issueOrder }}</td>
                  </tr>
                  <tr>
                    <td>法条（具体规定）内容</td>
                    <td>{{ item.legalContent }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="shoufei">
              <div class="infoItemTitle">收费标准及依据</div>
              <div style="margin-bottom: 20px">
                是否收费：{{ form.chargingStandardsAndBasis.whetherCharge }}
              </div>
              <template
                v-if="
                  form.chargingStandardsAndBasis.chargeItemsInfoList[0]
                    .chargeProjectName
                "
              >
                <table
                  v-for="(item, index) in form.chargingStandardsAndBasis
                    .chargeItemsInfoList"
                  :key="index"
                >
                  <tbody>
                    <tr>
                      <td class="td-name">收费项目名称</td>
                      <td>{{ item.chargeProjectName }}</td>
                    </tr>
                    <tr>
                      <td class="td-name">收费标准</td>
                      <td>{{ item.chargeStandard }}</td>
                    </tr>
                    <tr>
                      <td class="td-name">收费依据</td>
                      <td>{{ item.chargeAccordingTo }}</td>
                    </tr>
                    <tr>
                      <td class="td-name">是否允许减免</td>
                      <td>{{ item.whetherAllowReduce }}</td>
                    </tr>
                    <tr v-if="item.whetherAllowReduce === '是'">
                      <td class="td-name">允许减免依据</td>
                      <td>{{ item.allowReduceAccordingTo }}</td>
                    </tr>
                    <tr>
                      <td class="td-name">备注</td>
                      <td>{{ item.remark }}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </div>
          </rolling-box>
        </div>
        <div class="formNav">
          <el-timeline>
            <el-timeline-item
              :color="detailsAnchor == 'jiben' ? '#276CE3' : ''"
            >
              <span @click="custormAnchor('jiben')">基本信息</span>
            </el-timeline-item>
            <el-timeline-item
              :color="detailsAnchor == 'banli' ? '#276CE3' : ''"
            >
              <span @click="custormAnchor('banli')">办理流程</span>
            </el-timeline-item>
            <el-timeline-item
              :color="detailsAnchor == 'shenqing' ? '#276CE3' : ''"
            >
              <span @click="custormAnchor('shenqing')">申请材料</span>
            </el-timeline-item>
            <el-timeline-item
              :color="detailsAnchor == 'jieguo' ? '#276CE3' : ''"
            >
              <span @click="custormAnchor('jieguo')">结果名称及样本</span>
            </el-timeline-item>
            <el-timeline-item :color="detailsAnchor == 'yiju' ? '#276CE3' : ''">
              <span @click="custormAnchor('yiju')">设定依据</span>
            </el-timeline-item>
            <el-timeline-item
              :color="detailsAnchor == 'shoufei' ? '#276CE3' : ''"
            >
              <span @click="custormAnchor('shoufei')">收费标准及依据</span>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-dialog>
    <!-- 父级详情 -->
    <el-dialog
      title="详情"
      v-if="parentDetailsDialog"
      :visible.sync="parentDetailsDialog"
      width="1100px"
    >
      <table>
        <tbody>
          <tr>
            <td>事项类型：</td>
            <td>{{ form.itemType }}</td>
            <td>实施编码：</td>
            <td>{{ form.enforceCoding }}</td>
          </tr>
          <tr>
            <td>实施主体：</td>
            <td>{{ form.implementationSub }}</td>
            <td>行使层级：</td>
            <td>{{ form.exerciseLevel }}</td>
          </tr>
          <tr>
            <td>设定依据：</td>
            <td colspan="3">{{ form.settingBasis }}</td>
          </tr>
          <tr>
            <td>权力来源：</td>
            <td colspan="3">{{ form.sourceOfPower }}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
    <el-dialog
      :title="other.title"
      v-if="other"
      :visible.sync="other.flag"
      width="800px"
    >
      {{ other.content }}
    </el-dialog>
    <!-- 新增信息page -->
    <transition name="el-fade-in">
      <div class="addPage" v-if="pageModal.flag">
        <div class="addPageTitle">{{ pageModal.title }}</div>
        <div class="page">
          <div class="formMain">
            <rolling-box :height="1000" v-model="detailsAnchor">
              <el-form :model="form" label-width="120px">
                <div id="jiben">
                  <div class="infoItemTitle">基本信息</div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="事项名称">
                        <el-input v-model="form.taskName"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="实施主体">
                        <el-input v-model="form.deptName"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="基本编码">
                        <el-input v-model="form.basicInfo.basicCode"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="事项编码">
                        <el-input v-model="form.basicInfo.itemCode"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="业务办理项编码">
                        <el-input
                          v-model="form.basicInfo.businessHandlingItemCode"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="事项类型">
                        <el-input v-model="form.basicInfo.itemType"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="实施主体">
                        <el-input
                          v-model="form.basicInfo.implementationSubject"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="服务对象">
                        <el-input
                          v-model="form.basicInfo.serviceObject"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="办理时间">
                      <el-input
                        v-model="form.basicInfo.processingTime"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="办理地点">
                      <el-input
                        v-model="form.basicInfo.handlingPlace"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="权力来源">
                        <el-input
                          v-model="form.basicInfo.powerSource"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="网上支付">
                        <el-input
                          v-model="form.basicInfo.onlinePayment"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="所属机构">
                        <el-input
                          v-model="form.basicInfo.affiliation"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="委托部门">
                        <el-input
                          v-model="form.basicInfo.entrustedDepartment"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="联办机构">
                        <el-input
                          v-model="form.basicInfo.jointAgency"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="实施主体性质">
                        <el-input
                          v-model="form.basicInfo.implementationSubjectProperty"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="进驻大厅类型">
                        <el-input
                          v-model="form.basicInfo.entryHallType"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="办理进程查询途径">
                        <el-input v-model="form.basicInfo.queryWay"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="行使层级">
                        <el-input
                          v-model="form.basicInfo.performHierarchy"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="运行系统">
                        <el-input
                          v-model="form.basicInfo.operationSystem"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="物流快递">
                        <el-input
                          v-model="form.basicInfo.logisticsExpress"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="办理方式">
                        <el-input
                          v-model="form.basicInfo.manageType"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="预约办理">
                        <el-input
                          v-model="form.basicInfo.reservationTransact"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="办理形式">
                        <el-input
                          v-model="form.basicInfo.processingForm"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="中介服务">
                        <el-input
                          v-model="form.basicInfo.intermediaryService"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="数量限制">
                        <el-input
                          v-model="form.basicInfo.quantitativeRestric"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="通办范围">
                        <el-input
                          v-model="form.basicInfo.generalScope"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="行使内容">
                        <el-input
                          v-model="form.basicInfo.exerciseContent"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="权限划分">
                        <el-input
                          v-model="form.basicInfo.jurisdictionDivide"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="特别程序">
                        <el-input v-model="form.basicInfo.formality"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoItem">
                    <el-form-item label="受理条件">
                      <el-input
                        v-model="form.basicInfo.acceptCondition"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div id="banli">
                  <div class="infoItemTitle">办理流程</div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="制证人员类别">
                        <el-input
                          v-model="
                            form.basicInfo.handlingProcedures
                              .accreditationPersonnelType
                          "
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="制证时限">
                        <el-input
                          v-model="
                            form.basicInfo.handlingProcedures
                              .accreditationTiming
                          "
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="发证人员类别">
                        <el-input
                          v-model="
                            form.basicInfo.handlingProcedures
                              .certificatePersonnelType
                          "
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="发证时限">
                        <el-input
                          v-model="
                            form.basicInfo.handlingProcedures.certificateTiming
                          "
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="infoGroup">
                    <div class="infoItem">
                      <el-form-item label="送达方式">
                        <el-input
                          v-model="
                            form.basicInfo.handlingProcedures.deliveryWay
                          "
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="结果名称">
                        <el-input
                          v-model="
                            form.basicInfo.handlingProcedures.resultsName
                          "
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <div
                    class="infoCard"
                    v-for="(item, index) in form.basicInfo.handlingProcedures
                      .links"
                    :key="index"
                  >
                    <div class="infoItem">
                      <el-form-item label="办理步骤">
                        <el-input v-model="item.handleStep"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="办理时限">
                          <el-input v-model="item.handleTiming"></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="办理人员">
                          <el-input v-model="item.handleStaff"></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="审查标准">
                          <el-input
                            v-model="item.examinationStandard"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="办理结果">
                          <el-input v-model="item.handlePersonnel"></el-input>
                        </el-form-item>
                      </div>
                      <i
                        v-if="index > 0"
                        class="el-icon-close"
                        @click="delProcedureItem(index)"
                      ></i>
                    </div>
                  </div>
                  <div class="addProduct" @click="addProcedureItem">
                    <i class="el-icon-plus"></i>
                    <span class="addProductWord">新增一条</span>
                  </div>
                </div>
                <div id="shenqing">
                  <div class="infoItemTitle">申请材料</div>
                  <div class="infoItem">
                    <el-form-item label="申请材料总要求">
                      <el-input
                        v-model="
                          form.basicInfo.applicationMaterial.generalRequirements
                        "
                      ></el-input>
                    </el-form-item>
                  </div>
                  <!-- 申请材料循环 -->
                  <div
                    class="infoCard"
                    v-for="(item, index) in form.basicInfo.applicationMaterial
                      .materialList"
                    :key="index"
                  >
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="材料名称">
                          <el-input v-model="item.materialName"></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="材料来源">
                          <el-input v-model="item.materialSource"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="材料必要性">
                          <el-input v-model="item.materialNecessity"></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="数量要求">
                          <el-input
                            v-model="item.quantityRequirement"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="介质要求">
                          <el-input
                            v-model="item.mediumRequirements"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="受理标准">
                          <el-input
                            v-model="item.otherRequirements.acceptanceCriteria"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="材料规格">
                          <el-input
                            v-model="
                              item.otherRequirements.materialSpecifications
                            "
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="提供材料依据">
                          <el-input
                            v-model="
                              item.otherRequirements.provideMaterialBasis
                            "
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="其他要求">
                        <el-input
                          v-model="item.otherRequirements.scslTitle"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <el-form-item label="附件类型">
                      <el-input v-model="item.applyName"> </el-input>
                    </el-form-item>
                    <el-upload
                      class="uploader"
                      :show-file-list="false"
                      action=""
                      :http-request="
                        (file) => {
                          uploadTemplateFlie(file, index);
                        }
                      "
                      :before-upload="
                        (file) => {
                          beforeUpload(file, index);
                        }
                      "
                    >
                      <el-button size="small" type="primary"
                        >上传附件</el-button
                      >
                    </el-upload>
                    <div class="fileList">
                      <div
                        class="fileItem"
                        v-for="(son, sonindex) in item.sampleDownloadInfoList"
                        :key="sonindex"
                      >
                        {{ son.name }}
                        <span style="margin-left: 8px">{{ son.aInfo }}</span>
                        <i
                          class="el-icon-close"
                          @click="removeTemplateFlie(index, sonindex)"
                        ></i>
                      </div>
                    </div>
                    <i
                      v-if="index > 0"
                      class="el-icon-close"
                      @click="delApplyItem(index)"
                    ></i>
                  </div>
                  <div class="addProduct" @click="addApplyItem">
                    <i class="el-icon-plus"></i>
                    <span class="addProductWord">新增一条</span>
                  </div>
                </div>
                <div id="jieguo">
                  <div class="infoItemTitle">结果名称及样本</div>
                  <div
                    class="infoCard"
                    v-for="(item, index) in form.basicInfo
                      .resultNameAndSampleList"
                    :key="index"
                  >
                    <div class="infoItem">
                      <el-form-item label="标题">
                        <el-input v-model="item.title"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="结果名称">
                          <el-input v-model="item.resultName"></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="结果文书类型">
                          <el-input
                            v-model="item.resultDocumentType"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="有效期时间">
                          <el-input v-model="item.effectiveTime"></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="结果样本名称">
                          <el-input
                            v-model="item.resultSample.sampleName"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="infoItem">
                      <el-upload
                        class="uploader"
                        :show-file-list="true"
                        :file-list="item.resultSampleList"
                        action=""
                        :http-request="
                          (file) => {
                            uploadResultFlie(file, index);
                          }
                        "
                        :before-upload="beforeUploadResultFlie"
                        :before-remove="
                          (file) => {
                            removeUploadResultFlieFlie(file, index);
                          }
                        "
                      >
                        <el-button size="small" type="primary"
                          >上传附件</el-button
                        >
                      </el-upload>
                    </div>
                    <i
                      v-if="index > 0"
                      class="el-icon-close"
                      @click="delResultItem(index)"
                    ></i>
                  </div>
                  <div class="addProduct" @click="addResultItem">
                    <i class="el-icon-plus"></i>
                    <span class="addProductWord">新增一条</span>
                  </div>
                </div>
                <div id="yiju">
                  <div class="infoItemTitle">设定依据</div>
                  <div
                    class="infoCard"
                    v-for="(item, index) in form.basicInfo.settingBasisList"
                    :key="index"
                  >
                    <div class="infoItem">
                      <el-form-item label="标题">
                        <el-input v-model="item.title"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="制定机关">
                          <el-input v-model="item.formulatingAgency"></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="依据名称">
                          <el-input v-model="item.accordingName"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="发布号令（文号）">
                        <el-input v-model="item.issueOrder"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="法条（具体规定）内容">
                        <el-input v-model="item.legalContent"></el-input>
                      </el-form-item>
                    </div>
                    <i
                      v-if="index > 0"
                      class="el-icon-close"
                      @click="delSettingItem(index)"
                    ></i>
                  </div>
                  <div class="addProduct" @click="addSettingItem">
                    <i class="el-icon-plus"></i>
                    <span class="addProductWord">新增一条</span>
                  </div>
                </div>
                <div id="shoufei">
                  <div class="infoItemTitle">收费标准及依据</div>
                  <div class="inforItem">
                    <el-form-item label="是否收费">
                      <el-select
                        v-model="
                          form.basicInfo.chargingStandardsAndBasis.whetherCharge
                        "
                      >
                        <el-option label="是" value="是"> </el-option>
                        <el-option label="否" value="否"> </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div
                    class="infoCard"
                    v-for="(item, index) in form.basicInfo
                      .chargingStandardsAndBasis.chargeItemsInfoList"
                    :key="index"
                  >
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="收费项目名称">
                          <el-input v-model="item.chargeProjectName"></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="收费标准">
                          <el-input v-model="item.chargeStandard"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="infoItem">
                      <el-form-item label="收费依据">
                        <el-input v-model="item.chargeAccordingTo"></el-input>
                      </el-form-item>
                    </div>
                    <div class="infoGroup">
                      <div class="infoItem">
                        <el-form-item label="是否允许减免">
                          <el-input
                            v-model="item.whetherAllowReduce"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="infoItem">
                        <el-form-item label="备注">
                          <el-input v-model="item.remark"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                    <i
                      v-if="index > 0"
                      class="el-icon-close"
                      @click="delChargeItem(index)"
                    ></i>
                  </div>
                  <div class="addProduct" @click="addChargeItem">
                    <i class="el-icon-plus"></i>
                    <span class="addProductWord">新增一条</span>
                  </div>
                </div>
              </el-form>
            </rolling-box>
          </div>
          <div class="formNav">
            <el-timeline>
              <el-timeline-item
                :color="detailsAnchor == 'jiben' ? '#276CE3' : ''"
              >
                <span @click="custormAnchor('jiben')">基本信息</span>
              </el-timeline-item>
              <el-timeline-item
                :color="detailsAnchor == 'banli' ? '#276CE3' : ''"
              >
                <span @click="custormAnchor('banli')">办理流程</span>
              </el-timeline-item>
              <el-timeline-item
                :color="detailsAnchor == 'shenqing' ? '#276CE3' : ''"
              >
                <span @click="custormAnchor('shenqing')">申请材料</span>
              </el-timeline-item>
              <el-timeline-item
                :color="detailsAnchor == 'jieguo' ? '#276CE3' : ''"
              >
                <span @click="custormAnchor('jieguo')">结果名称及样本</span>
              </el-timeline-item>
              <el-timeline-item
                :color="detailsAnchor == 'yiju' ? '#276CE3' : ''"
              >
                <span @click="custormAnchor('yiju')">设定依据</span>
              </el-timeline-item>
              <el-timeline-item
                :color="detailsAnchor == 'shoufei' ? '#276CE3' : ''"
              >
                <span @click="custormAnchor('shoufei')">收费标准及依据</span>
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
    <!-- 下载表单 -->
    <form
      class="_hidden fj-form"
      id="downForm"
      action="/banshi/guideservice/document/yjFile"
      method="post"
      v-show="false"
    >
      <input
        type="text"
        name="document"
        v-model="documentVal"
        class="fj-input"
      />
    </form>
  </div>
</template>
<script>
import rollingBox from "@/components/rolling-box.vue";
import tool from "@/utils/tool";
import {
  httpPost,
  httpDelete,
  postDownload,
  httpGet,
  httpPut,
  imgBaseUrl,
} from "@/http";
export default {
  name: "Guidance",
  components: {
    rollingBox,
  },
  watch: {
    detailsAnchor(val) {
      console.log(val);
    },
    "pageModal.flag": {
      handler(val) {
        if (!val) {
          Object.assign(
            this.$data.form,
            JSON.parse(JSON.stringify(this.$options.data().form))
          );
        }
      },
    },
  },
  data() {
    return {
      sreachForm: {},
      table: {
        data: [],
        height: "",
        pageInfo: {
          pageSize: 10,
          pageNum: 1,
          total: 20,
        },
      },
      detailsDialog: false,
      parentDetailsDialog: false,
      form: {
        taskName: "", // 事项名
        deptName: "", // 实施主体
        basicInfo: {
          acceptCondition: "",
          affiliation: "",
          basicCode: "",
          businessHandlingItemCode: "",
          entrustedDepartment: "",
          entryHallType: "",
          exerciseContent: "",
          formality: "",
          generalScope: "",
          handlingPlace: "",
          implementationSubject: "",
          implementationSubjectProperty: "",
          intermediaryService: "",
          itemCode: "",
          itemType: "",
          jointAgency: "",
          jurisdictionDivide: "",
          logisticsExpress: "",
          manageType: "",
          onlinePayment: "",
          operationSystem: "",
          performHierarchy: "",
          powerSource: "",
          processingForm: "",
          processingTime: "",
          quantitativeRestric: "",
          queryWay: "",
          reservationTransact: "",
          resultNameAndSampleList: [
            {
              effectiveTime: "",
              resultDocumentType: "",
              resultName: "",
              resultSampleList: [],
              resultSample: {
                sampleName: "",
                samplePath: "",
              },
              title: "",
            },
          ],
          serviceObject: "",
          settingBasisList: [
            {
              accordingName: "",
              formulatingAgency: "",
              issueOrder: "",
              legalContent: "",
              title: "",
              type: "",
            },
          ],
          handlingProcedures: {
            accreditationPersonnelType: "",
            accreditationTiming: "",
            basicId: 0,
            certificatePersonnelType: "",
            certificateTiming: "",
            deliveryWay: "",
            flowchartUrl: "",
            links: [
              {
                examinationStandard: "",
                handlePersonnel: "",
                handleStaff: "",
                handleStep: "",
                proceduresId: 0,
              },
            ],
            resultsName: "",
          },
          chargingStandardsAndBasis: {
            chargeItemsInfoList: [
              {
                allowReduceAccordingTo: "",
                chargeAccordingTo: "",
                chargeProjectName: "",
                chargeStandard: "",
                chargingStandardsAndBasisId: 0,
                reduceChargeCondition: "",
                remark: "",
                whetherAllowReduce: "",
              },
            ],
            whetherCharge: "",
          },
          applicationMaterial: {
            generalRequirements: "",
            materialList: [
              {
                materialName: "",
                materialNecessity: "",
                materialSource: "",
                mediumRequirements: "",
                notInvolving: "",
                otherRequirements: {
                  acceptanceCriteria: "",
                  materialId: 0,
                  materialSpecifications: "",
                  provideMaterialBasis: "",
                  remark: "",
                  scslTitle: "",
                },
                quantityRequirement: "",
                sampleDownloadInfoList: [],
                serialNumber: "",
                title: "",
                applyName: "",
              },
            ],
          },
        },
        applyName: "",
      },
      detailsAnchor: "jiben", // 锚点
      formLabelWidth: "120px",
      documentVal: "",
      other: {
        flag: false,
        content: "",
        title: "",
      },
      pageModal: {
        flag: false,
        title: "",
      },
    };
  },
  mounted() {
    let tableDom = document.getElementById("tablebox");
    this.table.height = tableDom.offsetHeight - 110;
  },
  created() {
    this.renderTable(true);
  },
  methods: {
    /**渲染表格 */
    renderTable(flag) {
      if (flag) {
        this.table.pageInfo.pageSize = 10;
        this.table.pageInfo.pageNum = 1;
      }
      const { pageNum, pageSize } = this.table.pageInfo;
      httpPost(
        `/releaseGuide/releaseGuide/queryItemInfoByCondition/${pageNum}/${pageSize}`
      ).then((res) => {
        if (res.code === "1000000000") {
          this.table.data = res.result;
          this.table.pageInfo.total = res.pageInfo.total;
        }
      });
    },
    currentChange(val) {
      this.table.pageInfo.pageNum = val;
      this.renderTable();
    },
    sizeChange(val) {
      this.table.pageInfo.pageSize = val;
      this.renderTable();
    },
    /**详情 */
    detailsSpaceValue(row) {
      // 没有子级
      if (!row.itemInfoModels || row.itemInfoModels.length === 0) {
        httpGet(
          `/releaseGuide/releaseGuide/queryBasicInfoDetailsByItemId/${row.id}`
        ).then((res) => {
          if (res.code === "1000000000") {
            this.form = res.result;
            this.form.handlingProcedures.links = this.handleHandleData(
              res.result.handlingProcedures.links
            );
            this.detailsDialog = true;
          }
        });
        // 有子级
      } else {
        httpGet(
          `/releaseGuide/releaseGuide/queryItemDetailsByItemId/${row.id}`
        ).then((res) => {
          if (res.code === "1000000000") {
            this.form = res.result;
          }
          // this.form = {};
          this.parentDetailsDialog = true;
        });
      }
    },
    /**编辑 */
    editEnterValue(row) {
      httpGet(
        `/releaseGuide/releaseGuide/queryBasicInfoDetailsByItemId/${row.id}`
      ).then((res) => {
        if (res.code === "1000000000") {
          this.form.basicInfo.applicationMaterial.materialList
          let data = res.result;
          for(let i=0;i<data.applicationMaterial.materialList.length;i++){
            data.applicationMaterial.materialList[i].applyName=""
          }
          this.form.basicInfo = data;
          for (let i = 0; i < data.resultNameAndSampleList.length; i++) {
            this.form.basicInfo.resultNameAndSampleList[i].resultSampleList = [
              {
                name: data.resultNameAndSampleList[i].resultSample.sampleName,
                path: data.resultNameAndSampleList[i].resultSample.samplePath,
              },
            ];
          }
          this.pageModal.title = "编辑指南";
          this.pageModal.flag = true;
        }
      });
    },
    /**删除 */
    deleteEnterValue(row) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          httpDelete(
            `/releaseGuide/releaseGuide/deletedItemInfoById/${row.id}`
          ).then((res) => {
            if (res.code === "1000000000") {
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch((err) => {});
    },
    handleHandleData(list) {
      let arr = {
        a: [],
        b: [],
      };
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].handleStep === "受理" ||
          list[i].handleStep === "申报/收件"
        ) {
          arr.a.push(list[i]);
        } else {
          arr.b.push(list[i]);
        }
      }
      return arr;
    },
    // 导航定位
    custormAnchor(anchorName) {
      // 找到锚点
      let anchorElement = document.getElementById(anchorName);
      this.detailsAnchor = anchorName;
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    /**模态框关闭 */
    dialogClsoe() {
      Object.assign(
        this.$data.form,
        JSON.parse(JSON.stringify(this.$options.data().form))
      );
      this.detailsAnchor = "jiben";
    },
    /**样表下载 */
    templateDownload(e, url) {
      if (url) {
        postDownload("/filesystem/filesystem/downloadFileByFilePathResponse", {
          path: url,
        }).then((res) => {
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
        let el = e.target;
        var fk = {};
        fk.docId = el.getAttribute("DOC_ID");
        fk.docExt = el.getAttribute("DOC_EXT");
        fk.docName = el.getAttribute("DOC_NAME");
        var ajArr = [];
        ajArr.push(fk);
        var _href = tool.base64encode(
          tool.utf16to8(JSON.stringify(ajArr).toString())
        );
        this.documentVal = _href;
        document.getElementById("downForm").document.value = _href;
        document.getElementById("downForm").submit();
      }
    },
    openOther(val, title) {
      this.other.flag = true;
      this.other.title = title;
      this.other.content = val;
    },
    openPage() {
      this.pageModal.title = "添加指南";
      this.pageModal.flag = true;
    },
    addCancel() {
      this.pageModal.title = "";
      this.pageModal.flag = false;
    },
    addSave() {
      let params = JSON.parse(JSON.stringify(this.form));
      if (params.basicInfo.id) {
        for (
          let i = 0;
          i < params.basicInfo.resultNameAndSampleList.length;
          i++
        ) {
          params.basicInfo.resultNameAndSampleList[i].resultSample.sampleName =
            params.basicInfo.resultNameAndSampleList[
              i
            ].resultSampleList[0].name;
          params.basicInfo.resultNameAndSampleList[i].resultSample.samplePath =
            params.basicInfo.resultNameAndSampleList[
              i
            ].resultSampleList[0].path;
        }
        httpPut(
          "/releaseGuide/releaseGuide/updateItemInfoByModel",
          params
        ).then((res) => {
          this.pageModal.title = "";
          this.pageModal.flag = false;
        });
      } else {
        for (
          let i = 0;
          i < params.basicInfo.resultNameAndSampleList.length;
          i++
        ) {
          params.basicInfo.resultNameAndSampleList[i].resultSample.sampleName =
            params.basicInfo.resultNameAndSampleList[
              i
            ].resultSampleList[0].name;
          params.basicInfo.resultNameAndSampleList[i].resultSample.samplePath =
            params.basicInfo.resultNameAndSampleList[
              i
            ].resultSampleList[0].path;
        }
        httpPost("/releaseGuide/releaseGuide/addItemInfo", params).then(
          (res) => {
            this.pageModal.title = "";
            this.pageModal.flag = false;
          }
        );
      }
    },
    /**办理流程新增一条 */
    addProcedureItem() {
      this.form.basicInfo.handlingProcedures.links.push({
        examinationStandard: "",
        handlePersonnel: "",
        handleStaff: "",
        handleStep: "",
        proceduresId: 0,
      });
    },
    /**办理流程删除一条 */
    delProcedureItem(index) {
      this.form.basicInfo.handlingProcedures.links.splice(index, 1);
    },
    /**申请材料新增一条 */
    addApplyItem() {
      this.form.basicInfo.applicationMaterial.materialList.push({
        materialName: "",
        materialNecessity: "",
        materialSource: "",
        mediumRequirements: "",
        notInvolving: "",
        otherRequirements: {
          acceptanceCriteria: "",
          materialId: 0,
          materialSpecifications: "",
          provideMaterialBasis: "",
          remark: "",
          scslTitle: "",
        },
        quantityRequirement: "",
        sampleDownloadInfoList: [],
        serialNumber: "",
        title: "",
      });
    },
    /**申请材料删除一行 */
    delApplyItem(index) {
      this.form.basicInfo.applicationMaterial.materialList.splice(index, 1);
    },
    /**结果样本新增一行 */
    addResultItem() {
      this.form.basicInfo.resultNameAndSampleList.push({
        effectiveTime: "",
        resultDocumentType: "",
        resultName: "",
        resultSample: {
          sampleName: "",
          samplePath: "",
        },
        title: "",
      });
    },
    /**结果样本删除一行 */
    delResultItem(index) {
      this.form.basicInfo.resultNameAndSampleList.splice(index, 1);
    },
    /**设定依据新增一行 */
    addSettingItem() {
      this.form.basicInfo.settingBasisList.push({
        accordingName: "",
        formulatingAgency: "",
        issueOrder: "",
        legalContent: "",
        title: "",
        type: "",
      });
    },
    /**设定依据删除一行 */
    delSettingItem(index) {
      this.form.basicInfo.settingBasisList.splice(index, 1);
    },
    /**收费新增一行 */
    addChargeItem() {
      this.form.basicInfo.chargingStandardsAndBasis.chargeItemsInfoList.push({
        allowReduceAccordingTo: "",
        chargeAccordingTo: "",
        chargeProjectName: "",
        chargeStandard: "",
        chargingStandardsAndBasisId: 0,
        reduceChargeCondition: "",
        remark: "",
        whetherAllowReduce: "",
      });
    },
    /**收费删除一行 */
    delChargeItem(index) {
      this.form.basicInfo.chargingStandardsAndBasis.chargeItemsInfoList.splice(
        index,
        1
      );
    },
    /**上传模板附件 */
    uploadTemplateFlie(file, index) {
      let params = new FormData();
      params.append("file", file.file);
      params.append("fileTag", "user");
      httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
        (res) => {
          if (res.code == "1000000000") {
            this.$message({
              type: "success",
              message: "上传成功",
            });
            let arr =
              this.form.basicInfo.applicationMaterial.materialList[index]
                .sampleDownloadInfoList;
            if (!Array.isArray(arr)) {
              this.form.basicInfo.applicationMaterial.materialList[
                index
              ].sampleDownloadInfoList = [];
            }
            this.form.basicInfo.applicationMaterial.materialList[
              index
            ].sampleDownloadInfoList.push({
              aInfo: res.result.filePath,
              name: this.form.basicInfo.applicationMaterial.materialList[index]
                .applyName,
            });
            this.form.basicInfo.applicationMaterial.materialList[
              index
            ].applyName = "";
          } else {
            this.$message.error("上传失败");
          }
        }
      );
    },
    /**删除模板附件 */
    removeTemplateFlie(index, son) {
      this.form.basicInfo.applicationMaterial.materialList[
        index
      ].sampleDownloadInfoList.splice(son, 1);
    },
    beforeUpload(file, index) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const testStr = "jpgpngjpeg";
      if (
        !this.form.basicInfo.applicationMaterial.materialList[index].applyName
      ) {
        this.$message.error("请选择附件类型");
        return false;
      }
      if (testStr.indexOf(testmsg) < 0) {
        this.$message.error("上传图片只能是jpg，jpeg 或 png 格式!");
        return false;
      }
    },
    /**结果样本 */
    uploadResultFlie(file, index) {
      let params = new FormData();
      params.append("file", file.file);
      params.append("fileTag", "user");
      httpPost("/filesystem/filesystem/uploadImgAndThumbImage", params).then(
        (res) => {
          if (res.code == "1000000000") {
            this.$message({
              type: "success",
              message: "上传成功",
            });
            this.form.basicInfo.resultNameAndSampleList[
              index
            ].resultSampleList.push({
              path: res.result.filePath,
              name: res.result.fileName,
            });
          } else {
            this.$message.error("上传失败");
          }
        }
      );
    },
    /**删除模板附件 */
    removeUploadResultFlieFlie(file, index) {
      return true;
    },
    beforeUploadResultFlie(file) {},
  },
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
/deep/ .el-scrollbar {
  height: 100%;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
  position: relative;
  padding: 0 20px;
}
.page {
  display: flex;
  box-sizing: border-box;
  .formNav {
    width: 250px;
  }
  .formMain {
    flex: 1;
    box-sizing: border-box;
    .infoItemTitle {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #323233;
    }
  }
}
table {
  width: 100%;
  margin-bottom: 20px;
  td {
    border: 1px #d4d4d4 solid;
    font-size: 14px;
    box-sizing: border-box;
    padding: 10px 5px 10px 5px;
    line-height: 20px;
  }
  th {
    background-color: #fafafa;
    font-size: 14px;
    text-align: center;
    border: 1px #d4d4d4 solid;
    line-height: 40px;
  }
}
.td-name {
  width: 122px;
  background-color: #fafafa;
  color: #444444;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
}

.el_form {
  display: flex;
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
.dialogDV {
  display: flex;
  .dialog_item {
    width: 160px;
    font-size: 16px;
    text-align: right;
    padding-right: 20px;
  }
}
.dialog_item_span {
  flex: 1;
  background: #f7f8fa;
  margin-right: 100px;
  padding: 20px 30px;
  box-sizing: border-box;
  .span_item {
    display: flex;
    padding: 10px 0;
    box-sizing: border-box;
    label {
      display: block;
      width: 120px;
      text-align: center;
    }
    span {
      display: block;
      flex: 1;
    }
  }
  dl {
    width: 50%;
    float: left;
    display: flex;
    padding: 6px 0;
    box-sizing: border-box;
  }
}
.dialogD {
  display: flex;
  margin: 20px 0;
  .dialog_item {
    width: 160px;
    font-size: 16px;
    text-align: right;
    padding-right: 20px;
  }
}
.dialogDvScroll {
  width: 100%;
  height: 550px;
  overflow: auto;
}
.dialogDvScroll::-webkit-scrollbar {
  display: none;
}
.skin {
  color: #cd0600;
  cursor: pointer;
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
  >.el-icon-close {
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
.fileList {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-left: 20px;
  margin-top: 8px;
  margin-bottom: 22px;
}
.fileItem {
  margin-bottom: 4px;
  height: 20px;
  position: relative;
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
</style>
