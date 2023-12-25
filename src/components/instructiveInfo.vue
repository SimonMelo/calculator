<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md">
      <v-card id="instruction-card">
        <v-card-title style="display: flex; justify-content: center;" class="headline">Instruções da Calculadora</v-card-title>
        <v-card-text style="display: flex; justify-content: center;">Aqui, você encontrará informações sobre as operações matemáticas que podem ser
          realizadas.</v-card-text>
        <v-card-text>
          <div class="mb-4">
            <label for="sectionSelect" class="text-sm">Selecione uma seção:</label>
            <v-select v-model="selectedSection" :items="sections" label="Selecione uma seção" id="sectionSelect"
              class="block w-full mt-1 p-2 border rounded"></v-select>
          </div>

          <v-divider class="mb-4"></v-divider>

          <div v-if="selectedSection === 'Operações Básicas'">
            <h3 class="mb-2">Operações Básicas:</h3>
            <ul class="list-disc pl-6">
              <li>Adição: Utilize o símbolo <code>+</code> (Exemplo: <code>2 + 3</code>).</li>
              <li>Subtração: Utilize o símbolo <code>-</code> (Exemplo: <code>5 - 2</code>).</li>
              <li>Multiplicação: Utilize o símbolo <code>*</code> (Exemplo: <code>4 * 6</code>).</li>
              <li>Divisão: Utilize o símbolo <code>/</code> (Exemplo: <code>8 / 2</code>).</li>
            </ul>
          </div>

          <div v-else-if="selectedSection === 'Operações Avançadas'">
            <h3 class="mb-2">Operações Avançadas:</h3>
            <ul class="list-disc pl-6">
              <li>Potenciação: Utilize o símbolo <code>^</code> (Exemplo: <code>2^3</code> para 2 elevado à 3).</li>
              <li>Raiz Quadrada: Utilize <code>sqrt()</code> (Exemplo: <code>sqrt(9)</code> para a raiz quadrada de 9).
              </li>
              <li>Funções Trigonométricas: Utilize <code>sin()</code>, <code>cos()</code>, <code>tan()</code> (Exemplo:
                <code>sin(0.5)</code>).
              </li>
              <li>Logaritmo Natural: Utilize <code>log()</code> (Exemplo: <code>log(10)</code> para o logaritmo natural de
                10).</li>
            </ul>
          </div>

          <div class="mt-4">
            <p>Lembre-se, você pode usar a calculadora digitando contas como você faz no papel. Tente escrever diferentes
              tipos de contas para ver os resultados!</p>
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
      sections: [
        'Operações Básicas', 'Operações Avançadas'
      ],
    };
  },
}
</script>
  
<style scoped>
#instruction-card {
  background: black !important;
  color: rgb(145, 249, 249, 0.864);
  border: 3px solid gray;
  border-radius: 10px;
}
</style>
  