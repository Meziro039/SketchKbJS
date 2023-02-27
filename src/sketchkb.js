/*
Version: 0.0.3β / 2023-02-27
License: MIT License
Copyright: Meziro(https://github.com/Meziro039/)
*/

class SketchKb {
    constructor (Pages) {
        this.Pages = Pages;
    };

    Route(PageId, Root) {
        console.log(PageId);
        Root = Root ? Root : "";
        history.pushState(null, "", Root + PageId);
        try {
            exit();
        } catch (e) {};
        this.Deploy(PageId);
    };

    async Deploy(PageId) {
        // Get Pagekeys
        let PageKeys = "";
        try {
            PageKeys = Object.keys(this.Pages[PageId]);
        } catch (err) {
            if (PageId === "/+") {
                location.href = "/404.html";
                return null;
            } else {
                PageId = PageId.replace(/\/\+$/, "");
                PageId = (PageId.slice(0,PageId.lastIndexOf("/"))) + "/+";
                this.Deploy(PageId);
            };
        };

        // Bind check
        const Bindable = this.Pages[PageId]["Bind"] ? true : false;
        if (Bindable) {
            const UpLayerKey = PageId.slice(0,PageId.lastIndexOf("/") + 1) + "*";
            if (Object.keys(this.Pages).includes(UpLayerKey)) {
                await this.Deploy(UpLayerKey);
            } else {
                console.warn("Bind data not found.");
            }
        };

        // Display content processing.
        for (let i = 0;i < PageKeys.length;i++) {
            if (PageKeys[i].match(/^#/)) {
                let DrawingHtml = [];
                const ElementId = PageKeys[i].replace(/^#/, "");
                const Content = document.getElementById(ElementId) ? true : false;

                if (Content) {
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
                                let CodeData = "";
                                const Cacheable = this.Pages[PageId]["Cache"] ? true : false;
                                if (Cacheable) {
                                    const CacheCheck = sessionStorage.getItem(CodePath) ? true : false;
                                    if (CacheCheck) {
                                        CodeData = sessionStorage.getItem(CodePath);
                                    } else {
                                        try {
                                            sessionStorage.setItem(CodePath, await (await fetch(CodePath)).text());
                                            CodeData = sessionStorage.getItem(CodePath);
                                        } catch (e) {
                                            const CodeFetch = await fetch(CodePath);
                                            if (CodeFetch.ok) {
                                                CodeData = await CodeFetch.text();
                                            } else {
                                                continue;
                                            };
                                        };
                                    };
                                } else {
                                    const CodeFetch = await fetch(CodePath);
                                    if (CodeFetch.ok) {
                                        CodeData = await CodeFetch.text();
                                    } else {
                                        continue;
                                    };
                                };

                                DrawingHtml.push(CodeData);
                            };
                        };
                    };
                    if (ContentKey.includes("Css")) {
                        for (let j = 0;j < ContentData["Css"].length;j++) {
                            const Path = ContentData["Css"][j];

                            // Cache check.
                            let CodeData = "";
                            const Cacheable = this.Pages[PageId]["Cache"] ? true : false;
                            if (Cacheable) {
                                const CacheCheck = sessionStorage.getItem(Path) ? true : false;
                                if (CacheCheck) {
                                    CodeData = sessionStorage.getItem(Path);
                                } else {
                                    try {
                                        sessionStorage.setItem(Path, await (await fetch(Path)).text());
                                        CodeData = sessionStorage.getItem(Path);
                                    } catch (e) {
                                        const CodeFetch = await fetch(Path);
                                        if (CodeFetch.ok) {
                                            CodeData = await CodeFetch.text();
                                        } else {
                                            continue;
                                        };
                                    };
                                };
                            } else {
                                const CodeFetch = await fetch(Path);
                                if (CodeFetch.ok) {
                                    CodeData = await CodeFetch.text();
                                } else {
                                    continue;
                                };
                            };

                            DrawingHtml.push("<style>" + CodeData + "</style>");
                        };
                    };
                    if (ContentKey.includes("Js")) {
                        for (let j = 0;j < ContentData["Js"].length;j++) {
                            const Path = ContentData["Js"][j];

                            // Cache check.
                            let CodeData = "";
                            const Cacheable = this.Pages[PageId]["Cache"] ? true : false;
                            if (Cacheable) {
                                const CacheCheck = sessionStorage.getItem(Path) ? true : false;
                                if (CacheCheck) {
                                    CodeData = sessionStorage.getItem(Path);
                                } else {
                                    try {
                                        sessionStorage.setItem(Path, await (await fetch(Path)).text());
                                        CodeData = sessionStorage.getItem(Path);
                                    } catch (e) {
                                        const CodeFetch = await fetch(Path);
                                        if (CodeFetch.ok) {
                                            CodeData = await CodeFetch.text();
                                        } else {
                                            continue;
                                        };
                                    };
                                };
                            } else {
                                const CodeFetch = await fetch(Path);
                                if (CodeFetch.ok) {
                                    CodeData = await CodeFetch.text();
                                } else {
                                    continue;
                                };
                            };

                            DrawingHtml.push("<script>" + CodeData + "</script>");
                        };
                    };

                    DrawingHtml = DrawingHtml.join("");

                    // Javascript conv.
                    let JsArray = [];
                    const JsCheck = DrawingHtml.replace(/<!--.*?-->/gs, "").match(/<script.*?>.*?<\/script>/gs);
                    if (JsCheck != null && JsCheck.length !== 0) {
                        for (let j = 0;j < JsCheck.length;j++) {
                            DrawingHtml = DrawingHtml.replaceAll(JsCheck[j], "");
                            const NewEle = document.createElement("script");
                            const ScriptSuevey = (new DOMParser()).parseFromString(JsCheck[j], "text/html").scripts[0];
                            if (ScriptSuevey.src != "") {
                                NewEle.src = ScriptSuevey.src;
                            };
                            if (ScriptSuevey.type != "") {
                                NewEle.type = ScriptSuevey.type;
                            };                            
                            if (ScriptSuevey.crossOrigin != null) {
                                NewEle.crossOrigin = ScriptSuevey.crossOrigin;
                            };                            
                            if (ScriptSuevey.integrity != "") {
                                NewEle.integrity = ScriptSuevey.integrity;
                            };                           
                            if (ScriptSuevey.referrerPolicy != "") {
                                NewEle.referrerPolicy = ScriptSuevey.referrerPolicy;
                            };                           
                            if (ScriptSuevey.defer != false) {
                                NewEle.defer = ScriptSuevey.defer;
                            };                            
                            if (ScriptSuevey.async != false) {
                                NewEle.async = ScriptSuevey.async;
                            }; 
                            if (ScriptSuevey.textContent != "") {
                                NewEle.textContent = ScriptSuevey.textContent;
                            };
                            JsArray.push(NewEle);
                        };
                    };

                    // Drawing
                    document.getElementById(ElementId).innerHTML = DrawingHtml;

                    for (let j = 0;j < JsArray.length;j++) {
                        document.getElementById(ElementId).appendChild(JsArray[j]);
                    };

                    // Run run.
                    try {
                        this.Pages[PageId].Run();
                    } catch (e) {};
                };
            };
        };
    };
};

console.log("%cSTOP!!\nIf you don't know how to use it, don't touch it.","font-size:20px");