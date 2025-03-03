import { Client } from '@teams.sdk/api';

let api: Client | null = null;

const useSparkApi = () => {
  if (!api) {
    api = new Client('', {
      headers: { 'x-teams-devtools': 'true' },
    });
  }

  return api;
};

export default useSparkApi;
