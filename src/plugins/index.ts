import { Select, Button, Popover, Switch, Modal, Upload } from "ant-design-vue";
import type { App } from "Vue"
const plugins = [Select, Button, Popover, Switch, Modal, Upload]
export default {
    install(app: App) {
        plugins.forEach((plugin) => app.use(plugin))
    }
}