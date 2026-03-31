<template>
  <div>
    <h6 class="fw-bold text-uppercase text-secondary mb-3 border-bottom pb-2">
      Estudios
    </h6>

    <div
      v-for="(edu, index) in education"
      :key="edu.id"
      class="border rounded p-3 mb-3 bg-light"
    >
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="fw-semibold text-primary small">Estudio {{ index + 1 }}</span>
        <button
          v-if="education.length > 1"
          type="button"
          class="btn btn-outline-danger btn-sm"
          @click="$emit('remove', edu.id)"
        >
          &times; Eliminar
        </button>
      </div>

      <div class="row g-2">
        <div class="col-12">
          <label class="form-label small fw-semibold">Institución</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Nombre de la institución"
            :value="edu.institution"
            @input="edu.institution = $event.target.value"
          />
        </div>
        <div class="col-12">
          <label class="form-label small fw-semibold">Carrera / Curso</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Ej: Ingeniería en Informática"
            :value="edu.degree"
            @input="edu.degree = $event.target.value"
          />
        </div>
        <div class="col-12">
          <label class="form-label small fw-semibold">Periodo / Año</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Ej: 2015 - 2020"
            :value="edu.period"
            @input="edu.period = $event.target.value"
          />
        </div>
      </div>
    </div>

    <button
      type="button"
      class="btn btn-outline-primary btn-sm w-100"
      @click="$emit('add')"
    >
      + Agregar estudio
    </button>
  </div>
</template>

<script setup>
defineProps({
  education: {
    type: Array,
    required: true
  }
})

defineEmits(['add', 'remove'])
</script>
