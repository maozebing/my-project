<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper" style="text-align: right">
            <a-form layout="inline">
                <a-form-item>
                    <a-button type="primary" @click="$refs.modal.add()">新增</a-button>
                </a-form-item>
            </a-form>
        </div>

        <a-table ref="table" :columns="columns" :dataSource="tableData" :loading="loading" :rowKey="record => record.id">
            <span slot="actions" slot-scope="text, record">
                <a-tag color="cyan" v-for="(action, index) in record.actionData"
                       :key="index">{{ action.describe }}</a-tag>
            </span>

            <span slot="icon" slot-scope="text,record"><a-icon :type="record.icon"/>{{record.icon}}</span>
            <span slot="status" slot-scope="text"><a-badge status="success"/>{{ text | statusFilter }}</span>

            <span slot="action" slot-scope="text, record">
                <a @click="$refs.modal.edit(record)">编辑</a>
            </span>
        </a-table>

        <menu-modal ref="modal" @ok="handleOk"></menu-modal>
    </a-card>
</template>

<script>
    import MenuModal from './modal/MenuModal'
    import {api_listMenu} from "../../api/menu_api";

    export default {
        name: "Function",
        components: {MenuModal},
        data() {
            return {
                columns: [
                    {
                        title: '权限名称',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: '唯一识别码',
                        dataIndex: 'code',
                        key: 'code'
                    },
                    {
                        title: '菜单ICON',
                        dataIndex: 'icon',
                        key: 'icon',
                        scopedSlots: {customRender: 'icon'}
                    },
                    {
                        title: '可操作权限',
                        dataIndex: 'actionsData',
                        key: 'actionsData',
                        scopedSlots: {customRender: 'actions'}
                    },
                    {
                        title: '状态',
                        dataIndex: 'deleted',
                        key: 'deleted',
                        scopedSlots: {customRender: 'status'}
                    },
                    {
                        title: '操作',
                        width: '150px',
                        dataIndex: 'action',
                        key: 'action',
                        scopedSlots: {customRender: 'action'}
                    }
                ],
                tableData: [
                    {
                        key: '1',
                        id: 'authority',
                        name: '系统设置',
                        icon: 'safety-certificate',
                        status: 1,
                        actionData: [],
                        children:[
                            {
                                key: '2',
                                id: 'permission',
                                name: '权限控制',
                                icon: 'safety-certificate',
                                status: 1,
                                actionData: [],
                                children: [
                                    {
                                        key: '2',
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
                                        key: '3',
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
                                        key: '4',
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
                    }
                ],
                loading: false
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    false: '正常',
                    true: '禁用'
                };
                return statusMap[status]
            }
        },
        methods: {
            //重新加载表格数据
            handleOk() {
                this.listMenu()
            },
            listMenu() {
                this.loading = true;
                api_listMenu().then(res => {
                    let perentMenu = res.data.filter((item) => {
                        return !item.leaf;
                    });

                    perentMenu.forEach(v => {
                        v.children = res.data.filter((item) => {
                            return item.parent == v.code;
                        })
                    });

                    this.tableData = perentMenu;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            }
        },
        mounted() {
            //this.listMenu()
        }
    }
</script>

<style scoped>

</style>