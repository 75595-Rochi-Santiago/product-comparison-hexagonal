import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { Logger } from '@nestjs/common';

config();

@Injectable()
export class ConfigService {
  private logger = new Logger(ConfigService.name);

  get(key: string): string | undefined {
    return process.env[key];
  }

  getOrThrow(key: string): string | void {
    const value = process.env[key];
    if (!value) {
      this.logger.fatal(`Missing env var: ${key}`);
      process.exit(1);
    }
  }

  hasRequiredEnvVars(): boolean {
    const requiredEnvVars = [
      'DB_PATH',
      'NODE_ENV',
      'PORT',
      'API_PREFIX',
      'DB_DRIVER',
    ];

    let nonSetEnvVars = 0;
    requiredEnvVars.forEach((key) => {
      if (!process.env[key] || process.env[key] === '') {
        this.logger.error(`Error: Environment variable ${key} is unset!`);
        nonSetEnvVars++;
      }
    });

    if (nonSetEnvVars == 0) {
      this.logger.debug('Environment Variables loaded successfully 👍');
      return true;
    }
    return false;
  }
}
