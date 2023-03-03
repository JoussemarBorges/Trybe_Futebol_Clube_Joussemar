import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';
import listTeams from './mocks/mockTeams';
import Teams from '../database/models/TeamsModel';

// import { Response } from 'superagent';


chai.use(chaiHttp);

const {expect} = chai;

describe('Testando o fluxo Teams', () => {


  beforeEach(async () => {
    sinon.stub(Teams, 'findAll').resolves(listTeams)
    sinon.stub(Teams, 'findByPk').resolves(listTeams[0])
  });

  afterEach(() => {
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findByPk as sinon.SinonStub).restore();
  });

  it('Testando se o método GET retorna todos os times', async ()=> {
    
    //Arrange -> Mocks vão aqui,
        
    //Action -> Ação ou chamada da função,
    const response = await chai.request(app).get('/teams')

    //assertion -> Se o resultado é o esperado "Expect",
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(listTeams);
  })

  it('Testando se o método GET retorna um id específico', async ()=> {
    
    //Arrange -> Mocks vão aqui,
        
    //Action -> Ação ou chamada da função,
    const response = await chai.request(app).get('/teams/1')

    //assertion -> Se o resultado é o esperado "Expect",
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(listTeams[0]);
  })
})