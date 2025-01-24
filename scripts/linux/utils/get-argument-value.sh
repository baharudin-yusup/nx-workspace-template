#!/bin/bash

# Function to get the value of a specific argument
get_argument_value() {
    local arguments=("$@")
    local argument_name=$1
    shift

    while [[ "$#" -gt 0 ]]; do
        case $1 in
            $argument_name) echo "$2"; return 0 ;;
            *) shift ;;
        esac
    done

    return 1
}