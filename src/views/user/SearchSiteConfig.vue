<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="24">
                <el-button size="small" style="margin-bottom: 1rem;">搜索管理</el-button>

                <el-tooltip class="item" effect="dark" content="添加搜索站点" placement="top">
                    <el-button type="success" size="small" icon="el-icon-plus" @click="showAddSearchSite = true"
                               circle></el-button>
                </el-tooltip>
                <span class="link"><a href="https://www.misiyu.cn/article/152.html"
                                      target="_blank">如何配置，请参考这里</a></span>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            label="名称"
                            width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="提示"
                            width="300">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.notice }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="顺序"
                            width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.siteOrder }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="地址"
                            width="250">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ processLink(scope.row.searchUrl) }}</span>
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
        <AddSearchSiteDialog :show-add-search-site="showAddSearchSite"/>
        <UpdateSearchSiteDialog :show-update-search-site="showUpdateSearchSite"/>
    </el-col>

</template>

<script>
    import UpdateSearchSiteDialog from "../../components/dialog/UpdateSearchSiteDialog";
    import AddSearchSiteDialog from "../../components/dialog/AddSearchSiteDialog";
    import TransformData from "../../config/TransformData";

    export default {
        name: "SearchSiteConfig",
        components: {
            AddSearchSiteDialog,
            UpdateSearchSiteDialog,
        },
        data() {
            return {
                tableData: [],
                showAddSearchSite: false,
                showUpdateSearchSite: false,
            }
        },
        methods: {
            processLink(link) {
                let links = link.split('');
                if (links.length > 30) {
                    return link.substring(0, 30) + '......';
                }
                return link;
            },
            handleEdit(index, row) {
                this.showUpdateSearchSite = true;
                TransformData.$emit('updateSearchSite', row);
            },
            handleDelete(index, row) {
                this.$confirm('删除操作不可逆，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._delete(row.id);
                });
            },
            _delete(id) {
                this.$http.delete('/user/searchSite/' + id)
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
                this.$http.get('/user/searchSite')
                    .then(res => {
                        let data = res.data;
                        this.tableData = data.data;
                        console.log(this.tableData);
                    }).catch(() => {
                    this.$notify.error('系统错误，请刷新或联系管理员');
                })
            }
        },
        created() {
            this.reqData();

            //
            TransformData.$on('cancelAddSearchSiteDialog', () => {
                this.showAddSearchSite = false;
            })
            TransformData.$on('cancelUpdateSearchSiteDialog', () => {
                this.showUpdateSearchSite = false;
            })
            TransformData.$on('updateSearchSiteList', () => {
                this.reqData();
            })
        }
    }
</script>

<style scoped lang="scss">
    .link {
        margin-left: 1rem;

        a {
            text-decoration: underline;
            color: #2ecc71;
        }
    }
</style>