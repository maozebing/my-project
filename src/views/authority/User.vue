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
            <span slot="roles" slot-scope="text, record">
                <a-tag color="cyan" v-for="(action, index) in record.roles" :key="index">{{ action.describe }}</a-tag>
            </span>

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
        name: "User",
        components: {MenuModal},
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
                        dataIndex: 'id',
                        key: 'id'
                    },
                    {
                        title: '角色',
                        dataIndex: 'roles',
                        key: 'roles',
                        scopedSlots: {customRender: 'roles'}
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