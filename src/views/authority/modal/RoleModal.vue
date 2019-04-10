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

                <a-form-item v-if="isAdd" label="唯一识别码" placeholder="唯一识别码" :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             hasFeedback>
                    <a-input v-decorator="[ 'code',{rules: [{ required: true, message: '请输入唯一识别码' }]}]"/>
                </a-form-item>

                <a-form-item v-if="!isAdd" label="唯一识别码" placeholder="唯一识别码" :labelCol="labelCol"
                             :wrapperCol="wrapperCol"
                             hasFeedback>
                    <span>{{editData.code}}</span>
                </a-form-item>

                <a-form-item label="角色名称" placeholder="角色名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-input v-decorator="[ 'name',{rules: [{ required: true, message: '请输入菜单名称' }]}]"/>
                </a-form-item>

                <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-select v-decorator="['deleted',{rules: [{ required: true, message: '请选择状态' }]}]"
                              placeholder="请选择菜单状态">
                        <a-select-option :value="false">正常</a-select-option>
                        <a-select-option :value="true">禁用</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        label="描述"
                        hasFeedback
                >
                    <a-textarea :rows="5" placeholder="..." v-decorator="[ 'describes', { rules: [] } ]"/>
                </a-form-item>

                <a-divider/>

                <a-form-item label="拥有权限" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-row :gutter="16" v-for="(permission, index) in permissions" :key="index">
                        <a-col :span="4">
                            {{ permission.name }}：
                        </a-col>
                        <a-col :span="20">
                            <a-checkbox
                                    v-if="permission.actionsData.length > 0"
                                    :indeterminate="permission.indeterminate"
                                    :checked="permission.checkedAll"
                                    @change="onChangeCheckAll($event, permission)">
                                全选
                            </a-checkbox>
                            <a-checkbox-group :options="permission.actionsData" v-model="permission.selected"
                                              @change="onChangeCheck(permission)"/>
                        </a-col>
                    </a-row>
                </a-form-item>

            </a-form>
        </a-spin>
    </a-modal>
</template>

<script>
    import {api_listMenu} from "../../../axios/api/menu_api";
    import {api_addRole, api_updateRole} from "../../../axios/api/role_api";

    export default {
        name: "RoleModal",
        data() {
            return {
                visible: false,
                title: '',
                isAdd: true,
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
                    /* {
                         id: "menu",
                         name: "菜单管理",
                         status: 1,
                         checkedAll: false,
                         indeterminate: false,
                         selected: [],
                         actionsData: [
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
                         actionsData: [
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
                         actionsData: [
                             {value: "add", label: "新增"},
                             {value: "import", label: "导入"},
                             {value: "get", label: "详情"},
                             {value: "update", label: "修改"},
                             {value: "delete", label: "删除"},
                             {value: "export", label: "导出"}
                         ]
                     }*/
                ],
                editData: {},
            }
        },
        created() {
            this.listMenu()
        },
        methods: {
            listMenu() {
                api_listMenu({}).then(res => {
                    let result = res.data.filter((item) => {
                        return item.leaf
                    })
                    this.permissions = result.map(permission => {
                        permission.checkedAll = false;
                        permission.selected = [];
                        permission.indeterminate = false;
                        return permission;
                    })
                }).catch(err => {

                })
            },
            add() {
                this.visible = true;
                this.title = "新增";
                this.isAdd = true;
            },
            edit(record) {
                this.visible = true;
                this.title = "编辑";
                this.isAdd = false;
                this.editData = record;

                // 有权限表，处理勾选
                if (record.permissions && this.permissions) {
                    // 先处理要勾选的权限结构
                    const permissionsAction = {};
                    record.permissions.forEach(permission => {
                        permissionsAction[permission.permissionId] = permission.actionsData.map(entity => entity.value)
                    });
                    // 把权限表遍历一遍，设定要勾选的权限 action
                    this.permissions.forEach(permission => {
                        permission.selected = permissionsAction[permission.code]
                    })
                }

                this.$nextTick(() => {
                    this.form.setFieldsValue({
                        name: record.name,
                        deleted: record.deleted
                    })
                })
            },

            onChangeCheckAll(e, permission) {
                Object.assign(permission, {
                    selected: e.target.checked ? permission.actionsData.map(obj => obj.value) : [],
                    indeterminate: false,
                    checkedAll: e.target.checked
                })
            },
            onChangeCheck(permission) {
                permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsData.length)
                permission.checkedAll = permission.selected.length === permission.actionsData.length
            },

            handleOk() {
                let _this = this;
                this.form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }

                    let role = {
                        name: values.name,
                        deleted: values.deleted,
                        describes: values.describes,
                    };
                    if (_this.isAdd) {
                        role.code = values.code;
                    } else {
                        role.id = _this.editData.id;
                        role.code = _this.editData.code;
                    }

                    let permissionsArr = [];
                    _this.permissions.forEach(v => {
                        if (v.selected != undefined && v.selected.length > 0) {
                            permissionsArr.push({
                                permissionId: v.code,
                                permissionName: v.name,
                                actions: v.selected
                            })
                        }
                    });
                    role.permissions = permissionsArr;

                    _this.confirmLoading = true;
                    if (_this.isAdd) {
                        api_addRole(role).then(res => {
                            _this.$message.success('保存成功')
                            _this.$emit('ok')
                        }).catch(err => {

                        }).finally(() => {
                            _this.confirmLoading = false;
                            _this.close()
                        });
                    } else {
                        api_updateRole(role).then(res => {
                            _this.$message.success('保存成功')
                            _this.$emit('ok')
                        }).catch(err => {

                        }).finally(() => {
                            _this.confirmLoading = false;
                            _this.close()
                        });
                    }

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