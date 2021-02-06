<template>
  <el-col :span="20">
    <el-row>
      <el-col :span="24">
        <el-button size="small">导入功能</el-button>
        <el-alert
            class="notice"
            title="此功能【测试中】，请勿滥用该功能！导入成功后，更多功能（如设置盒子密码）请去相应菜单"
            type="warning"
            effect="dark"
        ></el-alert>
        <el-row>
          <el-col :span="4">
            <el-card class="box-card">
              <el-button type="primary" @click="handleClick" class="btn-upload"><i
                  class="el-icon-upload"></i>
              </el-button>
              <div class="text">
                <p>提示：[此处]仅能上传<span>经过本站导出的</span>，格式为.csv 的文件，其余不支持！</p>
              </div>
            </el-card>
            <el-card class="box-card">
              <el-button type="primary" @click="handleClick" class="btn-upload"><i
                  class="el-icon-upload"></i>
              </el-button>
              <div class="text">
                <p>提示：[此处]仅能上传<span>从Chrome内核到浏览器导出的</span>，格式为.html 的文件，其余不支持！<span>且仅支持第一级书签目录！</span></p>
              </div>
            </el-card>
            <input type="file" style="display: none" ref="input-file">
          </el-col>
          <el-col :span="10">
            <div class="cards">
              <div class="card" v-for="(box,j) in boxList" :key="j">
                <div class="left-box">
                  <div class="title">{{ box.boxTitle }}</div>
                  <div class="links">
                    <div class="link" v-for="(item,i) in box.links" :key="i">
                      <div class="text">[{{ i + 1 }}] {{ item.title }}</div>
                      <a :href="item.link" target="_blank" v-text="item.link"></a>
                    </div>
                  </div>
                </div>
                <div class="right-btn">
                  <el-button type="success" size="small" @click="onImport(j)"
                             :loading="loading.includes(j)"
                             :disabled="imported.includes(j)">导入
                  </el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>

import {reqImportBox} from "@/api/userApi";
import {SUCCESS_CODE} from "@/config/code";

const parseByString = require("bookmark-file-parser").parseByString
export default {
  name: 'ImportConfig',
  data() {
    return {
      boxList: [],
      imported: [],
      loading: []
    }
  },
  methods: {
    //导入操作
    onImport(index) {
      if (index > this.boxList.length - 1) {
        return;
      }
      this.loading.push(index)
      reqImportBox(this.boxList[index])
          .then((res) => {
            let data = res.data
            let resNum = data.data;

            if (data.code === SUCCESS_CODE) {
              this.$notify.success(`成功导入${resNum}条数据`);
              this.imported.push(index)
            } else {
              this.$notify.error(data.msg);
            }
          }).finally(() => {
        this.loading = this.loading.filter((item) => {
          return item !== index
        })
      })

    },
    handleClick() {
      this.$refs['input-file'].click();
    },
    //处理数据
    processCnt(data) {
      let list = data.split('\n')
      let obj = {}
      for (let i = 1; i < list.length; i++) {
        let d = list[i].split(',');

        let [title, link, description, boxTitle] = d;
        if (boxTitle === undefined) continue
        if (!obj[boxTitle]) {
          obj[boxTitle] = {
            boxTitle,
            links: []
          }
          obj[boxTitle].links.push({title, link, description})
        } else {
          obj[boxTitle].links.push({title, link, description})
        }

      }
      this.boxList = this.boxList.splice(0, this.boxList.length)
      this.boxList = Object.values(obj); // 最终输出
    },
    // 处理html导出到书签
    processHtmlCnt(cnt) {
      let res = parseByString(cnt)
      let resData = []
      if (res && res[0]) {
        let data = res[0].children
        if (!data) {
          this.$notify.error('解析文件失败，抱歉')
          return;
        }
        data.forEach((item) => {
          resData.push(..._parse(item))
        })

        this.boxList = resData

      }

      // 递归解析多层
      function _parse(data) {
        let resData = []
        if (data.children && data.children.length > 0) {
          let {name, children} = data
          let links = []
          children.forEach((item2) => {
            // console.log('item2',item2);
            if (item2.children.length > 0) {
              return resData.push(..._parse(item2.children))
            }

            let {href, name} = item2;
            links.push({title: name, link: href, description: ''})
          })
          resData.push({boxTitle: name, links})
          return resData
        } else {
          return []
        }
      }

    },
    readFile(files) {
      if (files.length) {
        const file = files[0];
        const reader = new FileReader();//new一个FileReader实例
        // console.log(file.type);
        this.loading.splice(0, this.loading.length)
        this.imported.splice(0, this.imported.length)
        if (/excel/.test(file.type)) {//判断文件类型，是不是text类型
          reader.onload = () => {
            this.processCnt(reader.result);
          }
          reader.readAsText(file);
        } else if (/html/.test(file.type)) {
          reader.onload = () => {
            this.processHtmlCnt(reader.result);
          }
          reader.readAsText(file)
        } else {
          this.$notify.error('请上传从本站导出的.csv或从Chrome内核浏览器到处到.html文件哟');
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs['input-file'].addEventListener('change', (e) => {
        const tar = e.target;
        this.readFile(tar.files);
      })
    })
  }
};
</script>

<style lang="scss" scoped>
.notice {
  margin-top: 1rem;
}

.box-card {
  width: 165px;
  margin-top: 1rem;
  display: inline-block;

  .btn-upload {
    i {
      font-size: 5rem;
    }
  }

  .text {
    //display: inline-block;
    margin-top: .6rem;
    white-space: pre-wrap;
    font-size: .8rem;
    color: #666666;

    span {
      color: red;
    }
  }
}

.cards {
  margin: 1rem 0;

  .card {
    display: flex;
    margin: 1rem 0;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 1rem;

    .left-box {
      margin-right: 1rem;
      width: 420px;
      padding: 1rem;
      border: 1px solid #dddddd;
      height: 200px;
      border-radius: 10px;

      .title {
        text-align: center;
        font-weight: bold;
      }

      .links {
        height: 170px;
        overflow-y: auto;
        margin-top: 1rem;

        &::-webkit-scrollbar {
          width: 0;
        }


        .link {
          display: flex;
          line-height: 1.4rem;
          flex-wrap: wrap;
          border-bottom: 1px solid #dddddd;
          padding-bottom: .2rem;
          margin-bottom: .2rem;

          .text {
            margin-right: 1rem;
          }

          a {
            text-decoration: #666666;
          }
        }
      }
    }

    .right-bar {
      margin-left: 1rem;
      line-height: 200px;
    }
  }
}
</style>
