<template>
  <div>
    <!-- Shop Detail Start -->
    <div class="container-fluid pt-2 text-start">
      <a
        href="/"
        class="nav-link bg-dark d-inline-block p-2 rounded text-white"
      >
        <i class="fa-solid fa-arrow-left me-3"></i>Back
      </a>
    </div>
    <div class="container-fluid py-5" v-if="postDetail.length != 0">
      <div
        class="row px-xl-5"
        v-for="(postDetail, index) in postDetail"
        :key="index"
      >
        <div class="col-lg-5 mb-30">
          <div
            id="product-carousel py-4"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner bg-light">
              <img
                v-bind:src="`http://localhost:8000/storage/` + postDetail.image"
                style="width: 50%"
              />
            </div>
          </div>
        </div>

        <div class="col-lg-7 h-auto mb-30">
          <div class="h-100 bg-light text-start px-3 p-30 py-4">
            <h3>{{ postDetail.title }}</h3>
            <div class="d-flex align-items-center justify-content-start mt-2">
              <h5>{{ postDetail.price }}</h5>
              <h6 class="text-muted ml-2 mx-2">
                <del>{{ postDetail.discount }}</del>
              </h6>
            </div>
            <p class="mb-4">{{ postDetail.description }}</p>
            <div class="d-flex align-items-center mb-4 pt-2">
              <div class="input-group quantity mr-3" style="width: 130px">
                <div class="input-group-btn">
                  <button class="btn btn-primary btn-minus" @click="minusBtn">
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control bg-secondary border-0 text-center"
                  v-model="count"
                />
                <div class="input-group-btn">
                  <button class="btn btn-primary btn-plus" @click="plusBtn">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <button
                v-if="userId"
                class="btn btn-primary ms-3 px-3"
                @click="cartBtn(postDetail.id)"
              >
                <i class="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
              <button
                v-else
                class="btn btn-primary ms-3 px-3"
                @click="loginPage"
              >
                <i class="fa fa-shopping-cart mr-1"></i> Add To Cart
              </button>
              <span class="mx-3"
                ><i class="fa-solid fa-eye me-2"></i
                >{{ postDetail.view_count }}</span
              >
            </div>
            <div class="d-flex">
              <div class="">
                <a href="#" class="nav-link">
                  <div
                    class="d-inline-block"
                    v-if="!reaction"
                    @click="likeBtn()"
                  >
                    <i class="fa-regular fa-heart text-danger me-1"></i>
                  </div>
                  <div
                    class="d-inline-block"
                    v-if="reaction"
                    @click="unlikeBtn()"
                  >
                    <i class="fa-solid fa-heart text-danger me-1"></i>
                  </div>
                  {{ likeCount }}</a
                >
              </div>
              <div class="mx-4" @click="openBoxBtn">
                <a href="#" class="nav-link"
                  ><span class="text-bloder">Comments</span>
                  {{ comments.length }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5" v-else>
      <h2>Loading...</h2>
    </div>
    <!-- Shop Detail End -->
    <div class="container-fluid py-5">
      <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span class="bg-secondary pr-3">You May Also Like</span>
      </h2>
      <div class="row px-xl-5" v-if="relatedPost">
        <div
          class="col-4"
          v-for="(relatedPost, index) in relatedPost"
          :key="index"
          @click="detailPage(relatedPost.id, relatedPost.category_id)"
        >
          <div>
            <div class="product-item bg-light">
              <div class="product-img position-relative overflow-hidden">
                <img
                  class="col-5 mt-3"
                  v-bind:src="
                    `http://localhost:8000/storage/` + relatedPost.image
                  "
                />
              </div>
              <div class="text-center py-4">
                <a class="h6 text-decoration-none text-truncate" href="">{{
                  relatedPost.title
                }}</a>
                <div
                  class="d-flex align-items-center justify-content-center mt-2"
                >
                  <h5>{{ relatedPost.price }}</h5>
                  <h6 class="text-muted ml-2" v-if="relatedPost.discount">
                    <del>{{ relatedPost.discount }}</del>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container position-fixed bottom-0 m-5 z-5"
      style="z-index: 10000"
      v-if="closeBox"
    >
      <div class="col-8 offset-2 bg-light border rounded shadow-sm">
        <div class="col-12">
          <div class="d-flex justify-content-between p-3 align-items-center">
            <h4 class="text-bold">Comments {{ comments.length }}</h4>
            <h4 class="btn" @click="closeBoxBtn">
              <i class="fa-solid fa-xmark"></i>
            </h4>
          </div>
          <div class="">
            <div class="px-4" style="height: calc(520px); overflow-y: auto">
              <div
                class="text-start d-flex m-2"
                v-for="(comments, index) in comments"
                :key="index"
              >
                <div class="me-2">
                  <div class="bg-primary rounded-circle p-3 text-white">
                    {{ comments.name.charAt(0) }}
                  </div>
                </div>
                <div class="">
                  <div class="d-flex">
                    <div class="text-bolder">
                      {{ comments.name
                      }}<span class="ms-2" v-if="comments.user_id == user.id"
                        >(You)</span
                      >
                    </div>
                    <span class="text-muted ms-3">{{
                      formatDate(comments.created_at)
                    }}</span>
                  </div>
                  <div class="mt-2">{{ comments.comment }}</div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center py-1 px-3">
              <textarea
                cols="30"
                rows="4"
                v-model="commentText"
                placeholder="Add Comments....."
                class="form-control mx-2"
              ></textarea>
              <div class="ms-1" title="send" @click="postComment">
                <i
                  :class="{ 'bg-secondary': commentText == '' }"
                  class="fa-solid bg-primary fa-paper-plane p-3 rounded-circle text-white"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- add to cart box  -->
    <div
      v-if="closeCart"
      class="position-fixed m-5 bottom-0 col-12 d-flex justify-content-center align-items-center"
    >
      <div
        class="bg-dark rounded shadow-lg text-white d-flex justify-content-center align-items-center py-2 px-5"
      >
        <h5 class="">{{ addToCartSuccessful }}</h5>
        <button type="button" class="btn btn-dark ms-4" @click="closeCartBox">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    <!-- add to cart box  -->
  </div>
</template>

<script>
import { format } from "date-fns";
import axios from "axios";
export default {
  name: "detailPage",
  data() {
    return {
      postDetail: [],
      count: 1,
      userId: localStorage.getItem("AuthUseId"),
      relatedPost: [],
      closeBox: false,
      comments: [],
      commentText: "",
      postId: "",
      authUserName: "",
      reaction: false,
      likeCount: 0,
      likeUser: 0,
      user: "",
      closeCart: false,
      addToCartSuccessful: "",
    };
  },
  methods: {
    getAuthUser() {
      axios
        .post("http://localhost:8000/api/user", { id: this.userId })
        .then((response) => {
          this.user = response.data.authUser;
          this.authUserName = this.user.name.charAt(0);
        });
    },
    formatDate(dateString) {
      return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
    },
    getDetail(id) {
      axios
        .post("http://localhost:8000/api/postDetail", { id })
        .then((response) => {
          this.postDetail = response.data.detail;
        });
    },
    likeBtn() {
      axios
        .post("http://localhost:8000/api/like", {
          userId: this.userId,
          postId: this.postId,
        })
        .then((response) => {
          this.likeCount = response.data.count;
          this.reaction = true;
        });
    },
    unlikeBtn() {
      axios
        .post("http://localhost:8000/api/unlike", {
          userId: this.userId,
          postId: this.postId,
        })
        .then((response) => {
          this.likeCount = response.data.count;
          this.reaction = false;
        });
    },
    getLike() {
      axios
        .post("http://localhost:8000/api/getLike", {
          postId: this.postId,
          userId: this.userId,
        })
        .then((response) => {
          this.likeCount = response.data.count;
          if (response.data.likeUser != null) {
            this.likeUser = response.data.likeUser.user_id;
            if (this.likeUser === this.userId) {
              this.reaction = false;
            } else {
              this.reaction = true;
            }
          }
        });
    },
    getComment() {
      axios
        .post("http://localhost:8000/api/getComment", {
          postId: this.postId,
        })
        .then((response) => {
          this.comments = response.data.comments;

          if (response.data.comments.length != 0) {
            this.authUserName = this.comments[0].name;
          }
        });
    },
    postComment() {
      if (this.commentText != "") {
        axios
          .post("http://localhost:8000/api/postComment", {
            userId: this.userId,
            comment: this.commentText,
            postId: this.postId,
          })
          .then((response) => {
            this.comments = response.data.comments;
            this.commentText = "";
          });
      }
    },
    plusBtn() {
      this.count++;
    },
    loginPage() {
      this.$router.push("/login");
    },
    minusBtn() {
      if (this.count != 0) {
        this.count--;
      }
    },
    openBoxBtn() {
      this.closeBox = true;
    },
    closeBoxBtn() {
      this.closeBox = false;
    },
    detailPage(id, category_id) {
      this.$router.push({
        name: "detail",
        query: {
          id: id,
          category_id: category_id,
        },
      });
      axios
        .post("http://localhost:8000/api/postDetail", { id })
        .then((response) => {
          this.postDetail = response.data.detail;
        });
    },
    cartBtn(productId) {
      axios
        .post("http://localhost:8000/api/addCart", {
          qty: this.count,
          product_id: productId,
          user_id: this.userId,
        })
        .then((response) => {
          this.addToCartSuccessful = response.data.success;
          this.closeCart = true;
        });
    },
    getRelatedPost(categoryId) {
      axios
        .post("http://localhost:8000/api/relatedPost", {
          categoryId,
        })
        .then((response) => {
          this.relatedPost = response.data.relatedPost;
        });
    },
    closeCartBox() {
      this.closeCart = false;
    },
  },
  mounted() {
    this.getAuthUser();
    let id = this.$route.query.id;
    this.postId = this.$route.query.id;
    let categoryId = this.$route.query.category_id;
    this.getComment();
    this.getDetail(id);
    this.getRelatedPost(categoryId);
    this.getLike();
  },
};
</script>

<style lang="stylus" scoped></style>
