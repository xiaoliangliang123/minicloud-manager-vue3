<template>

  <div class="common-layout">
    <el-container>
      <el-main>

        <el-tree
            node-key="path"
            show-checkbox
            class="filter-tree"
            default-expand-all
            ref="treeRef"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterNode">
          <template #default="{ node, data }">
        <span class="custom-tree-node">
          <el-tag class="ml-2" type="info"><span>{{ node.label }}</span></el-tag>
          <el-tag v-if="data.tag=='top'" class="ml-2" type="success">导航</el-tag>

          <el-tag v-if="data.tag=='directory'" class="ml-2" type="success">目录</el-tag>
          <el-tag v-if="data.tag=='menu'" class="ml-2">页面</el-tag>
          <el-tag v-if="data.tag=='button'" class="ml-2" type="danger">按钮</el-tag>
          <el-tag v-if="data.tag!='top'" class="ml-2" type="warning"><span>{{ data.path }}</span></el-tag>
        </span>
          </template>
        </el-tree>
        <div>
          <el-button type="primary" @click="saveOrEdit()">保存</el-button>
          <el-button type="success" @click="backToList()">返回</el-button>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {saveOrEdit, queryPerms} from "@/api/sys/perms"
import {ElNotification} from "element-plus";

export default {
  name: "user_role_perms",
  data() {
    return {

      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      data: null,
      roleId: null
    }
  },
  methods: {
    filterNode(value, data) {
      debugger
      if (data.tag != 'indefined' & data.tag != null) return true
      return false
    },
    saveOrEdit() {

      let checkedNodes = this.$refs.treeRef.getCheckedNodes();
      let halfChckedNodes = this.$refs.treeRef.getHalfCheckedNodes();
      let allCheckedNodes = checkedNodes.concat(halfChckedNodes);

      saveOrEdit(this.roleId, allCheckedNodes).then(res => {

        if (res.data.code == 0) {
          ElNotification({
            title: '',
            message: "操作成功",
            position: 'bottom-right',
            type: 'success'
          })
        } else {
          ElNotification({
            title: '',
            message: res.data.msg,
            position: 'bottom-right',
            type: 'success'
          })
        }
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    },
    backToList() {
      this.$router.push('/role/user_role_list');
    },
  },
  created() {

    this.roleId = this.$route.params.roleId;
    let roleIds = [this.roleId];
    let params = {};
    let that = this;
    params.roleIds = roleIds;
    const Router = useRouter();
    that.data = Router.options.routes;

    queryPerms(params).then(res => {
      res.data.data.forEach((item, index) => {
        console.log(item.path)
        let ars = item.path.split("/").filter(function (s) {
          return s && s.trim();
        });
        if (ars.length > 1) {
          that.checkedKeys[index] = item.path;
        }
      });

      this.$refs.treeRef.setCheckedKeys(that.checkedKeys);
      this.$refs.treeRef.filter("");

    }).catch(err => {
      console.log(err)
    })

  },
  mounted() {
    this.$refs.treeRef.filter("");

  }

}
</script>

<style scoped>


</style>