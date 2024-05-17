import { LoggerOptions, transports, format } from 'winston';
const { combine, timestamp, prettyPrint, json, label, logstash } = format;

export const winstonConfig: LoggerOptions = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple(),
      ),
    }),
    new transports.File({
      format: combine(timestamp(), json(), prettyPrint()),
      level: 'error',
      filename: 'logs/error.log',
    }),
    new transports.File({
      format: combine(timestamp(), json(), prettyPrint()),
      level: 'info',
      filename: 'logs/info.log',
    }),
  ],
};
