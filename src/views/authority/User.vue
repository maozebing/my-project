<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper" style="text-align: right">
            <a-form layout="inline">
                <a-form-item>
                    <a-button type="primary" @click="$refs.modal.add()">新增</a-button>
                </a-form-item>
            </a-form>
        </div>

        <a-table ref="table" :columns="columns" :dataSource="tableData" :loading="loading"
                 :rowKey="record => record.id">
            <span slot="roles" slot-scope="text, record">
                <a-tag color="cyan" v-for="(action, index) in record.roles" :key="index">{{ action.name }}</a-tag>
            </span>

            <span slot="status" slot-scope="text"><a-badge status="success"/>{{ text | statusFilter }}</span>

            <span slot="action" slot-scope="text, record">
                <a @click="$refs.modal.edit(record)">编辑</a>
            </span>
        </a-table>

        <user-modal ref="modal" @ok="handleOk"></user-modal>
    </a-card>
</template>

<script>
    import UserModal from './modal/UserModal'
    import {api_listUser} from "../../api/user_api";

    export default {
        name: "User",
        components: {UserModal},
        data() {
            return {
                columns: [
                    {
                        title: '用户名称',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: '唯一识别码',
                        dataIndex: 'code',
                        key: 'code'
                    },
                    {
                        title: '角色',
                        dataIndex: 'roles',
                        key: 'roles',
                        scopedSlots: {customRender: 'roles'}
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
                        id: '001',
                        name: '一杯闲',
                        status: 1,
                        roles: [
                            {id: "admin", describe: "管理员", defaultCheck: false}
                        ]
                    },
                    {
                        key: '2',
                        id: '002',
                        name: '半生愁',
                        status: 1,
                        roles: [
                            {id: "user", describe: "普通员工", defaultCheck: false}
                        ]
                    },
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

            },
            listUser() {
                this.loading = true;
                api_listUser({}).then(res => {
                    this.tableData = res.data;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            }
        },
        mounted() {
            this.listUser()
        }
    }
</script>

<style scoped>

</style>