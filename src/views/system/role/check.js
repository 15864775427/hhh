const check = {
  name: [{ required: true, message: "请填写角色名称", trigger: "blur" }],
  code: [{ required: true, message: "请填写角色编码", trigger: "blur" }],
  sort: [{ required: true, message: "字典类型代码", trigger: "blur" }],
};
export default check;
