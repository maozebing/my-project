<template>
    <div class="main">
        <a-form
                id="formLogin"
                class="user-layout-login"
                ref="formLogin"
                :form="form"
                @submit="handleSubmit"
        >
            <a-form-item>
                <a-input
                        size="large"
                        type="text"
                        placeholder="帐户名或邮箱地址 / admin"
                        v-decorator="[
                'code',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
                >
                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
            </a-form-item>

            <a-form-item>
                <a-input
                        size="large"
                        type="password"
                        autocomplete="false"
                        placeholder="密码 / admin"
                        v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
                >
                    <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
            </a-form-item>

            <a-form-item style="margin-top:24px">
                <a-button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        class="login-button"
                        :loading="loginBtn"
                        :disabled="loginBtn"
                >确定
                </a-button>
            </a-form-item>

        </a-form>

    </div>
</template>

<script>
    import {api_login} from "../../api/permission_api";
    import {timeFix} from "../../utils/util";

    export default {
        components: {},
        data() {
            return {
                form: this.$form.createForm(this),
                loginBtn: false,
                loginType: 0
            }
        },
        methods: {
            // handler
            handleUsernameOrEmail(rule, value, callback) {
                const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
                if (regex.test(value)) {
                    this.loginType = 0
                } else {
                    this.loginType = 1
                }
                callback()
            },
            handleSubmit(e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }

                    api_login({
                        code: values.code,
                        password: values.password
                    }).then(res => {
                        this.loginSuccess(res.data)
                    }).catch(err => {
                        this.loginFailed(err)
                    });

                });
            },
            loginSuccess(data) {
                sessionStorage.setItem("token", data.token);
                this.$router.push({name: 'dashboard'});
                // 延迟 1 秒显示欢迎信息
                setTimeout(() => {
                    this.$notification.success({
                        message: '欢迎',
                        description: `${timeFix()}，欢迎回来`
                    })
                }, 1000)
            },
            loginFailed(err) {
                this.$notification['error']({
                    message: '错误',
                    description: err.response.data,
                    duration: 4
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .user-layout-login {
        label {
            font-size: 14px;
        }

        .getCaptcha {
            display: block;
            width: 100%;
            height: 40px;
        }

        .forge-password {
            font-size: 14px;
        }

        button.login-button {
            padding: 0 15px;
            font-size: 16px;
            height: 40px;
            width: 100%;
        }

        .user-login-other {
            text-align: left;
            margin-top: 24px;
            line-height: 22px;

            .item-icon {
                font-size: 24px;
                color: rgba(0, 0, 0, 0.2);
                margin-left: 16px;
                vertical-align: middle;
                cursor: pointer;
                transition: color 0.3s;

                &:hover {
                    color: #1890ff;
                }
            }

            .register {
                float: right;
            }
        }
    }
</style>
