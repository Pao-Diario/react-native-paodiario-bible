export function getBibleVersions(): IBibleVersion[] {
  return [
    {
      slug: "nvt",
      title: "NVT",
      fullName: "Nova Versão Transformadora (NVT)",
      language: "pt-br",
    },
    {
      slug: "nvi",
      title: "NVI",
      fullName: "Nova Versão Internacional (NVI)",
      language: "pt-br",
    },
    {
      slug: "aa",
      title: "AA",
      fullName: "Almeida Revisada Imprensa Bíblica (AA)",
      language: "pt-br",
    },
    {
      slug: "acf",
      title: "ACF",
      fullName: "Almeida Corrigida e Fiel (ACF)",
      language: "pt-br",
    },
  ];
}

export function getBibleBySlug(slug: string) {
  return getBibleVersions().find((item) => item.slug === slug);
}
