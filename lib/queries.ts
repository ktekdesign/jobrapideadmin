export const query = `
  query UserPost {
    posts(first: 10
      where: {
        author: $userId
        offsetPagination: { size: 10, offset: $page
          }
        orderby: { field: DATE, order: DESC }
      }
    ){
      pageInfo {
      offsetPagination {
          total
      }
    }
    
    nodes {
      title
      date
      uri
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    }
  }
  `;
