// 导入自己需要的组件
import {
    Notification, Loading, Message, Upload, Divider,
    Card, Form, FormItem, Input, Button, Table, TableColumn, Badge, MessageBox,
    Tooltip, Select, Option, Alert, InputNumber, ColorPicker, Timeline, TimelineItem,
    RadioGroup, Radio,
    Backtop, Tag, Pagination, Checkbox, Step, Steps, Switch,
    Dialog, Row, Col, TabPane, Tabs, MenuItem, Submenu, Menu, Drawer
} from 'element-ui'

const element = {
    install: function (Vue) {
        Vue.use(Divider);
        Vue.use(Drawer);
        Vue.use(Upload);
        Vue.use(Radio);
        Vue.use(RadioGroup);
        Vue.use(Switch);
        Vue.use(Checkbox);
        Vue.use(Steps);
        Vue.use(Step);
        Vue.use(Pagination);
        Vue.use(Tag);
        Vue.use(Timeline);
        Vue.use(Backtop);
        Vue.use(TimelineItem);
        Vue.use(ColorPicker);
        Vue.use(InputNumber);
        Vue.use(Alert);
        Vue.use(Option);
        Vue.use(Select);
        Vue.use(Badge);
        Vue.use(Tooltip);
        Vue.use(Table);
        Vue.use(TableColumn);
        Vue.use(Loading.directive);
        Vue.prototype.$notify = Notification;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$message = Message;
        Vue.use(Dialog);
        Vue.use(Row);
        Vue.use(Col);
        Vue.use(TabPane);
        Vue.use(Tabs);
        Vue.use(Submenu);
        Vue.use(Card);
        Vue.use(Menu);
        Vue.use(MenuItem);
        Vue.use(FormItem);
        Vue.use(Form);
        Vue.use(Input);
        Vue.use(Button);
    }
};
export default element
