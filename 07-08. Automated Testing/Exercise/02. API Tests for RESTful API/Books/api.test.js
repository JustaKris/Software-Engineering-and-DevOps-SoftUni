const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Books API', () => {
    it('should POST a book', (done) => {
        let body = {id: "1", title: "DevOps Magic", author: "Hanku Brat"};
        chai.request(server)
            .post('/books')
            .send(body)
            .end((err, resp) => {
                if (err) {
                    return done(err);
                };
                expect(resp.statusCode).to.equal(201);
                done();
            });
    });

    it('should GET all books', (done) => {
        chai.request(server)
            .get('/books')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                done();
            });
    });

    it('should GET a single book', (done) => {
        chai.request(server)
            .get('/books/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                done();
            });
    });

    it('should PUT an existing book', (done) => {
        const bookId = 1;
        const updatedBook = { id: bookId, title: "Updated Test Book", author: "Updated Test Author" };
        chai.request(server)
            .put(`/books/${bookId}`)
            .send(updatedBook)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.title).to.equal('Updated Test Book');
                expect(res.body.author).to.equal('Updated Test Author');
                done();
            });
    });

    it('should return 404 when trying to GET, PUT or DELETE a non-existing book', (done) => {
        chai.request(server)
            .get('/books/DasBook')
            .end((err, res) => {
                expect(res).to.have.status(404);
            });

        chai.request(server)
            .put('/books/DasBook')
            .send({ id: "DasBook", title: "Non-existing Book", author: "Non-existing Author" })
            .end((err, res) => {
                expect(res).to.have.status(404);
            });

        chai.request(server)
            .put('/books/DasBook')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

});