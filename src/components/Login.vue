<template >
    <div class="login-container-wrapper">
        <el-row :gutter="20">
            <el-col :span="24">
                <h2>Log In</h2>
            </el-col>
            <el-col :span="24">
                <el-col :span="20">
                    <el-form
                        :model="loginForm"
                        :rules="rules"
                        ref="loginForm"
                        label-width="120px"
                        class="logit-form"
                    >
                        <el-form-item label="Email" prop="email">
                            <el-input
                                placeholder="Please input"
                                v-model="loginForm.email"
                                clearable
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input
                                placeholder="Please input password"
                                v-model="loginForm.password"
                                show-password
                            ></el-input>
                        </el-form-item>
                        <h5 class="sing-up-error-message" v-if="errorMessage">{{errorMessage}}</h5>
                    </el-form>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="login-form-buttons">
            <el-col :span="12">
                <el-button
                    plain
                    size="small"
                    class="login-btn"
                    :disabled="isDisabled"
                    @click="submitForm"
                >Log In</el-button>

                <router-link to="./singUp" tag="p" class="login-create-account-btn">Create Account</router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import firebase from "firebase";
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                email: "",
                password: ""
            },
            rules: {
                email: [{ required: true, message: "Email is required" }],
                password: [{ required: true, message: "Password is required" }]
            },
            errorMessage: ""
        };
    },
    methods: {
        submitForm() {
            this.$refs["loginForm"].validate(valid => {
                if (valid) {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(
                            this.loginForm.email,
                            this.loginForm.password
                        )
                        .then(({ user }) => {
                            this.$store.commit("setUser", user);
                            this.$router.push("/");
                        })
                        .catch(error => {
                            this.errorMessage = error.message;
                        });
                } else {
                    return false;
                }
            });
        }
    },
    computed: {
        isDisabled() {
            return this.loginForm.email && this.loginForm.password
                ? false
                : true;
        }
    }
};
</script>