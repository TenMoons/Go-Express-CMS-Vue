<template>
    <div>
        <!-- 列表页面 -->
        <div class="container" v-if="!showEdit">
            <div class="header">
                <div class="title">学生列表</div>
            </div>
            <!-- 表格 -->
            <lin-table
                    :tableColumn="tableColumn"
                    :tableData="tableData"
                    :operate="operate"
                    @handleEdit="handleEdit"
                    @handleDelete="handleDelete"
                    @row-click="rowClick"
                    v-loading="loading"
            ></lin-table>
        </div>

        <!-- 编辑页面 -->
        <student-modify v-else @editClose="editClose" :editStudentID="editStudentID"></student-modify>
    </div>
</template>

<script>
import student from '@/model/student'
import LinTable from '@/component/base/table/lin-table'
import StudentModify from './student-modify'

export default {
  components: {
    LinTable,
    StudentModify,
  },
  data() {
    return {
      tableColumn: [{
        prop: 'stu_id',
        label: '学号',
      }, {
        prop: 'stu_name',
        label: '姓名',
      }],
      tableData: [],
      operate: [],
      showEdit: false,
      editStudentID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getStudents()
    this.operate = [
      {
        name: '编辑',
        func: 'handleEdit',
        type: 'primary',
      },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除学生',
      },
    ]
    this.loading = false
  },
  methods: {
    async getStudents() {
      try {
        const students = await student.getStudents()
        this.tableData = students
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editStudentID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await student.delectStudent(val.row.id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            this.getStudents()
            this.$message({
              type: 'success',
              message: `${res.message}`,
            })
          }
        })
    },
    rowClick() {
    },
    editClose() {
      this.showEdit = false
      this.getStudents()
    },
  },
}
</script>

<style lang="scss" scoped>
    .container {
        padding: 0 30px;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                height: 59px;
                line-height: 59px;
                color: $parent-title-color;
                font-size: 16px;
                font-weight: 500;
            }
        }

        .pagination {
            display: flex;
            justify-content: flex-end;
            margin: 20px;
        }
    }
</style>
