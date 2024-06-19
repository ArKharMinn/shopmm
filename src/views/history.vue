<template>
  <div>
    <div class="container-fluid pt-2 text-start py-3">
      <a
        href="/"
        class="nav-link bg-dark d-inline-block p-2 rounded text-white"
      >
        <i class="fa-solid fa-arrow-left me-3"></i>Back
      </a>
    </div>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-lg-8 offset-2 table-responsive mb-5">
          <table
            id="dataTable"
            class="table table-light table-borderless table-hover text-center mb-0"
          >
            <thead class="thead-dark">
              <tr>
                <th>DATE</th>
                <th>ORDER ID</th>
                <th>TOTAL PRICE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody class="align-middle" v-if="item">
              <tr v-for="(item, index) in item" :key="index">
                <td class="align-middle">{{ formatDate(item.created_at) }}</td>
                <td class="align-middle" id="">{{ item.order_code }}</td>
                <td class="align-middle" id="">{{ item.total }}</td>
                <td class="align-middle">
                  <span class="text-warning fw-bold" v-if="item.status === 0">
                    <i class="fa-solid me-2 fa-stopwatch"></i>Pending</span
                  >

                  <span class="text-success fw-bold" v-if="item.status === 1">
                    <i class="fa-solid me-2 fa-check"></i>Successed</span
                  >

                  <span class="text-danger fw-bold" v-if="item.status === 2">
                    <i class="fa-solid me-2 fa-triangle-exclamation"></i
                    >Rejected</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { format } from "date-fns";
export default {
  name: "historyPage",
  data() {
    return {
      item: [],
    };
  },
  methods: {
    getHistroy() {
      const userId = localStorage.getItem("AuthUseId");
      axios
        .post("http://localhost:8000/api/getHistory", {
          id: userId,
        })
        .then((response) => {
          this.item = response.data.item;
        });
    },
    formatDate(dateString) {
      return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
    },
  },
  mounted() {
    this.getHistroy();
  },
};
</script>

<style lang="stylus" scoped></style>
