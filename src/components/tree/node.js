let id = 0;
function multiarr(node, lv = 0, parent = {}) {
  return node.map(item => {
    id++;
    let obj={}
    obj.id=id;
    obj.lv=lv;
    obj.data=item;
    obj.parent = parent;
    if (item.childDepts) {
      obj.childDepts = multiarr(item.childDepts, lv + 1,item);
    }
    return obj;
  });
}
export default multiarr;
