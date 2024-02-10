# Changelog

## [1.1.9](https://github.com/Vertretungsapp/indiware-api/compare/v1.1.8...v1.1.9) (2024-02-10)


### 🪲 Bug Fixes

* further fixes belonging the import issues ([dfbf3c6](https://github.com/Vertretungsapp/indiware-api/commit/dfbf3c6039018afd042564eda9f039f3156656b4))
* restructurized imports due to importing issues in other projects ([68e6369](https://github.com/Vertretungsapp/indiware-api/commit/68e6369768b75f0047209af87a9a0a6d7090d788))

## [1.1.8](https://github.com/Vertretungsapp/indiware-api/compare/v1.1.7...v1.1.8) (2024-02-03)


### 🪲 Bug Fixes

* made package module again ([c6d6a47](https://github.com/Vertretungsapp/indiware-api/commit/c6d6a47164e618254dbcabb216ab9c625843086d))

## [1.1.7](https://github.com/Vertretungsapp/indiware-api/compare/v1.1.6...v1.1.7) (2024-02-03)


### 🪲 Bug Fixes

* dates now getting parsed based on timezone [#22](https://github.com/Vertretungsapp/indiware-api/issues/22) ([6b00f31](https://github.com/Vertretungsapp/indiware-api/commit/6b00f311cfcb1508a8eaf6f1d9901e72052a6b7b))


### 🔧 Code Refactoring

* added babel as bundler for better builds ([6b00f31](https://github.com/Vertretungsapp/indiware-api/commit/6b00f311cfcb1508a8eaf6f1d9901e72052a6b7b))
* added getters for status and statusText ([a242c10](https://github.com/Vertretungsapp/indiware-api/commit/a242c10f05d79e196de13b111ee91aa20efdaa85))


### ⚙️ Dependencies

* migrated from date-fns to luxon ([6b00f31](https://github.com/Vertretungsapp/indiware-api/commit/6b00f311cfcb1508a8eaf6f1d9901e72052a6b7b))

## [1.1.6](https://github.com/Vertretungsapp/indiware-api/compare/v1.1.5...v1.1.6) (2024-01-14)


### 🪲 Bug Fixes

* teacher were wrongly parsed for lesson ([dc562a4](https://github.com/Vertretungsapp/indiware-api/commit/dc562a4c01e3abc21e89fbcd0d17a4f0e804972f))


### 🔧 Other Changes

* addition to dc562a4c01e3abc21e89fbcd0d17a4f0e804972f ([004042a](https://github.com/Vertretungsapp/indiware-api/commit/004042afd580bbb947278f865dd93d9146b72d56))

## [1.1.5](https://github.com/Vertretungsapp/indiware-api/compare/v1.1.4...v1.1.5) (2024-01-14)


### 🪲 Bug Fixes

* lessons were also filled with courses like timetable ([022e556](https://github.com/Vertretungsapp/indiware-api/commit/022e55630abb3b64c8c3fa06a32720a72965791d))

## [1.1.4](https://github.com/Vertretungsapp/indiware-api/compare/v1.1.3...v1.1.4) (2024-01-13)


### 🪲 Bug Fixes

* room and teacher generation now works fine ([21bf922](https://github.com/Vertretungsapp/indiware-api/commit/21bf922806fc03407a5a8d611e47b80c41cd7371))

## [1.1.3](https://github.com/Vertretungsapp/indiware-api/compare/v1.1.2...v1.1.3) (2024-01-09)


### 🪲 Bug Fixes

* **revert:** this reverts 2c24d14909aee150f836b0c939d481608be64740 ([8ec88c8](https://github.com/Vertretungsapp/indiware-api/commit/8ec88c85258fcb0cac61783424bbfae770fb6a88))

## [1.1.2](https://github.com/Vertretungsapp/indiware-api/compare/v1.1.1...v1.1.2) (2024-01-09)


### 🪲 Bug Fixes

* added missing exports for errors for better use ([40e70ed](https://github.com/Vertretungsapp/indiware-api/commit/40e70ed5669c3f612c48c20abb83588e58f43303))
* rooms not get seperated correctly like teachers ([2c24d14](https://github.com/Vertretungsapp/indiware-api/commit/2c24d14909aee150f836b0c939d481608be64740))


### 🔧 Code Refactoring

* refactored rooms & teachers generation ([2c24d14](https://github.com/Vertretungsapp/indiware-api/commit/2c24d14909aee150f836b0c939d481608be64740))


### 🔧 Other Changes

* format files ([6fc6288](https://github.com/Vertretungsapp/indiware-api/commit/6fc62880c7e7adcb21ac9a9e73a646f07b2aac28))

## [1.1.1](https://github.com/Vertretungsapp/indiware-api/compare/v1.1.0...v1.1.1) (2024-01-06)


### 🪲 Bug Fixes

* fixed bug where schoolClass name were parsed as numbers ([641dac3](https://github.com/Vertretungsapp/indiware-api/commit/641dac3367c0da8ac48a0924ed64dbcedd37347f))

## [1.1.0](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.11...v1.1.0) (2024-01-05)


### 📕 Features

* added json serialization to substitution plan ([6811c74](https://github.com/Vertretungsapp/indiware-api/commit/6811c744421e2c6363c1164fc463ecd7949e5ae1))


### 🪲 Bug Fixes

* added export for ISubstitutionPlan ([f12a77f](https://github.com/Vertretungsapp/indiware-api/commit/f12a77fbd5a6736025674a25f6400025b523f9ac))

## [1.0.11](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.10...v1.0.11) (2024-01-05)


### 🪲 Bug Fixes

* added missing path to ALWAYS_ARRAY_PATHS, caused parsing errors ([a9f889c](https://github.com/Vertretungsapp/indiware-api/commit/a9f889cd3278779480c82e85400d65fb129dee23))

## [1.0.10](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.9...v1.0.10) (2024-01-05)


### 🪲 Bug Fixes

* added missing exports to use interfaces etc in other packages ([1ed064d](https://github.com/Vertretungsapp/indiware-api/commit/1ed064ded14886da59c9495e7b5fe65a01dd5324))

## [1.0.9](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.8...v1.0.9) (2024-01-02)


### 🔄 Changes

* changed to esm module ([fa0adaf](https://github.com/Vertretungsapp/indiware-api/commit/fa0adaf701f473017c475950c2b65a80d5d63710))

## [1.0.8](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.7...v1.0.8) (2024-01-02)


### 🚀 CI/CD Changes

* added github packages for distribution along npm ([59a7d13](https://github.com/Vertretungsapp/indiware-api/commit/59a7d1374890b03f06fb7d5969358ed2552badc2))

## [1.0.7](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.6...v1.0.7) (2024-01-02)


### 🪲 Bug Fixes

* **npm-ci:** fixed wrong configuration for _auth in npm release action ([39a738a](https://github.com/Vertretungsapp/indiware-api/commit/39a738abcc8d1902135d38fbee759e8b449fec15))

## [1.0.6](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.5...v1.0.6) (2024-01-02)


### 🪲 Bug Fixes

* **npm-ci:** fixed wrong _auth in npm release action ([3c6e740](https://github.com/Vertretungsapp/indiware-api/commit/3c6e7403af144d9015902e8fc33bd5a1f4f3c17f))

## [1.0.5](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.4...v1.0.5) (2024-01-02)


### 🪲 Bug Fixes

* **npm-ci:** removed no existing npm config in action ([1491108](https://github.com/Vertretungsapp/indiware-api/commit/1491108ce5513a6291dd0dcd533f5639baa51f1c))

## [1.0.4](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.3...v1.0.4) (2024-01-02)


### 🪲 Bug Fixes

* **npm-ci:** fixed npm registry authentification ([9a543b2](https://github.com/Vertretungsapp/indiware-api/commit/9a543b293e3846bc16ee783cc1962bd966e51260))

## [1.0.3](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.2...v1.0.3) (2024-01-02)


### 🪲 Bug Fixes

* **npm-ci:** fixed wrong env variable name for auth token ([817198b](https://github.com/Vertretungsapp/indiware-api/commit/817198b0375bae1573b5c6cf653f045c730dcb6f))

## [1.0.2](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.1...v1.0.2) (2024-01-02)


### 🪲 Bug Fixes

* **npm-ci:** fixed typo in npm release action ([ac725fd](https://github.com/Vertretungsapp/indiware-api/commit/ac725fde47edd6f4620816167f4fe68300b2684c))

## [1.0.1](https://github.com/Vertretungsapp/indiware-api/compare/v1.0.0...v1.0.1) (2024-01-02)


### 🪲 Bug Fixes

* added missing type 'module' in package.json ([addf188](https://github.com/Vertretungsapp/indiware-api/commit/addf1883657d771ea4bac4bb70c2018844994293))


### 🔧 Other Changes

* reduced package size ([addf188](https://github.com/Vertretungsapp/indiware-api/commit/addf1883657d771ea4bac4bb70c2018844994293))


### 🚀 CI/CD Changes

* added automated npm release ([591db95](https://github.com/Vertretungsapp/indiware-api/commit/591db95bb6f8566046592de47511df9cdb628735))
* added release-please ([c64b5e1](https://github.com/Vertretungsapp/indiware-api/commit/c64b5e1d29030e6558588de152bf06754f669573))
