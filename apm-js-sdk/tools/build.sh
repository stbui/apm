#!/usr/bin/env bash

TSC=`pwd`/node_modules/.bin/tsc
ROLLUP=`pwd`/node_modules/.bin/rollup

# TSC=$(npm bin)/tsc
# ROLLUP=$(npm bin)/rollup

pkgFolder=./packages

PACKAGES=(
    core
    common
)

VERSION_PREFIX=$(node -p "require('./package.json').version")
VERSION_SUFFFIX="-$(git log --oneline -1 | awk '{print $1}')"
VERSION="${VERSION_PREFIX}${VERSION_SUFFIX}"


rollupIndex() {
    in_file="${1}/${3}.js"
    out_file="${1}/$3}.js"

    BANNER_TEXT=`cat ${LICENSE_BANNER}`
    $ROLLUP -i ${in_file} -o ${out_file} --sourcemap -f es --banner "$BANNER_TEXT" >/dev/null 2>&1
}

runRollup() {
    BANNER_TEXT=`cat ${LICENSE_BANNER}`
    echo ">>>      runRollup: ${ROLLUP} -c ${1}/rollup.config.js --sourcemap <<<"
    
    $ROLLUP -c ${1}/rollup.config.js --sourcemap --banner "$BANNER_TEXT" >/dev/null 2>&1
}


compilePackageES5() {
    echo ">>>      compilePackageES5: ${TSC} -p ${1}/tsconfig-es5.json <<<"
    $TSC -p ${1}/tsconfig-es5.json
}

compilePackageESM() {
    echo ">>>      compilePackageESM: ${TSC} -p ${1}/tsconfig-build.json <<<"
    $TSC -p ${1}/tsconfig-build.json
}

updateVersionReferences() {
  NPM_DIR="$1"
  (
    echo ">>>      VERSION: Updating version references in ${NPM_DIR}"
    cd ${NPM_DIR}
    echo ">>>       EXECUTE: perl -p -i -e \"s/0\.0\.0\-PLACEHOLDER/${VERSION}/g\" $""(grep -ril 0\.0\.0\-PLACEHOLDER .)"
    perl -p -i -e "s/0\.0\.0\-PLACEHOLDER/${VERSION}/g" $(grep -ril 0\.0\.0\-PLACEHOLDER .) < /dev/null 2> /dev/null
  )
}

SRC_DIR=`pwd`/packages/core
OUT_DIR_ESM5=`pwd`/packages/core/esm5
ROOT_OUT_DIR=`pwd`/dist/packages
OUT_DIR=`pwd`/dist/packages/core
ESM5_DIR=`pwd`/dist/packages/core/esm5
LICENSE_BANNER=`pwd`/packages/license-banner.txt
BUNDLES_DIR=`pwd`/dist/packages/core/bnundles

# compilePackageES5 ${SRC_DIR}
# compilePackageESM ${SRC_DIR}
# runRollup ${SRC_DIR}
updateVersionReferences ${BUNDLES_DIR}
