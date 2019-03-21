<template>
    <page-layout :avatar="avatar">
        <div slot="headerContent">
            <div class="title">早上好，一杯闲<span class="welcome-text">，欢迎来到工作台</span></div>
            <div>前端工程师 | 蚂蚁金服 - 某某某事业群 - VUE平台</div>
        </div>
        <div slot="extra">
            <a-row class="more-info">
                <a-col :span="8">
                    <head-info title="项目数" content="56" :center="false" :bordered="false"/>
                </a-col>
                <a-col :span="8">
                    <head-info title="团队排名" content="8/24" :center="false" :bordered="false"/>
                </a-col>
                <a-col :span="8">
                    <head-info title="项目访问" content="2,223" :center="false"/>
                </a-col>
            </a-row>
        </div>

        <div>
            <a-row :gutter="24">
                <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
                    <a-card
                            class="project-list"
                            :loading="loading"
                            :bordered="false"
                            title="进行中的项目"
                            :body-style="{ padding: 0 }">
                        <a slot="extra">全部项目</a>
                        <div>
                            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                                <a-card :bordered="false" :body-style="{ padding: 0 }">
                                    <a-card-meta>
                                        <div slot="title" class="card-title">
                                            <a-avatar size="small" :src="item.cover"/>
                                            <a>{{ item.title }}</a>
                                        </div>
                                        <div slot="description" class="card-description">
                                            {{ item.description }}
                                        </div>
                                    </a-card-meta>
                                    <div class="project-item">
                                        <a href="/#/">科学搬砖组</a>
                                        <span class="datetime">9小时前</span>
                                    </div>
                                </a-card>
                            </a-card-grid>
                        </div>
                    </a-card>

                    <a-card :loading="loading" title="动态" :bordered="false" class="activity-list">
                        <a-list>
                            <a-list-item :key="index" v-for="(item, index) in activities">
                                <a-list-item-meta>
                                    <a-avatar slot="avatar" :src="item.user.avatar"/>
                                    <div slot="title">
                                        <span>{{ item.user.nickname }}</span>&nbsp;
                                        在&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                                        <span>{{ item.project.action }}</span>&nbsp;
                                        <a href="#">{{ item.project.event }}</a>
                                    </div>
                                    <div slot="description">{{ item.time }}</div>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </a-card>
                </a-col>
                <a-col
                        style="padding: 0 12px"
                        :xl="8"
                        :lg="24"
                        :md="24"
                        :sm="24"
                        :xs="24">
                    <a-card title="快速开始 / 便捷导航" :bordered="false"
                            :body-style="{padding: 0}"
                            class="shortcut-entry">
                        <div class="item-group">
                            <a>操作一</a>
                            <a>操作二</a>
                            <a>操作三</a>
                            <a>操作四</a>
                            <a>操作五</a>
                            <a>操作六</a>
                            <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
                        </div>
                    </a-card>
                    <a-card title="XX 指数"  :bordered="false"
                            :body-style="{ padding: 0 }"
                            class="work-index">
                        <div style="min-height: 400px;">
                            <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
                            <radar :data="radarData"/>
                        </div>
                    </a-card>
                    <a-card :loading="loading" title="团队" :bordered="false" class="team">
                        <div class="members">
                            <a-row>
                                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                                    <a>
                                        <a-avatar size="small" :src="item.avatar"/>
                                        <span class="member">{{ item.name }}</span>
                                    </a>
                                </a-col>
                            </a-row>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </page-layout>
</template>

