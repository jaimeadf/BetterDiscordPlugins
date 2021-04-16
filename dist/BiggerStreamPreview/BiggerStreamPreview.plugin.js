/**!
 * @name BiggerStreamPreview
 * @description Adds a button in the context menu to see bigger stream previews.
 * @version 1.0.5
 * @author Jaime Filho
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @website https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/BiggerStreamPreview
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/BiggerStreamPreview
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/BiggerStreamPreview/BiggerStreamPreview.plugin.js
 */
/*@cc_on
@if (@_jscript)
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/
const fs=require("fs"),path=require("path"),request=require("request"),electron=require("electron"),config={info:{name:"BiggerStreamPreview",description:"Adds a button in the context menu to see bigger stream previews.",version:"1.0.5",authors:[{name:"Jaime Filho",discord_id:"289112759948410881"}],github:"https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/BiggerStreamPreview",github_raw:"https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/BiggerStreamPreview/BiggerStreamPreview.plugin.js"}};function buildPlugin(){const[e,t]=global.ZeresPluginLibrary.buildPlugin(config);var r;return(()=>{"use strict";var n={n:e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},d:(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},i={};n.d(i,{default:()=>BiggerStreamPreview});const o=global.BdApi.React;var a=n.n(o);const s=t,l=e;var c=n.n(l);const{StreamStore:u,StreamPreviewStore:d,ModalStack:g}=s.DiscordModules,p=s.WebpackModules.getByDisplayName("ImageModal"),h=s.WebpackModules.getByDisplayName("MaskedLink");class BiggerStreamPreview extends(c()){onStart(){this.patchUserContextMenus()}onStop(){s.Patcher.unpatchAll()}patchUserContextMenus(){const e=s.WebpackModules.findAll((e=>function(e){let t,r=e[0],n=1;for(;n<e.length;){const i=e[n],o=e[n+1];if(n+=2,("optionalAccess"===i||"optionalCall"===i)&&null==r)return;"access"===i||"optionalAccess"===i?(t=r,r=o(r)):"call"!==i&&"optionalCall"!==i||(r=o(((...e)=>r.call(t,...e))),t=void 0)}return r}([e,"optionalAccess",e=>e.default,"optionalAccess",e=>e.displayName,"optionalAccess",e=>e.includes,"call",e=>e("UserContextMenu")]))),patch=(e,[t],r)=>{const{user:n}=t,i=u.getStreamForUser(n.id);if(!i)return;const o=d.getPreviewURL(i.guildId,i.channelId,i.ownerId);r.props.children.props.children.push(s.DiscordContextMenu.buildMenuItem({type:"separator"}),s.DiscordContextMenu.buildMenuItem({label:"View Stream Preview",action:()=>this.showImageModal(o),disabled:null===o}))};for(const t of e)s.Patcher.after(t,"default",patch)}async showImageModal(e){const t=await this.fetchImage(e);g.push(p,{src:e,placeholder:e,original:e,width:t.width,height:t.height,onClickUntrusted:e=>e.openHref(),renderLinkComponent:e=>a().createElement(h,{...e})})}async fetchImage(e){return new Promise(((t,r)=>{const n=new Image;n.src=e,n.addEventListener("load",(()=>{t(n)})),n.addEventListener("error",(()=>{r(new Error("Image not found"))}))}))}}r=i.default})(),r}module.exports=global.ZeresPluginLibrary?buildPlugin():class{constructor(){this._config=config}getName(){return config.info.name}getAuthor(){return config.info.authors.map((e=>e.name)).join(", ")}getDescription(){return config.info.description}getVersion(){return config.info.version}load(){global.BdApi.showConfirmationModal("Library plugin is needed",`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,{confirmText:"Download",cancelText:"Cancel",onConfirm(){request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",((e,t,r)=>{if(e)return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");fs.writeFileSync(path.join(global.BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),r)}))}})}start(){}stop(){}};
/*@end@*/