# GraphQL API - Books

## Run

`node ./src/index.js`

### Supported Types

Book

- title
- author
- contentType (FICTION | NON_FICTION)

### Supported Queries Examples

Get titles of all non-fiction books

```{
  getBooksByContentType(contentType: NON_FICTION){
     title
  }
}
```

Search all books with "J." in title or author's name

```
{
 searchBooks(searchTerm: "J."){
  title
  author
  contentType
}
}
```
