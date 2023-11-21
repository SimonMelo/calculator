<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="w-full max-w-md">
        <v-card>
          <v-card-title class="headline">Calculadora Instruções</v-card-title>
          <v-card-text>
            <div class="mb-4">
              <label for="sectionSelect" class="text-sm">Selecione uma seção:</label>
              <select v-model="selectedSection" id="sectionSelect" class="block w-full mt-1 p-2 border rounded">
                <option disabled value="">Selecione uma seção</option>
                <option value="basicOperations">Operações Básicas</option>
                <option value="advancedOperations">Operações Avançadas</option>
              </select>
            </div>
  
            <v-divider class="mb-4"></v-divider>
  
            <div v-if="selectedSection === 'basicOperations'">
              <h3 class="mb-2">Operações Básicas:</h3>
              <ul class="list-disc pl-6">
                <li>Adição: Utilize o símbolo <code>+</code> (Exemplo: <code>2 + 3</code>).</li>
                <li>Subtração: Utilize o símbolo <code>-</code> (Exemplo: <code>5 - 2</code>).</li>
                <li>Multiplicação: Utilize o símbolo <code>*</code> (Exemplo: <code>4 * 6</code>).</li>
                <li>Divisão: Utilize o símbolo <code>/</code> (Exemplo: <code>8 / 2</code>).</li>
              </ul>
            </div>
  
            <div v-else-if="selectedSection === 'advancedOperations'">
              <h3 class="mb-2">Operações Avançadas:</h3>
              <ul class="list-disc pl-6">
                <li>Potenciação: Utilize o símbolo <code>^</code> (Exemplo: <code>2^3</code> para 2 elevado à 3).</li>
                <li>Raiz Quadrada: Utilize <code>sqrt()</code> (Exemplo: <code>sqrt(9)</code> para a raiz quadrada de 9).</li>
                <li>Funções Trigonométricas: Utilize <code>sin()</code>, <code>cos()</code>, <code>tan()</code> (Exemplo: <code>sin(0.5)</code>).</li>
                <li>Logaritmo Natural: Utilize <code>log()</code> (Exemplo: <code>log(10)</code> para o logaritmo natural de 10).</li>
              </ul>
            </div>
  
            <div class="mt-4">
              <p>Lembre-se de que a calculadora aceita expressões matemáticas em formato de string. Experimente diferentes operações para calcular resultados!</p>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalculadoraInstrucoes',
    data() {
      return {
        selectedSection: '',
      };
    },
  }
  </script>
  
  <style scoped>
  /* Se precisar de estilos específicos para este componente */
  </style>
  