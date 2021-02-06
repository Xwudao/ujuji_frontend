<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="24">
                <div class="bold" style="margin-right: 1rem;">
                    <el-badge :value="tableData.length" class="item badge">
                        <el-button size="small">盒子列表</el-button>
                    </el-badge>
                    <el-tooltip class="item" effect="dark" content="添加盒子" placement="top">
                        <el-button type="success" size="small" icon="el-icon-plus" @click="showBoxDialog = true"
                                   circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="图标工具" placement="top">
                        <el-button type="warning" size="small" icon="el-icon-picture-outline" @click="imgTool"
                                   circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="刷新列表" placement="right">
                        <el-button type="info" size="small" icon="el-icon-refresh" @click="reqData"
                                   circle></el-button>
                    </el-tooltip>
                    <div class="search-box">
                        <el-input v-model="searchInput" clearable @input="inputSearch"
                                  placeholder="输入标题关键词，检索本页面"></el-input>
                    </div>
                </div>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            label="标题"
                            width="250">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.title }}</span>
                        </template>
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            label="图标"-->
                    <!--                            width="350">-->
                    <!--                        <template slot-scope="scope">-->
                    <!--                            <span style="margin-left: 10px">{{ processLink(scope.row.titleIcon) }}</span>-->
                    <!--                        </template>-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="访问密码"
                            width="150">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.pwd }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="顺序权值"
                            width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.boxOrder }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="盒子介绍"
                            width="300">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.introduction }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <AddBoxDialog :showAddBox="showBoxDialog"/>
        <UpdateBoxDialog :showUpdateBox="showUpdateBox"/>
        <ImageDialog :showImageBox="showImageBox"/>
    </el-col>
</template>

<script>
    import UpdateBoxDialog from "../../components/dialog/UpdateBoxDialog";
    import AddBoxDialog from "../../components/dialog/AddBoxDialog";
    import ImageDialog from "../../components/dialog/ImageDialog";
    import TransformData from "../../config/TransformData";

    export default {
        name: "BoxConfig",
        components: {AddBoxDialog, UpdateBoxDialog, ImageDialog},

        data() {
            return {
                showBoxDialog: false,
                showUpdateBox: false,
                showImageBox: false,
                userId: -1,
                searchInput: '',
                tableOriginData: [],
                tableData: []
            }
        },
        methods: {
            inputSearch() {
                let oldData = this.tableOriginData;
                if (this.searchInput === null || this.searchInput === '') {
                    this.tableData = this.tableOriginData;
                } else {
                    let newArr = [];
                    this.tableOriginData.forEach(item => {
                        if (item.title.indexOf(this.searchInput) !== -1) {
                            newArr.push(item);
                        }
                    });
                    this.tableOriginData = oldData;
                    this.tableData = newArr;
                }
            },
            /*图标工具dialog*/
            imgTool() {
                this.showImageBox = true;
            },
            handleEdit(index, row) {
                this.showUpdateBox = true;
                TransformData.$emit('updateBox', row);
            },
            handleDelete(index, row) {
                this.$confirm('将永久删除该盒子，且旗下所有站点列表也会被删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._delete(row.id);
                });
            },
            processDate(date) {
                let d = new Date(date);
                return d.getFullYear() + (d.getMonth() + 1) + d.getDate();
            },
            processLink(link) {
                let links = link.split('');
                if (links.length > 30) {
                    return link.substring(0, 30) + '......';
                }
                return link;
            },
            _delete(id) {
                this.$http.delete('/user/box/' + id)
                    .then(res => {
                        let data = res.data;
                        if (data.code === 30004) {
                            this.$notify.success(data.msg);
                            this.reqData();//刷新
                        } else {
                            this.$notify.error(data.msg);
                        }
                    }).catch(() => {
                    this.$notify.error('系统错误');
                })
            },
            reqData() {
                this.$http.get('/user/box/user/' + this.userId)
                    .then(res => {
                        // console.log(res);
                        let data = res.data;
                        this.tableOriginData = data.data;
                        this.tableData = data.data;
                        // this.filterData(data.data);//处理数据
                    }).catch(() => {
                    this.$notify.error('系统错误，请刷新或联系管理员');
                })
            }
        },
        created() {
            this.userId = localStorage.getItem('userId');
            this.reqData();

            // 传输数据
            TransformData.$on('cancelAddBox', () => {
                this.showBoxDialog = false;
            });
            TransformData.$on('cancelUpdateBox', () => {
                this.showUpdateBox = false;
            });
            TransformData.$on('updateList', () => {
                this.reqData();
            });
            /*关闭图标工具*/
            TransformData.$on('cancelImageBox', () => {
                this.showImageBox = false;
            });
        }
    }
</script>

<style scoped lang="scss">
    .badge {
        margin-right: 2rem;
    }

    .search-box {
        margin-left: 1rem;
        display: inline-block;
        width: 15rem;
    }
</style>