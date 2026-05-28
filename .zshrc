# Homebrew
if [[ -f "/opt/homebrew/bin/brew" ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# Standard paths
export PATH="/usr/local/bin:/usr/local/sbin:$PATH"

# PHP
export PATH="/usr/local/opt/php@7.4/bin:$PATH"

# rbenv
if command -v rbenv &> /dev/null; then
    eval "$(rbenv init -)"
fi

# NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Antigravity & local tools
export PATH="$HOME/.antigravity/antigravity/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/.maestro/bin:$PATH"

# OpenJDK
export JAVA_HOME="/opt/homebrew/opt/openjdk/libexec/openjdk.jdk/Contents/Home"
export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"

# Docker completions
if [[ -d "/Users/satoshitanaka/.docker/completions" ]]; then
    fpath=(/Users/satoshitanaka/.docker/completions $fpath)
    autoload -Uz compinit
    compinit
fi

# Environment initialization
if [ -f "$HOME/.local/bin/env" ]; then
    . "$HOME/.local/bin/env"
fi

# Alias
alias brownie='nice -n 10 ./bin/brwn'

# Added by Antigravity
export PATH="/Users/satoshitanaka/.antigravity/antigravity/bin:$PATH"

# Brownie project python path
export PATH="/Users/satoshitanaka/Documents/brownie/.venv/bin:$PATH"
export PATH="$PATH:$HOME/.maestro/bin"

# Python auto-update policy
# Prefer uv-managed latest stable CPython and keep pip/python aligned.
if [[ -f "$HOME/.config/zsh/profile.d/python-autoupdate.zsh" ]]; then
    source "$HOME/.config/zsh/profile.d/python-autoupdate.zsh"
fi

alias qdrant="qdrant --config-path /usr/local/etc/qdrant/config/config.yaml"

