### 优聚集

2020年初，疫情肆虐，想着以后的规划，结果是毫无规划，可能我就是随波逐流、活在当下的人。



不管怎么说，我也希望以后能自由职业且能不饿肚子，为此，为了锻炼技能，写了优聚集这个前后端分离的项目。



这是第一次写较大规模的Vue.js 应用

这也是第一次写较大规模的SpringBoot应用



第一次写，肯定就是巨难看和维护，这点我有自知之明，但是我希望你们不要说出来。我自己知道就行。所以，于2021年我完全从零开始重构了优聚集，前端虽也是Vue.js，但是也是完全重写了。后端用golang重构。不得不说，golang没有像springboot这类似的大统一框架，对于某些方面来说也是好事，我可以完全决定我的后台应用怎么架构。而不是被springboot规定死了：你就该在这个目录写这个东西…



### 仓库

前端仓库（Vue.js）：[https://github.com/Xwudao/ujuji_frontend](https://github.com/Xwudao/ujuji_frontend)

后端仓库（SpringBoot）：[https://github.com/Xwudao/ujuji_backend](https://github.com/Xwudao/ujuji_backend)



### 声明

1、

尽管我已经仔细检查过代码，但是不可避免的可能代码中依旧有一些我个人的私密信息，尤其是诸如邮箱密码之类的，如果被发现了，那么请告知我，或者最起码请不要用它干一些危险的事情，谢谢合作。

2、

因为本套代码之初并不是为了开源而写的，所以对于一些测试中的敏感信息我都是直接写死在代码中的，所以如果您发现了一些私密信息请告知我。



3、

本套代码是基于Vue2.js

这套代码和现在的优聚集 [https://ujuji.com/](https://ujuji.com/) 有很大区别，因为现在的优聚集网站时是我完全在2021年通过golang重构了的。**所以当您发现这和优聚集https://ujuji.com/ 差别很大时，很正常，因为现有优聚集是重构之后的版本。**



4、

如果您想自己部署优聚集前后端项目，最起码得有以下知识点：

- Node.js
- Vue.js
- Javascript



### 构建

1、修改配置文件`src\config\config.js` 

您最起码得修改这一个配置我呢见，其余的，我也忘了，有一些背景图片，赞赏二维码应该是写死在代码里面的，可能需要你找找…

- 修改后台服务器地址：

  ```javascript
  let url;
  if (process.env.NODE_ENV === 'production') {
      url = 'https://api.ujuji.com'
  } else {
      url = 'http://localhost:4037'
  }
  ```

  上面的http://localhost:4037 是本地开发环境的后台服务器地址，https://api.ujuji.com 是线上后台服务器地址


2、当基本配置修改完后，就可以构建了：

执行（需要Nodejs环境）

```bash
npm i
```

构建：

```
npm run build
```



成功后，会输出：

```ini
File                                    Size                                                                               Gzipped

dist\js\chunk-vendors.7dea26e0.js       587.00 KiB                                                                         160.49 KiB
dist\js\chunk-d225f4dc.edb1e5e0.js      457.38 KiB                                                                         139.79 KiB
dist\js\app.3793e2c6.js                 54.83 KiB                                                                          16.93 KiB
dist\js\chunk-3a3be80e.e9fbef86.js      17.79 KiB                                                                          5.94 KiB
dist\js\chunk-49d141fb.a96c2f31.js      16.15 KiB                                                                          5.63 KiB
dist\js\chunk-2304eda0.2f1c8d34.js      14.27 KiB                                                                          3.98 KiB
dist\js\chunk-b851b192.f72d5b6f.js      14.02 KiB                                                                          3.49 KiB
dist\js\chunk-05d7e486.666513f8.js      13.73 KiB                                                                          4.69 KiB
dist\js\chunk-10c0c0ac.f3d8a8a1.js      12.26 KiB                                                                          3.45 KiB
dist\js\chunk-1d8d5dbe.18b0d22f.js      10.31 KiB                                                                          3.08 KiB
dist\js\chunk-4147566f.96f48fad.js      7.40 KiB                                                                           2.48 KiB
dist\js\chunk-71414ebd.a8aa982a.js      7.28 KiB                                                                           2.29 KiB
dist\js\chunk-18609744.b586d9ff.js      6.08 KiB                                                                           1.96 KiB
dist\js\chunk-22de37c4.3677e01d.js      5.84 KiB                                                                           2.13 KiB
dist\js\chunk-772f45f6.89282213.js      5.68 KiB                                                                           2.46 KiB
dist\js\chunk-2e227146.4c3af2c2.js      4.86 KiB                                                                           2.15 KiB
dist\js\chunk-2d2134f8.d57a94a9.js      2.59 KiB                                                                           1.23 KiB
dist\js\chunk-11fbe2c4.f726b5da.js      2.25 KiB                                                                           1.09 KiB
dist\js\chunk-2d0bff6a.0d05008e.js      1.97 KiB                                                                           0.99 KiB
dist\js\chunk-350dbcac.65ad8f0c.js      1.80 KiB                                                                           0.91 KiB
dist\js\chunk-2fd8105c.e4c1219d.js      1.56 KiB                                                                           0.73 KiB
dist\css\chunk-vendors.b87d1f59.css     208.08 KiB                                                                         33.54 KiB
dist\css\app.ea1689dd.css               16.43 KiB                                                                          8.13 KiB
dist\css\chunk-2fd8105c.6e27bbcb.css    2.54 KiB                                                                           0.86 KiB
dist\css\chunk-d225f4dc.b5e4bbcb.css    1.25 KiB                                                                           0.42 KiB
dist\css\chunk-11fbe2c4.bd7e1ba0.css    0.69 KiB                                                                           0.31 KiB
dist\css\chunk-1d8d5dbe.3a0848fc.css    0.51 KiB                                                                           0.25 KiB
dist\css\chunk-4147566f.eb28eeef.css    0.48 KiB                                                                           0.24 KiB
dist\css\chunk-05d7e486.1ae9b438.css    0.40 KiB                                                                           0.21 KiB
dist\css\chunk-350dbcac.a836ecb7.css    0.34 KiB                                                                           0.19 KiB
dist\css\chunk-71414ebd.530fb09f.css    0.28 KiB                                                                           0.17 KiB
dist\css\chunk-22de37c4.ec67429c.css    0.25 KiB                                                                           0.16 KiB
dist\css\chunk-49d141fb.daa62c3a.css    0.25 KiB                                                                           0.14 KiB
dist\css\chunk-3a3be80e.8781878b.css    0.19 KiB                                                                           0.13 KiB
dist\css\chunk-2e227146.23590e22.css    0.13 KiB                                                                           0.12 KiB
dist\css\chunk-18609744.961bc328.css    0.12 KiB                                                                           0.10 KiB
dist\css\chunk-2304eda0.27c6ebd0.css    0.12 KiB                                                                           0.11 KiB
dist\css\chunk-b851b192.5fa2fcc7.css    0.12 KiB                                                                           0.11 KiB
dist\css\chunk-10c0c0ac.d98e47c9.css    0.10 KiB                                                                           0.10 KiB
dist\css\chunk-772f45f6.0e433876.css    0.00 KiB                                                                           0.02 KiB

Images and other types of assets omitted.
```

构建出的产物是：

`dist\`

简单来说把整个dist目录里面的内容放到静态服务器上就行



****



好了，基本配置的就完了，**懂Node.js会Vue.js不用我说都知道怎么弄，不会的，我写再多也是一脸懵**



如果有哪位大神愿意出一个详细的教程，有视频更好，欢迎@我



### 感谢



感谢Jetbrains 这家伟大的IDE开发公司，他们的全家桶极其好用

[https://jetbrains.com/](https://jetbrains.com/)



### 协议

使用本代码请保留前端界面到 https://ujuji.com 的链接

Apache License 2.0

