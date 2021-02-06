<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="24">
                <el-button size="small">导出功能</el-button>
                <el-alert
                    class="notice"
                    title="添加网站不是一个容易的事情，不想因为一些特殊情况而导致所有成果白费，特此推出导出功能，用户可自行备份！"
                    type="success"
                    effect="dark"
                ></el-alert>
                <el-row>
                    <el-col :span="16">
                        <div class="export">
                            <el-button @click="exportData" :loading="loading.md" type="primary" size="small">
                                导出Markdown
                            </el-button>
                            <el-button @click="exportCsv" :loading="loading.csv" type="primary" size="small">导出Csv
                            </el-button>
                            <!--                            <el-button @click="exportExcel" type="primary" size="small">导出Excel</el-button>-->
                            <el-button @click="exportTxt" :loading="loading.txt" type="primary" size="small">导出Txt
                            </el-button>
                        </div>

                        <div class="export-result">
                            <el-input type="textarea" :disabled="disableMarkdownInput" v-model="backupData"
                                      :rows="10"></el-input>
                        </div>
                        <el-button size="mini" class="copy">点此复制</el-button>
                        <span class="copy-res" v-show="copyResult" v-text="copyResult"></span>
                        <div class="introduction">
                            <p class="text">
                                1、目前支持Markdown、Csv、TXT格式的导出，Markdown导出后可复制到这里（<a href="https://mdliker.com/"
                                                                                 target="_blank">https://mdliker.com/</a>）查看效果
                            </p>
                            <p class="text">
                                2、Csv导出：Csv文件用Office、WPS打开即可，可能会被Office报有错误，点是（修复）即可
                            </p>
                            <p class="text">
                                3、Txt、Csv导出可能有浏览器兼容性问题，建议使用Chrome内核的浏览器（如Google Chrome、国产QQ、搜狗、360都可）
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-col>
</template>

<script>
import ClipboardJS from "clipboard";
// import {exportExcel} from 'xlsx-oc';

export default {
    name: 'ExportConfig',
    data() {
        return {
            backupData: '',
            copyResult: '',
            results: [],
            loading: {
                md: false,
                txt: false,
                csv: false
            },
            disableMarkdownInput: true,
        }
    },
    methods: {
        /*处理数据*/
        reqData(callFun) {
            this.$http.get('/user/backup')
                .then(res => {
                    let data = res.data;
                    this.results = data.data;
                    callFun(this.results);
                    // this.processData(data.data);
                }).catch(() => {
                this.$notify.error('抱歉，系统错误，获取数据失败');
            });
        },
        //导出markdown
        exportData() {
            this.disableMarkdownInput = false;
            this.loading.md = true;
            this.reqData(data => {
                let result = '';
                data.forEach(item => {
                    let title = `\n# ${item.title}\n\n`;
                    let h_table = `| 标题    | 链接    | 描述   |\n| ---- | ---- | ---- |\n`;
                    let b_table = '';
                    item.links.forEach(item2 => {
                        b_table += `| ${item2.title}   | ${item2.link}   | ${item2.description}   |\n`;
                    });
                    result += title + h_table + b_table;
                });
                this.backupData = result;
                this.loading.md = false
            },);
        },
        //导出excel
        // exportExcel() {
        //     let header = [
        //         {k: 'title', v: '标题'},
        //         {k: 'link', v: '链接'},
        //         {k: 'description', v: '描述'},
        //         {k: 'boxTitle', v: '所属盒子'},
        //     ];
        //     let d = new Date();
        //     let filename = '优聚集导出:' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay() + '.xlsx';
        //     let list = [];
        //     this.reqData((data) => {
        //         data.forEach(item => {
        //             item.links.forEach(link => {
        //                 list.push({
        //                     title: link.title,
        //                     description: link.description,
        //                     link: link.link,
        //                     boxTitle: item.title,
        //                 })
        //             });
        //         });
        //
        //         exportExcel(header, list, filename);
        //     });
        //
        // },
        //导出csv
        exportCsv() {
            this.loading.csv = true
            this.reqData(data => {
                let result = '标题,链接,描述,所属盒子\n';
                data.forEach(item => {
                    let b_table = '';
                    item.links.forEach(item2 => {
                        b_table += `${item2.title},${item2.link},${item2.description},${item.title}\n`;
                    });
                    result += b_table;
                });
                let d = new Date();

                let filename = '优聚集导出:' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay() + '.csv';
                let element = document.createElement('a')
                element.setAttribute('href', 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(result))
                element.setAttribute('download', filename)
                element.click();
                this.loading.csv = false
            });
        },
        //导出txt
        exportTxt() {
            this.loading.txt = true
            this.reqData(data => {
                let result = '';
                data.forEach(item => {
                    let title;
                    if (result === '') {
                        title = `========${item.title}========\n`;
                    } else {
                        title = `\n========${item.title}========\n`;
                    }
                    let b_table = '';
                    item.links.forEach(item2 => {
                        b_table += `${item2.link}\t\t${item2.title}\n`;
                    });
                    result += title + b_table;
                });
                let d = new Date();
                let filename = '优聚集导出:' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay() + '.txt';
                let element = document.createElement('a')
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result))
                element.setAttribute('download', filename)
                element.click();
                this.loading.txt = false
            });
        }
    },
    mounted() {
        //复制
        const cb = new ClipboardJS('.copy', {
            text: () => {
                return this.backupData;
            }
        });
        cb.on('success', () => {
            this.copyResult = '复制成功';
            setTimeout(() => {
                this.copyResult = ''
            }, 1200);

        });
        cb.on('error', () => {
            this.copyResult = '复制失败，请手动复制';
            setTimeout(() => {
                this.copyResult = ''
            }, 1200);
        });
    }
};
</script>

<style lang="scss" scoped>
.notice {
    margin-top: 1rem;
}

.export {
    margin-top: 1rem;
}

.export-result {
    margin-top: 1rem;
}

.copy {
    margin-top: 1rem;
}

.copy-res {
    margin-left: 1rem;
    color: #909399;
    font-size: .9rem;
}

.introduction {
    margin-top: 1rem;
    color: #F56C6C;
}
</style>
