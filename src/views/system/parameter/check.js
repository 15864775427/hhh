const check = {
  name: [{ required: true, message: "请输入参数名字", trigger: "blur" }],
  code: [{ required: true, message: "请输入参数代码", trigger: "blur" }],
  cValue: [{ required: true, message: "请输入参数代码值", trigger: "blur" }]
};
export default check;
