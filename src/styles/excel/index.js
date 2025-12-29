import "./components/excel-login.js";
import "./components/excel-chat.js";

export default {
    name: "excel",
    // Defines which Custom Element tag to use for each route/view
    views: {
        login: "excel-login",
        chat: "excel-chat",
    },
    // We can still keep shared props here if needed, but primarily now driven by components
};
