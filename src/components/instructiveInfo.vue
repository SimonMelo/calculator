<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md">
      <v-card id="instruction-card">
        <v-card-title style="display: flex; justify-content: center;" class="headline">Instruções da
          Calculadora</v-card-title>
        <v-card-text class="paragraph" style="display: flex; justify-content: center;">Aqui, você encontrará informações
          sobre as operações matemáticas que podem ser realizadas.</v-card-text>
        <v-card-text>
          <div class="mb-4">
            <label for="sectionSelect" class="text-sm">Selecione uma seção para te ajudar:</label>
            <v-select v-model="selectedSection" :items="sections" id="sectionSelect"
              class="block w-full mt-1 p-2 border rounded"></v-select>
          </div>

          <v-divider class="mb-4"></v-divider>

          <div v-if="selectedSection === 'Operações Básicas'">
            <h3 class="paragraph mb-2">Operações Básicas:</h3>
            <ul class="list-disc pl-6">
              <li>Adição: Utilize o símbolo <code>+</code> (Exemplo: <code>2 + 3</code>).</li>
              <li>Subtração: Utilize o símbolo <code>-</code> (Exemplo: <code>5 - 2</code>).</li>
              <li>Multiplicação: Utilize o símbolo <code>*</code> (Exemplo: <code>4 * 6</code>).</li>
              <li>Divisão: Utilize o símbolo <code>/</code> (Exemplo: <code>8 / 2</code>).</li>
            </ul>
          </div>

          <div v-else-if="selectedSection === 'Operações Avançadas'">
            <h3 class="paragraph mb-2">Operações Avançadas:</h3>
            <ul class="list-disc pl-6">
              <li>Potenciação: Utilize o símbolo <code>^</code> (Exemplo: <code>2^3</code> para 2 elevado à 3).</li>
              <li>Raiz Quadrada: Utilize <code>sqrt()</code> (Exemplo: <code>sqrt(9)</code> para a raiz quadrada de 9).
              </li>
              <li>Funções Trigonométricas: Utilize <code>sin()</code>, <code>cos()</code>, <code>tan()</code> (Exemplo:
                <code>sin(0.5)</code>).
              </li>
              <li>Logaritmo Natural: Utilize <code>log()</code> (Exemplo: <code>log(10)</code> para o logaritmo natural de
                10).</li>
              <li>Símbolo π/pi (Pi): Pode ser representado como <code>π</code> ou <code>pi</code>. Exemplo:
                <code>2 * π</code> para 2 ou <code>2 * pi</code> para 2 multiplicado por Pi.
              </li>
              <li>Notação Científica: Utilize <code>e</code> para representar a base 10 (Exemplo: <code>3e2</code> para 3
                vezes 10 elevado a 2).</li>
            </ul>
          </div>


          <div v-else-if="selectedSection === 'Outras informações'">
            <h3 class="paragraph mb-2">Outras informações:</h3>
            <ul class="list-disc pl-6">
              <li>Adicionar ao histórico: Utilize o botão com símbolo <code>+</code> para poder salvar suas expressões.
              </li>
              <li>Apagar expressões: Utilize o botão com o <code>X</code> para limpar o campo.</li>
              <li>Visualizar histórico: Utilize o botão com o símbolo circular para visualizar as expressões salvas.</li>
            </ul>
          </div>

          <div v-else-if="selectedSection === 'Expressões de exemplo'">
            <h3 class="paragraph mb-2">Expressões de exemplo:</h3>
            <ul class="list-disc pl-6">
              <li><code>(2 x 3 - 4)² + 10</code> (Escrita comum) = <code>sqrt(2 * 3 - 4) + 10</code> (Calculadora).</li>
              <li><code>√169</code> (Escrita comum) = <code>sqrt(169)</code> (Calculadora).</li>
              <li><code>2 + 3 * 4</code> (Escrita comum) = <code>2 + (3 * 4)</code> (Calculadora).</li>
              <li><code>sin(30) + cos(60)</code> (Escrita comum) = <code>sen(30) + cos(60)</code> (Calculadora).</li>
              <li><code>log(1000)</code> (Escrita comum) = <code>log10(1000)</code> (Calculadora).</li>
              <li><code>2^3</code> (Escrita comum) = <code>2³</code> (Calculadora).</li>
              <li><code>10 / (2 + 3)</code> (Escrita comum) = <code>10 / (2 + 3)</code> (Calculadora).</li>
            </ul>
          </div>


          <div class="paragraph mt-4">
            <p>Lembre-se, você pode usar a calculadora digitando contas como você faz no papel. Tente escrever diferentes
              tipos de contas para ver os resultados!</p>
            <p>Use parênteses <code>( )</code> para agrupar operações e definir a ordem de avaliação.</p>
            <p>Experimente diferentes funções matemáticas para explorar ainda mais as capacidades da calculadora.</p>
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
      selectedSection: 'Selecione',
      sections: ['Operações Básicas', 'Operações Avançadas', 'Outras informações', 'Expressões de exemplo'],
    };
  },
}
</script>

<style scoped>
#instruction-card {
  background: black !important;
  color: white;
  border: 3px solid gray;
  border-radius: 10px;
}

.paragraph {
  font-size: 18px;
}
</style>
