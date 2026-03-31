<template>
  <div>
    <h6 class="fw-bold text-uppercase text-secondary mb-3 border-bottom pb-2">
      Experiencia Profesional
    </h6>

    <div
      v-for="(exp, index) in experience"
      :key="exp.id"
      class="border rounded p-3 mb-3 bg-light position-relative"
    >
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="fw-semibold text-primary small">Experiencia {{ index + 1 }}</span>
        <button
          v-if="experience.length > 1"
          type="button"
          class="btn btn-outline-danger btn-sm"
          @click="$emit('remove', exp.id)"
        >
          &times; Eliminar
        </button>
      </div>

      <div class="row g-2">
        <div class="col-12 col-md-6">
          <label class="form-label small fw-semibold">Empresa</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Nombre de la empresa"
            :value="exp.company"
            @input="exp.company = $event.target.value"
          />
        </div>
        <div class="col-12 col-md-6">
          <label class="form-label small fw-semibold">Cargo</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Ej: Senior Developer"
            :value="exp.position"
            @input="exp.position = $event.target.value"
          />
        </div>
        <div class="col-12">
          <label class="form-label small fw-semibold">Periodo</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Ej: 2022 - 2024"
            :value="exp.period"
            @input="exp.period = $event.target.value"
          />
        </div>
        <div class="col-12">
          <label class="form-label small fw-semibold">
            Descripción
            <span class="text-muted fw-normal">(usa "-" al inicio de una línea para bullets)</span>
          </label>
          <textarea
            class="form-control form-control-sm"
            rows="4"
            placeholder="- Desarrollé funcionalidades clave en...&#10;- Implementé integración con...&#10;&#10;Stack: Vue.js, Node.js, PostgreSQL"
            :value="exp.description"
            @input="exp.description = $event.target.value"
          ></textarea>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="btn btn-outline-primary btn-sm w-100"
      @click="$emit('add')"
    >
      + Agregar experiencia
    </button>
  </div>
</template>

<script setup>
defineProps({
  experience: {
    type: Array,
    required: true
  }
})

defineEmits(['add', 'remove'])
</script>
