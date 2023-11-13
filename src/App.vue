<template>
  <v-container id="container">
    <v-card class="mr-12" id='card-calculator' width="30vw" height="60vh">
      <v-card-title style="display: flex; justify-content: center;">
        Calculadora
      </v-card-title>
      <v-divider class="border-opacity-75" color="warning"></v-divider>
      <v-card-text>
        <v-text-field style="background: rgb(32, 32, 32); height: 3.5rem;" v-model="expression" outlined label="Expressão"
          @input="updateResult" autocomplete="off" @keydown="preventEnter" />
        <v-text-field style="background: rgb(32, 32, 32); height: 3.5rem;" class="mt-5" v-model="result" outlined
          label="Resultado" />
      </v-card-text>
      <v-row class="mt-5">
        <v-card-actions>
          <v-btn class="ml-7" color="gold" variant="outlined" @click="addHistory">Adicionar ao histórico</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="gold" variant="outlined" @click="clearExpression">Limpar</v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
    <v-card id="card-historic">
      <v-card-title style="display: flex; justify-content: center;">
        Histórico
      </v-card-title>
      <v-card-text>
        <v-list style="background: rgb(32, 32, 32); border-radius: 10px;">
          <v-list-item style="background: rgb(32, 32, 32); color: gold;" v-for="(item, index) in history" :key="index">
            <v-list-item-content>
              <v-list-item-title  style="display: flex; justify-content: start;">
                {{ item.expression }} = {{ item.result }} <span style="cursor: pointer;" @click="deleteItem(index)" class="ml-2 material-symbols-outlined">
delete
</span>
              </v-list-item-title>
              <v-divider class="border-opacity-75" color="warning"></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Calculator from './Calculator'
import errorCalculator from './errorCalculator'

export default {
  data() {
    return {
      expression: '',
      result: '',
      history: []
    }
  },
  methods: {
    updateResult() {
      const expression = this.expression;
      let result = this.result;
      if (/^(log|sin|tan)$/.test(expression)) {
        result = expression
      } else {
        result = Calculator.calculateExpression(expression)
      }
      this.result = result;
    },
    deleteItem(index) {
      this.history.splice(index, 1)
    },
    clearExpression() {
      this.expression = ''
      this.result = ''
    },
    addHistory() {
      if (this.expression === '' || errorCalculator.errors(this.result)) {
        return false; // Retorna falso se a expressão estiver vazia ou se houver um erro
      } else {
        const customEntry = {
          expression: this.expression,
          result: this.result,
        };
        this.history.push(customEntry);
      }
    }
  },
}
</script>

<style>
#container {
  display: flex;
  margin-left: 10rem;
}

#card-calculator {
  background: black !important;
  color: gold;
  border: 3px solid gray;
  border-radius: 10px;
}

#card-historic {
  background: black !important;
  color: gold;
  border: 3px solid gray;
  border-radius: 10px;
  width: 20rem;
}
</style>