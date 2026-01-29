#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const cwd = process.cwd();

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

function updatePackageJson() {
  const pkgPath = path.join(cwd, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    console.log('⚠️ package.json not found — skipping lint-staged setup');
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  if (!pkg['lint-staged']) {
    pkg['lint-staged'] = {
      '*.{js,ts,vue}': 'eslint'
    };

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log('✅ lint-staged config added to package.json');
    return;
  }

  // merge safely
  pkg['lint-staged']['*.{js,ts,vue}'] =
    pkg['lint-staged']['*.{js,ts,vue}'] || 'eslint';

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log('ℹ️ lint-staged already exists — merged safely');
}


console.log('\n🔧 Setting up ESLint Code Checker...\n');

console.log('📦 Installing dependencies...');
run(
  'npm install -D eslint vue-eslint-parser @typescript-eslint/parser husky lint-staged --legacy-peer-deps'
);

updatePackageJson();

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


