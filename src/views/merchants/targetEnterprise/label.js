export default function(field) {
  let dictionaries = [
    {
      field: "address",
      label: "租赁地址"
    },
    {
      field: "contactPerson",
      label: "企业联系人"
    },
    {
      field: "contactPersonIdentityNumber",
      label: "企业联系人身份证号"
    },
    {
      field: "contactPersonPhone",
      label: "企业联系人手机号"
    },
    {
      field: "creditCode",
      label: "社会统一信用代码"
    },
    {
      field: "endTime",
      label: "租赁结束时间"
    },
    {
      field: "financingSituation",
      label: "融资情况"
    },
    {
      field: "firmName",
      label: "企业名称"
    },
    {
      field: "inTax",
      label: "年税收（万元）"
    },
    {
      field: "industryChain",
      label: "在基地内产业链上下游企业"
    },
    {
      field: "industryClass",
      label: "产业类型"
    },
    {
      field: "intime",
      label: "入园时间（在园区注册或注册迁入园区时间）"
    },
    {
      field: "intoProductionCode",
      label: "是否已投产"
    },
    {
      field: "intoProductionDate",
      label: "预计投产时间"
    },
    {
      field: "legalPerson",
      label: "企业法人"
    },
    {
      field: "legalPersonIdentityNumber",
      label: "法人身份证号"
    },
    {
      field: "legalPersonPhone",
      label: "法人联系方式（手机）"
    },
    {
      field: "participation",
      label: "企业参与指定国家、行业标准情况"
    },
    {
      field: "productName",
      label: "主要产品名称"
    },
    {
      field: "productSchedule",
      label: "主要产品进度"
    },
    {
      field: "projectBrief",
      label: "项目简介"
    },
    {
      field: "projectType",
      label: "入驻形式"
    },
    {
      field: "registType",
      label: "企业类型"
    },
    {
      field: "registeredFund",
      label: "注册资金（万元）"
    },
    {
      field: "remark",
      label: "备注"
    },
    {
      field: "rentalArea",
      label: "租赁面积"
    },
    {
      field: "research",
      label: "企业与高校院所开展学研情况"
    },
    {
      field: "settleInIncubatorStatus",
      label: "入孵状态"
    },
    {
      field: "startTime",
      label: "租赁开始时间"
    },
    {
      field: "technicianForce",
      label: "企业科技人员数"
    },
    {
      field: "workForce",
      label: "企业职工总数"
    },
    {
      field: "yearGeneralIncome",
      label: "年企业总收入（万元）"
    },
    {
      field: "yearGrossSales",
      label: "年销售收入（万元）"
    }
  ];
  if(dictionaries.filter(item=>item.field===field).length>0){
    return dictionaries.filter(item=>item.field===field)[0].label
  }else{
    return false
  }
  
}
