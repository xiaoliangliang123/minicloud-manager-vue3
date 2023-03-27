<template>
  <div>

    <div style="margin: 20px"/>
    <el-form
        label-position="left"
        label-width="100px"
        :model="roleForm"
        style="max-width: 460px">
      <el-form-item label="角色名称">
        <el-input v-model="roleForm.roleName"/>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="roleForm.roleCode"/>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleForm.roleDesc"/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveOrEdit()">保存</el-button>
    <el-button type="success" @click="backToList()">返回</el-button>

  </div>

</template>

<script>
import {getObj, saveOrEdit} from "@/api/sys/role"
import { ElNotification} from 'element-plus'

export default {
  name: "user_role_add",
  data() {
    return {

      roleForm: {
        roleId: '',
        roleName: '',
        roleCode: '',
        roleDesc: ''
      }
    }
  },
  created() {

    this.roleForm.roleId = this.$route.params.roleId;
    if (this.roleForm.roleId == 'new') {
      this.roleForm.roleId = null;
    }else {
      this.getObj();
    }

  },
  methods: {


    getObj() {
      let that = this;
      getObj(this.roleForm.roleId).then(response => {
        that.roleForm.roleId = response.data.roleId
        that.roleForm.roleName = response.data.roleName;
        that.roleForm.roleCode = response.data.roleCode;
        that.roleForm.roleDesc = response.data.roleDesc;
      }).catch(err=>{
        console.log(err)
      })
    },
    backToList() {
      this.$router.push('/role/user_role_list');
    },
    success(title){
      ElNotification({
        title: title,
        message: "操作成功",
        position: 'bottom-right',
        type: 'success'
      })
    },
    saveOrEdit() {
      let that = this;
      saveOrEdit(this.roleForm).then(response => {

        if (response.status == 200) {
          that.roleForm.roleId = response.data;
          that.success('保存成功');
        }
        console.log(JSON.stringify(response));
      }).catch(err => {
        console.log(err)
      });
    }
  }
}
</script>

<style scoped>

</style>