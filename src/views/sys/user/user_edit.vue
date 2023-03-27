<template>

  <div>


    <el-form
        label-position="left"
        label-width="100px"
        :model="userForm"
        style="max-width: 660px">

      <el-form-item>
        <el-upload
            class="avatar-uploader"
            action="/files/files"
            :show-file-list="false"
            :headers="headerObj"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>

        </el-upload>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="userForm.username"/>
      </el-form-item>
      <el-form-item label="用户实名">
        <el-input v-model="userForm.realname"/>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="userForm.nickname"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userForm.mobile"/>
      </el-form-item>
      <el-form-item label="角色">
        <el-tag
            style="margin-right: 10px"
            v-for="role in userForm.userRoles"
            :key="role.roleId"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="removeTag(role)"
        >{{ role.roleCode }}
        </el-tag>
        <el-select v-model="role" filterable placeholder="Select" @change="handSelectRole">
          <el-option
              v-for="item in roles"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
          >
            <span style="float: left">{{ item.roleName }}</span>
            <span
                style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        "
            >{{ item.roleCode }}</span
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效">
        <el-switch
            v-model="userForm.active"
            class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </el-form-item>
      <el-form-item label="有效时间">
        <el-date-picker
            v-model="userForm.expireTime"
            type="date"
            placeholder="Pick a day"
            size="small"
        />
      </el-form-item>
      <el-form-item label="部门">
        <el-row :span="24" style="width: 300px">
          <el-col :span="10">
            {{orgFormData.orgName}}
          </el-col>
          <el-col :span="14">
            <el-tree  v-model="orgFormData.orgId" ref="tree" @node-click="selectOrg"  :data="treeData" :props="defaultProps"
                            node-key="orgId"
                            :load="queryOrgList" lazy />
          </el-col>
        </el-row>

      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveOrEdit()">保存</el-button>
    <el-button type="success" @click="backToList()">返回</el-button>
  </div>
</template>

<script>
import {queryAllRoles} from "@/api/sys/role";
import {saveOrEdit,queryUserById} from "@/api/sys/user";

import {ElNotification} from 'element-plus'
import store from '@/store'
import {getOrgById, queryOrgList} from "@/api/sys/org";


export default {
  name: "user_add",
  data() {
    return {
      imageUrl: '',
      roles: [],
      treeData: [],
      role: {},
      headerObj: {
        Authorization: 'Bearer ' + store.getters.access_token
      },
      orgFormData: {
        orgParentId: 0,
        orgId: null,
        orgName: '',
        orgTagId: ''
      },
      defaultProps: {
        children: 'children',
        label: 'orgName',
      },
      userForm: {
        expireTime: new Date(),
        headimg: '',
        userId: '',
        username: '',
        realname: '',
        nickname: '',
        mobile: '',
        active: true,
        deptId:null,
        userRoles: []
      }
    }
  },
  created() {

    this.userForm.userId = this.$route.params.userId;
    if (this.userForm.userId == 'new') {
      this.userForm.userId = null;
    }else {
      this.getObj();
    }


  },
  methods: {

    selectOrg(data) {
      let that = this;
      getOrgById(data.orgId).then(res => {

        that.orgFormData.orgId = res.data.orgId;
        that.orgFormData.orgName = res.data.orgName;
        that.userForm.deptId = res.data.orgId;
      });
    },
    handSelectRole(roleId) {
      let roleIndex = -1;
      this.userForm.userRoles.forEach((item, index) => {
        if (item.roleId == roleId) {
          roleIndex = index;
        }
      })

      if (roleIndex == -1) {

        this.roles.forEach((item) => {
          if (item.roleId == roleId) {
            this.userForm.userRoles.push({"roleId": item.roleId, "roleCode": item.roleCode});
          }
        })
      }
    },
    removeTag(role) {
      let roleIndex = 0;
      this.userForm.userRoles.forEach((index, item) => {
        if (item.roleId == role.roleId) {
          roleIndex = index;
        }
      })
      this.userForm.userRoles.splice(roleIndex, 1)

    },
    handleAvatarSuccess(response) {

      this.imageUrl = '/files/files?filename=' + response;
      this.userForm.headimg = response;
    },
    beforeAvatarUpload() {
    },
    queryRoles() {
      queryAllRoles().then(res => {
        this.roles = res.data;
      })
    },
    getObj() {
      let that = this;
      queryUserById(this.userForm.userId).then(response => {

        that.userForm.userId = response.data.userId
        that.userForm.username = response.data.username;
        that.userForm.realname = response.data.realname;
        that.userForm.nickname = response.data.nickname;
        that.userForm.mobile = response.data.mobile;
        that.userForm.active = !response.data.active;
        that.userForm.headimg = response.data.headimg;
        that.userForm.userRoles = response.data.userRoles;
        that.orgFormData.orgId = response.data.deptId;
        that.refreshTreeNode(response.data.deptId);
        getOrgById(response.data.deptId).then(res => {

          that.orgFormData.orgId = res.data.orgId;
          that.orgFormData.orgName = res.data.orgName;
          that.userForm.deptId = res.data.orgId;
        });
        that.imageUrl = "/files/files?filename="+response.data.headimg;
      }).catch(err => {
        console.log(err)
      })
    },

    backToList() {
      this.$router.push('/user/user_list');
    },
    success(title) {
      ElNotification({
        title: title,
        message: "操作成功",
        position: 'bottom-right',
        type: 'success'
      })
    },
    saveOrEdit() {
      let that = this;

      saveOrEdit(this.userForm).then(response => {

        if (response.status == 200) {
          that.userForm.userId = response.data;
          that.success('保存成功');
        }
        console.log(JSON.stringify(response));
      }).catch(err => {
        console.log(err)
      });
    },
    refreshTreeNode(orgId) {


      let node = this.$refs.tree.getNode(orgId)
      if (node) {
        node.loaded = false
        node.expand()
      }
    },
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

  },
  mounted() {
    this.queryRoles();
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>