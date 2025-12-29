deploy_path := "$HOME/azul/WSL-Shared/sarena/"

# Build and deploy
deploy: && change_exts
    tsc
    rm -rv {{deploy_path}}
    mkdir -v {{deploy_path}}
    cp -v -t {{deploy_path}} build/*.js


[private]
change_exts:
    SARENA_DEPLOY={{deploy_path}} ./scripts/rename.py
