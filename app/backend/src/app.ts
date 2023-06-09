import 'express-async-errors';
import * as express from 'express';
import ErrorHandler from './api/middleware/ErrorHandler';
import loginRouter from './api/routers/Login';
import teamsRouter from './api/routers/Team';
import matchRouter from './api/routers/Match';
import leaderBoardRouter from './api/routers/LeaderBoard';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();
    this.errorMiddleware();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private routes(): void {
    this.app.use('/teams', teamsRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/matches', matchRouter);
    this.app.use('/leaderboard', leaderBoardRouter);
  }

  private errorMiddleware() {
    this.app.use(ErrorHandler.handle);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
