<template>
    <a-modal :title="title"
             :width="800"
             v-model="visible"
             :confirmLoading="confirmLoading"
             okText="确定"
             @ok="handleOk"
             cancelText="取消"
             @cancel="handleCancel">
        <a-spin :spinning="confirmLoading">
            <a-form :layout="formLayout" :form="form">

                <a-form-item label="唯一识别码" placeholder="唯一识别码" :labelCol="labelCol" :wrapperCol="wrapperCol"
                             hasFeedback>
                    <a-input v-decorator="[ 'id',{rules: [{ required: true, message: '请输入唯一识别码' }]}]"/>
                </a-form-item>

                <a-form-item label="菜单名称" placeholder="菜单名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-input v-decorator="[ 'name',{rules: [{ required: true, message: '请输入菜单名称' }]}]"/>
                </a-form-item>

                <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-select v-decorator="['status',{rules: [{ required: true, message: '请选择状态' }]}]"
                              placeholder="请选择菜单状态">
                        <a-select-option :value="1">正常</a-select-option>
                        <a-select-option :value="0">禁用</a-select-option>
                    </a-select>
                </a-form-item>

                <a-divider/>

                <a-form-item label="赋予权限" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-select style="width: 100%" mode="multiple" :allowClear="true"
                              v-decorator="['actions',{rules:[]}]">
                        <a-select-option v-for="(action, index) in permissionList" :key="index" :value="action.value">
                            {{action.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

            </a-form>
        </a-spin>
    </a-modal>
</template>

<script>

    export default {
        name: "MenuModal",
        data() {
            return {
                visible: false,
                title: '',
                form: this.$form.createForm(this),
                formLayout: 'horizontal',
                confirmLoading: false,
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 5}
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16}
                },
                permissionList: [
                    {label: '新增', value: 'add', defaultChecked: false},
                    {label: '查询', value: 'get', defaultChecked: false},
                    {label: '修改', value: 'update', defaultChecked: false},
                    {label: '列表', value: 'query', defaultChecked: false},
                    {label: '删除', value: 'delete', defaultChecked: false},
                    {label: '导入', value: 'import', defaultChecked: false},
                    {label: '导出', value: 'export', defaultChecked: false}
                ]
            }
        },
        methods: {
            add() {
                this.visible = true;
                this.title = "新增";
            },
            edit(record) {
                this.visible = true;
                this.title = "编辑";
                this.$nextTick(() => {
                    this.form.setFieldsValue({
                        id: record.id,
                        name: record.name,
                        status: record.status
                    })
                })
            },
            handleOk() {
                let _this = this;
                this.form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    console.log('form values', values);

                    _this.confirmLoading = true;
                    // 模拟后端请求 2000 毫秒延迟
                    new Promise((resolve) => {
                        setTimeout(() => resolve(), 2000)
                    }).then(() => {
                        // Do something
                        _this.$message.success('保存成功')
                        _this.$emit('ok')
                    }).catch(() => {
                        // Do something
                    }).finally(() => {
                        _this.confirmLoading = false;
                        _this.close()
                    })
                });
            },
            handleCancel() {
                this.close()
            },
            close() {
                this.form.resetFields();
                this.$emit('close');
                this.visible = false
            }
        }
    }
</script>

<style scoped>

</style>