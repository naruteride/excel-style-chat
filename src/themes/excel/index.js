import "./excel-login/index.js";
import "./excel-chat/index.js";

// Inject Excel Theme CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/src/themes/excel/index.css";
// Avoid duplicate injection
if (!document.querySelector(`link[href="${link.href}"]`)) {
    document.head.appendChild(link);
}

export default {
    name: "excel",
    // Defines which Custom Element tag to use for each route/view
    views: {
        login: "excel-login",
        chat: "excel-chat",
    },
    // We can still keep shared props here if needed, but primarily now driven by components
};
