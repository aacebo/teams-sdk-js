import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

import pkg from 'src/../package.json';
import { LearningProvidersClient } from './learningProviders';

type GraphClientOptions = CreateAxiosDefaults | AxiosInstance;

/**
 * /employeeExperience
 */
export class EmployeeExperienceClient {
  protected baseUrl = '/employeeExperience';
  protected http: AxiosInstance;

  constructor(options?: GraphClientOptions) {
    if (!options) {
      this.http = axios.create({
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
        },
      });
    } else if ('get' in options) {
      this.http = options;
    } else {
      this.http = axios.create({
        ...options,
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': `teams[graph]/${pkg.version}`,
          ...options.headers,
        },
      });
    }
  }

  /**
   * `/employeeExperience/learningProviders`
   *
   * Provides operations to manage the learningCourseActivities property of the microsoft.graph.learningProvider entity.
   */
  get learningProviders() {
    return new LearningProvidersClient(this.http);
  }
}
