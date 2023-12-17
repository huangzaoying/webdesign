<template>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col>
          <el-button type="primary" class="edit-button" icon="el-icon-edit" @click="showDialog"></el-button>
        </el-col>
      </el-row>
      <el-form :model="userInfo" label-width="100px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户名">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登录密码">
                        <el-input v-model="userInfo.password" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户类型">
                        <el-input v-model="userInfo.userType" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户姓名">
                        <el-input v-model="userInfo.name" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="证件类型">
                        <el-input v-model="userInfo.idType" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="证件号码">
                        <el-input v-model="userInfo.idNumber" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码">
                        <el-input v-model="userInfo.phoneNumber" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户级别">
                        <el-input v-model="userInfo.userLevel" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="注册城市">
                        <el-input v-model="userInfo.city" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户简介">
                        <el-input v-model="userInfo.bio" type="textarea" disabled></el-input>
                    </el-form-item>                    
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="注册时间">
                        <el-input v-model="userInfo.registerTime" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="修改时间">
                        <el-input v-model="userInfo.updateTime" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
    
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                username: 'your_username',
                password: 'your_password',
                userType: '系统管理员',
                name: 'name',
                idType: '证件类型',
                idNumber: '证件号码',
                phoneNumber: '手机号码',
                userLevel: '一般',
                bio: '用户简介',
                city: '注册城市',
                registerTime: '注册时间',
                updateTime: '修改时间'
            }
        };
    },
    // TODO: 从后端获取用户信息，修改信息功能待完善
    methods: {
        showDialog() {
            this.$alert('编辑用户信息', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.edit-button {
  float: right;
}
</style>