<template>
    <el-col :span="20">
        <el-badge :value="total" class="item badge">
            <el-button size="small">留言管理</el-button>
        </el-badge>
        <div class="input">
            <el-input v-model="searchKw" size="medium" placeholder="输入关键词搜索" @keyup.native.enter="onSearch">
                <el-button slot="append" size="medium" icon="el-icon-search" @click="onSearch"></el-button>
            </el-input>

        </div>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            label="昵称"
                            width="250">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="留言时间"
                            width="200">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
                        </template>
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            label="IP"-->
                    <!--                            width="150">-->
                    <!--                        <template slot-scope="scope">-->
                    <!--                            <span style="margin-left: 10px">{{ scope.row.ip }}</span>-->
                    <!--                        </template>-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="置顶"
                            width="100">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.fixed===1">已置顶</el-tag>
                            <el-tag v-else>未置顶</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="状态"
                            width="100">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.isRead">已读</el-tag>
                            <el-tag v-else type="danger">未读</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="primary"
                                    size="mini"
                                    @click="handleReply(scope.$index, scope.row)">回复
                            </el-button>
                            <el-button
                                    size="mini"
                                    @click="handleView(scope.$index, scope.row)">查看
                            </el-button>
                            <el-button
                                    v-if="scope.row.fixed===0"
                                    type="warning"
                                    size="mini"
                                    @click="handleFixed(scope.$index, scope.row)">置顶
                            </el-button>
                            <el-button
                                    v-else
                                    type="warning"
                                    size="mini"
                                    @click="handleFixed(scope.$index, scope.row)">取顶
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="page"
                        background
                        :page-size="pageSize"
                        :current-page="pageNo"
                        @current-change="onChangePage"
                        layout="prev, pager, next"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <ViewMsgDialog :show-view-msg-dialog="showViewMsgDialog"/>
        <MsgReplyDialog :show-reply-msg-dialog="showReplyMsgDialog"/>
    </el-col>

</template>

<script>
    import ViewMsgDialog from "../../components/dialog/ViewMsgDialog";
    import TransformData from "../../config/TransformData";
    import MsgReplyDialog from "../../components/dialog/MsgReplyDialog";

    export default {
        name: "MsgConfig",
        components: {ViewMsgDialog, MsgReplyDialog},
        data() {
            return {
                showViewMsgDialog: false,
                showReplyMsgDialog: false,
                tableData: [],
                pageSize: 20,
                pageNo: 1,
                total: 0,
                searchKw: '',
            }
        },
        methods: {
            handleView(index, row) {
                this.showViewMsgDialog = true;
                TransformData.$emit('ViewMsgText', row);
            },
            handleReply(index, row) {
                this.showReplyMsgDialog = true;
                TransformData.$emit('ReplyMsgText', {id: row.id, reply: row.reply});
            },
            handleFixed(index, row) {
                this.$confirm('确定置顶/取消置顶?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.reqFixedMsg(row.id);
                });
            },
            handleDelete(index, row) {
                this.$confirm('将删除该留言，此操作不可逆，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.reqDelete(row.id);
                });
            },
            onChangePage(page) {
                this.pageNo = page;
            },
            onSearch() {
                this.reqSearch();
            },
            reqFixedMsg(id) {
                this.$http.get('/user/leaveMsg/setFixed/' + id)
                    .then(res => {
                        let data = res.data;
                        let code = data.code;
                        if (code === 31016) {
                            this.$notify.success(data.msg);
                            this.reqData();
                        } else {
                            this.$notify.error(data.msg);
                        }
                    }).catch(() => {
                    this.$notify.error('系统错误');
                });
            },
            reqDelete(id) {
                this.$http.delete('/user/leaveMsg/' + id)
                    .then(res => {
                        let data = res.data;
                        let code = data.code;
                        if (code === 30004) {
                            this.$notify.success(data.msg);
                            this.reqData();
                        } else {
                            this.$notify.error(data.msg);
                        }
                    }).catch(() => {
                    this.$notify.error('系统错误');
                });
            },
            reqData() {
                this.$http.get('/user/leaveMsg?pageNo=' + this.pageNo + '&pageSize=' + this.pageSize)
                    .then(res => {
                        let data = res.data;
                        this.tableData = data.data.records;
                        this.total = data.data.total;
                    }).catch(() => {
                    this.$notify.error('系统错误');
                });
            },
            reqSearch() {
                if (!this.searchKw) {
                    this.reqData();
                    return;
                }
                this.$http.get('/user/leaveMsg/search?kw=' + this.searchKw + '&pageNo=' + this.pageNo + '&pageSize=' + this.pageSize)
                    .then(res => {
                        let data = res.data;
                        this.tableData = data.data.records;
                        this.total = data.data.total;
                    }).catch(() => {
                    this.$notify.error('系统错误，搜索失败');
                });
            }
        },
        created() {
            this.reqData();
            // 监听取消Dialog
            TransformData.$on('changeViewMsgDialog', val => {
                this.showViewMsgDialog = val;
            });
            TransformData.$on('changeReplyMsgDialog', val => {
                this.showReplyMsgDialog = val;
            });
            //刷新
            TransformData.$on('refreshMsgList', () => {
                this.reqData();
            });
        },
        watch: {
            pageNo() {
                if (!this.searchKw) {
                    this.reqData();
                } else {
                    this.reqSearch();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
        margin-top: 1rem;
        text-align: center;
    }

    .search-box {
        margin-left: 1rem;
        display: inline-block;
        width: 15rem;
    }

    .input {
        margin-bottom: 1rem;
        display: inline-block;
        margin-left: 2rem;
    }
</style>