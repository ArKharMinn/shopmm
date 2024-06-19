<template>
  <nav class="py-3 navbar-expand-lg sticky-top bg-primary text-white">
    <div class="d-flex justify-content-between align-items-center mx-3">
      <a class="navbar-brand text-white fw-bold" href="#">
        <h3>ShopMM</h3>
      </a>
      <div class="d-flex align-items-center">
        <a
          href="#"
          v-if="darkTheme"
          @click="darkMode"
          class="nav-link fw-semibold mx-4"
        >
          <h4><i class="fa-regular fa-moon fs-5 fw-bold"></i></h4>
        </a>
        <a
          href="#"
          v-if="lightTheme"
          @click="lightMode"
          class="nav-link fw-semibold mx-4"
        >
          <h4><i class="fa-regular fa-sun fs-5 fw-bold"></i></h4>
        </a>
        <a
          href="/login"
          v-if="!user && userId == null"
          class="btn text-dark"
          style="background-color: white"
          >Login</a
        >
        <a href="#" @click="logout" v-if="user && userId" class="btn btn-danger"
          >Logout</a
        >
      </div>
    </div>
  </nav>
  <div :class="{ 'bg-dark': lightTheme }">
    <router-view />
  </div>
  <div class="container-fluid bg-dark text-secondary pt-5">
    <div class="row px-xl-5 pt-5">
      <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
        <h5 class="text-secondary text-uppercase mb-4">Get In Touch</h5>
        <p class="mb-4">
          No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et
          dolor sed dolor. Rebum tempor no vero est magna amet no
        </p>
        <p class="mb-2">
          <i class="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New
          York, USA
        </p>
        <p class="mb-2">
          <i class="fa fa-envelope text-primary mr-3"></i>info@example.com
        </p>
        <p class="mb-0">
          <i class="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
        </p>
      </div>
      <div class="col-lg-8 col-md-12">
        <div class="row">
          <div class="col-md-4 mb-5">
            <h5 class="text-secondary text-uppercase mb-4">Quick Shop</h5>
            <div class="d-flex flex-column justify-content-start">
              <a class="text-secondary mb-2 nav-link" href="/"
                ><i class="fa fa-angle-right mr-2"></i>Home</a
              >
              <a class="text-secondary mb-2 nav-link" href="/about"
                ><i class="fa fa-angle-right mr-2"></i>About</a
              >
              <a class="text-secondary nav-link" href="#" @click="chatBoxBtn"
                ><i class="fa fa-angle-right mr-2"></i>Contact Us</a
              >
            </div>
          </div>
          <div class="col-md-4 mb-5">
            <h5 class="text-secondary text-uppercase mb-4">Payment Methods</h5>
            <div class="d-flex justify-content-center">
              <img src="./assets/cod.png" class="col-1" />
              <img src="./assets/kpay.png" class="col-1 rounded mx-2" />
              <img src="./assets/wave.png" class="col-1 rounded" />
              <img src="./assets/visa.png" class="col-1 mx-2" />
            </div>
          </div>
          <div class="col-md-4 mb-5">
            <h5 class="text-secondary text-uppercase mb-4">Follow Us</h5>
            <div class="d-flex justify-content-center">
              <a class="btn btn-primary btn-square mx-2" href="#"
                ><i class="fab fa-twitter"></i
              ></a>
              <a class="btn btn-primary btn-square mr-2" href="#"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a class="btn btn-primary btn-square mx-2" href="#"
                ><i class="fab fa-linkedin-in"></i
              ></a>
              <a class="btn btn-primary btn-square" href="#"
                ><i class="fab fa-instagram"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="row border-top mx-xl-5 py-4"
      style="border-color: rgba(256, 256, 256, 0.1) !important"
    >
      <div class="col-md-6 px-xl-0">
        <p class="mb-md-0 text-center text-md-left text-secondary">
          &copy; <a class="text-primary" href="#">Domain</a>. All Rights
          Reserved. Designed by
          <a class="text-primary" href="">HTML Codex</a>
        </p>
      </div>
      <div class="col-md-6 px-xl-0 text-center text-md-right">
        <img class="img-fluid" src="" alt="" />
      </div>
    </div>
  </div>
  <div
    @click="chatBoxBtn"
    class="btn btn-primary btn-lg position-fixed shadow-lg bottom-0 end-0 m-4"
  >
    <i class="fa-solid fa-message me-2"></i>Chat
  </div>
  <div
    v-if="chatBox"
    class="position-fixed container shadow-lg rounded border bottom-0 end-0 m-4 bg-light"
    style="width: 60%; height: 80%; z-index: 10000"
  >
    <div class="row col-12">
      <div class="col-4 p-2 d-flex">
        <div class="">
          <div class="">
            <h4 class="">Chats</h4>
            <input
              type="text"
              class="form-control"
              placeholder="Search Name......"
              @keyup.enter="searchChat"
              v-model="searchUserName"
            />
          </div>
          <div class="mt-3" v-if="chatAdmin.length != 0">
            <div class="" v-for="(chatUser, index) in chatAdmin" :key="index">
              <div
                class="py-1 text-start px-2"
                :class="{
                  'bg-primary rounded shadow-sm text-white':
                    chatUser.id == toUserId,
                }"
                @click="startChat(chatUser.id)"
              >
                {{ chatUser.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="">Messages</h4>
          <h4 class="btn" @click="closeChatBoxBtn">
            <i class="fa-solid fa-xmark"></i>
          </h4>
        </div>
        <div class="" v-if="toUserId != ''">
          <div class="" style="height: calc(520px); overflow-y: auto">
            <div
              class=""
              v-for="(getMessageText, index) in getMessage"
              :key="index"
            >
              <div
                class="d-flex justify-content-end"
                v-if="getMessageText.to_userId == toUserId"
              >
                <div
                  class="bg-primary rounded text-end d-inline-block text-white px-3 py-2 my-2"
                >
                  {{ getMessageText.message }}
                </div>
              </div>
              <div class="d-flex justify-content-start">
                <div
                  class="bg-secondary rounded text-start d-inline-block text-white px-3 py-2 my-2"
                  v-if="getMessageText.to_userId == user.id"
                >
                  {{ getMessageText.message }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <textarea
              cols="30"
              rows="4"
              v-model="message"
              placeholder="Text Message Here"
              class="form-control col-8"
            ></textarea>
            <div class="col-1 ms-1" title="send" @click="sendBtn">
              <i
                class="fa-solid bg-primary fa-paper-plane p-3 rounded-circle text-white"
                :class="{
                  'bg-secondary ': message == '',
                  disabled: message == '',
                }"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "app",
  data() {
    return {
      darkTheme: false,
      lightTheme: false,
      user: "",
      chatBox: false,
      chatAdmin: [],
      searchUserName: "",
      message: "",
      getMessage: [],
      toUserId: "",
      userId: localStorage.getItem("AuthUseId"),
    };
  },
  methods: {
    getAuthUser() {
      if (this.userId !== null) {
        axios
          .post("http://localhost:8000/api/user", { id: this.userId })
          .then((response) => {
            this.user = response.data.authUser;
          });
      }
    },
    chatUserList() {
      axios.get("http://localhost:8000/api/chatUserList").then((response) => {
        this.chatAdmin = response.data.user;
      });
    },
    sendBtn() {
      if (this.message != "") {
        axios
          .post("http://localhost:8000/api/sendMessage", {
            message: this.message,
            from_userId: this.userId,
            to_userId: this.toUserId,
          })
          .then((response) => {
            this.getMessage = response.data.message;
            this.message = "";
          });
      }
    },
    startChat(id: number) {
      axios
        .post("http://localhost:8000/api/getMessage", {
          id,
          form_userId: this.userId,
        })
        .then((response) => {
          this.getMessage = response.data.message;
          this.toUserId = id.toString();
        });
    },
    searchChat() {
      axios
        .post("http://localhost:8000/api/searchUserName", {
          name: this.searchUserName,
        })
        .then((response) => {
          this.chatAdmin = response.data.user;
        });
    },
    chatBoxBtn() {
      if (this.userId != null) {
        if (this.chatBox) {
          this.chatBox = false;
        } else {
          this.chatBox = true;
        }
      } else if (this.userId == null) {
        this.$router.push("/login");
      }
    },
    closeChatBoxBtn() {
      this.chatBox = false;
    },
    darkMode() {
      this.lightTheme = true;
      this.darkTheme = false;
      localStorage.setItem("mode", "true");
    },
    lightMode() {
      this.lightTheme = false;
      this.darkTheme = true;
      localStorage.removeItem("mode");
    },
    logout() {
      localStorage.removeItem("AuthUseId");
      window.location.reload();
    },
  },
  mounted() {
    this.getAuthUser();
    if (localStorage.getItem("mode") === "true") {
      this.lightTheme = true;
      this.darkTheme = false;
    } else {
      this.lightTheme = false;
      this.darkTheme = true;
    }
    this.chatUserList();
  },
});
</script>
