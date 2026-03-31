<template>
  <div>
    <h6 class="fw-bold text-uppercase text-secondary mb-3 border-bottom pb-2">
      Presentación
    </h6>

    <div class="mb-3">
      <label class="form-label fw-semibold">Resumen profesional</label>
      <textarea
        class="form-control"
        rows="5"
        placeholder="Breve descripción de tu perfil profesional (máx. 5 líneas)..."
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
      <div class="form-text">Máximo 5 líneas recomendadas.</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>
