<template>
  <v-container id="container">
    <v-card class="mr-12" id='card-calculator' width="30vw" height="60vh">
      <v-card-title style="display: flex; justify-content: center;">
        Calculadora
      </v-card-title>
      <v-divider class="border-opacity-75" color="warning"></v-divider>
      <!-- Dentro do v-card-text está inserido os inputs para inserir as expressões e o outro para mostrar o resultado -->
      <v-card-text>
        <v-text-field style="background: rgb(32, 32, 32); height: 3.5rem;" v-model="expression" outlined label="Expressão"
          @input="updateResult" autocomplete="off" @keydown="preventEnter" />
        <v-text-field style="background: rgb(32, 32, 32); height: 3.5rem;" disabled class="mt-5" v-model="result" outlined
          label="Resultado" />
      </v-card-text>
      <!-- Dentro do v-row é adicionado funcionalidades -->
      <v-row class="mt-5">
        <v-card-actions>
          <v-btn class="ml-7" color="gold" variant="outlined" @click="addHistory">Salvar</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="gold" variant="outlined" @click="clearExpression">Limpar</v-btn>
        </v-card-actions>
        <!-- Adicionando um dialog para abrir o histórico -->
        <div class="text-center">
          <v-btn @click="dialogHistory = true">
            <span class="material-symbols-outlined">
              history
            </span>
          </v-btn>
          <v-dialog v-model="dialogHistory" width="auto">
            <v-card>
              <!-- Aqui foi um adicionado o módulo onde está o histórico -->
              <historyCalc :history="history" />
              <v-card-actions>
                <v-btn color="primary" block @click="dialogHistory = false"> X </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
    </v-card>
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
      dialogHistory: false
    }
  },
  methods: {

    //Função que avalia em tempo real se é uma função e mostra o resultado

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

    //Função que limpa os campos da expressão e resultado

    clearExpression() {
      this.expression = ''
      this.result = ''
    },
    
    //Função que adiciona ao histórico as expressões

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