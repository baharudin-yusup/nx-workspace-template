# Import the Get-ArgumentValue function
. "$PSScriptRoot/utils/get-argument-value.ps1"

# Call the function to get the module name
$moduleName = Get-ArgumentValue -arguments $args -argumentName "--module-name"

# If moduleName is not found, display an error
if ($null -eq $moduleName) {
    Write-Host "Error: --module-name argument is required."
    exit 1
}

# Function to run the development command for the given module
function Invoke-DevCommand {
    param (
        [string]$module_name
    )

    Write-Host "Running development command for $module_name..."

    # Initialize the command to be executed based on the module name
    $command = ""

    # TODO: Add your module-specific development commands here
    if ($module_name -eq "your-module-name") {
        $command = "lint your-module-name"
    }
    elseif ($module_name -eq "global") {
        # TODO: Add your global development commands here
        Write-Host "Global module selected. No action performed."
        exit 0  # No further action for global
    }
    else {
        Write-Host "Error: '$module_name' is not a valid module name."
        exit 1  # Fail the script if the module name is invalid
    }


    # Run the command
    Invoke-Expression $command

    if ($LASTEXITCODE -eq 0) {
        Write-Host "$module_name development command ran successfully."
    }
    else {
        Write-Host "$module_name development command failed."
        exit 1  # Fail the script if the development command fails
    }
}

# Run the corresponding command if module_name is valid
Invoke-DevCommand -module_name $moduleName
