<template>
  <div>
    <!-- Cart Start -->
    <div class="container-fluid pt-2 text-start">
      <a
        href="/"
        class="nav-link bg-dark d-inline-block p-2 rounded text-white"
      >
        <i class="fa-solid fa-arrow-left me-3"></i>Back
      </a>
    </div>
    <div class="container-fluid py-4" v-if="cart.length != 0">
      <div class="row px-xl-5">
        <div class="col-lg-8 table-responsive mb-5">
          <table
            class="table table-light table-borderless table-hover text-center mb-0"
          >
            <thead class="thead-dark">
              <tr>
                <th>Products</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody class="align-middle" v-if="cart != null">
              <tr v-for="(cart, index) in cart" :key="index">
                <td class="align-middle">
                  {{ cart.title }}
                </td>
                <td class="align-middle">{{ cart.price }}</td>
                <td class="align-middle">
                  <div
                    class="input-group quantity mx-auto"
                    style="width: 100px"
                  >
                    <div class="input-group-btn">
                      <button
                        @click="minusBtn(index)"
                        class="btn btn-sm btn-primary btn-minus"
                      >
                        <i class="fa fa-minus"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      class="form-control form-control-sm bg-secondary border-0 text-center"
                      v-model="cart.qty"
                    />
                    <div class="input-group-btn">
                      <button
                        @click="plusBtn(index)"
                        class="btn btn-sm btn-primary btn-plus"
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="align-middle">{{ cart.price * cart.qty }}</td>
                <td class="align-middle">
                  <button
                    class="btn btn-sm btn-danger"
                    @click="removeBtn(cart.id)"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-4">
          <h5 class="section-title position-relative text-uppercase mb-3">
            <span class="bg-secondary pr-3">Cart Summary</span>
          </h5>
          <div class="bg-light p-30 mb-5 p-4">
            <div class="border-bottom pb-2">
              <div class="d-flex justify-content-between">
                <h6>Location</h6>
                <h6>
                  {{ user.address
                  }}<i
                    class="fa-solid fa-pen-to-square ms-2 text-primary"
                    @click="addressBtn"
                  ></i>
                </h6>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-3"
                v-if="addressInput"
              >
                <input type="text" v-model="address" class="form-control" />
                <button
                  @click="updateLocation"
                  type="submit"
                  class="btn btn-primary ms-2"
                >
                  Update
                </button>
              </div>
              <div class="d-flex justify-content-between my-3">
                <h6>Subtotal</h6>
                <h6>{{ total }}</h6>
              </div>
              <div class="d-flex justify-content-between">
                <h6 class="font-weight-medium">Delivery</h6>
                <h6 v-if="total != 0" class="font-weight-medium">3000</h6>
                <h6 v-if="total == 0" class="font-weight-medium">0</h6>
              </div>
            </div>
            <div class="pt-2">
              <div class="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5 v-if="total != 0">{{ total + 3000 }}</h5>
                <h5 v-if="total == 0">0</h5>
              </div>
              <button
                @click="proceedBtn()"
                :class="{ 'disable btn-secondary': total == 0 }"
                class="btn btn-block btn-primary font-weight-bold my-3 py-3"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full min-vh-100 d-flex align-items-center justify-content-center"
      v-else
    >
      <h1 class="">There is no data</h1>
    </div>
    <!-- Cart End -->
    <div class=""></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "cartPage",
  data() {
    return {
      cart: [],
      cartId: 0,
      user: "",
      userId: localStorage.getItem("AuthUseId"),
      address: "",
      addressInput: false,
    };
  },
  computed: {
    total() {
      let total = 0;
      for (let item of this.cart) {
        total += item.price * item.qty;
      }
      return total;
    },
  },
  methods: {
    getCart() {
      axios
        .post("http://localhost:8000/api/cartList", { id: this.userId })
        .then((response) => {
          this.cart = response.data.cart;
          if (response.data.cart.length != 0) {
            this.cartId = this.cart[0].id;
          }
        });
    },
    getAuthUser() {
      if (this.userId !== null) {
        axios
          .post("http://localhost:8000/api/user", { id: this.userId })
          .then((response) => {
            this.user = response.data.authUser;
          });
      }
    },
    updateLocation() {
      if (this.address != "") {
        axios
          .post("http://localhost:8000/api/updateLocation", {
            id: this.userId,
            address: this.address,
          })
          .then((response) => {
            this.user = response.data.user;
            this.addressInput = false;
            this.address = "";
          });
      } else {
        this.addressInput = false;
      }
    },
    addressBtn() {
      if (this.addressInput) {
        this.addressInput = false;
      } else {
        this.addressInput = true;
      }
    },
    plusBtn(index) {
      this.cart[index].qty++;
    },
    minusBtn(index) {
      if (this.cart[index].qty > 0) {
        this.cart[index].qty--;
      }
    },
    removeBtn(id) {
      axios
        .post("http://localhost:8000/api/cartRemove", {
          id,
          userId: this.userId,
        })
        .then((response) => {
          this.cart = response.data.cart;
        });
    },
    proceedBtn() {
      if (this.total != 0) {
        const userId = localStorage.getItem("AuthUseId");
        axios
          .post("http://localhost:8000/api/orderToAdmin", {
            total: this.total + 3000,
            userId: userId,
            id: this.cartId,
            post: this.cart,
          })
          .then((response) => {
            window.location.href = "/";
          });
      }
    },
  },
  mounted() {
    this.getCart();
    this.getAuthUser();
  },
};
</script>

<style lang="stylus" scoped></style>
