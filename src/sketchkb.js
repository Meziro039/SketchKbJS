/*
Version: 0.0.0β

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
        } catch (e) {}
        this.Deploy(PageId);
    };

    async Deploy(PageId) {
        const PageKeys = Object.keys(this.Pages[PageId]);

        for (let i = 0;i < PageKeys.length;i++) {
            if (PageKeys[i].match(/^#/)) {
                let DrawingHtml = [];
                const Id = PageKeys[i].replace(/^#/, "")
                const Content = document.getElementById(Id) ? true : false;
                if (Content) {
                    const IdData = this.Pages[PageId]["#" + Id];
                    const IdKey = Object.keys(IdData);
                    if (IdKey.includes("Html")) {
                        for (let j = 0;j < IdData["Html"].length;j++) {
                            const MainData = IdData["Html"][j];
                            if (typeof MainData === "string") {
                                // Code
                                DrawingHtml.push(MainData);
                            } else {
                                // Path
                                for (let k = 0;k < MainData.length;k++) {
                                    DrawingHtml.push(await (await fetch(MainData[k])).text());
                                };
                            };
                        };
                    };
                    if (IdKey.includes("Css")) {
                        for (let j = 0;j < IdData["Css"].length;j++) {
                            const MainData = IdData["Css"][j];
                            // Path 仮
                            DrawingHtml.push("<link rel=\"stylesheet\" href=\"" + MainData + "\">");
                        };
                    };
                    if (IdKey.includes("Js")) {
                        for (let j = 0;j < IdData["Js"].length;j++) {
                            const MainData = IdData["Js"][j];
                            // Path 仮
                            DrawingHtml.push("<script src=\"" + MainData + "\"></script>");
                        };
                    };

                    DrawingHtml = DrawingHtml.join("");

                    // Javascript conv.
                    let JsArray = [];
                    const JsCheckTemp = DrawingHtml.replace(/<!--.*?-->/gs, "").match(/<script.*?>.*?<\/script>/gs);
                    if (JsCheckTemp != null && JsCheckTemp.length !== 0) {
                        for (let j = 0;j < JsCheckTemp.length;j++) {
                            DrawingHtml = DrawingHtml.replaceAll(JsCheckTemp[j], "");
                            const NewElement = document.createElement("script");
                            const ScriptSuevey = (new DOMParser()).parseFromString(JsCheckTemp[j], "text/html").scripts[0];
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
                    document.getElementById(Id).innerHTML = DrawingHtml;
                    document.getElementById(Id).appendChild(JsArray[0])
                };
            };
        };
    };
};

/*
class SketchKb {
    constructor(Pages) {
        this.Pages = Pages;
        this.Before = "";
        console.log(this.Pages);
    };

    Deploy(Path) {
        let Pg = this.Pages;
        let Bf = this.Before;

        // 一致データPASS
        for (let i = 0;i < Pg["Data"]["Html"].length;i++) {

        };

        this.Before = Path;
    };

    Route(Path, Root) {
        Root = Root ? Root : "";
        history.pushState(null, "", Root + Path);
        this.Deploy(Path);
    };

    Html(Input, IsCode) {

    };

    Css(Input) {

    };

    Js(Input) {

    };
};
*/

console.log("Load: SketchKbJS");
console.log("%cSTOP!!\nIf you don't know how to use it, don't touch it.","font-size:20px");