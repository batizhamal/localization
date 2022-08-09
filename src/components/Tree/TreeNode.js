export class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  get hasChildren() {
    return this.children.length != 0;
  }
}
