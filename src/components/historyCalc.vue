<template>
  <v-card id="card-historic" :style="{ width: cardWidth }">
    <v-card-title style="display: flex; justify-content: center;">
      Histórico
    </v-card-title>
    <v-card-text>
      <v-list style="background: rgb(32, 32, 32); border-radius: 10px;">
        <v-list-item style="background: rgb(32, 32, 32); color: rgba(145, 249, 249, 0.864);"
          v-for="(item, index) in history" :key="index">
          <v-list-item-content id="content-result">
            <v-list-item-title style="display: flex; justify-content: start;">
              {{ item.expression }} = {{ item.result }} <span style="cursor: pointer;" @click="deleteItem(index)" class="material-symbols-outlined ml-3">
                delete_history
              </span>
            </v-list-item-title>
            <v-divider class="border-opacity-75"></v-divider>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data(){
    return{
      cardWidth:'20rem'
    }
  },
  props: {
    history: Array,
  },
  methods: {
    //Função para apagar um item do histórico
    deleteItem(index) {
      this.history.splice(index, 1)
    },
    //Função para apagar um item do histórico
    deleteAllItens(index) {
      this.history.splice(index, this.history)
    },
    //Função para aumentar a largura do card caso a função adicionada seja grande
    updateCardWidth() {
      const itemCount = this.history.length;
      this.cardWidth = `${Math.max(5 + 10 * itemCount, 20)}rem`;
    }
  },
  watch: {
    //Aqui adiciono um watcher onde vai ficar observando a função updateCardWidth para fazer a atualização do card de forma correta
    history: {
      handler() {
        this.updateCardWidth();
      },
      //O deep uso para que fique de olho não só na array history, mas sim de tudo composto
      deep: true,
    },
  },
  mounted() {
    this.updateCardWidth()
  },
};
</script>

<style scoped>

#card-historic {
  background: black !important;
  color: rgb(145, 249, 249, 0.864);
  border: 3px solid gray;
  border-radius: 10px;
}

</style>
