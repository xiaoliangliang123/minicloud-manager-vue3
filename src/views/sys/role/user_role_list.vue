<template>
  <div style="width: 100%">
    <div>
      <el-container>

        <el-main>
          <el-button type="success" @click="handleAdd()">新建</el-button>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="roleName" label="角色名称" width="180"/>
            <el-table-column prop="roleCode" label="角色编码" width="180"/>
            <el-table-column prop="roleDesc" label="角色描述" width="220"/>
            <el-table-column fixed="right" label="操作" width="220">
              <template #default="scope" >
                <el-button v-if="scope.row.roleCode!='SUPER_ADMIN'" link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button v-if="scope.row.roleCode!='SUPER_ADMIN'" link type="primary" size="small" @click="handlePerms(scope.row)">权限</el-button>

                <el-button v-if="scope.row.roleCode!='SUPER_ADMIN'" link type="primary" size="small" @click="handleDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              v-model:currentPage="page.currentPage"
              v-model:page-size="page.pageSize"
              :page-sizes="[100, 200, 300, 400]"
              :small="page.small"
              :disabled="page.disabled"
              :background="page.background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"

          />

        </el-main>
      </el-container>

    </div>
  </div>
</template>


<script>
import {del, queryList} from "@/api/sys/role"
import {ElNotification, ElMessageBox} from 'element-plus'

export default {
  name: "user_role_list",
  data() {
    return {
      tableData: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 20 ,
        small: false,
        background: false,
        disabled: false

      },


    }
  },
  created() {
    this.queryRoles();
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    handleAdd() {
      this.goTo('/role/user_role_add/new');
    },
    handleEdit(row) {
      this.goTo('/role/user_role_add/' + row.roleId);
    },
    handlePerms(row) {
      this.goTo('/role/user_role_perms/' + row.roleId);
    },
    handleDel(row) {

      let that = this;
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
            del(row.roleId).then(response=>{

              if(response.status==200){
                that.success('删除成功');
              }
              that.queryRoles();
            }).catch(err=>{

            });

          })
          .catch(() => {

          })

    },
    success(title){
      ElNotification({
        title: title,
        message: "操作成功",
        position: 'bottom-right',
        type: 'success'
      })
    },
    queryRoles() {
      let that = this;
      queryList().then(response => {

        that.tableData = response.data.data;
        that.page.total = response.data.total;
        that.page.pageSize = response.data.size;
        that.page.currentPage = response.data.page;
      }).catch(err => {
        console.log(err)
      });
    }
  },




}
</script>

