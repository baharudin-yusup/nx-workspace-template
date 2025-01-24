#!/bin/bash

# Source the get-argument-value utility script
source "$(dirname "$0")/utils/get-argument-value.sh"

# Get module name from `--module-name` argument
moduleName=$(get_argument_value --module-name "$@")

# Function to run the development command for the given module
invoke_dev_command() {
    local module_name="$1"

    echo "Running development command for $module_name..."

    # Initialize the command to be executed based on the module name
    local command=""

    # TODO: Add your module-specific development commands here
    if [ "$module_name" == "your-module-name" ]; then
        command="lint your-module-name"
    elif [ "$module_name" == "global" ]; then
        # TODO: Add your global development commands here
        echo "Global module selected. No action performed."
        exit 0  # No further action for global
    else
        echo "Error: '$module_name' is not a valid module name."
        exit 1  # Fail the script if the module name is invalid
    fi

    # Run the command
    eval $command

    if [ $? -eq 0 ]; then
        echo "$module_name development command ran successfully."
    else
        echo "$module_name development command failed."
        exit 1  # Fail the script if the development command fails
    fi
}

# Run the corresponding command if module_name is valid
invoke_dev_command "$moduleName"
