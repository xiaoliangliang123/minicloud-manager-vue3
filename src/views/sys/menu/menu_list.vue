<template>
  <div class="common-layout">
    <el-container>
      <el-main>

        <el-tree
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
      </el-main>
    </el-container>
  </div>

</template>

<script>
import {useRouter} from 'vue-router'

export default {
  name: "menu_list",
  data() {
    return {

      defaultProps: {
        children: 'children',
        label: 'name'
      },
      data: null

    }
  },
  methods: {
    filterNode(value, data) {

      if (data.tag != 'indefined' & data.tag != null) return true
      return false
    }
  },

  created() {
    let that = this;
    const Router = useRouter();
    console.log(Router.options.routes)
    this.data = Router.options.routes;
    setTimeout(function () {
      that.$refs.treeRef.filter("");
    }, 200);
  },

}
</script>

<style scoped>

</style>