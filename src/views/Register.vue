<template>
  <div>
    <div class="d-flex align-items-center ResBg" style="height: 100vh">
      <div class="col-4 offset-4 border shadow-sm bg-white rounded p-4">
        <h2 class="mb-3">Register</h2>
        <div class="text-start">
          <div class="">
            <label>Name</label>
            <input v-model="userData.name" type="text" class="form-control" />
            <small v-if="validation.name" class="text-danger"
              >Name field must be fill</small
            >
          </div>
          <div class="my-3">
            <label>Email</label>
            <input type="email" v-model="userData.email" class="form-control" />
            <small v-if="validation.email" class="text-danger"
              >Email field must be fill</small
            >
          </div>
          <div class="">
            <label>Address</label>
            <input
              type="text"
              v-model="userData.address"
              class="form-control"
            />
            <small v-if="validation.address" class="text-danger"
              >Address field must be fill</small
            >
          </div>
          <div class="my-3">
            <input
              type="radio"
              v-model="userData.gender"
              value="male"
              name="gender"
              class="me-1"
            />
            <label>Male</label>
            <input
              type="radio"
              v-model="userData.gender"
              value="female"
              name="gender"
              class="ms-3 me-1"
            />
            <label>Female</label>
            <small v-if="validation.gender" class="text-danger d-block"
              >Gender field must be fill</small
            >
          </div>
          <div class="">
            <label>Password</label>
            <input
              type="password"
              v-model="userData.password"
              class="form-control"
            />
            <small v-if="validation.password" class="text-danger"
              >Password field must be fill</small
            >
          </div>
          <div class="my-3">
            <label>Confirm Password</label>
            <input
              type="password"
              v-model="userData.confirmPassword"
              class="form-control"
            />
            <small v-if="validation.confirmPassword" class="text-danger"
              >Confirm Password field must be fill</small
            >
            <small v-if="validation.samePassword" class="text-danger"
              >Confirm Password and Password field must be fill</small
            >
          </div>
          <div class="text-center">
            <button
              type="submit"
              @click="registerBtn"
              class="btn btn-primary col-12"
            >
              Register
            </button>
          </div>
          <div class="register-link text-center mt-3">
            <p>
              Already have account?
              <a href="/login" class="nav-link text-danger d-inline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "registerPage",
  data() {
    return {
      userData: {
        name: "",
        email: "",
        address: "",
        gender: "",
        password: "",
        confirmPassword: "",
      },
      validation: {
        name: false,
        email: false,
        address: false,
        gender: false,
        password: false,
        confirmPassword: false,
        samePassword: false,
      },
    };
  },
  methods: {
    validationRule() {
      if (!this.userData.name) {
        this.validation.name = true;
      } else {
        this.validation.name = false;
      }
      if (!this.userData.email) {
        this.validation.email = true;
      } else {
        this.validation.email = false;
      }
      if (!this.userData.address) {
        this.validation.address = true;
      } else {
        this.validation.address = false;
      }
      if (!this.userData.gender) {
        this.validation.gender = true;
      } else {
        this.validation.gender = false;
      }
      if (!this.userData.password) {
        this.validation.password = true;
      } else {
        this.validation.password = false;
      }
      if (!this.userData.confirmPassword) {
        this.validation.confirmPassword = true;
      } else {
        this.validation.confirmPassword = false;
      }
      if (this.userData.confirmPassword != this.userData.password) {
        this.validation.samePassword = true;
      } else {
        this.validation.samePassword = false;
      }
    },
    registerBtn() {
      this.validationRule();
      if (Object.values(this.validation).every((check) => !check)) {
        axios
          .post("http://localhost:8000/api/register", this.userData)
          .then((response) => {
            localStorage.setItem("AuthUseId", response.data.user.id);
            window.location.href = "/";
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
