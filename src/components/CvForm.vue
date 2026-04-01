<template>
  <div class="cv-form h-100 overflow-y-auto px-3 py-4">
    <h5 class="fw-bold mb-4">Datos del Currículum</h5>

    <!-- Información Personal -->
    <div class="mb-4">
      <PersonalInfoForm :personal="cvData.personal" />
    </div>

    <!-- Presentación -->
    <div class="mb-4">
      <SummaryForm v-model="cvData.summary" />
    </div>

    <!-- Experiencia -->
    <div class="mb-4">
      <ExperienceForm
        :experience="cvData.experience"
        @add="addExperience"
        @remove="removeExperience"
      />
    </div>

    <!-- Estudios -->
    <div class="mb-4">
      <EducationForm
        :education="cvData.education"
        @add="addEducation"
        @remove="removeEducation"
      />
    </div>

    <!-- Habilidades -->
    <div class="mb-4">
      <SkillsForm
        :skills="cvData.skills"
        @add-category="$emit('add-skill-category')"
        @remove-category="(id) => $emit('remove-skill-category', id)"
      />
    </div>

    <!-- Habilidades Personales -->
    <div class="mb-4">
      <PersonalSkillsForm
        :skills="cvData.personalSkills"
        @add="(s) => $emit('add-personal-skill', s)"
        @remove="(i) => $emit('remove-personal-skill', i)"
      />
    </div>
  </div>
</template>

<script setup>
import PersonalInfoForm from './form/PersonalInfoForm.vue'
import SummaryForm from './form/SummaryForm.vue'
import ExperienceForm from './form/ExperienceForm.vue'
import EducationForm from './form/EducationForm.vue'
import SkillsForm from './form/SkillsForm.vue'
import PersonalSkillsForm from './form/PersonalSkillsForm.vue'

defineProps({
  cvData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'add-experience',
  'remove-experience',
  'add-education',
  'remove-education',
  'add-skill-category',
  'remove-skill-category',
  'add-personal-skill',
  'remove-personal-skill'
])

const addExperience = () => emit('add-experience')
const removeExperience = (id) => emit('remove-experience', id)
const addEducation = () => emit('add-education')
const removeEducation = (id) => emit('remove-education', id)
</script>

<style scoped>
.cv-form {
  max-height: 100vh;
}
</style>
