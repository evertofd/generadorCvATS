<template>
  <div>
    <h6 class="fw-bold text-uppercase text-secondary mb-3 border-bottom pb-2">
      Habilidades Personales
    </h6>

    <div
      v-for="(skill, index) in skills"
      :key="index"
      class="d-flex align-items-center gap-2 mb-2"
    >
      <span class="text-muted">•</span>
      <input
        type="text"
        class="form-control form-control-sm"
        placeholder="Ej: Trabajo en equipo"
        :value="skill"
        @input="skills[index] = $event.target.value"
      />
      <button
        type="button"
        class="btn btn-outline-danger btn-sm"
        style="min-width: 30px;"
        @click="$emit('remove', index)"
      >
        &times;
      </button>
    </div>

    <div v-if="skills.length === 0" class="text-muted small mb-2">
      Aún no has agregado habilidades personales.
    </div>

    <div class="d-flex gap-2 mt-1">
      <input
        type="text"
        class="form-control form-control-sm"
        placeholder="Nueva habilidad personal... (Enter para agregar)"
        v-model="inputSkill"
        @keydown.enter.prevent="handleAdd"
      />
      <button
        type="button"
        class="btn btn-outline-primary btn-sm"
        @click="handleAdd"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  skills: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add', 'remove'])

const inputSkill = ref('')

function handleAdd() {
  if (inputSkill.value.trim()) {
    emit('add', inputSkill.value.trim())
    inputSkill.value = ''
  }
}
</script>
