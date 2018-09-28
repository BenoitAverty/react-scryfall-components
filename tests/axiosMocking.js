import fs from 'fs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import appAxios from '../src/axios';

const realAxios = axios.create({
  baseURL: 'https://api.scryfall.com',
});

// Load the fixture file for the given spec file and create an axios mock based
// on the content of the file.
export function loadAndApplyFixtures(path) {
  // Make a promise that resolves to the content of the fixture file for the given path
  const fixtureDataPromise = new Promise((resolve, reject) => {
    fs.readFile(`${path}/__fixtures__/fixtures.json`, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

  return (
    fixtureDataPromise
      .then(fixtureData => JSON.parse(fixtureData))
      // If an error occurs, use empty fixtures.
      .catch(() => ({}))
      .then(initialFixtures => {
        const fixtures = initialFixtures;
        const mock = new MockAdapter(appAxios);

        mock.onAny().reply(config => {
          // Do we have this request in the fixtures ?
          if (fixtures[config.url]) {
            return Promise.resolve([
              fixtures[config.url].status,
              fixtures[config.url].data,
            ]);
          }
          // Else, perform the real request and save it in the fixtures
          return realAxios.get(config.url).then(response => {
            fixtures[config.url] = {
              status: response.status,
              data: response.data,
            };
            return [response.status, response.data];
          });
        });

        return fixtures;
      })
  );
}

// Saves the given fixtures in the given path.
export function saveFixtures(path, fixtures) {
  return new Promise((resolve, reject) => {
    fs.mkdir(`${path}/__fixtures__/`, mkdirErr => {
      // abort on error, except on folder already exist.
      if (mkdirErr && mkdirErr.code !== 'EEXIST') {
        reject(mkdirErr);
      }
      fs.writeFile(
        `${path}/__fixtures__/fixtures.json`,
        JSON.stringify(fixtures, null, 2),
        'utf8',
        writeFileErr => {
          if (writeFileErr) {
            reject(writeFileErr);
          }
          resolve();
        },
      );
    });
  });
}
