<template>
  <v-container id="container" :style="{ marginTop: isMobile ? dynamicMargin + 'px' : 'auto' }"
    class="d-flex align-center justify-center">
    <v-card class="ma-auto" width="400" height="400" id="card-calculator">
      <v-card-title style="display: flex; justify-content: center;">
        Calculadora
      </v-card-title>
      <v-divider class="border-opacity-75" color="warning"></v-divider>
      <!-- Dentro do v-card-text está inserido os inputs para inserir as expressões e o outro para mostrar o resultado -->
      <v-card-text>
        <v-text-field placeholder="3 + 5 * (2 - 4) / 2" style="background: rgb(32, 32, 32); height: 3.5rem;"
          v-model="expression" outlined label="Expressão" @input="updateResult" autocomplete="off" />
        <v-text-field style="background: rgb(32, 32, 32); height: 3.5rem;" disabled class="mt-5" v-model="result" outlined
          label="Resultado" />
      </v-card-text>
      <!-- Dentro do v-row é adicionado funcionalidades -->
      <v-row id="row-btn" class="mt-1">

        <v-btn @click="addHistory">
          <span class="material-symbols-outlined">
            add
          </span>
          <v-tooltip activator="parent" location="top">Adicionar ao histórico</v-tooltip>
        </v-btn>

        <v-btn class="mt-2" @click="clearExpression"><span class="material-symbols-outlined">
            backspace
          </span>
          <v-tooltip activator="parent" location="top">Limpar</v-tooltip>
        </v-btn>

        <!-- Adicionando um dialog para abrir o histórico -->

        <v-btn class="mt-2" @click="dialogHistory = true">
          <span class="material-symbols-outlined">
            history
          </span>
          <v-tooltip activator="parent" location="top">Histórico</v-tooltip>
        </v-btn>
        <v-dialog v-model="dialogHistory">
          <v-card>
            <!-- Aqui foi um adicionado o módulo onde está o histórico -->
            <historyCalc :saveHistory="saveHistory" :history="history" />
            <v-card-actions>
              <v-btn color="primary" block @click="dialogHistory = false"> X </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn class="mt-2" @click="dialogHelp = true">
          <span class="material-symbols-outlined">
            info
          </span>
          <v-tooltip activator="parent" location="top">Ajuda</v-tooltip>
        </v-btn>
        <v-dialog v-model="dialogHelp">
          <v-card>
            <!-- Aqui foi um adicionado o módulo onde está as informações instrutivas -->
            <instructiveInfo :selectedSection="selectedSection" />
            <v-card-actions>
              <v-btn color="primary" block @click="dialogHelp = false"> X </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
  </v-container>
  <v-snackbar :timeout="2000" :color="snackBar.snackBarColor" v-model="snackBar.snackBarValue" vertical>
    <h3 id="snackbarMSG">{{ snackBar.snackBarMessage }}</h3>
  </v-snackbar>

  <v-dialog v-model="showSuggestionSnackbar">
  <v-card id="cardSuggestion">
    <v-card-title style="display: flex; justify-content: center; font-size: 25px;">
      {{ suggestionType === 'squared' ? 'Sugestão para "²"' : 'Sugestão para "√"' }}
    </v-card-title>
    <v-card-text style="display: flex; justify-content: center; font-size: 18px; ">
      {{ suggestionType === 'squared' ? 'Considere usar (valor) ^ 2 para elevar ao quadrado. Caso queira ver mais alguns exemplos de expressões, clique em Ver.' : 'Considere usar sqrt(valor) para representar a raiz quadrada. Caso queira ver mais alguns exemplos de expressões, clique em Ver.' }}
    </v-card-text>
    <v-card-actions style="display: flex; justify-content: flex-end;">
      <v-btn @click="showSuggestionSnackbar = false">Fechar</v-btn>
      <v-btn @click="openSuggestionModal">Ver</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
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
      snackBar,
      dynamicMargin: 0,
      isMobile: false,
      showSuggestionSnackbar: false,
      selectedSection: 'Selecione',
    }
  },
  methods: {

    openSuggestionModal() {
      this.selectedSection = "Expressões de exemplo"
      this.showSuggestionSnackbar = false
      this.dialogHelp = true
    },

    //Função que avalia em tempo real se é uma função e mostra o resultado

    updateResult() {
    const expression = this.expression;
    let result = this.result;

    // Verifica se há um "²" na expressão e exibe o v-snackbar de sugestão
    if (expression.includes('²')) {
      this.suggestionType = 'squared'
      this.showSuggestionSnackbar = true
      return
    }

    if (expression.includes('√')) {
      this.suggestionType = 'squareRoot'
      this.showSuggestionSnackbar = true
      return
    }

    if (expression === "") {
      result = expression
    } else {
      // Substituir π por 3.14 antes de calcular
      result = Calculator.calculateExpression(expression.replace(/π|pi/g, '3.14'))
    }

    this.result = result
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
      this.saveHistory()
    },

    calculateDynamicMargin() {
      const screenHeight = window.innerHeight
      const cardHeight = 500 // Altura do seu card
      const minMargin = 20 // Valor mínimo para a margem superior

      this.dynamicMargin = Math.max(minMargin, (screenHeight - cardHeight) / 2)
    },
    checkIsMobile() {
      // Verificar se a largura da tela é inferior a um determinado ponto de corte (ajuste conforme necessário)
      this.isMobile = window.innerWidth <= 768
    },
    // Método para carregar o histórico ao iniciar o aplicativo
    loadHistoryOnStart() {
      const savedHistory = sessionStorage.getItem('calcHistory')
      if (savedHistory) {
        this.history = JSON.parse(savedHistory)
      }
    },

    // Método para salvar o histórico no sessionStorage
    saveHistory() {
      sessionStorage.setItem('calcHistory', JSON.stringify(this.history))
    },

    // Método para limpar o histórico
    clearHistory() {
      this.history.splice(0, this.history.length)
      // Ao limpar o histórico, salva no sessionStorage
      this.saveHistory()
    },
  },
  components: {
    historyCalc,
    instructiveInfo
  },
  mounted() {
    this.calculateDynamicMargin()
    window.addEventListener('resize', this.calculateDynamicMargin)
    this.checkIsMobile()
    window.addEventListener('resize', this.checkIsMobile)

    // Carregar o histórico ao iniciar o aplicativo
    this.loadHistoryOnStart()

    // Abrir automaticamente o diálogo de ajuda ao carregar a página
    this.dialogHelp = true
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateDynamicMargin)
    window.removeEventListener('resize', this.checkIsMobile)

    // Salvar o histórico ao fechar o aplicativo
    this.saveHistory()
  }
}
</script>

<style scoped>


#container {
  display: flex;
  margin-left: 50%;
}

#card-calculator {
  background: black !important;
  color: white;
  border: 2px solid rgba(255, 136, 0, 0.5);
  border-radius: 10px;
}

#snackbarMSG {
  font-weight: 500;
}

#row-btn {
  display: flex;
  flex-direction: column;
  padding: 0px 30px 0px 30px;
}

#cardSuggestion {
  background: black !important;
  color: white;
  border: 3px solid gray;
  border-radius: 10px;
}

@media only screen and (max-width: 990px) {
  #container {
    margin-left: 0;
  }
}
</style>