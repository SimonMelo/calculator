<template>
  <v-container id="container">
    <v-card class="mr-12" id='card-calculator' width="30vw" height="60vh">
      <v-card-title style="display: flex; justify-content: center;">
        Calculadora
      </v-card-title>
      <v-divider class="border-opacity-75" color="warning"></v-divider>
      <!-- Dentro do v-card-text está inserido os inputs para inserir as expressões e o outro para mostrar o resultado -->
      <v-card-text>
        <v-text-field placeholder="3 + 5 * (2 - 4) / 2" style="background: rgb(32, 32, 32); height: 3.5rem;" v-model="expression" outlined label="Expressão"
          @input="updateResult" autocomplete="off" @keydown="preventEnter" />
        <v-text-field style="background: rgb(32, 32, 32); height: 3.5rem;" disabled class="mt-5" v-model="result" outlined
          label="Resultado" />
      </v-card-text>
      <!-- Dentro do v-row é adicionado funcionalidades -->
      <v-row style="display: flex; justify-content: center;" class="mt-5">

        <v-btn @click="addHistory">
          <span class="material-symbols-outlined">
            add
          </span>
          <v-tooltip activator="parent" location="top">Adicionar ao histórico</v-tooltip>
        </v-btn>


        <v-btn class="ml-7" @click="clearExpression"><span class="material-symbols-outlined">
            backspace
          </span>
          <v-tooltip activator="parent" location="top">Limpar</v-tooltip>
        </v-btn>

        <!-- Adicionando um dialog para abrir o histórico -->
        <div class="text-center">
          <v-btn class="ml-7" @click="dialogHistory = true">
            <span class="material-symbols-outlined">
              history
            </span>
            <v-tooltip activator="parent" location="top">Histórico</v-tooltip>
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
        <div class="text-center">
          <v-btn class="ml-7" @click="dialogHelp = true">
            <span class="material-symbols-outlined">
              info
            </span>
            <v-tooltip activator="parent" location="top">Ajuda</v-tooltip>
          </v-btn>
          <v-dialog v-model="dialogHelp" width="auto">
            <v-card>
              <!-- Aqui foi um adicionado o módulo onde está as informações instrutivas -->
              <instructiveInfo />
              <v-card-actions>
                <v-btn color="primary" block @click="dialogHelp = false"> X </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
    </v-card>
  </v-container>
  <v-snackbar :timeout="2000" :color="snackBar.snackBarColor" v-model="snackBar.snackBarValue" vertical>
    <h3 id="snackbarMSG">{{ snackBar.snackBarMessage }}</h3>
  </v-snackbar>
</template>

<script>
import { ref } from 'vue'
import Calculator from './Calculator'
import historyCalc from './components/historyCalc.vue'
import errorCalculator from './errorCalculator'
import instructiveInfo from './components/instructiveInfo.vue'

const snackBar = ref({
  snackBarValue: false,
  snackBarMessage: '',
  snackBarColor: '',
  timeout: 2000
})

export default {
  data() {
    return {
      expression: '',
      result: '',
      history: [],
      dialogHistory: false,
      dialogHelp: false,
      snackBar
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
        this.snackBar.snackBarMessage = this.expression === '' ? 'Digite uma expressão.' : 'Digite uma expressão válida.'
        this.snackBar.snackBarColor = 'error'
        this.snackBar.snackBarValue = true
      } else {
        const customEntry = {
          expression: this.expression,
          result: this.result,
        }
        this.snackBar.snackBarMessage = 'Expressão adicionada ao histórico.'
        this.snackBar.snackBarColor = 'success'
        this.snackBar.snackBarValue = true
        this.history.push(customEntry)
      }
    }
  },
  components: {
    historyCalc,
    instructiveInfo
  }
}
</script>

<style>
#container {
  display: flex;
  margin-left: 10rem;
}

#card-calculator {
  background:black !important;
  color: rgb(145, 249, 249, 0.864);
  border: 3px solid gold;
  border-radius: 10px;
}

#snackbarMSG {
  font-weight: 500;
}
</style>