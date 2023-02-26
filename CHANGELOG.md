# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-alpha.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.16.0-alpha.12...v1.0.0-alpha.0) (2023-02-26)


### Code Refactoring

* **builder:** switch mocha for jest ([a795202](https://github.com/andrewcpacifico/allspark-ts/commit/a795202550d83827a4a18713fdc5ba108ec63fa1))


### BREAKING CHANGES

* **builder:** All test suites must be refactored to support jest
syntax.





# [0.16.0-alpha.12](https://github.com/andrewcpacifico/allspark-ts/compare/v0.16.0-alpha.11...v0.16.0-alpha.12) (2023-02-13)


### Features

* **core/mongo-manager:** add support to configure port ([3ee4dc8](https://github.com/andrewcpacifico/allspark-ts/commit/3ee4dc84ab0fbbb17dc6faa65f0145455ba6c7bc))





# [0.16.0-alpha.11](https://github.com/andrewcpacifico/allspark-ts/compare/v0.16.0-alpha.10...v0.16.0-alpha.11) (2023-02-13)

**Note:** Version bump only for package allspark-ts





# [0.16.0-alpha.10](https://github.com/andrewcpacifico/allspark-ts/compare/v0.16.0-alpha.9...v0.16.0-alpha.10) (2021-12-26)


### Bug Fixes

* **core/rta/prometheus:** wrong metric type on record ([56f8aec](https://github.com/andrewcpacifico/allspark-ts/commit/56f8aec42094947117337ba66ac75e5660d75d36))


### Features

* **core/rta:** export rta instance ([2196de4](https://github.com/andrewcpacifico/allspark-ts/commit/2196de4cca49fcfab03380a304ee219595f258f2))
* **core/rta:** prefix prometheus metrics ([d842623](https://github.com/andrewcpacifico/allspark-ts/commit/d8426232134aef6b4ae37442ab481c36f35cf427))
* **rest/app:** inject rta instance ([21125fc](https://github.com/andrewcpacifico/allspark-ts/commit/21125fc33effc1393f775a06a5c823eeba19e126))





# [0.16.0-alpha.9](https://github.com/andrewcpacifico/allspark-ts/compare/v0.16.0-alpha.8...v0.16.0-alpha.9) (2021-12-18)


### Bug Fixes

* **rest/middlewares/prometheus-metrics:** support empty config ([4cc9eaf](https://github.com/andrewcpacifico/allspark-ts/commit/4cc9eaf30625e18c0311b6514c09f8bfeef6abc1))


### Features

* **core/rta:** add rta module ([54f6601](https://github.com/andrewcpacifico/allspark-ts/commit/54f6601cf8c3568e586492abcfff3b74990cc4cc))
* **rest/middlewares/prometheus-metrics:** add authentication ([a97c537](https://github.com/andrewcpacifico/allspark-ts/commit/a97c537f4aef08907b49effed6fbf5ed6d383247))
* **rest/middlewares/prometheus-metrics:** add config support ([8cfc0f8](https://github.com/andrewcpacifico/allspark-ts/commit/8cfc0f8d9ea0a92206e93087b3b19402e6cd92b5))
* **rest:** add express prometheus middleware ([5284860](https://github.com/andrewcpacifico/allspark-ts/commit/5284860a03e86c5594d2c5a0b3ebdc4838e086fb))





# [0.16.0-alpha.8](https://github.com/andrewcpacifico/allspark-ts/compare/v0.16.0-alpha.7...v0.16.0-alpha.8) (2021-12-07)


### Features

* **builder:** Add test-integration command ([96a2b46](https://github.com/andrewcpacifico/allspark-ts/commit/96a2b464f5f103f5ef835ad719ea34e01902a8e1))
* **rest/app:** Add generic type for dependency container ([1ab8a53](https://github.com/andrewcpacifico/allspark-ts/commit/1ab8a532ebcd16545ae6dbbbe2835bde10a9a766))
* **rest/app:** Export dependency container type ([bd58c31](https://github.com/andrewcpacifico/allspark-ts/commit/bd58c3181215983986450c5d252529f02f8b6b34))





# [0.16.0-alpha.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.15.2-alpha.1...v0.16.0-alpha.0) (2021-11-28)


### Features

* **core:** Export moment type ([bd64ebb](https://github.com/andrewcpacifico/allspark-ts/commit/bd64ebb5fccf9f13100cca1b9be05235d3da844c))





## [0.15.2-alpha.1](https://github.com/andrewcpacifico/allspark-ts/compare/v0.15.2-alpha.0...v0.15.2-alpha.1) (2021-11-27)

**Note:** Version bump only for package allspark-ts





## [0.15.2-alpha.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.15.1...v0.15.2-alpha.0) (2021-11-27)

**Note:** Version bump only for package allspark-ts





## [0.15.1](https://github.com/andrewcpacifico/allspark-ts/compare/v0.15.0...v0.15.1) (2021-11-22)


### Bug Fixes

* **rest:** Fix moment import ([719718f](https://github.com/andrewcpacifico/allspark-ts/commit/719718f4a193d8c3acfaefd4a667b131da537e42))





# [0.15.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.14.0...v0.15.0) (2021-11-22)


### Features

* **core:** Add moment dependency ([579d9d3](https://github.com/andrewcpacifico/allspark-ts/commit/579d9d3930e3bbf072038d86be759697a3ad7ebd))
* **rest:** Inject moment dependency ([27ecfbf](https://github.com/andrewcpacifico/allspark-ts/commit/27ecfbf1fa9ac57ef157605c8a2ef8215a2b4c7f))





# [0.14.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.13.0...v0.14.0) (2021-11-21)


### Bug Fixes

* **core/database:** Fix wrong mongo injection ([54b9bbe](https://github.com/andrewcpacifico/allspark-ts/commit/54b9bbea9198826b1937884bb7fbcadacf56415f))


### Features

* **builder:** Add support to ts paths ([f3e14d4](https://github.com/andrewcpacifico/allspark-ts/commit/f3e14d457b438a7d97e717ea2b80335b74d26d5e))
* **core/database:** Add mongo manager ([d331e1e](https://github.com/andrewcpacifico/allspark-ts/commit/d331e1e9e929fb81bf91aaf6c405b1b6408e6d33))
* **rest/app:** Add mongo manager ([1aa413d](https://github.com/andrewcpacifico/allspark-ts/commit/1aa413d71431c2bcb9c367c2d2c43bb3c2a7575c))
* **rest/server:** Add controller interface ([c38f548](https://github.com/andrewcpacifico/allspark-ts/commit/c38f5483a0cb27a597301d1ab468a725aa504e6a))





# [0.13.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.12.0...v0.13.0) (2021-11-21)


### Features

* **rest/app:** Apply middlewares ([75d5fbf](https://github.com/andrewcpacifico/allspark-ts/commit/75d5fbf94050687796573b17846f580719e9dee3))





# [0.12.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.11.0...v0.12.0) (2021-11-21)


### Features

* **rest:** Add express validation ([151ccd4](https://github.com/andrewcpacifico/allspark-ts/commit/151ccd48ae3a0f0ba8e050b179201ca7904b0408))





# [0.11.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.10.0...v0.11.0) (2021-11-20)


### Bug Fixes

* **builder/test-unit:** Set test files to load ([fcfdcdb](https://github.com/andrewcpacifico/allspark-ts/commit/fcfdcdb81c88d13d83a09864f7a8c34985bfa596))


### Features

* **builder/lint:** Add .eslintrc and update deps ([869cada](https://github.com/andrewcpacifico/allspark-ts/commit/869cada5bac25e5690cafd6203b80710b74a5ce0))





# [0.10.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.9.0...v0.10.0) (2021-11-20)


### Features

* **builder/lint:** Add lint command ([b88dc47](https://github.com/andrewcpacifico/allspark-ts/commit/b88dc47ed239d6b0ab5c58769a53bf9f990d0eda))
* **builder/test-unit:** Add test unit command ([c19c802](https://github.com/andrewcpacifico/allspark-ts/commit/c19c802ba27933eed470aa02f9f6bcf76db1efb9))





# [0.9.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.8.0...v0.9.0) (2021-11-20)


### Features

* **builder/dev:** Add dev command ([4784e60](https://github.com/andrewcpacifico/allspark-ts/commit/4784e60b65344f3dde92557e022f139499e32995))





# [0.8.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.7.0...v0.8.0) (2021-11-20)


### Features

* **builder:** Add new builder package ([9a12bf4](https://github.com/andrewcpacifico/allspark-ts/commit/9a12bf4cdb79f3f48912879efb1a5f444aa5934e))
* **core/di:** Allow configure source path ([24887d3](https://github.com/andrewcpacifico/allspark-ts/commit/24887d323e3eb8b5c8bd2a4f2a8c877857ce8f62))
* **core/logger:** Add config to init method ([9100b02](https://github.com/andrewcpacifico/allspark-ts/commit/9100b02fca44c4c7eb33097bc565e439da51b74a))
* **core/logger:** Add pino pretty support ([cea5463](https://github.com/andrewcpacifico/allspark-ts/commit/cea54638b1ed41046f21b6f0c63d4d8fb7fc548a))
* **rest/app:** Load modules from directories ([6369d58](https://github.com/andrewcpacifico/allspark-ts/commit/6369d588a30dfe3e5d3255522fda64d5e5d6ca96))
* **rest/app:** Pass logger options from config ([ed331b0](https://github.com/andrewcpacifico/allspark-ts/commit/ed331b03f02113bf965893b38ce875e4ab5f5b89))





# [0.7.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.6.1...v0.7.0) (2021-11-15)


### Bug Fixes

* **rest/app:** Fix dependency injection errors ([44a84bb](https://github.com/andrewcpacifico/allspark-ts/commit/44a84bb5d8ecc0bdaff5f4c3799b4897f55c09ad))


### Features

* **core/config-manager:** Load env to nconf manager ([1088b7e](https://github.com/andrewcpacifico/allspark-ts/commit/1088b7ebab33ca70d759f6209903879e9536ef85))
* **core:** Export default instance of modules ([af50cf6](https://github.com/andrewcpacifico/allspark-ts/commit/af50cf661b45ed2bfcde621985d4890585e241f5))





## [0.6.1](https://github.com/andrewcpacifico/allspark-ts/compare/v0.6.0...v0.6.1) (2021-11-15)


### Bug Fixes

* **rest/app:** Use default configManager dependency ([95b0205](https://github.com/andrewcpacifico/allspark-ts/commit/95b02053e6674eadcb71decb04bdfb8bf6e538bc))





# [0.6.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.5.1...v0.6.0) (2021-11-15)


### Features

* **core/config-manager:** Add default path value ([2602cec](https://github.com/andrewcpacifico/allspark-ts/commit/2602cec6387b954e2659e2e090baddc29d58bb02))





## [0.5.1](https://github.com/andrewcpacifico/allspark-ts/compare/v0.5.0...v0.5.1) (2021-11-15)


### Bug Fixes

* **rest:** Application not exported ([77ab24b](https://github.com/andrewcpacifico/allspark-ts/commit/77ab24bdac11177b494d0d697a411640c8db88ae))





# [0.5.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.4.0...v0.5.0) (2021-11-15)


### Features

* **core/di:** Add dependency injector module ([ae67e41](https://github.com/andrewcpacifico/allspark-ts/commit/ae67e410a5f97cf24d8fa090426009d34b177d34))
* **core/di:** Add generic container type ([e0192ab](https://github.com/andrewcpacifico/allspark-ts/commit/e0192ab0f7a3e5fd79519856539e8217231b0e3e))
* **rest:** Add basic app implementation ([063e084](https://github.com/andrewcpacifico/allspark-ts/commit/063e08472e781166a7bcb32faf78aeeb56d96111))





# [0.4.0](https://github.com/andrewcpacifico/allspark-ts/compare/v0.3.0...v0.4.0) (2021-11-15)


### Features

* **core/config-manager:** Add config manager module ([5720315](https://github.com/andrewcpacifico/allspark-ts/commit/572031587fe4a5111b297f6bbacec55043c53725))
* **core/failable:** Add new failable module ([03423eb](https://github.com/andrewcpacifico/allspark-ts/commit/03423eb2f32e27fb1a5f84d23859fcf42c181fae))
* **rest:** Add new package rest ([e7087db](https://github.com/andrewcpacifico/allspark-ts/commit/e7087db8c56786fd60969601e81721f2a63c8942))





# 0.3.0 (2021-11-15)


### Features

* Add lerna support ([efe4f84](https://github.com/andrewcpacifico/allspark-ts/commit/efe4f84aaeea3dae49951c2f8177699effc0544e))
* **core/logger:** Add new logger module ([ddd38a8](https://github.com/andrewcpacifico/allspark-ts/commit/ddd38a84c16ffaf7c7d58fe7f7aa77803f415d62))
* **core:** Add new package ([b690883](https://github.com/andrewcpacifico/allspark-ts/commit/b690883df30a5e562df6803d0155ac9c4e571ddd))
