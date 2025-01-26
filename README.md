# Nx Workspace Template

Welcome to the Nx Workspace Template! This repository serves as a foundational template for building scalable and maintainable applications using the [Nx](https://nx.dev) build system.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration Files](#configuration-files)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This Nx workspace is configured to streamline the development process, providing a robust setup for building modern applications. It includes essential configurations and tools to ensure code quality, consistency, and efficient project management.

You can either **clone this repository** or **use it as a GitHub template** to create your own workspace.

## Getting Started

To get started with this workspace, you have two options:

### Option 1: Use as a GitHub Template
1. Click the **"Use this template"** button at the top of this repository on GitHub.
2. Enter your new repository details and click **"Create repository from template"**.
3. Clone your newly created repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

### Option 2: Clone This Repository
1. Clone the repository directly:
   ```bash
   git clone https://github.com/baharudin-yusup/nx-workspace-template.git
   cd nx-workspace-template
   ```

### Common Steps (Both Options)
1. **Install dependencies:**

   Ensure you have [Yarn](https://yarnpkg.com/) installed. Then, run:

   ```bash
   yarn install
   ```

2. **Edit Module List (Required):**

   Update the module list in `scripts/utils/get-module-list.js` to ensure all modules (apps and libraries) are properly registered. This is essential for the provided scripts to work correctly.

   Example structure:

   ```javascript
   // scripts/utils/get-module-list.js

   function getModuleList() {
     return [
       {
         name: 'Module A', // Friendly name, easy for users to understand
         value: 'module-a', // Exact app/lib/package name in the Nx workspace
         branchPatterns: /^module\/a\//, // Regex to match branch names for this module
       }
     ];
   };
   ```

   - **`name`**: A user-friendly name for the module.
   - **`value`**: The exact name of the app, library, or package as defined in Nx (used in `nx generate` or `nx.json`).
   - **`branchPatterns`**: A regex pattern to detect the current module based on the branch name.

3. **Start the development server:**

   Use the following command to serve an app for development based on the current branch's naming pattern.

   ```bash
   yarn serve
   ```

## Project Structure

The workspace follows a modular structure:

- **apps/**: Contains the applications in the workspace.
- **libs/**: Contains shared libraries used across applications.
- **.husky/**: Configuration for Git hooks using Husky.
- **.vscode/**: Workspace settings for Visual Studio Code.
- **scripts/**: Utility scripts for tasks such as managing modules.

## Available Scripts

This workspace provides the following scripts:

### Serve an Application
```bash
yarn serve
```
Serves the specified app for development based on the current branch's naming pattern.

### Run Tests
```bash
yarn test
```
Runs unit tests for the specified app or library based on the current branch's naming pattern.

### Run Linting
```bash
yarn lint
```
Runs linting for the specified app or library based on the current branch's naming pattern.

> **Tip**: The module list in `scripts/utils/get-module-list.js` must be kept up to date for these scripts to work.

## Configuration Files

Key configuration files in the workspace:

- **.editorconfig**: Defines coding styles and formatting.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **.prettierrc**: Configuration for Prettier code formatter.
- **.prettierignore**: Files and directories to be ignored by Prettier.
- **.lintstagedrc.yml**: Configuration for lint-staged to run linters on staged Git files.
- **eslint.config.cjs**: Configuration for ESLint.
- **jest.config.ts**: Configuration for Jest testing framework.
- **nx.json**: Nx workspace configuration.
- **tsconfig.base.json**: Base TypeScript configuration.
- **package.json**: Contains project metadata and scripts.
- **yarn.lock**: Ensures consistent dependency versions.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Ensure that your code adheres to the established coding standards and passes all tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
