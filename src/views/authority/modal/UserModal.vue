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

                <a-form-item label="用户名称" placeholder="用户名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-input v-decorator="[ 'name',{rules: [{ required: true, message: '请输入用户名称' }]}]"/>
                </a-form-item>

                <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-select v-decorator="['deleted',{rules: [{ required: true, message: '请选择状态' }]}]"
                              placeholder="请选择菜单状态">
                        <a-select-option :value="false">正常</a-select-option>
                        <a-select-option :value="true">禁用</a-select-option>
                    </a-select>
                </a-form-item>

                <a-divider/>

                <a-form-item label="赋予角色" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                    <a-select style="width: 100%" mode="multiple" :allowClear="true"
                              v-decorator="['roles',{rules:[]}]">
                        <a-select-option v-for="(action, index) in roleList" :key="index" :value="action.value">
                            {{action.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

            </a-form>
        </a-spin>
    </a-modal>
</template>

<script>
    import {api_listRole} from "../../../axios/api/role_api";
    import {api_addUser,api_updateUser} from "../../../axios/api/user_api";

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
                roleList: [

                ],
                editData: {},
            }
        },
        created() {
            this.listRole()
        },
        methods: {
            listRole() {
                api_listRole({}).then(res => {
                    res.data.forEach(v=>{
                        this.roleList.push({
                            value:v.code,
                            label:v.name
                        })
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
                let roles=[];
                record.roles.forEach(v=>{
                   roles.push(v.code)
                });

                this.$nextTick(() => {
                    this.form.setFieldsValue({
                        name: record.name,
                        deleted: record.deleted,
                        roles:roles
                    })
                })
            },

            handleOk() {
                let _this = this;
                this.form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }

                    let user = {
                        name: values.name,
                        deleted: values.deleted,
                    };

                    let roles=[];
                    values.roles.forEach(v=>{
                        roles.push({
                            code:v
                        })
                    });

                    user.roles=roles;

                    if (_this.isAdd) {
                        user.code = values.code;
                    } else {
                        user.id = _this.editData.id;
                        user.code = _this.editData.code;
                    }

                    _this.confirmLoading = true;
                    if (_this.isAdd) {
                        api_addUser(user).then(res => {
                            _this.$message.success('保存成功')
                            _this.$emit('ok')
                        }).catch(err => {

                        }).finally(() => {
                            _this.confirmLoading = false;
                            _this.close()
                        });
                    } else {
                        api_updateUser(user).then(res => {
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