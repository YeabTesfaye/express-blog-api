import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index"; 


chai.should();
chai.use(chaiHttp);

describe("GET /api/v1/blogs", () => {
  it("should return all blogs", (done) => {
    chai
      .request(app)
      .get("/api/v1/blogs")
      .end((err, res) => {
        if (err) done(err); 
        res.should.have.status(200); 
        res.should.be.json; 
        res.body.should.be.an("object"); 
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("data").that.is.an("array"); 
        done(); 
      });
  });
});

const blogId = "673751b8203c1bb24b4b48ce";

describe(`GET /api/v1/blogs/${blogId}`, () => {
  it("should return a single blog", (done) => {
    chai.request(app)
      .get(`/api/v1/blogs/${blogId}`)
      .end((err, res) => {
        if (err) return done(err); 
        res.should.have.status(200)
          .and.be.json;
        res.body.should.have.property("status", "success");
        res.body.should.have.property("data").that.is.an("object");
        done();
      });
  });
});





