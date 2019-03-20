<template>
    <div :style="'margin: -24px -24px 0px;'">
        <page-header :avatar="avatar">
            <slot slot="content" name="headerContent"></slot>
            <slot slot="extra" name="extra"></slot>
        </page-header>
        <div class="content">
            <div :class="['page-header-index-wide']">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import PageHeader from './PageHeader'

    export default {
        name: "PageLayout",
        components: {
            PageHeader
        },
        props: {
            avatar: {
                type: String,
                default: null
            }
        },
    }
</script>

<style lang="less" scoped>
    .content {
        margin: 24px 24px 0;

        .link {
            margin-top: 16px;

            &:not(:empty) {
                margin-bottom: 16px;
            }

            a {
                margin-right: 32px;
                height: 24px;
                line-height: 24px;
                display: inline-block;

                i {
                    font-size: 24px;
                    margin-right: 8px;
                    vertical-align: middle;
                }

                span {
                    height: 24px;
                    line-height: 24px;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }

    .page-menu-search {
        text-align: center;
        margin-bottom: 16px;
    }

    .page-menu-tabs {
        margin-top: 48px;
    }
</style>