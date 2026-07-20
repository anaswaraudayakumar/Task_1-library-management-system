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
    filter.nationality = {$regex:query.nationality,$options:"i"};;
  }
  if (query.search) {
    filter.authorName = {$regex:query.search,$options:"i"};
  }
  //filter using name
  const allAuthor = await Author.find(filter);
  return allAuthor;
}
// findone
async function findAuthorByName(name){
    const findAuthor = await Author.findOne({authorName:name})
    return findAuthor
}
async function findAuthorById(id){
  const findAuthor = await Author.findOne(id)
  return findAuthor 
}
async function update(id,authorData){
   const updateAuthor = await Author.findByIdAndUpdate({_id:id},{biography,nationality},{new:true})
   return updateAuthor
}
module.exports = {createAuthor,findAuthors,findAuthorByName,findAuthorById,update}
