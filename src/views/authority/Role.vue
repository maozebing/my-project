<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper" style="text-align: right">
            <a-form layout="inline">
                <a-form-item>
                    <a-button type="primary" @click="$refs.modal.add()">新增</a-button>
                </a-form-item>
            </a-form>
        </div>

        <a-table ref="table" :columns="columns" :dataSource="data">
            <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
                <a-row :gutter="24" :style="{ marginBottom: '12px' }">
                    <a-col :span="12" v-for="(role, index) in record.permissions" :key="index"
                           :style="{ marginBottom: '12px' }">
                        <a-col :span="5">
                            <span>{{ role.permissionName }}：</span>
                        </a-col>
                        <a-col :span="19" v-if="role.actionEntitySet.length > 0">
                            <a-tag color="cyan" v-for="(action, k) in role.actionEntitySet" :key="k">
                                {{ action.describe }}
                            </a-tag>
                        </a-col>
                        <a-col :span="20" v-else>-</a-col>
                    </a-col>
                </a-row>
            </p>

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

    export default {
        name: "Role",
        components: {MenuModal},
        data() {
            return {
                columns: [
                    {
                        title: '角色名称',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: '唯一识别码',
                        dataIndex: 'id',
                        key: 'id'
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
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
                data: [
                    {
                        key: '1',
                        id: 'super',
                        name: '超级管理员',
                        status: 1,
                        permissions: [
                            {
                                actionEntitySet: [
                                    {action: "add", describe: "新增", defaultCheck: false},
                                    {action: "query", describe: "查询", defaultCheck: false},
                                    {action: "get", describe: "详情", defaultCheck: false},
                                    {action: "update", describe: "修改", defaultCheck: false},
                                    {action: "delete", describe: "删除", defaultCheck: false}
                                ],
                                permissionId: "comment",
                                permissionName: "评论管理",
                                roleId: "admin"
                            },
                            {
                                actionEntitySet: [
                                    {action: "add", describe: "新增", defaultCheck: false},
                                    {action: "get", describe: "详情", defaultCheck: false},
                                    {action: "update", describe: "修改", defaultCheck: false},
                                    {action: "delete", describe: "删除", defaultCheck: false}
                                ],
                                permissionId: "role",
                                permissionName: "角色管理",
                                roleId: "admin"
                            },
                            {
                                actionEntitySet: [
                                    {action: "add", describe: "新增", defaultCheck: false},
                                    {action: "import", describe: "导入", defaultCheck: false},
                                    {action: "get", describe: "详情", defaultCheck: false},
                                    {action: "update", describe: "修改", defaultCheck: false},
                                    {action: "delete", describe: "删除", defaultCheck: false},
                                    {action: "export", describe: "导出", defaultCheck: false}
                                ],
                                permissionId: "user",
                                permissionName: "用户管理",
                                roleId: "admin"
                            }
                        ]
                    }
                ]
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: '正常',
                    0: '禁用'
                };
                return statusMap[status]
            }
        },
        methods: {
            //重新加载表格数据
            handleOk() {

            }
        }
    }
</script>

<style scoped>

</style>