<script>
    import PageLayout from '@/components/page/PageLayout'
    import HeadInfo from '@/components/tools/HeadInfo'

    export default {
        name: 'Workplace',
        components: {
            PageLayout, HeadInfo
        },
        data() {
            return {
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                projects: [],
                loading: true,
                activities: [],
                teams: [],
                reader: [
                    {item: "引用", 个人: 70, 团队: 30, 部门: 40},
                    {item: "口碑", 个人: 60, 团队: 70, 部门: 40},
                    {item: "产量", 个人: 50, 团队: 60, 部门: 40},
                    {item: "贡献", 个人: 40, 团队: 50, 部门: 40},
                    {item: "热度", 个人: 60, 团队: 70, 部门: 40},
                    {item: "引用", 个人: 70, 团队: 50, 部门: 40}
                ],
                radarData:[]
            }
        },
        methods: {
            getProjects() {
                this.projects = [
                    {
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                        title: 'Alipay',
                        description: '那是一种内在的东西， 他们到达不了，也无法触及的'
                    },
                    {
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
                        title: 'Alipay',
                        description: '那是一种内在的东西， 他们到达不了，也无法触及的'
                    },
                    {
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                        title: 'Alipay',
                        description: '那是一种内在的东西， 他们到达不了，也无法触及的'
                    },
                    {
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                        title: 'Alipay',
                        description: '那是一种内在的东西， 他们到达不了，也无法触及的'
                    },
                    {
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                        title: 'Alipay',
                        description: '那是一种内在的东西， 他们到达不了，也无法触及的'
                    },
                    {
                        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                        title: 'Alipay',
                        description: '那是一种内在的东西， 他们到达不了，也无法触及的'
                    }
                ];
                this.loading = false;
            },
            getActivity() {
                this.activities = [
                    {
                        id: 1,
                        project: {name: "白鹭酱油开发组", action: "更新", event: "番组计划"},
                        time: "2018-08-23 14:47:00",
                        user: {
                            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
                            nickname: "Jason Williams"
                        }
                    },
                    {
                        id: 2,
                        project: {name: "白鹭酱油开发组", action: "更新", event: "番组计划"},
                        time: "2018-08-23 09:35:37",
                        user: {
                            nickname: "蓝莓酱",
                            avatar: "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png"
                        }
                    },
                    {
                        id: 3,
                        project: {name: "白鹭酱油开发组", action: "创建", event: "番组计划"},
                        time: "2017-05-27 00:00:00",
                        user: {nickname: "Donna Davis", avatar: "http://dummyimage.com/64x64"}
                    },
                    {
                        id: 4,
                        project: {name: "高逼格设计天团", action: "更新", event: "六月迭代"},
                        time: "2018-08-23 14:47:00",
                        user: {nickname: "曲丽丽", avatar: "http://dummyimage.com/64x64"}
                    },
                    {
                        id: 5,
                        project: {name: "高逼格设计天团", action: "created", event: "六月迭代"},
                        time: "2018-08-23 14:47:00",
                        user: {nickname: "Elizabeth Thompson", avatar: "http://dummyimage.com/64x64"}
                    },
                    {
                        id: 6,
                        project: {name: "高逼格设计天团", action: "created", event: "六月迭代"},
                        time: "2018-08-23 14:47:00",
                        user: {
                            nickname: "曲丽丽",
                            avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                        }
                    }
                ];
            },
            getTeams() {
                this.teams = [
                    {
                        id: 1,
                        name: "科学搬砖组",
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    },
                    {
                        id: 2,
                        name: "程序员日常",
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png"
                    },
                    {
                        id: 3,
                        name: "设计天团",
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png"
                    },
                    {
                        id: 4,
                        name: "中二少女团",
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png"
                    },
                    {
                        id: 5,
                        name: "骗你学计算机",
                        avatar: "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png"
                    }
                ]
            }
        },
        mounted() {
            this.getProjects()
            this.getActivity()
            this.getTeams()
        },
    }
</script>

<style lang="less" scoped>
    .project-list {
        margin-bottom: 24px;
        text-align: left;

        .card-title {
            font-size: 0;

            a {
                color: rgba(0, 0, 0, 0.85);
                margin-left: 12px;
                line-height: 24px;
                height: 24px;
                display: inline-block;
                vertical-align: top;
                font-size: 14px;

                &:hover {
                    color: #1890ff;
                }
            }
        }

        .card-description {
            color: rgba(0, 0, 0, 0.45);
            height: 44px;
            line-height: 22px;
            overflow: hidden;
        }

        .project-item {
            display: flex;
            margin-top: 8px;
            overflow: hidden;
            font-size: 12px;
            height: 20px;
            line-height: 20px;

            a {
                color: rgba(0, 0, 0, 0.45);
                display: inline-block;
                flex: 1 1 0;

                &:hover {
                    color: #1890ff;
                }
            }

            .datetime {
                color: rgba(0, 0, 0, 0.25);
                flex: 0 0 auto;
                float: right;
            }
        }

        .ant-card-meta-description {
            color: rgba(0, 0, 0, 0.45);
            height: 44px;
            line-height: 22px;
            overflow: hidden;
        }
    }

    .activity-list {
        text-align: left;
    }

    .shortcut-entry {
        margin-bottom: 24px;
        text-align: left;
    }

    .work-index {
        margin-bottom: 24px;
        text-align: left;
    }

    .team {
        text-align: left;
    }

    .item-group {
        padding: 20px 0 8px 24px;
        font-size: 0;

        a {
            color: rgba(0, 0, 0, 0.65);
            display: inline-block;
            font-size: 14px;
            margin-bottom: 13px;
            width: 25%;
        }
    }

    .members {
        a {
            display: block;
            margin: 12px 0;
            line-height: 24px;
            height: 24px;

            .member {
                font-size: 14px;
                color: rgba(0, 0, 0, .65);
                line-height: 24px;
                max-width: 100px;
                vertical-align: top;
                margin-left: 12px;
                transition: all 0.3s;
                display: inline-block;
            }

            &:hover {
                span {
                    color: #1890ff;
                }
            }
        }
    }

    .mobile {

        .project-list {

            .project-card-grid {
                width: 100%;
            }
        }

        .more-info {
            border: 0;
            padding-top: 16px;
            margin: 16px 0 16px;
        }

        .headerContent .title .welcome-text {
            display: none;
        }
    }

</style>
