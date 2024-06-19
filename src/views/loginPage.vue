<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-start ResBg"
      style="height: 100vh"
    >
      <div class="col-4 offset-4 rounded shadow-sm bg-white p-4">
        <h3 class="mb-5">Login to ShopMM</h3>
        <div class="text-start mt-5">
          <label for="">Email</label>
          <input type="text" v-model="userData.email" class="form-control" />
          <small class="text-danger" v-if="validation.email"
            >Email field must be fill</small
          >
          <small class="text-danger" v-if="checkUser">{{ checkUser }}</small>
        </div>
        <div class="text-start my-3">
          <label for="" class="">Password</label>
          <input
            type="password"
            v-model="userData.password"
            class="form-control"
          />
          <small v-if="validation.password" class="text-danger"
            >Password field must be fill</small
          >
        </div>
        <div class="">
          <button
            type="submit"
            @click="login()"
            class="btn btn-primary mt-3 col-12"
          >
            Login
          </button>
        </div>
        <div class="register-link mt-3">
          <p>
            Don't you have account?
            <a href="/register" class="nav-link text-danger d-inline"
              >Sign Up Here</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "loginPage",
  data() {
    return {
      validation: {
        email: false,
        password: false,
      },
      userData: {
        email: "",
        password: "",
      },
      user: "",
      checkUser: "",
    };
  },
  methods: {
    validationRule() {
      if (!this.userData.email) {
        this.validation.email = true;
      } else {
        this.validation.email = false;
      }
      if (!this.userData.password) {
        this.validation.password = true;
      } else {
        this.validation.password = false;
      }
    },
    login() {
      this.validationRule();
      if (Object.values(this.validation).every((check) => !check)) {
        axios
          .post("http://localhost:8000/api/login", this.userData)
          .then((response) => {
            if (response.data.token != null) {
              localStorage.setItem("AuthUseId", response.data.user.id);
              window.location.href = "/";
            } else {
              this.checkUser = response.data.failed;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.ResBg {
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
