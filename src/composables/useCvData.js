import { reactive } from 'vue'

let nextId = 10

export function useCvData() {
  const cvData = reactive({
    personal: {
      name: '',
      title: '',
      email: '',
      phone: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [
      {
        id: 1,
        company: '',
        position: '',
        period: '',
        description: ''
      }
    ],
    education: [
      {
        id: 2,
        institution: '',
        degree: '',
        period: '',
        description: ''
      }
    ],
    skills: [
      { id: 3, category: '', items: [] }
    ],
    personalSkills: []
  })

  function addExperience() {
    cvData.experience.push({
      id: nextId++,
      company: '',
      position: '',
      period: '',
      description: ''
    })
  }

  function removeExperience(id) {
    const idx = cvData.experience.findIndex(e => e.id === id)
    if (idx !== -1) cvData.experience.splice(idx, 1)
  }

  function addEducation() {
    cvData.education.push({
      id: nextId++,
      institution: '',
      degree: '',
      period: '',
      description: ''
    })
  }

  function removeEducation(id) {
    const idx = cvData.education.findIndex(e => e.id === id)
    if (idx !== -1) cvData.education.splice(idx, 1)
  }

  function addPersonalSkill(skill) {
    const trimmed = skill.trim()
    if (trimmed) cvData.personalSkills.push(trimmed)
  }

  function removePersonalSkill(index) {
    cvData.personalSkills.splice(index, 1)
  }

  function addSkillCategory() {
    cvData.skills.push({ id: nextId++, category: '', items: [] })
  }

  function removeSkillCategory(id) {
    const idx = cvData.skills.findIndex(s => s.id === id)
    if (idx !== -1) cvData.skills.splice(idx, 1)
  }

  return {
    cvData,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
    addSkillCategory,
    removeSkillCategory,
    addPersonalSkill,
    removePersonalSkill
  }
}
