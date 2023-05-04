export const secteursQuery = `query secteursQuery {
  secteurs (first: 100) {
    nodes {
      databaseId
      name
      slug
      uri
    }
  }
}
`
export const niveauxQuery = `query niveauxQuery {
  niveaux (first: 100) {
    nodes {
      databaseId
      name
      slug
      uri
    }
  }
}
`
export const categoriesQuery = `
  query Category {
    categories (where: { parent: 16 }) {
      nodes {
        databaseId
        name
        slug
        uri
      }
    }
  }
`

export const regionsQuery = `
  query Region {
    regions (first: 100) {
      nodes {
        databaseId
        name
        slug
        uri
      }
    }
    last: regions (first: 100, after: "YXJyYXljb25uZWN0aW9uOjMxNQ==") {
      nodes {
        databaseId
        name
        slug
        uri
      }
    }
  }
`

export const categoriesWhithoutChildrenQuery = `
  query Category {
    categories (where: { hideEmpty: true, childless: true, excludeTree:["16", "88", "192", "193", "194", "349"] }) {
      nodes {
        slug
      }
    }
  }
`
