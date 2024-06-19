<template>
  <div>
    <div class="container-fluid py-3 w-full min-vh-100">
      <div class="row px-xl-5">
        <div class="col-lg-3 col-md-4">
          <div class="mt-4 d-flex">
            <input
              type="text"
              v-model="searchPost"
              @keyup.enter="searchPostTitle()"
              placeholder="Search"
              class="form-control"
            />
            <button
              type="submit"
              class="btn btn-outline-primary"
              @click="searchPostTitle()"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div class="mt-3">
            <div class="">
              <a
                href="#"
                @click="searchCategoryTitle('')"
                :class="{ 'bg-primary': categoryId == '' }"
                class="text-start py-2 btn btn-block nav-link ps-2"
                >All</a
              >
            </div>
            <div class="" v-for="(category, index) in category" :key="index">
              <a
                href="#"
                @click="searchCategoryTitle(category.id)"
                @mouseover="isHovered = category.id"
                @mouseleave="isHovered = null"
                :class="{
                  'bg-primary': categoryId == category.id,
                  'bg-info': isHovered == category.id,
                }"
                class="text-start py-2 btn btn-block nav-link ps-2"
                >{{ category.title }}</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-md-8 mt-3">
          <div class="text-end mb-3">
            <button
              @click="cartPage"
              type="button"
              class="btn bg-dark p-2 text-white position-relative"
            >
              <i class="fa-solid fa-cart-shopping"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ totalCart }}
              </span>
            </button>
            <button
              @click="historyPage"
              type="button"
              class="btn bg-dark p-2 ms-3 text-white position-relative"
            >
              <i class="fa-solid fa-history"></i> History
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ history }}
              </span>
            </button>
          </div>

          <div class="row pb-3" v-if="posts != null">
            <div
              class="col-lg-2 col-md-6 col-sm-6 pb-1"
              v-for="(posts, index) in posts"
              :key="index"
            >
              <div
                class="product-item bg-light mb-4 shadow-sm"
                @click="detail(posts.id, posts.category_id)"
              >
                <div class="product-img position-relative overflow-hidden">
                  <img
                    @mouseover="isHoveredPost = posts.id"
                    @mouseleave="isHoveredPost = null"
                    :class="{ 'shadow-lg scale-up': isHoveredPost == posts.id }"
                    class="img-fluid w-100"
                    :src="`http://localhost:8000/storage/` + posts.image"
                  />
                </div>
                <div class="text-center py-4">
                  <a class="h6 text-decoration-none text-truncate" href="">{{
                    posts.title
                  }}</a>
                  <div
                    class="d-flex align-items-center justify-content-center mt-2"
                  >
                    <h5>{{ posts.price }}</h5>
                    <h6 class="text-muted ml-2 mx-2">
                      <del>{{ posts.discount }}</del>
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <nav
              class="d-flex justify-content-center"
              aria-label="Page navigation"
            >
              <ul class="pagination">
                <li
                  class="page-item"
                  :class="{ disabled: !pagination.prev_page_url }"
                >
                  <a
                    class="page-link"
                    @click.prevent="getPost(pagination.prev_page_url)"
                    href="#"
                    >Previous</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: !pagination.next_page_url }"
                >
                  <a
                    class="page-link"
                    @click.prevent="getPost(pagination.next_page_url)"
                    href="#"
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomePage",
  data() {
    return {
      searchPost: "",
      category: [],
      posts: [],
      categoryId: "",
      totalCart: 0,
      history: 0,
      userId: localStorage.getItem("AuthUseId"),
      pagination: [],
      isHovered: "",
      isHoveredPost: "",
    };
  },
  methods: {
    cart() {
      if (this.userId != null) {
        axios
          .post("http://localhost:8000/api/cart", { id: this.userId })
          .then((response) => {
            this.totalCart = response.data.cart;
          });
      }
    },
    getCategory() {
      axios.get("http://localhost:8000/api/category").then((response) => {
        this.category = response.data.category;
      });
    },
    searchPostTitle() {
      axios
        .post("http://localhost:8000/api/postSearch", {
          title: this.searchPost,
        })
        .then((response) => {
          this.posts = response.data.search;
        });
    },
    searchCategoryTitle(id) {
      axios
        .post("http://localhost:8000/api/categorySearch", { id })
        .then((response) => {
          this.posts = response.data.search;
          this.categoryId = id;
        });
    },
    getPost(url) {
      axios.get(url).then((response) => {
        this.posts = response.data.post.data;
        this.pagination = response.data.post;
      });
    },
    getHistroy() {
      if (this.userId != null) {
        axios
          .post("http://localhost:8000/api/history", { id: this.userId })
          .then((response) => {
            this.history = response.data.history;
          });
      }
    },
    cartPage() {
      if (this.cart != 0) {
        this.$router.push("/cart");
      }
    },
    historyPage() {
      if (this.history != 0) {
        this.$router.push("/history");
      }
    },
    detail(id, category_id) {
      this.$router.push({
        name: "detail",
        query: {
          id: id,
          category_id: category_id,
        },
      });
      axios.post("http://localhost:8000/api/viewCount", {
        id,
      });
    },
  },
  mounted() {
    this.getCategory();
    this.getPost("http://localhost:8000/api/post");
    this.cart();
    this.getHistroy();
  },
};
</script>

<style scoped>
.scale-up {
  transform: scale(1.6);
  transition: transform 0.5s ease;
}
</style>
