<template>
  <div>
    <h6 class="fw-bold text-uppercase text-secondary mb-3 border-bottom pb-2">
      Información Personal
    </h6>

    <div class="mb-3">
      <label class="form-label fw-semibold">Nombre completo</label>
      <input
        type="text"
        class="form-control"
        placeholder="Ej: Juan Pérez García"
        :value="personal.name"
        @input="personal.name = $event.target.value"
      />
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold">Cargo / Título profesional</label>
      <input
        type="text"
        class="form-control"
        placeholder="Ej: Full Stack Developer"
        :value="personal.title"
        @input="personal.title = $event.target.value"
      />
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold">Correo electrónico</label>
      <input
        type="email"
        class="form-control"
        placeholder="correo@ejemplo.com"
        :value="personal.email"
        @input="personal.email = $event.target.value"
      />
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold">Teléfono</label>
      <input
        type="text"
        class="form-control"
        placeholder="+56 9 1234 5678"
        :value="personal.phone"
        @input="personal.phone = $event.target.value"
      />
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold">LinkedIn (URL)</label>
      <input
        type="text"
        class="form-control"
        placeholder="https://linkedin.com/in/tu-perfil"
        :value="personal.linkedin"
        @input="personal.linkedin = $event.target.value"
      />
    </div>

    <div class="mb-3">
      <label class="form-label fw-semibold">GitHub (URL)</label>
      <input
        type="text"
        class="form-control"
        placeholder="https://github.com/tu-usuario"
        :value="personal.github"
        @input="personal.github = $event.target.value"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  personal: {
    type: Object,
    required: true
  }
})
</script>
