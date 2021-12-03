#! /usr/bin/env node

export function log(...args: any[]) {
  console.log(...args);
}

export function main() {
  log('VaporTs CLI');
}

main();
process.exit();
