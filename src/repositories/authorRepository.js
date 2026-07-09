const Author = require("../models/authorModel");

//create
async function createAuthor(authorData) {
  return await Author.create(authorData);
}
// findall
async function findAuthors(query) {
  //filter
  const filter = {};
  // filter using nationality
  if (query.nationality) {
    filter.nationality = query.nationality;
  }
  //filter using name
  if (query.name) {
    filter.name = query.name;
  }
  const allAuthor = await Author.findOne(filter);
  return allAuthor;
}
// findone
async function findOneAuthor(name){
    const findAuthorByName = await Author.findOne(name)
    return findAuthorByName
}