#!/usr/bin/env python3

import os


def main():
    deploy_path = os.environ["SARENA_DEPLOY"]
    files = os.listdir(deploy_path)
    for filename in files:
        ends_with_js = filename.endswith(".js")
        ends_with_d_js = filename.endswith(".d.js")
        if ends_with_js and not ends_with_d_js:
            filename_w_mjs = filename.replace(".js", ".mjs")
            print("Renaming file '" + deploy_path + filename + "' to '"
                  + deploy_path + filename_w_mjs + "'")
            os.rename(deploy_path + filename, deploy_path + filename_w_mjs)


if __name__ == '__main__':
    main()
