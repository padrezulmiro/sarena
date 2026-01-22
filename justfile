deploy_path := "$HOME/tmp/sarena"

# Build and deploy
deploy: && change_exts
    tsc
    rm -rv {{deploy_path}}
    mkdir -v {{deploy_path}} {{deploy_path}}/build {{deploy_path}}/build/btrees
    cp -v -t {{deploy_path}}/build build/*.js
    cp -v -t {{deploy_path}}/build/btrees build/btrees/*.js


[private]
change_exts:
    SARENA_DEPLOY={{deploy_path}}/build/ ./scripts/rename.py
    SARENA_DEPLOY={{deploy_path}}/build/btrees/ ./scripts/rename.py
