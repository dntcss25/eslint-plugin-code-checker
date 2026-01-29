#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const cwd = process.cwd();

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

console.log('\n🔧 Setting up ESLint Code Checker...\n');

console.log('📦 Installing dependencies...');
run(
  'npm install -D eslint vue-eslint-parser @typescript-eslint/parser eslint-plugin-code-checker husky lint-staged'
);

const eslintConfigPath = path.join(cwd, 'eslint.config.js');

if (!fs.existsSync(eslintConfigPath)) {
  const template = new URL('../templates/eslint.config.js', import.meta.url);
  fs.copyFileSync(template, eslintConfigPath);
  console.log('✅ eslint.config.js created');
} else {
  console.log('⚠️ eslint.config.js already exists — skipped');
}

console.log('🐶 Setting up husky...');
run('npx husky install');

const huskyDir = path.join(cwd, '.husky');
if (!fs.existsSync(huskyDir)) {
  fs.mkdirSync(huskyDir);
}

const hookSrc = new URL('../husky/pre-commit', import.meta.url);
const hookDest = path.join(huskyDir, 'pre-commit');

fs.copyFileSync(hookSrc, hookDest);
fs.chmodSync(hookDest, 0o755);

console.log('✅ pre-commit hook installed');

console.log('\n🎉 Code Checker setup complete!\n');
