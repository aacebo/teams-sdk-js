import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import cp from 'node:child_process';

import axios from 'axios';

export function downloadSource() {
  return new Promise<void>(async (resolve) => {
    const teamsSdkPath = path.join(os.homedir(), 'teams-sdk');
    const zipPath = path.join(
      teamsSdkPath,
      'repository.zip',
    );

    const file = fs.createWriteStream(zipPath);
    const res = await axios.get('http://github.com/aacebo/teams-sdk-js/archive/refs/heads/main.zip', {
      responseType: 'stream'
    });

    res.data.pipe(file);
    file.on('finish', () => {
      cp.execSync(`unzip ${zipPath} -d ${teamsSdkPath}`);
      fs.rmSync(zipPath);
      resolve();
    });
  });
}
