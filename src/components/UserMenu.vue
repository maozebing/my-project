<template>
    <div class="user-wrapper">
        <header-notice class="action"></header-notice>
        <a-dropdown>
            <span class="action ant-dropdown-link user-dropdown-menu">
                <a-avatar icon="user" size="small"/>
            <span> 一杯闲</span>
            </span>
                <a-menu slot="overlay" class="user-dropdown-menu-wrapper" placement="bottomRight">
                <a-menu-item key="0">
                    <router-link :to="{ name: 'center' }">
                        <a-icon type="user"/>
                        <span>个人中心</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="1">
                    <router-link :to="{ name: 'settings' }">
                        <a-icon type="setting"/>
                        <span>账户设置</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="2" disabled>
                    <a-icon type="setting"/>
                    <span>测试</span>
                </a-menu-item>
                <a-menu-divider/>
                <a-menu-item key="3">
                    <a href="javascript:;" @click="handleLogout">
                        <a-icon type="logout"/>
                        <span>退出登录</span>
                    </a>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </div>
</template>

<script>
    import HeaderNotice from './HeaderNotice'
    export default {
        name: 'UserMenu',
        components: {
            HeaderNotice
        },
        methods: {
            handleLogout() {
                this.$confirm({
                    title: '提示',
                    content: '真的要注销登录吗 ?',
                    onOk() {
                        window.location.reload()
                    },
                    onCancel() {
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .user-wrapper {
        float: right;
        height: 100%;
    }

    .user-wrapper .action:hover {
        background: rgba(0, 0, 0, .025);
    }

    .user-wrapper .action {
        cursor: pointer;
        padding: 0 12px;
        display: inline-block;
        -webkit-transition: all .3s;
        transition: all .3s;
        height: 100%;
        color: rgba(0, 0, 0, .65);
    }
    .user-dropdown-menu-wrapper.ant-dropdown-menu .ant-dropdown-menu-item {
        width: 160px;
    }
</style>
