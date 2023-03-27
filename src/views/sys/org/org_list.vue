<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="400px">
        <el-button type="success" style="margin-left: 15px" size="small" @click="addOrg">新增</el-button>

        <el-tree ref="tree" style="margin-top: 10px" @node-click="selectOrg" :data="treeData" :props="defaultProps"
                 node-key="orgId"
                 :load="queryOrgList" lazy>
          <template #default="{ node }">
          <span class="custom-tree-node">
            <span><el-tag effect="plain">{{ node.label }}</el-tag></span>

          </span>
          </template>
        </el-tree>
      </el-aside>
      <el-main>
        <el-form
            label-position="left"
            label-width="100px"
            :model="orgFormData"
            style="margin-right: 100px">
          <el-form-item label="父类id">
            <el-input v-model="orgFormData.orgParentId" :disabled="selectModel.editable"/>
          </el-form-item>
          <el-form-item label="组织id">
            <el-input v-model="orgFormData.orgId" :disabled="selectModel.editable"/>
          </el-form-item>
          <el-form-item label="组织名称">
            <el-input v-model="orgFormData.orgName"/>
          </el-form-item>
          <el-form-item label="组织标签">
            <el-select v-model="selectModel.id" class="m-2" placeholder="Select" size="large">
              <el-option
                  v-for="item in tags"
                  :key="item.orgTagId"
                  :label="item.orgTagName"
                  :value="item.orgTagId"
              />
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="remove">删除</el-button>

        </el-form>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import {queryTagList} from "@/api/sys/tag"
import {saveOrEdit, queryOrgList, getOrgById, removeOrgById} from "@/api/sys/org"
import {ElMessageBox, ElNotification} from "element-plus";

export default {
  name: "org_list",
  data() {
    return {

      selectData: {
        orgId: null,
        orgParentId: 0,
      },
      orgFormData: {
        orgParentId: 0,
        orgId: null,
        orgName: '',
        orgTagId: ''
      },
      selectModel: {
        editable: true,
        id: '',
        value: '',
      },
      treeData: [],
      tags: [],
      defaultProps: {
        children: 'children',
        label: 'orgName',
      }

    }
  },
  created() {
    this.queryTagList();
  },


  methods: {

    queryOrgList(node, resolve) {

      console.log(node.data.orgId);
      if (typeof (node.data.orgParentId) == 'undefined') {
        queryOrgList(null).then(res => {

          let data = res.data;
          return resolve(data)

        }).catch(err => {
          console.log(err);
        });
      } else {
        console.log(node.data.orgId);
        queryOrgList({orgParentId: node.data.orgId}).then(res => {

          let data = res.data;
          return resolve(data)

        }).catch(err => {
          console.log(err);
        });
      }

    },
    queryTagList() {

      let that = this;
      queryTagList().then(res => {

        that.tags = res.data;
        that.selectModel.id = this.tags[0].orgTagId;
      }).catch(err => {
        console.log(err);
      });
    },
    addOrg() {
      this.orgFormData.orgParentId = this.orgFormData.orgId;
      this.orgFormData.orgId = null;
      this.orgFormData.orgName = '';
      this.orgFormData.orgTagId = 1;
      this.selectModel.id = 1;

    },
    selectOrg(data) {
      let that = this;
      getOrgById(data.orgId).then(res => {
        that.orgFormData.orgId = res.data.orgId;
        that.orgFormData.orgParentId = res.data.orgParentId;
        that.orgFormData.orgName = res.data.orgName;
        that.orgFormData.orgTagId = res.data.orgTagId;
        that.selectModel.id = res.data.orgTagId;
      });
    },

    removeOrg(node, data) {
      console.log(node, data);
    },
    success(title) {
      ElNotification({
        title: title,
        message: "操作成功",
        position: 'bottom-right',
        type: 'success'
      })
    },
    failed(title, message) {
      ElNotification({
        title: title,
        message: message,
        position: 'bottom-right',
        type: 'error'
      })
    },

    refreshTreeNode(orgId) {


      let node = this.$refs.tree.getNode(orgId)
      if (node) {
        node.loaded = false
        node.expand()
      }
    },
    save() {

      let that = this;
      if (this.orgFormData.orgParentId == 0 && this.orgFormData.orgId != 1) {
        this.failed("操作失败", "请先选择一个父节点");
        return;
      }
      this.orgFormData.orgTagId = this.selectModel.id;
      saveOrEdit(this.orgFormData).then(res => {

        that.orgFormData.orgId = res.data.orgId;
        that.orgFormData.orgParentId = res.data.orgParentId;
        that.orgFormData.orgTagId = res.data.orgTagId;
        that.orgFormData.orgName = res.data.orgName;
        that.refreshTreeNode(that.orgFormData.orgParentId);
        that.success("保存成功");
      }).catch(err => {
        console.log(err);
      });
    },
    remove() {
      let that = this;
      if (this.orgFormData.orgId == null) {
        this.failed("操作失败", "请先选择一个节点");
        return;
      }
      ElMessageBox.confirm(
          '点击确认将删除该条数据，且无法恢复，是否继续?',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            removeOrgById(this.orgFormData.orgId).then(res => {

              console.log(res);
              that.refreshTreeNode(that.orgFormData.orgParentId);
              that.addOrg();
              that.success("操作成功");
            }).catch(err => {
              that.failed("操作失败", err);
            });
          });


    }
  }
}
</script>

<style scoped>

</style>