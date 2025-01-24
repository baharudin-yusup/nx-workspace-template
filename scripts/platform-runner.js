const { execSync } = require('child_process');
const os = require('os');
const path = require('path');
const { select } = require('@inquirer/prompts');
const _ = require('lodash');
const { getCurrentBranchName, getModuleList } = require('./utils');
const yargs = require('yargs');

// Function to run a script based on the operating system with dynamic props
function runScript(props) {
  const platform = os.platform();
  const scriptPath = path.join(
    __dirname,
    platform === 'win32' ? 'windows' : 'linux',
    `${props.scriptName}${platform === 'win32' ? '.ps1' : '.sh'}`
  );

  let command = `"${scriptPath}"`;
  Object.keys(props).forEach((key) => {
    if (key !== 'scriptName') {
      const kebabKey = _.kebabCase(key);
      command += ` --${kebabKey} "${props[key]}"`;
    }
  });

  try {
    if (platform === 'win32') {
      console.log(`Running PowerShell script: ${command}`);
      execSync(`powershell -ExecutionPolicy Bypass -File ${command}`, {
        stdio: 'inherit',
      });
    } else {
      console.log(`Running Bash script: ${command}`);
      execSync(command, { stdio: 'inherit' });
    }
  } catch (error) {
    console.error(`Error executing script: ${error.message}`);
    process.exit(1);
  }
}

function findModuleByBranch(branch, moduleList) {
  return (
    moduleList.find(({ branchPatterns }) => branchPatterns?.test(branch))
      ?.value || null
  );
}

function handleNoMatch(argv) {
  if (argv['fallback-module-name']) {
    return argv['fallback-module-name'];
  }

  if (!argv['show-module-selection']) {
    console.error(
      'Branch does not match any predefined patterns and module selection is disabled'
    );
    process.exit(1);
  }

  return null;
}

function promptUserToSelectModule(moduleList, scriptName) {
  select({
    message:
      'Branch does not match any predefined patterns. Please select the module to run:',
    choices: moduleList,
  })
    .then((answers) => {
      if (answers === 'global') {
        console.log('Global module selected. No action performed.');
        return;
      }
      runScript({ scriptName, moduleName: answers });
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    });
}

function runSelectedModule(module, scriptName) {
  console.log(
    `Branch matches module '${module}', running the corresponding command...`
  );
  runScript({ scriptName, moduleName: module });
}

const argv = yargs
  .option('file-name', {
    alias: 'f',
    description: 'The name of the script to run without extension',
    type: 'string',
    demandOption: true,
  })
  .option('file-name-windows', {
    alias: 'w',
    description: 'Override the script name for Windows platform',
    type: 'string',
  })
  .option('file-name-linux', {
    alias: 'l',
    description: 'Override the script name for Linux platform',
    type: 'string',
  })
  .option('show-module-selection', {
    alias: 's',
    description: 'Show module selection prompt if no match is found',
    type: 'boolean',
    default: true,
  })
  .option('enable-global', {
    alias: 'g',
    description: 'Enable the option for selecting "global" as a module',
    type: 'boolean',
    default: false,
  })
  .option('force-module-name', {
    alias: 'm',
    description: 'Force a specific module name to run',
    type: 'string',
  })
  .option('fallback-module-name', {
    description: 'Fallback module name if no match is found',
    type: 'string',
  })
  .help().argv;

let scriptName = argv['file-name'];
if (os.platform() === 'win32' && argv['file-name-windows']) {
  scriptName = argv['file-name-windows'];
} else if (os.platform() === 'linux' && argv['file-name-linux']) {
  scriptName = argv['file-name-linux'];
}

const moduleList = getModuleList();

if (argv['force-module-name'] && argv['fallback-module-name']) {
  console.error(
    'Cannot specify both force-module-name and fallback-module-name'
  );
  process.exit(1);
}

if (
  argv['enable-global'] ||
  argv['force-module-name'] ||
  argv['fallback-module-name']
) {
  moduleList.push({ name: 'Global', value: 'global' });
}

if (
  (argv['force-module-name'] ?? argv['fallback-module-name']) &&
  !moduleList.some(
    (m) =>
      m.value === (argv['force-module-name'] ?? argv['fallback-module-name'])
  )
) {
  console.error("Specified module doesn't exist in the predefined list");
  process.exit(1);
}

const currentBranch = getCurrentBranchName();
const selectedModule =
  argv['force-module-name'] ||
  findModuleByBranch(currentBranch, moduleList) ||
  handleNoMatch(argv, moduleList);

if (!selectedModule) {
  promptUserToSelectModule(moduleList, scriptName);
} else {
  runSelectedModule(selectedModule, scriptName);
}
