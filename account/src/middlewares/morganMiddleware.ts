import morgan, { StreamOptions } from 'morgan';
import logger from '../utils/logger';

const stream: StreamOptions = {
  write: (message: string) => logger.http(message),
};

const loggerMiddleware = morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', {
  stream,
});

export default loggerMiddleware;
