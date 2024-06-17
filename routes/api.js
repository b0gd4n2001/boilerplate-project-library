/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const BookModel = require('../mongoDB_models/books.js')

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      const books = await BookModel.find();
      res.send(books ?? 'no book exists');
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(async function (req, res) {
      let title = req.body.title;
      try {
        const book = await BookModel.create({ title: title });
        console.log(book)
        res.send(book);
      } catch {
        res.send('missing required field title')
      }
      //response will contain new book object including atleast _id and title
    })

    .delete(async function (req, res) {
      await BookModel.deleteMany();
      res.send('complete delete successful');
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async function (req, res) {
      let bookid = req.params.id;
      const book = await BookModel.findOne({ _id: bookid });
      res.send(book ?? 'no book exists');
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) return res.send('missing required field comment')
      const book = await BookModel.findOne({ _id: bookid });
      if (!book) return res.send('no book exists')
      book.comments.push(comment);
      book.commentcount++;
      book.save();
      res.send(book);
      //json res format same as .get
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;
      const result = await BookModel.deleteOne({ _id: bookid });
      if (!result.deletedCount) return res.send('no book exists');
      res.send('delete successful')
      //if successful response will be 'delete successful'
    });

};
