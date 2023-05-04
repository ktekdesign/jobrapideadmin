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
      databaseId
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

export const postQuery = `
  query Post {
    post(id: $id, idType: DATABASE_ID) {
      authorDatabaseId
      title
      date
      uri
      content
      featuredImage {
        node {
          databaseId
          sourceUrl
        }
      }
      categories(first: 10) {
        nodes {
        databaseId 
        }
      }
      secteurs(first: 33){
        nodes {
          databaseId 
          }
      }
      regions(first: 100){
        nodes {
          databaseId 
          }
      }
    }
  }
  `;
