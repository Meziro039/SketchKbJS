/*
Version: 0.0.1β

License: MIT License
Copyright: Meziro(https://github.com/Meziro039/)
*/

class SketchKb {
    constructor (Pages) {
        this.Pages = Pages;
    };

    Route(PageId, Root) {
        PageId = Object.keys(this.Pages).includes(PageId) ? PageId : "";
        Root = Root ? Root : "";
        history.pushState(null, "", Root + PageId);
        try {
            exit();
        } catch (e) {};
        this.Deploy(PageId);
    };

    async Deploy(PageId) {
        const PageKeys = Object.keys(this.Pages[PageId]);

        // Display content processing.
        for (let i = 0;i < PageKeys.length;i++) {
            if (PageKeys[i].match(/^#/)) {
                let DrawingHtml = [];
                const ElementId = PageKeys[i].replace(/^#/, "");
                const Content = document.getElementById(ElementId) ? true : false;

                if (Content) {
                    console.log(this.Pages[PageId]);
                    const ContentData = this.Pages[PageId]["#" + ElementId];
                    const ContentKey = Object.keys(ContentData);
                    if (ContentKey.includes("Html")) {
                        for (let j = 0;j < ContentData["Html"].length;j++) {
                            const CodePath = ContentData["Html"][j];
                            if (typeof CodePath === "string") {
                                // Code
                                DrawingHtml.push(CodePath);
                            } else {
                                // Path

                                // Cache check.
                                let CacheData = "";
                                const CacheCheck = sessionStorage.getItem(CodePath) ? true : false;
                                if (CacheCheck) {
                                    CacheData = sessionStorage.getItem(CodePath);
                                } else {
                                    try {
                                        sessionStorage.setItem(CodePath, await (await fetch(CodePath)).text());
                                        CacheData = sessionStorage.getItem(CodePath);
                                    } catch (e) {
                                        CacheData = await (await fetch(CodePath)).text();
                                    };
                                };

                                DrawingHtml.push(CacheData);
                            };
                        };
                    };
                    if (ContentKey.includes("Css")) {
                        for (let j = 0;j < ContentData["Css"].length;j++) {
                            const Path = ContentData["Css"][j];

                            // Cache check.
                            let CacheData = "";
                            const CacheCheck = sessionStorage.getItem(Path) ? true : false;
                            if (CacheCheck) {
                                CacheData = sessionStorage.getItem(Path);
                            } else {
                                try {
                                    sessionStorage.setItem(Path, await (await fetch(Path)).text());
                                    CacheData = sessionStorage.getItem(Path);
                                } catch (e) {
                                    CacheData = await (await fetch(Path)).text();
                                };
                            };

                            DrawingHtml.push("<style>" + CacheData + "</style>");
                        };
                    };
                    if (ContentKey.includes("Js")) {
                        for (let j = 0;j < ContentData["Js"].length;j++) {
                            const Path = ContentData["Js"][j];

                            // Cache check.
                            let CacheData = "";
                            const CacheCheck = sessionStorage.getItem(Path) ? true : false;
                            if (CacheCheck) {
                                CacheData = sessionStorage.getItem(Path);
                            } else {
                                try {
                                    sessionStorage.setItem(Path, await (await fetch(Path)).text());
                                    CacheData = sessionStorage.getItem(Path);
                                } catch (e) {
                                    CacheData = await (await fetch(Path)).text();
                                };
                            };

                            DrawingHtml.push("<script>" + CacheData + "</script>");
                        };
                    };

                    DrawingHtml = DrawingHtml.join("");

                    // Javascript conv.
                    let JsArray = [];
                    const JsCheck = DrawingHtml.replace(/<!--.*?-->/gs, "").match(/<script.*?>.*?<\/script>/gs);
                    if (JsCheck != null && JsCheck.length !== 0) {
                        for (let j = 0;j < JsCheck.length;j++) {
                            DrawingHtml = DrawingHtml.replaceAll(JsCheck[j], "");
                            const NewElement = document.createElement("script");
                            const ScriptSuevey = (new DOMParser()).parseFromString(JsCheck[j], "text/html").scripts[0];
                            if (ScriptSuevey.src != "") {
                                NewElement.src = ScriptSuevey.src;
                            };
                            if (ScriptSuevey.type != "") {
                                NewElement.type = ScriptSuevey.type;
                            };                            
                            if (ScriptSuevey.crossOrigin != null) {
                                NewElement.crossOrigin = ScriptSuevey.crossOrigin;
                            };                            
                            if (ScriptSuevey.integrity != "") {
                                NewElement.integrity = ScriptSuevey.integrity;
                            };                           
                            if (ScriptSuevey.referrerPolicy != "") {
                                NewElement.referrerPolicy = ScriptSuevey.referrerPolicy;
                            };                           
                            if (ScriptSuevey.defer != false) {
                                NewElement.defer = ScriptSuevey.defer;
                            };                            
                            if (ScriptSuevey.async != false) {
                                NewElement.async = ScriptSuevey.async;
                            }; 
                            if (ScriptSuevey.textContent != "") {
                                NewElement.textContent = ScriptSuevey.textContent;
                            };
                            JsArray.push(NewElement);
                        };
                    };

                    // Drawing
                    document.getElementById(ElementId).innerHTML = DrawingHtml;
                    for (let j = 0;j < JsArray.length;j++) {
                        document.getElementById(ElementId).appendChild(JsArray[j]);
                    };
                };
            };
        };
    };
};

console.log("Load: SketchKbJS");
console.log("%cSTOP!!\nIf you don't know how to use it, don't touch it.","font-size:20px");