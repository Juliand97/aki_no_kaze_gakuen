export const technicalSheetCategories = [
  { id: 'fich_tecn_de_dibu_plan', title: 'Ficha Técnica de Dibujo Plano' },
  { id: 'fich_tecn_de_dibu_plan_de_inte', title: 'Ficha Técnica de Dibujo Plano de Interiores' },
  { id: 'fich_tecn_de_dise', title: 'Ficha Técnica de Diseño' },
  { id: 'fich_tecn_de_atue_apro', title: 'Ficha Técnica de Atuendo Aprobado' },
  { id: 'fich_tecn_de_insp', title: 'Ficha Técnica de Inspiración' },
  { id: 'fich_tecn_de_bord', title: 'Ficha Técnica de Bordado' },
  { id: 'fich_tecn_de_recu', title: 'Ficha Técnica de Recursos' },
  { id: 'fich_tecn_de_tint_manu', title: 'Ficha Técnica de Tinturado Manual' },
  { id: 'fich_tecn_de_cart_de_mate', title: 'Ficha Técnica de Carta de Material' },
] as const

export const technicalSheetImages = import.meta.glob(
  '../assets/ficha_tecnica/**/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

export function getMemberSheetImages(username: string) {
  const memberPath = `/ficha_tecnica/${username}/`
  return Object.entries(technicalSheetImages).filter(([path]) => path.includes(memberPath))
}

export function getCategorySheetImages(username: string, categoryId: string) {
  const categoryPath = `/ficha_tecnica/${username}/${categoryId}/`
  return Object.entries(technicalSheetImages)
    .filter(([path]) => path.includes(categoryPath))
    .map(([path, src]) => ({ path, src }))
}
