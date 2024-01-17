<template>
  <v-card id="card-historic" style="width: 100% ">
    <v-card-title style="display: flex; justify-content: center;">
      Histórico
    </v-card-title>
    <v-card-text>
      <v-list style="background: rgb(32, 32, 32); border-radius: 10px;">
        <v-list-item style="background: rgb(32, 32, 32); color: white;"
        v-for="(item, index) in history" :key="index">
        <v-list-item-content id="content-result">
            <v-list-item-title style="display: flex; justify-content: start;">
              {{ item.expression }} = {{ item.result }} <span style="cursor: pointer;" @click="deleteItem(index)"
                class="material-symbols-outlined ml-3">
                delete_history
              </span>
            </v-list-item-title>
            <v-divider class="border-opacity-75"></v-divider>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div style="display: flex; justify-content: end;">
        <v-btn variant="outline" v-if="this.history.length > 0" @click="deleteAllItens" class="mt-4">
          <strong>Limpar histórico</strong>
          <span class="material-symbols-outlined">
            delete_history
          </span>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      cardWidth: '20rem'
    }
  },
  props: {
    history: Array,
    saveHistory: Function
  },
  methods: {
    //Função para apagar um item do histórico
    deleteItem(index) {
      this.history.splice(index, 1)
      this.saveHistory()
    },
    //Função para apagar um item do histórico
    deleteAllItens() {
      this.history.splice(0, this.history.length)
      this.saveHistory()
    },
  },
};
</script>

<style scoped>
#card-historic {
  background: black !important;
  color:white;
  border: 3px solid gray;
  border-radius: 10px;
}
</style>
