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
        <v-text-field style="background: rgb(32, 32, 32); height: 3.5rem;" disabled class="mt-5" v-model="result" outlined
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
    <div class="text-center">
      <v-btn @click="dialog = true">
        <span class="material-symbols-outlined">
          history
        </span>
      </v-btn>

      <v-dialog v-model="dialog" width="auto">
        <v-card>
          <historyCalc :history="history"/>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false"> X </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import Calculator from './Calculator'
import historyCalc from './components/historyCalc.vue'
import errorCalculator from './errorCalculator'

export default {
  data() {
    return {
      expression: '',
      result: '',
      history: [],
      dialog: false
    }
  },
  methods: {
    updateResult() {
      const expression = this.expression;
      let result = this.result;
      if (expression === '') {
        result = expression
      } else {
        result = Calculator.calculateExpression(expression)
      }
      this.result = result;
    },
    clearExpression() {
      this.expression = ''
      this.result = ''
    },
    addHistory() {
      if (this.expression === '' || errorCalculator.errors(this.result)) {
        return false
      } else {
        const customEntry = {
          expression: this.expression,
          result: this.result,
        };
        this.history.push(customEntry)
      }
    }
  },
  components: {
    historyCalc
  }
}
</script>

<style>
#container {
  display: flex;
  margin-left: 10rem;
}

#card-calculator {
  background: rgba(113, 113, 113, 0.414) !important;
  color: rgb(145, 249, 249, 0.864);
  border: 3px solid gray;
  border-radius: 10px;
}
</style>