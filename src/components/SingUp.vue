<template >
    <div class="login-container-wrapper">
        <el-row :gutter="20">
            <el-col :span="24">
                <h2>SingUp</h2>
            </el-col>
            <el-col :span="24">
                <el-col :span="20">
                    <el-form
                        :model="singUpForm"
                        :rules="rules"
                        ref="singUpForm"
                        label-width="120px"
                        class="logit-form"
                    >
                        <el-form-item label="NickName" prop="nickName">
                            <el-input
                                placeholder="Please your nick"
                                v-model="singUpForm.nickName"
                                clearable
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Email">
                            <el-input
                                placeholder="Please email"
                                v-model="singUpForm.email"
                                clearable
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Password">
                            <el-input
                                placeholder="Please input password"
                                v-model="singUpForm.password"
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
                    type="success"
                    plain
                    round
                    size="small"
                    :disabled="isDisabled"
                    @click="submitForm"
                >SingUp</el-button>
                <router-link to="./login">
                    <el-button type="primary" plain round size="small">Cancel</el-button>
                </router-link>
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
            singUpForm: {
                email: "",
                password: "",
                nickName: ""
            },
            rules: {
                email: [{ required: true, message: "Email is required" }],
                password: [{ required: true, message: "Password is required" }],
                nickName: [{ required: true, message: "NickName is required" }]
            },
            errorMessage: "",
            finishedRegistate: false
        };
    },
    methods: {
        submitForm() {
            this.errorMessage = "";
            this.$refs["singUpForm"].validate(valid => {
                if (valid) {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            this.singUpForm.email,
                            this.singUpForm.password
                        )
                        .then(({ user }) => {
                            if (user) {
                                user.updateProfile({
                                    displayName: this.singUpForm.nickName
                                });
                                this.$router.push("/login");
                            }
                        })
                        .catch(error => {
                            this.errorMessage = error;
                            throw new Error(error);
                        });
                    return true;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
    computed: {
        isDisabled() {
            return this.singUpForm.email && this.singUpForm.password
                ? false
                : true;
        }
    }
};
</script>