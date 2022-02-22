const chai = require ('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movie tests', () => {
    before((done) =>{
        chai.request(server)
        .post('/authenticate')
        .send({ username: "bkaraaslan", password: "beratk" })
        .end((err, res) => {
            token = res.body.token;
            console.log(token);
            done();
        });
    });
    
    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
            .get('/api/movies')
            .set('x-access-token', token)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    
    describe('/POST movies', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'unit test',
                director_id: '620a6504964caf39375a53bf',
                category: ' Komedi',
                country: 'Tr',
                year: 1988,
                imdb_score: 7
            };
            chai.request(server)
            .post('/api/movies/new')
            .send(movie)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movieId = res.body._id;
                done();
            });
        });
    });

    describe('/GET/:director_id movie', () => {
        it('it should GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/'+ movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        })
    });
});