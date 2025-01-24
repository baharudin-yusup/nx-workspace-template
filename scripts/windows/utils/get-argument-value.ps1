function Get-ArgumentValue {
    param (
        [string[]]$arguments,
        [string]$argumentName
    )

    for ($i = 0; $i -lt $arguments.Length; $i++) {
        if ($arguments[$i] -eq $argumentName) {
            if ($i + 1 -lt $arguments.Length) {
                return $arguments[$i + 1]  # Get the next argument as the value
            }
            else {
                Write-Host "Error: No value provided for $argumentName"
                exit 1
            }
        }
    }
}
