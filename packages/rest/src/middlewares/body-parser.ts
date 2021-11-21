import { Handler } from '../server';
import { ExpressModule } from '../third-party';

type Dependencies = {
  express: ExpressModule;
};

export default function bodyParserMiddleware({ express }: Dependencies): Handler {
  return (req, res, next) => {
    const jsonHandler = express.json();
    jsonHandler(req, res, next);
  };
}
