<template>
  <div class="cv-page" ref="cvPage">

    <!-- HEADER -->
    <div class="cv-header">
      <h1 class="cv-name">{{ cvData.personal.name || 'Tu Nombre Completo' }}</h1>
      <p class="cv-title">{{ cvData.personal.title || 'Cargo / Título Profesional' }}</p>

      <div class="cv-contact">
        <span v-if="cvData.personal.email">
          <strong>Correo:</strong> {{ cvData.personal.email }}
        </span>
        <span v-if="cvData.personal.phone">
          <strong>Teléfono:</strong> {{ cvData.personal.phone }}
        </span>
        <span v-if="cvData.personal.linkedin">
          <strong>LinkedIn:</strong>
          <a :href="cvData.personal.linkedin" target="_blank" class="cv-link">{{ cvData.personal.linkedin }}</a>
        </span>
        <span v-if="cvData.personal.github">
          <strong>GitHub:</strong>
          <a :href="cvData.personal.github" target="_blank" class="cv-link">{{ cvData.personal.github }}</a>
        </span>
      </div>
    </div>

    <!-- PRESENTACIÓN -->
    <div v-if="cvData.summary" class="cv-section">
      <h2 class="cv-section-title">Perfil Profesional</h2>
      <p class="cv-summary">{{ cvData.summary }}</p>
    </div>

    <!-- EXPERIENCIA PROFESIONAL -->
    <div v-if="hasExperience" class="cv-section">
      <h2 class="cv-section-title">Experiencia Profesional</h2>

      <div
        v-for="exp in cvData.experience"
        :key="exp.id"
        class="cv-entry"
      >
        <div v-if="exp.company || exp.position" class="cv-entry-header">
          <span class="cv-entry-role">{{ exp.position }}</span>
          <span v-if="exp.position && exp.company"> – </span>
          <span class="cv-entry-org">{{ exp.company }}</span>
        </div>
        <p v-if="exp.period" class="cv-entry-period">Periodo: {{ exp.period }}</p>
        <ul v-if="exp.description" class="cv-entry-desc">
          <template v-for="(line, i) in parseDescription(exp.description)" :key="i">
            <li v-if="line.type === 'bullet'" class="cv-bullet">{{ line.text }}</li>
            <li v-else-if="line.type === 'text'" class="cv-text-line">{{ line.text }}</li>
          </template>
        </ul>
      </div>
    </div>

    <!-- ESTUDIOS -->
    <div v-if="hasEducation" class="cv-section">
      <h2 class="cv-section-title">Estudios</h2>

      <div
        v-for="edu in cvData.education"
        :key="edu.id"
        class="cv-entry"
      >
        <div v-if="edu.institution || edu.degree" class="cv-entry-header">
          <span class="cv-entry-role">{{ edu.degree }}</span>
          <span v-if="edu.degree && edu.institution"> – </span>
          <span class="cv-entry-org">{{ edu.institution }}</span>
        </div>
        <p v-if="edu.period" class="cv-entry-period">{{ edu.period }}</p>
        <ul v-if="edu.description" class="cv-entry-desc">
          <template v-for="(line, i) in parseDescription(edu.description)" :key="i">
            <li v-if="line.type === 'bullet'" class="cv-bullet">{{ line.text }}</li>
            <li v-else-if="line.type === 'text'" class="cv-text-line">{{ line.text }}</li>
          </template>
        </ul>
      </div>
    </div>

    <!-- HABILIDADES -->
    <div v-if="hasSkills" class="cv-section">
      <h2 class="cv-section-title">Habilidades Técnicas</h2>
      <div class="cv-skills-grid">
        <div
          v-for="cat in cvData.skills"
          :key="cat.id"
          class="cv-skill-category"
        >
          <p v-if="cat.category" class="cv-skill-cat-name">{{ cat.category }}</p>
          <ul class="cv-skill-list">
            <li v-for="(item, i) in cat.items" :key="i">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- HABILIDADES PERSONALES -->
    <div v-if="cvData.personalSkills.length > 0" class="cv-section">
      <h2 class="cv-section-title">Habilidades Personales</h2>
      <ul class="cv-skill-list">
        <li v-for="(skill, i) in cvData.personalSkills" :key="i">{{ skill }}</li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  cvData: {
    type: Object,
    required: true
  }
})

const cvPage = ref(null)
defineExpose({ cvPage })

const hasExperience = computed(() =>
  props.cvData.experience.some(e => e.company || e.position)
)

const hasEducation = computed(() =>
  props.cvData.education.some(e => e.institution || e.degree)
)

const hasSkills = computed(() =>
  props.cvData.skills.some(cat => cat.category || cat.items.length > 0)
)

function parseDescription(text) {
  return text.split('\n').map(line => {
    const trimmed = line.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      return { type: 'bullet', text: trimmed.replace(/^[-•]\s*/, '') }
    }
    return { type: 'text', text: trimmed }
  }).filter(Boolean)
}
</script>

<style scoped>
.cv-page {
  background: #fff;
  width: 100%;
  padding: 14mm 16mm;
  font-family: 'Calibri', 'Helvetica Neue', Arial, sans-serif;
  color: #1a1a1a;
  font-size: 9.5pt;
  line-height: 1.5;
  box-sizing: border-box;
}

/* HEADER */
.cv-header {
  text-align: center;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1a1a1a;
}

.cv-name {
  font-size: 20pt;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0 0 4px 0;
  text-transform: uppercase;
  font-style: italic;
}

.cv-title {
  font-size: 11pt;
  font-weight: 600;
  font-style: italic;
  margin: 0 0 8px 0;
  color: #333;
}

.cv-contact {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px 18px;
  font-size: 8.5pt;
  color: #444;
}

.cv-link {
  color: #1a1a1a;
  text-decoration: underline;
}

/* SECTIONS */
.cv-section {
  margin-bottom: 14px;
}

.cv-summary {
  margin: 0;
  text-align: justify;
  font-size: 9pt;
}

.cv-section-title {
  font-size: 10pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #1a1a1a;
  padding-bottom: 2px;
  margin: 0 0 8px 0;
}

/* ENTRIES */
.cv-entry {
  margin-bottom: 10px;
}

.cv-entry-header {
  margin: 0 0 1px 0;
}

.cv-entry-role {
  font-weight: 700;
  font-size: 9.5pt;
}

.cv-entry-org {
  font-weight: 700;
  font-size: 9.5pt;
}

.cv-entry-period {
  font-size: 8.5pt;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
}

.cv-entry-desc {
  list-style-type: disc;
  padding-left: 18px;
  margin: 0;
}

.cv-bullet {
  font-size: 9pt;
  margin-bottom: 2px;
}

.cv-text-line {
  list-style-type: none;
  font-size: 9pt;
  margin: 0 0 2px 0;
}

/* SKILLS */
.cv-skills-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cv-skill-category {
  break-inside: avoid;
}

.cv-skill-cat-name {
  font-weight: 700;
  font-size: 9pt;
  margin: 0 0 2px 0;
}

.cv-skill-list {
  list-style-type: disc;
  padding-left: 16px;
  margin: 0 0 6px 0;
}

.cv-skill-list li {
  font-size: 8.5pt;
  line-height: 1.5;
}
</style>
