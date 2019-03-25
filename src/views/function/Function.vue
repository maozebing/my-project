<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper" style="text-align: right">
            <a-form layout="inline">
                <a-form-item>
                    <a-button type="primary" @click="handleEdit(true)">新增</a-button>
                </a-form-item>
            </a-form>
        </div>

        <a-table :columns="columns" :dataSource="data">
            <span slot="actions" slot-scope="text, record">
                <a-tag v-for="(action, index) in record.actionData" :key="index">{{ action.describe }}</a-tag>
            </span>

            <span slot="icon" slot-scope="text,record"><a-icon :type="record.icon"/>{{record.icon}}</span>
            <span slot="status" slot-scope="text"><a-badge status="success"/>{{ text | statusFilter }}</span>

            <span slot="action" slot-scope="text, record">
                <a @click="handleEdit(false,record)">编辑</a>
            </span>
        </a-table>

        <a-modal
                title="操作"
                :width="800"
                v-model="visible"
                @ok="add"
        >
            <a-form :layout="formLayout" :form="form">

                <a-form-item
                        v-bind="menuEditData.id"
                        label="唯一识别码"
                        placeholder="唯一识别码"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                >
                    <a-input
                            v-decorator="[
                              'menuEditData.id',
                              {
                                rules: [{ required: true, message: '请输入唯一识别码', whitespace: true }]
                              }
                            ]"
                    />
                </a-form-item>

                <a-form-item
                        v-bind="menuEditData.name"
                        label="菜单名称"
                        placeholder="菜单名称"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                >
                    <a-input
                            v-decorator="[
                              'menuEditData.name',
                              {
                                rules: [{ required: true, message: '请输入菜单名称', whitespace: true }]
                              }
                            ]"
                    />
                </a-form-item>

                <a-form-item
                        v-bind="menuEditData.status"
                        label="状态"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                >
                    <a-select
                            v-decorator="[
                              'select',
                              {rules: [{ required: true, message: 'Please select your country!' }]}
                            ]"
                            placeholder="请选择菜单状态"
                    >
                        <a-select-option value="1">正常</a-select-option>
                        <a-select-option value="2">禁用</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item
                        v-bind="menuEditData.describe"
                        label="描述"
                        placeholder="描述"
                        row="5"
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                >
                    <a-textarea
                            v-decorator="[
                              'menuEditData.name',
                              {
                                rules: [{ required: true, message: '请输入菜单名称', whitespace: true }]
                              }
                            ]"
                    />
                </a-form-item>

                <a-divider/>

                <a-form-item
                        :labelCol="labelCol"
                        :wrapperCol="wrapperCol"
                        label="赋予权限"
                >
                    <a-select
                            style="width: 100%"
                            mode="multiple"
                            v-model="menuEditData.actions"
                            :allowClear="true"
                    >
                        <a-select-option v-for="(action, index) in permissionList" :key="index" :value="action.value">{{
                            action.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

            </a-form>
        </a-modal>
    </a-card>
</template>

<script>
    export default {
        name: "Function",
        data() {
            return {
                columns: [
                    {
                        title: '权限名称',
                        dataIndex: 'name'
                    },
                    {
                        title: '唯一识别码',
                        dataIndex: 'id'
                    },
                    {
                        title: '菜单ICON',
                        dataIndex: 'icon',
                        scopedSlots: {customRender: 'icon'}
                    },
                    {
                        title: '可操作权限',
                        dataIndex: 'actions',
                        scopedSlots: {customRender: 'actions'}
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        scopedSlots: {customRender: 'status'}
                    },
                    {
                        title: '操作',
                        width: '150px',
                        dataIndex: 'action',
                        scopedSlots: {customRender: 'action'}
                    }
                ],
                data: [
                    {
                        id: 'authority',
                        name: '权限控制',
                        icon: 'safety-certificate',
                        status: 1,
                        actionData: [],
                        children: [
                            {
                                id: "menu",
                                name: "菜单管理",
                                icon: 'bars',
                                status: 1,
                                actionData: [
                                    {action: "get", defaultCheck: false, describe: "查询"},
                                    {action: "add", defaultCheck: false, describe: "新增"},
                                    {action: "update", defaultCheck: false, describe: "修改"}
                                ]
                            },
                            {
                                id: "role",
                                name: "角色管理",
                                icon: 'robot',
                                status: 1,
                                actionData: [
                                    {action: "get", defaultCheck: false, describe: "查询"},
                                    {action: "add", defaultCheck: false, describe: "新增"},
                                    {action: "update", defaultCheck: false, describe: "修改"}
                                ]
                            },
                            {
                                id: "user",
                                name: "用户管理",
                                icon: 'team',
                                status: 1,
                                actionData: [
                                    {action: "get", defaultCheck: false, describe: "查询"},
                                    {action: "add", defaultCheck: false, describe: "新增"},
                                    {action: "update", defaultCheck: false, describe: "修改"}
                                ]
                            }
                        ]
                    }
                ],
                visible: false,
                formLayout:'horizontal',
                form: null,
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 }
                },
                menuEditData: {},
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
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: '正常',
                    2: '禁用'
                }
                return statusMap[status]
            }
        },
        methods: {
            handleEdit(isAdd, record) {
                this.visible = true
                if (isAdd) {

                } else {

                }
            },
            add() {

            },
            edit() {

            }
        }
    }
</script>

<style scoped>

</style>