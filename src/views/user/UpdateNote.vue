<template>
    <el-col :span="20">
        <el-row>
            <el-col :span="20">
                <el-badge :value="activities.length" class="item badge">
                    <el-button size="small" style="margin-bottom: 1rem;">更新日记</el-button>
                </el-badge>
                <el-timeline>
                    <el-timeline-item
                            v-for="(activity, index) in activities"
                            :key="index"
                            :icon="activity.icon"
                            :type="activity.type"
                            :color="activity.color"
                            :size="activity.size"
                            :timestamp="activity.timestamp">
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </el-col>
        </el-row>
    </el-col>
</template>

<script>
    import {activities} from "../../config/updateNotes.json";

    export default {
        name: "UpdateNote",
        data() {
            return {
                activities: []
            }
        },
        created() {
            this.activities = activities;
        }
    }
</script>

<style scoped lang="scss">
    .update {

    }
</style>
