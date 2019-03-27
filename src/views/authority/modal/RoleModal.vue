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

                <a-form-item label="角色名称" placeholder="角色名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-input v-decorator="[ 'name',{rules: [{ required: true, message: '请输入菜单名称' }]}]"/>
                </a-form-item>

                <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-select v-decorator="['status',{rules: [{ required: true, message: '请选择状态' }]}]"
                              placeholder="请选择菜单状态">
                        <a-select-option :value="1">正常</a-select-option>
                        <a-select-option :value="0">禁用</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        label="描述"
                        hasFeedback
                >
                    <a-textarea :rows="5" placeholder="..." v-decorator="[ 'describe', { rules: [] } ]"/>
                </a-form-item>

                <a-divider/>

                <a-form-item label="拥有权限" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-row :gutter="16" v-for="(permission, index) in permissions" :key="index">
                        <a-col :span="4">
                            {{ permission.name }}：
                        </a-col>
                        <a-col :span="20">
                            <a-checkbox
                                    v-if="permission.actionsOptions.length > 0"
                                    :indeterminate="permission.indeterminate"
                                    :checked="permission.checkedAll"
                                    @change="onChangeCheckAll($event, permission)">
                                全选
                            </a-checkbox>
                            <a-checkbox-group :options="permission.actionsOptions" v-model="permission.selected"
                                              @change="onChangeCheck(permission)"/>
                        </a-col>
                    </a-row>
                </a-form-item>

            </a-form>
        </a-spin>
    </a-modal>
</template>

<script>
    export default {
        name: "RoleModal",
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
                permissions: [
                    {
                        id: "menu",
                        name: "菜单管理",
                        status: 1,
                        checkedAll: false,
                        indeterminate: false,
                        selected: [],
                        actionsOptions: [
                            {value: "add", label: "新增"},
                            {value: "get", label: "详情"},
                            {value: "update", label: "修改"},
                            {value: "delete", label: "删除"}
                        ]
                    },
                    {
                        id: "role",
                        name: "角色管理",
                        status: 1,
                        checkedAll: false,
                        indeterminate: false,
                        selected: [],
                        actionsOptions: [
                            {value: "add", label: "新增"},
                            {value: "get", label: "详情"},
                            {value: "update", label: "修改"},
                            {value: "delete", label: "删除"}
                        ]
                    },
                    {
                        id: "user",
                        name: "用户管理",
                        status: 1,
                        checkedAll: false,
                        indeterminate: false,
                        selected: [],
                        actionsOptions: [
                            {value: "add", label: "新增"},
                            {value: "import", label: "导入"},
                            {value: "get", label: "详情"},
                            {value: "update", label: "修改"},
                            {value: "delete", label: "删除"},
                            {value: "export", label: "导出"}
                        ]
                    }
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

                // 有权限表，处理勾选
                if (record.permissions && this.permissions) {
                    // 先处理要勾选的权限结构
                    const permissionsAction = {}
                    record.permissions.forEach(permission => {
                        permissionsAction[permission.permissionId] = permission.actionEntitySet.map(entity => entity.action)
                    });
                    // 把权限表遍历一遍，设定要勾选的权限 action
                    this.permissions.forEach(permission => {
                        permission.selected = permissionsAction[permission.id]
                    })
                }

                this.$nextTick(() => {
                    this.form.setFieldsValue({
                        id: record.id,
                        name: record.name,
                        status: record.status
                    })
                })
            },

            onChangeCheckAll(e, permission) {
                Object.assign(permission, {
                    selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
                    indeterminate: false,
                    checkedAll: e.target.checked
                })
            },
            onChangeCheck(permission) {
                permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
                permission.checkedAll = permission.selected.length === permission.actionsOptions.length
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