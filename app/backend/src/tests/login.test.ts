import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';
import {mockUserLogin, mockToken, inputLogin} from './mocks/mockLogin'
import User from '../database/models/UsersModel';
import * as JWT from 'jsonwebtoken'

import { Response } from 'superagent';


chai.use(chaiHttp);

const {expect} = chai;

describe('teste a falha da rota /login', () => {

  beforeEach(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(undefined);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('ao enviar input inválido de usuário', async () => {
    const inputLogin = { email: 'invalid@email.com', password: 'invalid' }
    const response = await chai
      .request(app)
      .post('/login')
      .send(inputLogin);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' })
  });
});

describe('Teste da rota /login', () => {
  beforeEach(async () => {
    sinon.stub(User, 'findOne').resolves(mockUserLogin);
    sinon.stub(JWT, 'sign').resolves(mockToken)
    sinon.stub(JWT, 'verify').resolves()
  })

  afterEach(()=> {
    (User.findOne as sinon.SinonStub).restore();
    (JWT.sign as sinon.SinonStub).restore();
    (JWT.verify as sinon.SinonStub).restore();
  })

  it('testa se o post na rota /login retorna o esperado', async () => {
    const response = await chai.request(app)
    .post('/login')
    .send(inputLogin)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal({token: mockToken})
  })

  it('teste se a rota /login/role retorne o role correto', async ()=> {
    const response = await chai.request(app)
    .get('/login/role')
    .set('Authorization', mockToken);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({role: 'admin'})
  })
})

