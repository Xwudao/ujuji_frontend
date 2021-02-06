<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="24">
                <div class="bold" style="margin-right: 1rem;">
                    <el-badge :value="tableData.length" class="item badge">
                        <el-button size="small">站点列表</el-button>
                    </el-badge>

                    <el-select v-model="nowBox" filterable placeholder="请选择盒子查看站点列表"
                               @change="ChangeBox"
                               style="margin-right: 1rem;">
                        <el-option
                                v-for="item in boxes"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>

                    <el-tooltip class="item" effect="dark" content="添加站点" placement="top">
                        <el-button type="success" size="small" icon="el-icon-plus" @click="showAddBox = true"
                                   circle></el-button>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="图标工具" placement="top">
                        <el-button type="warning" size="small" icon="el-icon-picture-outline" @click="imgTool"
                                   circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="刷新列表" placement="right">
                        <el-button type="info" size="small" icon="el-icon-refresh" @click="onRefresh"
                                   circle></el-button>
                    </el-tooltip>

                    <div class="search-box">
                        <el-input v-model="searchInput" clearable @input="inputSearch"
                                  placeholder="输入标题关键词，检索本页面"></el-input>
                    </div>

                    <el-alert
                            style="margin-top: 1rem;"
                            title="敬告：请勿添加非法（包括不限于黄、赌、毒、vp.n等）网站，共同维护健康的环境【一旦发现，封号处理，不解释】"
                            type="error"
                            effect="dark">
                    </el-alert>
<!--                    <el-alert-->
<!--                            style="margin-top: 1rem;"-->
<!--                            title="公告：即日起，添加链接会有1分钟的延迟（后台有缓存），并不是没有添加成功，请勿重复添加！"-->
<!--                            type="success"-->
<!--                            effect="dark">-->
<!--                    </el-alert>-->

                </div>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <!--                    <el-table-column-->
                    <!--                            label="创建时间"-->
                    <!--                            width="200">-->
                    <!--                        <template slot-scope="scope">-->
                    <!--                            <i class="el-icon-time"></i>-->
                    <!--                            <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>-->
                    <!--                        </template>-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="标题"
                            width="250">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="链接"
                            width="250">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.link }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="描述"
                            width="250">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.description }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="顺序"
                            width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.linkOrder }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="显示"
                            width="100">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.isShow">已显示</el-tag>
                            <el-tag type="danger" v-else>已隐藏</el-tag>
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
        <AddListDialog :show-add-box="showAddBox" :boxes="boxes"/>
        <UpdateListDialog :show-update-box="showUpdateBox" :boxes="boxes"/>
        <ImageDialog :show-image-box="showImageBox"/>
    </el-col>

</template>

<script>
    import TransformData from "../../config/TransformData";
    import AddListDialog from "../../components/dialog/AddListDialog";
    import UpdateListDialog from "../../components/dialog/UpdateListDialog";
    import ImageDialog from "../../components/dialog/ImageDialog";

    export default {
        name: "ListConfig",
        components: {AddListDialog, UpdateListDialog, ImageDialog},

        data() {
            return {
                showAddBox: false,
                showUpdateBox: false,
                showImageBox: false,
                userInfo: {},
                tableData: [],
                nowBox: '',
                boxes: [],
                searchInput: '',
                tableOriginData: [],
                choseBox: -1,
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

            ChangeBox(id) {
                this.choseBox = id;
                this.reqData();
            },
            handleEdit(index, row) {
                TransformData.$emit('updateLink', row);
                this.showUpdateBox = true;
            },
            handleDelete(index, row) {
                this.$confirm('该删除操作不可逆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this._delete(row.id);
                });


            },
            _delete(id) {
                this.$http.delete('/user/link/' + id)
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
                if (this.choseBox !== -1) {
                    this.$http.get('/user/link/box/' + this.choseBox)
                        .then(res => {
                            console.log(res);
                            let data = res.data;
                            this.tableData = data.data;
                            this.tableOriginData = data.data;
                            // this.filterData(data.data);//处理数据
                        }).catch(() => {
                        this.$notify.error('系统错误，请刷新或联系管理员');
                    });
                }

            },
            reqBoxData() {
                this.$http.get('/user/box/user/' + this.$store.state.userId)
                    .then(res => {
                        let data = res.data;
                        this.boxes = data.data;
                    }).catch(() => {
                    this.$notify.error('系统错误，请刷新或联系管理员');
                })
            },
            onRefresh() {
                this.reqData();
                this.reqBoxData();
            }
        },

        mounted() {
            let d = localStorage.getItem('userInfo');
            this.userInfo = JSON.parse(d) || {};

            // this.reqData();
            // this.reqBoxData();

            // 传输数据
            TransformData.$on('cancelLinkAddBox', () => {
                this.showAddBox = false;
            });
            TransformData.$on('cancelLinkUpdateBox', () => {
                this.showUpdateBox = false;
            });
            TransformData.$on('updateLinkList', () => {
                this.reqBoxData();
                this.reqData();
            });
            /*关闭图标工具*/
            TransformData.$on('cancelImageBox', () => {
                this.showImageBox = false;
            });
        },
        activated() {
            // 激活的话，获取盒子的信息
            this.reqData();
            this.reqBoxData();
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
