<template>
  <div>
    <h6 class="fw-bold text-uppercase text-secondary mb-3 border-bottom pb-2">
      Habilidades Técnicas
    </h6>

    <!-- Categorías -->
    <div
      v-for="(cat, catIndex) in skills"
      :key="cat.id"
      class="border rounded p-3 mb-3 bg-light"
    >
      <!-- Nombre de la categoría -->
      <div class="d-flex justify-content-between align-items-center mb-2">
        <input
          type="text"
          class="form-control form-control-sm fw-semibold"
          placeholder="Nombre de la categoría (ej: Backend, Frontend...)"
          :value="cat.category"
          @input="cat.category = $event.target.value"
        />
        <button
          v-if="skills.length > 1"
          type="button"
          class="btn btn-outline-danger btn-sm ms-2"
          @click="$emit('remove-category', cat.id)"
        >
          &times;
        </button>
      </div>

      <!-- Items de la categoría -->
      <div
        v-for="(item, itemIndex) in cat.items"
        :key="itemIndex"
        class="d-flex align-items-center gap-2 mb-1"
      >
        <span class="text-muted" style="font-size: 1rem;">•</span>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Ej: Node.js, Python, Ruby"
          :value="item"
          @input="cat.items[itemIndex] = $event.target.value"
        />
        <button
          type="button"
          class="btn btn-outline-secondary btn-sm"
          style="min-width: 30px;"
          @click="removeItem(cat, itemIndex)"
        >
          &times;
        </button>
      </div>

      <!-- Agregar item -->
      <div class="d-flex gap-2 mt-2">
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Nueva habilidad... (Enter para agregar)"
          v-model="newItems[catIndex]"
          @keydown.enter.prevent="addItem(cat, catIndex)"
        />
        <button
          type="button"
          class="btn btn-outline-primary btn-sm"
          @click="addItem(cat, catIndex)"
        >
          +
        </button>
      </div>
    </div>

    <!-- Agregar categoría -->
    <button
      type="button"
      class="btn btn-outline-primary btn-sm w-100"
      @click="$emit('add-category')"
    >
      + Agregar categoría
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  skills: {
    type: Array,
    required: true
  }
})

defineEmits(['add-category', 'remove-category'])

// Un input temporal por cada categoría
const newItems = ref(props.skills.map(() => ''))

watch(() => props.skills.length, (newLen) => {
  // Sincroniza newItems cuando se agrega/elimina categoría
  while (newItems.value.length < newLen) newItems.value.push('')
  if (newItems.value.length > newLen) newItems.value.splice(newLen)
})

function addItem(cat, catIndex) {
  const val = newItems.value[catIndex]?.trim()
  if (val) {
    cat.items.push(val)
    newItems.value[catIndex] = ''
  }
}

function removeItem(cat, itemIndex) {
  cat.items.splice(itemIndex, 1)
}
</script>
