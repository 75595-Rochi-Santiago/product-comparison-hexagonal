//esta interface representara las opciones que poedmos utilizar para configurar nuestra app
export interface ApplicationBootraspOptions {
  driver: 'orm' | 'json';
  environment: string;
}
