#!/usr/bin/env node

const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const path = require("path");
//Promise Method 2
// const lstat = util.promisify(fs.lstat);

// Promise Method 3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.red(filenames[index]));
    } else {
      console.log(chalk.bold.green(filenames[index]));
    }
  }

  // // Array Method
  // const allStats = Array(filenames.length).fill(null);

  // for (let filename of filenames) {
  //   const index = filenames.indexOf(filename);

  //   fs.lstat(filename, (err, stats) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     allStats[index] = stats;

  //     const ready = allStats.every((stats) => {
  //       return stats;
  //     });

  //     if (ready) {
  //       allStats.forEach((stats, index) => {
  //         console.log(filenames[index], stats.isFile());
  //       });
  //     }
  //   });
  // }
});

// Promise Method 1
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
