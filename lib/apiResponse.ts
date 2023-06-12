export const term_response = `
  name
  uri
`
export const terms_response = `nodes {
  ${term_response}
}`
export const post_response = (isPostPage = false) => `
${isPostPage ? 'databaseId' : ''}  
title
  ${isPostPage ? 'content slug' : 'excerpt'}
  date
  categories(first: ${isPostPage ? 10 : 1}) {
    nodes {
    ${isPostPage ? 'databaseId' : ''}
    ${term_response} 
    }
  }
  ${
    isPostPage
      ? `
  secteurs(first: 10){
    ${terms_response}
  }
  regions(first: 10){
    ${terms_response}
  }`
      : ''
  }
  uri
  featuredImage {
    node {
      sourceUrl
    }
  }`

export const pageInfoSearch = `pageInfo {
  offsetPagination {
      total
  }
}`
export const posts_response = `
  nodes {
    ${post_response()}
  }`
export const seo_response = `
  seo {
    breadcrumbs {
        text
        url
    }
    canonical
    metaDesc
    metaKeywords
    metaRobotsNofollow
    metaRobotsNoindex
    opengraphAuthor
    opengraphDescription
    opengraphModifiedTime
    opengraphPublishedTime
    opengraphPublisher
    opengraphSiteName
    opengraphTitle
    opengraphType
    opengraphUrl
    schema {
        raw
    }
    title
    twitterDescription
    twitterTitle
  }
`
