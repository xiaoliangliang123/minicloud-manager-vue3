<template>
  <div style="width: 100%">
    <div>
      <el-container>

        <el-main>
          <el-button type="success" @click="handleAdd()">新建</el-button>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="" label="用户头像" width="120">
              <template #default="scope">
              <el-avatar :src="`/files/files?filename=${scope.row.headimg}`"/>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名称" width="120"/>
            <el-table-column prop="realname" label="用户实名" width="120"/>
            <el-table-column prop="nickname" label="用户昵称" width="120"/>
            <el-table-column prop="mobile"  label="手机号" width="120"/>
            <el-table-column fixed="right" label="操作" width="220">
              <template #default="scope" >
                <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button link type="primary" size="small" @click="handleDel(scope.row)">删除</el-button>
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
import {ElMessageBox, ElNotification} from "element-plus";
import {del, queryUserList} from "@/api/sys/user";

export default {
  name: "user_list",
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

  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    handleAdd() {
      this.goTo('/user/user_add/new');
    },
    handleEdit(row) {
      this.goTo('/user/user_add/' + row.userId);
    },
    handlePerms(row) {
      this.goTo('/user/user_add/' + row.userId);
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
            del(row.userId).then(response => {

              if (response.status == 200) {
                that.success('删除成功');
              }
              that.queryRoles();
            }).catch(err => {
               console.log(err);
            });

          })
          .catch(() => {

          })

    },
    success(title) {
      ElNotification({
        title: title,
        message: "操作成功",
        position: 'bottom-right',
        type: 'success'
      })
    },
    queryUsers() {
      let that = this;
      queryUserList().then(response => {

        that.tableData = response.data.data;
        that.page.total = response.data.total;
        that.page.pageSize = response.data.size;
        that.page.currentPage = response.data.page;
      }).catch(err => {
        console.log(err)
      });
    }
  },
  created() {
    this.queryUsers();
  }
}
</script>

<style scoped>


</style>