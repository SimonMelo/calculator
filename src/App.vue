<template>
  <v-container id='container'>
    <v-card width="30vw" height="60vh">
      <v-card-title>
        Calculadora
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="expression" outlined label="Expressão" @input="updateResult" autocomplete="off"
          @keydown="preventEnter" />
        <v-text-field v-model="result" outlined label="Resultado" disabled />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addHistory">Adicionar ao histórico</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn color="primary" @click="clearExpression">Limpar</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>
        Histórico
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(item, index) in history" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.expression }} = {{ item.result }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Calculator from './Calculator'

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
        result = expression;
      } else {
        result = Calculator.calculateExpression(expression);
      }

      this.result = result;
    },
    clearExpression() {
      this.expression = ''
      this.result = ''
    },
    addHistory() {
      const customEntry = {
        expression: this.expression,
        result: this.result,
      };
      this.history.push(customEntry);
    }
  },
}
</script>

<style>

#container {
  display: flex;
}

</style>