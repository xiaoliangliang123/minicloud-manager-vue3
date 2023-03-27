<template>
  <div>

    <div style="margin: 20px"/>
    <el-form
        label-position="left"
        label-width="100px"
        :model="menuForm"
        style="max-width: 460px">
      <el-form-item label="菜单名称">
        <el-input v-model="menuForm.menuName"/>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="menuForm.roleCode"/>
      </el-form-item>
      <el-form-item label="菜单url">
        <el-input v-model="menuForm.menuUrl"/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveOrEdit()">保存</el-button>
    <el-button type="success" @click="backToList()">返回</el-button>

  </div>

</template>

<script>
export default {
  name: "menu_edit",
  data() {
    return {

      menuForm: {
        menuId: '',
        menuName: '',
        menuParentId: '',
        menuUrl: ''
      }
    }
  },
  methods:{
    backToList() {
      this.$router.push('/menu/menu_list');
    },
  }
}
</script>

<style scoped>

</style>