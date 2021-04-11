/**!
 * @name SecretRingTone
 * @description Always plays the secret ring tone when someone calls you.
 * @version 1.0.0
 * @author Jaime Filho
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @website https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/SecretRingTone
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/SecretRingTone
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/SecretRingTone/SecretRingTone.plugin.js
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
const fs=require("fs"),path=require("path"),request=require("request"),electron=require("electron"),config={info:{name:"SecretRingTone",description:"Always plays the secret ring tone when someone calls you.",version:"1.0.0",authors:[{name:"Jaime Filho",discord_id:"289112759948410881"}],github:"https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/SecretRingTone",github_raw:"https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/SecretRingTone/SecretRingTone.plugin.js"}};function buildPlugin(){const[e,n]=global.ZeresPluginLibrary.buildPlugin(config);var i;return(()=>{"use strict";var r={n:e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},d:(e,n)=>{for(var i in n)r.o(n,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n)},t={};r.d(t,{default:()=>SecretRingTone});const o=n,s=e;var a=r.n(s);const{WebAudioSound:l}=o.WebpackModules.getByProps("WebAudioSound");class SecretRingTone extends(a()){constructor(){super(),this.ringingSounds=[]}onStart(){o.Patcher.before(l.prototype,"_ensureAudio",(e=>{"call_ringing"===e.name&&(e.name="call_ringing_beat",this.ringingSounds.push(e))}))}onStop(){o.Patcher.unpatchAll();for(const e of this.ringingSounds)e.name="call_ringing";this.ringingSounds=[]}}i=t.default})(),i}module.exports=global.ZeresPluginLibrary?buildPlugin():class{constructor(){this._config=config}getName(){return config.info.name}getAuthor(){return config.info.authors.map((e=>e.name)).join(", ")}getDescription(){return config.info.description}getVersion(){return config.info.version}load(){global.BdApi.showConfirmationModal("Library plugin is needed",`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,{confirmText:"Download",cancelText:"Cancel",onConfirm(){request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",((e,n,i)=>{if(e)return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");fs.writeFileSync(path.join(global.BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),i)}))}})}start(){}stop(){}};
/*@end@*/
