deploy_path := "$HOME/azul/WSL-Shared/sarena"

# Build and deploy
deploy: && change_exts
    tsc
    rm -rv {{deploy_path}}
    mkdir -v {{deploy_path}}
    cp -r -v -t {{deploy_path}} build


[private]
change_exts:
    SARENA_DEPLOY={{deploy_path}}/build/ ./scripts/rename.py
    SARENA_DEPLOY={{deploy_path}}/build/btrees/ ./scripts/rename.py
