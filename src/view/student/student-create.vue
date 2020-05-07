<template>
    <div class="container">
        <div class="title">添加学生</div>
        <div class="wrap">
            <el-row>
                <el-col :lg="16" :md="20" :sm="24" :xs="24">
                    <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
                        <el-form-item label="学号" prop="stu_id">
                            <el-input size="medium" v-model="form.stuId" placeholder="请填写学号"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="stu_name">
                            <el-input size="medium" v-model="form.stuName" placeholder="请填写姓名"></el-input>
                        </el-form-item>
                        <el-form-item class="submit">
                            <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                            <el-button @click="resetForm('form')">重 置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import student from '@/model/student'

export default {
  data() {
    return {
      form: {
        stuId: '',
        stuName: '',
      },
    }
  },
  methods: {
    async submitForm(formName) {
      try {
        const res = await student.createStudent(this.form)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.$message.error('学生添加失败，请检查填写信息')
        console.log(error)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
    .container {
        .title {
            height: 59px;
            line-height: 59px;
            color: $parent-title-color;
            font-size: 16px;
            font-weight: 500;
            text-indent: 40px;
            border-bottom: 1px solid #dae1ec;
        }

        .wrap {
            padding: 20px;
        }

        .submit {
            float: left;
        }
    }
</style>
