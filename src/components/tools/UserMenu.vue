<template>
    <div class="user-wrapper">
        <header-notice class="action"></header-notice>
        <a-dropdown>
            <span class="action ant-dropdown-link user-dropdown-menu">
                <a-avatar size="small" :src="avatar()"/>
            <span> {{nickname()}}</span>
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
    import {mapGetters} from 'vuex'

    export default {
        name: 'UserMenu',
        components: {
            HeaderNotice
        },
        methods: {
            ...mapGetters(['nickname', 'avatar']),
            handleLogout() {
                let _this = this;
                this.$confirm({
                    title: '提示',
                    content: '真的要注销登录吗 ?',
                    onOk() {
                        _this.$router.push({name: "login"})
                    },
                    onCancel() {
                    }
                })
            }
        }
    }
</script>
<style scoped>

</style>
