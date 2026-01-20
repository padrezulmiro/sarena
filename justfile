deploy_path := "$HOME/azul/WSL-Shared/sarena/"

# Build and deploy
deploy: && change_exts
    tsc
    rm -rv {{deploy_path}}
    mkdir -v {{deploy_path}} {{deploy_path}}/build {{deploy_path}}/btrees
    cp -v -t {{deploy_path}}/build build/*.js
    cp -v -t {{deploy_path}}/btrees btrees/*.json


[private]
change_exts:
    SARENA_DEPLOY={{deploy_path}} ./scripts/rename.py
