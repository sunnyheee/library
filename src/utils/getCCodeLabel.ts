import { cCodeOptions } from '@/config/cCodeOptions'

export function getCCodeLabel(cCode: string) {
  const audienceCode = cCode.charAt(0)
  const formCode = cCode.charAt(1)
  const categoryCode = cCode.slice(2)

  const audience = cCodeOptions.audiences.find(
    (option) => option.value === audienceCode,
  )?.label
  const form = cCodeOptions.forms.find(
    (option) => option.value === formCode,
  )?.label
  const category = cCodeOptions.categories.find(
    (option) => option.value === categoryCode,
  )?.label

  return `${audience || ''} / ${form || ''} / ${category || ''}`
}
