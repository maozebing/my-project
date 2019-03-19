<template>
    <a-layout class="layout">
        <a-layout-sider
                :trigger="null"
                collapsible
                v-model="collapsed"
                width="256px"
        >
            <div class="logo">
                <LogoSvg alt="logo"/>
                <h1>Ant Template</h1>
            </div>
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" style="padding: 16px 0px;">
                <a-menu-item key="1">
                    <a-icon type="user"/>
                    <span>nav 1</span>
                </a-menu-item>
                <a-sub-menu
                        key="sub1"
                >
                    <span slot="title"><a-icon type="user"/><span>User</span></span>
                    <a-menu-item key="3">Tom</a-menu-item>
                    <a-menu-item key="4">Bill</a-menu-item>
                    <a-menu-item key="5">Alex</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="2">
                    <a-icon type="video-camera"/>
                    <span>nav 2</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-icon type="upload"/>
                    <span>nav 3</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <div class="header">
                    <a-icon
                            class="trigger"
                            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                            @click="()=> collapsed = !collapsed"
                    />
                    <user-menu></user-menu>
                </div>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                Content
            </a-layout-content>
            <a-layout-footer style="textAlign: center">
                Ant Design Admin ©2019 Created by mzb
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
    import LogoSvg from '@/assets/logo.svg?inline'
    import UserMenu from '../components/UserMenu'

    export default {
        components: {
            LogoSvg,
            UserMenu
        },
        data() {
            return {
                collapsed: false,
            }
        },
    }
</script>
<style>
    .layout {
        height: 100%;
        text-align: left;
    }

    .layout .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
    }

    .layout .trigger:hover {
        color: #1890ff;
    }

    .layout .logo {
        height: 64px;
        position: relative;
        line-height: 64px;
        padding-left: 24px;
        -webkit-transition: all .3s;
        transition: all .3s;
        background: #002140;
        overflow: hidden;
    }

    .layout .logo h1 {
        color: #fff;
        font-size: 20px;
        margin: 0 0 0 12px;
        font-family: Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        font-weight: 600;

    }

    .layout .logo h1, .layout .logo img, .logo svg {
        display: inline-block;
        vertical-align: middle;
    }

    .layout .logo img, .layout .logo svg {
        height: 32px;
        width: 32px;
    }

    .layout.ant-layout .header {
        height: 64px;
        padding: 0 12px 0 0;
        background: #fff;
        -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        position: relative;
    }
</style>
