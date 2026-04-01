<template>
  <div class="app-layout">

    <!-- SIDEBAR FORMULARIO -->
    <aside class="panel-form border-end shadow-sm">
      <div class="panel-form-inner">
        <CvForm
          :cv-data="cvData"
          @add-experience="addExperience"
          @remove-experience="removeExperience"
          @add-education="addEducation"
          @remove-education="removeEducation"
          @add-skill-category="addSkillCategory"
          @remove-skill-category="removeSkillCategory"
          @add-personal-skill="addPersonalSkill"
          @remove-personal-skill="removePersonalSkill"
        />
      </div>
    </aside>

    <!-- PANEL PREVIEW -->
    <main class="panel-preview bg-secondary bg-opacity-10">
      <!-- Barra superior del preview -->
      <div class="preview-toolbar d-flex justify-content-between align-items-center px-4 py-2 bg-white border-bottom shadow-sm">
        <span class="fw-semibold text-muted small">Vista previa</span>
        <button
          class="btn btn-dark btn-sm px-4"
          :disabled="isGenerating"
          @click="downloadPdf"
        >
          <span v-if="isGenerating" class="spinner-border spinner-border-sm me-2" role="status"></span>
          {{ isGenerating ? 'Generando PDF...' : 'Descargar PDF' }}
        </button>
      </div>

      <!-- Contenedor del CV preview -->
      <div class="preview-scroll py-4 px-3 d-flex justify-content-center">
        <div class="cv-sheet shadow">
          <CvPreview ref="cvPreviewRef" :cv-data="cvData" />
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'
import CvForm from './components/CvForm.vue'
import CvPreview from './components/CvPreview.vue'
import { useCvData } from './composables/useCvData'

const {
  cvData,
  addExperience,
  removeExperience,
  addEducation,
  removeEducation,
  addSkillCategory,
  removeSkillCategory,
  addPersonalSkill,
  removePersonalSkill
} = useCvData()

const cvPreviewRef = ref(null)
const isGenerating = ref(false)

async function downloadPdf() {
  const element = cvPreviewRef.value?.cvPage
  if (!element) return

  isGenerating.value = true

  const filename = cvData.personal.name
    ? `CV_${cvData.personal.name.replace(/\s+/g, '_')}.pdf`
    : 'curriculum.pdf'

  const options = {
    margin: [8, 8, 8, 8],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  try {
    await html2pdf().set(options).from(element).save()
  } finally {
    isGenerating.value = false
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  height: 100%;
  width: 100%;
}

.app-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* Panel formulario */
.panel-form {
  width: 420px;
  min-width: 320px;
  max-width: 480px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.panel-form-inner {
  flex: 1;
  overflow-y: auto;
}

/* Panel preview */
.panel-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-scroll {
  flex: 1;
  overflow-y: auto;
}

/* Hoja A4 simulada */
.cv-sheet {
  width: 210mm;
  min-height: 297mm;
  background: #fff;
}

/* Scrollbar sutil */
.panel-form-inner::-webkit-scrollbar {
  width: 5px;
}
.panel-form-inner::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.preview-scroll::-webkit-scrollbar {
  width: 6px;
}
.preview-scroll::-webkit-scrollbar-thumb {
  background: #aaa;
  border-radius: 4px;
}
</style>
