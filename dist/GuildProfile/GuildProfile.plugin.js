/**!
 * @name GuildProfile
 * @description Adds a modal that can be opened via any guild menu and contains various information about the guild, such as its owner, creation date, joined date, your friends and blocked users who are in it, and much more.
 * @version 1.5.8
 * @author Marmota (Jaime Filho)
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @website https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/GuildProfile
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/GuildProfile
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/GuildProfile/GuildProfile.plugin.js
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

const fs = require('fs');
const path = require('path');
const request = require('request');
const electron = require('electron');

const config = {"info":{"name":"GuildProfile","description":"Adds a modal that can be opened via any guild menu and contains various information about the guild, such as its owner, creation date, joined date, your friends and blocked users who are in it, and much more.","version":"1.5.8","authors":[{"name":"Marmota (Jaime Filho)","discord_id":"289112759948410881"}],"github":"https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/GuildProfile","github_raw":"https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/GuildProfile/GuildProfile.plugin.js"},"changelog":[{"title":"Fixes","type":"fixed","items":["Correct spelling mistakes on French translation (Thanks @Leonito2003 on GitHub).","Fixed crashes."]}]};

function buildPlugin() {
    const [Plugin, BoundedLibrary] = global.ZeresPluginLibrary.buildPlugin(config);
    var plugin;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 277:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./cs.json": 99,
	"./de.json": 899,
	"./el.json": 628,
	"./en-US.json": 284,
	"./es-ES.json": 490,
	"./fr.json": 409,
	"./hi.json": 293,
	"./hu.json": 372,
	"./it.json": 775,
	"./pl.json": 909,
	"./pt-BR.json": 174,
	"./ro.json": 900,
	"./ru.json": 187,
	"./tr.json": 210,
	"./zh-CN.json": 165,
	"./zh-TW.json": 930
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 277;

/***/ }),

/***/ 99:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Profil serveru","GUILD_PROFILE_GUILD_INFO":"Informace o serveru","GUILD_PROFILE_FRIENDS_IN_GUILD":"Přátelé","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Zablokovaní uživatelé","GUILD_PROFILE_LOADING":"Načítání","GUILD_PROFILE_CREATED_AT":"Vytvořeno","GUILD_PROFILE_JOINED_AT":"Připojeno","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Počet vylepšovatelů serveru","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Úroveň vylepšení serveru","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Na tomto serveru nemáš žádné přátele","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Na tomto serveru nemáš žádné zablokované uživatele","GUILD_PROFILE_INVITE_SPLASH":"Pozadí pozvánky serveru","GUILD_PROFILE_VIP_REGIONS":"VIP oblasti","GUILD_PROFILE_VANITY_URL":"Vlastní URL","GUILD_PROFILE_MORE_EMOJI":"Více smajlíků","GUILD_PROFILE_COMMERCE":"Obchodní kanály","GUILD_PROFILE_DISCOVERABLE":"Veřejný","GUILD_PROFILE_COMMUNITY":"Komunita","GUILD_PROFILE_FEATURABLE":"Doporučený","GUILD_PROFILE_NEWS":"Kanály oznámení","GUILD_PROFILE_ANIMATED_ICON":"Animovaná ikona serveru","GUILD_PROFILE_BANNER":"Banner serveru","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Dříve veřejný","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Povolena uvítací obrazovka","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Prověřování členství","GUILD_PROFILE_PREVIEW_ENABLED":"Povolen náhled"}');

/***/ }),

/***/ 899:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Server Profil","GUILD_PROFILE_GUILD_INFO":"Server Informationen","GUILD_PROFILE_FRIENDS_IN_GUILD":"Freunde","GUILD_PROFILE_ROLES_IN_GUILD":"Rollen","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Geblockte Nutzer","GUILD_PROFILE_LOADING":"Lädt","GUILD_PROFILE_CREATED_AT":"Erstellt am","GUILD_PROFILE_JOINED_AT":"Beigetreten am","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Server Booster Anzahl","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Server Boost Level","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Keine Freunde auf diesem Server","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Keine geblockten Nutzer auf diesem Server","GUILD_PROFILE_INVITE_SPLASH":"Server Einladungs-Hintergrund","GUILD_PROFILE_VIP_REGIONS":"VIP Regionen","GUILD_PROFILE_VANITY_URL":"Eigene Server URL","GUILD_PROFILE_MORE_EMOJI":"Mehr Emoji","GUILD_PROFILE_COMMERCE":"Store Kanal","GUILD_PROFILE_DISCOVERABLE":"Suchbar","GUILD_PROFILE_COMMUNITY":"Gemeinschaft","GUILD_PROFILE_FEATURABLE":"Empfehlbar","GUILD_PROFILE_NEWS":"Nachrichten Kanal","GUILD_PROFILE_ANIMATED_ICON":"Animiertes Server Icon","GUILD_PROFILE_BANNER":"Server Banner","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Vorher auffindbar aktiviert","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Willkommens Übersicht","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Mitgliedschaftsprüfung","GUILD_PROFILE_PREVIEW_ENABLED":"Vorschau aktiviert"}');

/***/ }),

/***/ 628:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Προφίλ Διακομιστή","GUILD_PROFILE_GUILD_INFO":"Πληροφορίες Διακομιστή","GUILD_PROFILE_FRIENDS_IN_GUILD":"Φίλοι","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Αποκλεισμένοι Χρήστες","GUILD_PROFILE_LOADING":"Φόρτωση","GUILD_PROFILE_CREATED_AT":"Δημιουργήθηκε στις","GUILD_PROFILE_JOINED_AT":"Συμμετοχή στις","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Πλήθος Ενισχύσεων Διακομιστή","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Επίπεδο Ενίσχυσης Διακομιστή","GUILD_PROFILE_NSFW_LEVEL":"Επίπεδο NSFW","GUILD_PROFILE_NSFW_LEVEL_DEFAULT":"Κανονικός","GUILD_PROFILE_NSFW_LEVEL_EXPLICIT":"Άσμενος","GUILD_PROFILE_NSFW_LEVEL_SAFE":"Ασφαλής","GUILD_PROFILE_NSFW_LEVEL_AGE_RESTRICTED":"Με Περιορισμούς Ηλικίας","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Δεν υπάρχουν φίλοι σε αυτόν τον διακομιστή","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Δεν υπάρχουν αποκλεισμένοι χρήστες σε αυτόν τον διακομιστή","GUILD_PROFILE_INVITE_SPLASH":"Φόντο Πρόσκλησης Διακομιστή","GUILD_PROFILE_VIP_REGIONS":"Περιοχές VIP","GUILD_PROFILE_VANITY_URL":"Vanity URL","GUILD_PROFILE_MORE_EMOJI":"Περισσότερα Emoji","GUILD_PROFILE_COMMERCE":"Κανάλια Καταστήματος","GUILD_PROFILE_DISCOVERABLE":"Ανιχνεύσιμος","GUILD_PROFILE_COMMUNITY":"Κοινότητα","GUILD_PROFILE_FEATURABLE":"Αναδεικνυόμενος","GUILD_PROFILE_NEWS":"Κανάλια Ανακοινώσεων","GUILD_PROFILE_ANIMATED_ICON":"Κινούμενο Εικονίδιο Διακομιστή","GUILD_PROFILE_BANNER":"Πανό Διακομιστή","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Ενεργοποίηση Ανιχνευσιμότητας Παλιότερα","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Οθόνη Καλωσορίσματος Ενεγοποιημένη","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Αξιολόγηση Μελών","GUILD_PROFILE_PREVIEW_ENABLED":"Προεπισκόπηση Ενεργοποιημένη"}');

/***/ }),

/***/ 284:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Server Profile","GUILD_PROFILE_GUILD_INFO":"Server Info","GUILD_PROFILE_FRIENDS_IN_GUILD":"Friends","GUILD_PROFILE_ROLES_IN_GUILD":"Roles","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Blocked Users","GUILD_PROFILE_LOADING":"Loading","GUILD_PROFILE_CREATED_AT":"Created at","GUILD_PROFILE_JOINED_AT":"Joined at","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Server Booster Count","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Server Boost Level","GUILD_PROFILE_NSFW_LEVEL":"NSFW Level","GUILD_PROFILE_NSFW_LEVEL_DEFAULT":"Default","GUILD_PROFILE_NSFW_LEVEL_EXPLICIT":"Explicit","GUILD_PROFILE_NSFW_LEVEL_SAFE":"Safe","GUILD_PROFILE_NSFW_LEVEL_AGE_RESTRICTED":"Age Restricted","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"No friends in this server","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"No blocked users in this server","GUILD_PROFILE_INVITE_SPLASH":"Server Invite Background","GUILD_PROFILE_VIP_REGIONS":"VIP Regions","GUILD_PROFILE_VANITY_URL":"Vanity URL","GUILD_PROFILE_MORE_EMOJI":"More Emoji","GUILD_PROFILE_COMMERCE":"Store Channels","GUILD_PROFILE_DISCOVERABLE":"Discoverable","GUILD_PROFILE_COMMUNITY":"Community","GUILD_PROFILE_FEATURABLE":"Featurable","GUILD_PROFILE_NEWS":"Announcement Channels","GUILD_PROFILE_ANIMATED_ICON":"Animated Server Icon","GUILD_PROFILE_BANNER":"Server Banner","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Enabled Discoverable Before","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Welcome Screen Enabled","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Membership Screening","GUILD_PROFILE_PREVIEW_ENABLED":"Preview Enabled"}');

/***/ }),

/***/ 490:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Perfil del Servidor","GUILD_PROFILE_GUILD_INFO":"Información del Servidor","GUILD_PROFILE_FRIENDS_IN_GUILD":"Amigos","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Usuarios Bloqueados","GUILD_PROFILE_LOADING":"Cargando","GUILD_PROFILE_CREATED_AT":"Creado el","GUILD_PROFILE_JOINED_AT":"Se unió el","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Cantidad de Mejoras","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Nivel de mejoras","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"No hay amigos en este servidor","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"No hay usuarios bloqueados en este servidor","GUILD_PROFILE_INVITE_SPLASH":"Fondo de invitación","GUILD_PROFILE_VIP_REGIONS":"Regiones VIP","GUILD_PROFILE_VANITY_URL":"URL personalizada","GUILD_PROFILE_MORE_EMOJI":"Más Emojis","GUILD_PROFILE_COMMERCE":"Canales de Tienda","GUILD_PROFILE_DISCOVERABLE":"Descubrible","GUILD_PROFILE_COMMUNITY":"Comunidad","GUILD_PROFILE_FEATURABLE":"Caracterizable","GUILD_PROFILE_NEWS":"Canales de Anuncios","GUILD_PROFILE_ANIMATED_ICON":"Ícono de servidor animado","GUILD_PROFILE_BANNER":"Cartel del servidor","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Activó Descubrimiento Antes","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Pantalla de bienvenida activada","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Cribado de miembros","GUILD_PROFILE_PREVIEW_ENABLED":"Vista previa habilitada"}');

/***/ }),

/***/ 409:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Profil du serveur","GUILD_PROFILE_GUILD_INFO":"Info du serveur","GUILD_PROFILE_FRIENDS_IN_GUILD":"Amis","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Bloqué","GUILD_PROFILE_LOADING":"Chargement","GUILD_PROFILE_CREATED_AT":"Créé le","GUILD_PROFILE_JOINED_AT":"Rejoint le","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Nombre de booster de serveur","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Niveau de boost du serveur","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Aucun ami sur ce serveur","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Aucun utilisateur bloqué sur ce serveur","GUILD_PROFILE_INVITE_SPLASH":"Contexte d\'invitation du serveur","GUILD_PROFILE_VIP_REGIONS":"Régions VIP","GUILD_PROFILE_VANITY_URL":"URL personnalisée","GUILD_PROFILE_MORE_EMOJI":"Plus d\'Emoji","GUILD_PROFILE_COMMERCE":"Stocker les chaînes","GUILD_PROFILE_DISCOVERABLE":"Discoverable","GUILD_PROFILE_COMMUNITY":"Communauté","GUILD_PROFILE_FEATURABLE":"En vedette","GUILD_PROFILE_NEWS":"Canaux d\'annonce","GUILD_PROFILE_ANIMATED_ICON":"Icône de serveur animé","GUILD_PROFILE_BANNER":"Bannière du serveur","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Activé détectable avant","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Écran de bienvenue activé","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Vérification des membres","GUILD_PROFILE_PREVIEW_ENABLED":"Aperçu activé"}');

/***/ }),

/***/ 293:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"सर्वर का प्रोफैल","GUILD_PROFILE_GUILD_INFO":"सर्वर का समाचार","GUILD_PROFILE_FRIENDS_IN_GUILD":"मित्र","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"ब्लॉक किया हुआ व्यक्तियों","GUILD_PROFILE_LOADING":"लोडिंग","GUILD_PROFILE_CREATED_AT":"क्रिएट किया","GUILD_PROFILE_JOINED_AT":"जॉइन हुआ","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"सर्वर बूस्टर का गिनती","GUILD_PROFILE_GUILD_PREMIUM_TIER":"सर्वर बूस्ट का लेवल","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"इस सर्वर में अप्पके मित्र नहीं हैं।","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"इस सर्वर में आपने ब्लॉक किया हुआ व्यक्तियों नहीं है।","GUILD_PROFILE_INVITE_SPLASH":"सर्वर इन्वाइट केलिए बैकग्राउंड है।","GUILD_PROFILE_VIP_REGIONS":"वि.आई.पि. प्रदेशे","GUILD_PROFILE_VANITY_URL":"वैनिटी यूआरएल","GUILD_PROFILE_MORE_EMOJI":"अधिक एमोजिया","GUILD_PROFILE_COMMERCE":"दूकान का चैनल","GUILD_PROFILE_DISCOVERABLE":"डिस्कॉर्ड का \'डिस्कोवेराब्ले\' भाग में ढूंढसकते है।","GUILD_PROFILE_COMMUNITY":"समुदाय","GUILD_PROFILE_FEATURABLE":"फीचरबुल","GUILD_PROFILE_NEWS":"घोषणाओं का लिए चैनलों","GUILD_PROFILE_ANIMATED_ICON":"सर्वर को आइकॉन एनिमेटेड है।","GUILD_PROFILE_BANNER":"सर्वर को बैनर है।","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"डिस्कोवेराबुल ऑप्शन को गत में इनेबल किया गया।","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"वेलकम स्क्रीन इनेबल्ड है।","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"सदस्यता स्क्रीनिंग इनेबल्ड है।","GUILD_PROFILE_PREVIEW_ENABLED":"प्रीव्यू इनेबल्ड है।"}');

/***/ }),

/***/ 372:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Szerver profil","GUILD_PROFILE_GUILD_INFO":"Szerverinformációk","GUILD_PROFILE_FRIENDS_IN_GUILD":"Barátok","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Tiltott felhasználók","GUILD_PROFILE_LOADING":"Betöltés","GUILD_PROFILE_CREATED_AT":"Létrehozva:","GUILD_PROFILE_JOINED_AT":"Csatlakozva:","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Szervergyorsítók száma","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Szervergyorsítás szintje","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Nincsenek barátaid ezen a szerveren","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Nincsenek tiltott felhasználók ezen a szerveren","GUILD_PROFILE_INVITE_SPLASH":"Szervermeghívó háttérképe","GUILD_PROFILE_VIP_REGIONS":"VIP régiók","GUILD_PROFILE_VANITY_URL":"Kreatív URL","GUILD_PROFILE_MORE_EMOJI":"Több emotikon","GUILD_PROFILE_COMMERCE":"Kereskedelmi csatornák","GUILD_PROFILE_DISCOVERABLE":"Felfedezhető","GUILD_PROFILE_COMMUNITY":"Közösségi","GUILD_PROFILE_FEATURABLE":"Kiemelhető","GUILD_PROFILE_NEWS":"Hirdetmény csatornák","GUILD_PROFILE_ANIMATED_ICON":"Animált szerver ikon","GUILD_PROFILE_BANNER":"Szerverbanner","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Már volt felfedezhető korábban","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Van üdvözlőképernyő","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Tagság szűrése","GUILD_PROFILE_PREVIEW_ENABLED":"Előnézet bekapcsolva"}');

/***/ }),

/***/ 775:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Profilo del Server","GUILD_PROFILE_GUILD_INFO":"Informazione del Server","GUILD_PROFILE_FRIENDS_IN_GUILD":"Amici","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Utenti Bloccati","GUILD_PROFILE_LOADING":"Caricando","GUILD_PROFILE_CREATED_AT":"Creato il","GUILD_PROFILE_JOINED_AT":"Iscritto il","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Quantità di potenziamenti","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Livello del Potenziamento","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Non ci sono amici in questo server","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Non ci sono utenti bloccati in questo server","GUILD_PROFILE_INVITE_SPLASH":"Sfondo di invito","GUILD_PROFILE_VIP_REGIONS":"Regioni VIP","GUILD_PROFILE_VANITY_URL":"URL personalizzata","GUILD_PROFILE_MORE_EMOJI":"Più emoji","GUILD_PROFILE_COMMERCE":"Canali negozio","GUILD_PROFILE_DISCOVERABLE":"Disponibile su \\"Discovery\\"","GUILD_PROFILE_COMMUNITY":"Comunità","GUILD_PROFILE_FEATURABLE":"In Evidenza","GUILD_PROFILE_NEWS":"Canali delle Notizie","GUILD_PROFILE_ANIMATED_ICON":"Icona server animata","GUILD_PROFILE_BANNER":"Banner del server","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"\\"Discovery\\" attivato previamente","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Schermata di benvenuta attivata","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Verifica dell\'iscrizione","GUILD_PROFILE_PREVIEW_ENABLED":"Anteprima Abilitata"}');

/***/ }),

/***/ 909:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Profil Serwera","GUILD_PROFILE_GUILD_INFO":"Informacje o Serwerze","GUILD_PROFILE_FRIENDS_IN_GUILD":"Znajomi","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Zablokowani Użytkownicy","GUILD_PROFILE_LOADING":"Ładowanie","GUILD_PROFILE_CREATED_AT":"Utworzono","GUILD_PROFILE_JOINED_AT":"Dołączono","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Ilość Ulepszeń Serwera","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Poziom Ulepszeń Serwera","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Brak znajomych na tym serwerze","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Brak zablokowanych użytkowników na tym serwerze","GUILD_PROFILE_INVITE_SPLASH":"Tło Zaproszeń Serwera","GUILD_PROFILE_VIP_REGIONS":"Regiony VIP","GUILD_PROFILE_VANITY_URL":"Unikalny adres URL","GUILD_PROFILE_MORE_EMOJI":"Więcej Emoji","GUILD_PROFILE_COMMERCE":"Kanały Sklepowe","GUILD_PROFILE_DISCOVERABLE":"Odkrywalny","GUILD_PROFILE_COMMUNITY":"Społeczność","GUILD_PROFILE_FEATURABLE":"Więcej Funkcji","GUILD_PROFILE_NEWS":"Kanały ogłoszeniowe","GUILD_PROFILE_ANIMATED_ICON":"Animowana Ikona Serwera","GUILD_PROFILE_BANNER":"Baner Serwera","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Wcześniej Włączona Odkrywalność","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Ekran Powitalny Włączony","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Sprawdzanie Członków","GUILD_PROFILE_PREVIEW_ENABLED":"Podgląd Włączony"}');

/***/ }),

/***/ 174:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Perfil do Servidor","GUILD_PROFILE_GUILD_INFO":"Informações do Servidor","GUILD_PROFILE_FRIENDS_IN_GUILD":"Amigos","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Usuários Bloqueados","GUILD_PROFILE_LOADING":"Carregando","GUILD_PROFILE_CREATED_AT":"Criado em","GUILD_PROFILE_JOINED_AT":"Entrou em","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Quantidade de Impulsos","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Nível de Impulsão","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Nenhum amigo nesse servidor","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Nenhum usuário bloqueado nesse servidor","GUILD_PROFILE_INVITE_SPLASH":"Plano de Fundo de Convite","GUILD_PROFILE_VIP_REGIONS":"Regiões VIP","GUILD_PROFILE_VANITY_URL":"URL Personalizado","GUILD_PROFILE_MORE_EMOJI":"Mais Emojis","GUILD_PROFILE_COMMERCE":"Canais de Loja","GUILD_PROFILE_DISCOVERABLE":"Descobrível","GUILD_PROFILE_COMMUNITY":"Comunidade","GUILD_PROFILE_FEATURABLE":"Destacável na Home do Descobrimento","GUILD_PROFILE_NEWS":"Canais de Anúncio","GUILD_PROFILE_ANIMATED_ICON":"Ícone Animado","GUILD_PROFILE_BANNER":"Banner de Servidor","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Descobrimento de Servidores Anteriormente","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Tela de Boas-vindas","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Avaliação de Associação","GUILD_PROFILE_PREVIEW_ENABLED":"Preview Ativado"}');

/***/ }),

/***/ 900:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Profilul serverului","GUILD_PROFILE_GUILD_INFO":"Informatiile serverului","GUILD_PROFILE_FRIENDS_IN_GUILD":"Prieteni","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Utilizatori blocati","GUILD_PROFILE_LOADING":"Se incarca","GUILD_PROFILE_CREATED_AT":"Creat la","GUILD_PROFILE_JOINED_AT":"Alaturat la","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Numarul de Server Booster","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Levelul de Server Boost","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Niciun prieten in acest server","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Niciun utilizator blocat in acest server","GUILD_PROFILE_INVITE_SPLASH":"Fundal de invitare server","GUILD_PROFILE_VIP_REGIONS":"Regiuni VIP","GUILD_PROFILE_VANITY_URL":"Vanitate URL","GUILD_PROFILE_MORE_EMOJI":"Mai multe emoji-uri","GUILD_PROFILE_COMMERCE":"Canale de comert","GUILD_PROFILE_DISCOVERABLE":"Descoperibil","GUILD_PROFILE_COMMUNITY":"Comunitate","GUILD_PROFILE_FEATURABLE":"Caracteristic","GUILD_PROFILE_NEWS":"Canale anunturi","GUILD_PROFILE_ANIMATED_ICON":"Iconita Server Animata","GUILD_PROFILE_BANNER":"Banner Server","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Descoperabilitate Activata Inainte","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Ecran de intampinare activat","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Evaluarea calitatii de membru","GUILD_PROFILE_PREVIEW_ENABLED":"Previzualizare activata"}');

/***/ }),

/***/ 187:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Профиль сервера","GUILD_PROFILE_GUILD_INFO":"Информация о сервере","GUILD_PROFILE_FRIENDS_IN_GUILD":"Друзья","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Заблокированные пользователи","GUILD_PROFILE_LOADING":"Загрузка","GUILD_PROFILE_CREATED_AT":"Сервер создан","GUILD_PROFILE_JOINED_AT":"Вы присоединились","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Количество Бустов сервера","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Уровень Бустов сервера","GUILD_PROFILE_NSFW_LEVEL":"Уровень NSFW","GUILD_PROFILE_NSFW_LEVEL_DEFAULT":"По умолчанию","GUILD_PROFILE_NSFW_LEVEL_EXPLICIT":"Откровенный контент","GUILD_PROFILE_NSFW_LEVEL_SAFE":"Безопасный","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Нету друзей на этом сервере","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Нету заблокированых вами пользователей на этом сервере","GUILD_PROFILE_INVITE_SPLASH":"Изображение в приглашении","GUILD_PROFILE_VIP_REGIONS":"VIP регионы","GUILD_PROFILE_VANITY_URL":"Красивый URL","GUILD_PROFILE_MORE_EMOJI":"Свои Эмодзи","GUILD_PROFILE_COMMERCE":"Магазин","GUILD_PROFILE_DISCOVERABLE":"Публичный сервер","GUILD_PROFILE_COMMUNITY":"Комьюнити","GUILD_PROFILE_FEATURABLE":"Фишечки","GUILD_PROFILE_NEWS":"Каналы с объявлениями","GUILD_PROFILE_ANIMATED_ICON":"Анимированая иконка сервера","GUILD_PROFILE_BANNER":"Баннер сервера","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Включен обнаруживаемый ранее","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Включен экран приветствия","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Проверка членства","GUILD_PROFILE_PREVIEW_ENABLED":"Включен предпросмотр"}');

/***/ }),

/***/ 210:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"Sunucu Profili","GUILD_PROFILE_GUILD_INFO":"Sunucu Bilgisi","GUILD_PROFILE_FRIENDS_IN_GUILD":"Arkadaşlar","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"Engellenmiş Kullanıcılar","GUILD_PROFILE_LOADING":"Yükleniyor","GUILD_PROFILE_CREATED_AT":"Oluşturulan Tarih","GUILD_PROFILE_JOINED_AT":"Katılınan Tarih","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"Sunucu Takviyeci Sayısı","GUILD_PROFILE_GUILD_PREMIUM_TIER":"Sunucu Takviye Seviyesi","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"Sunucuda hiç arkadaşınız yok","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"Sunucuda hiç engellenmiş kullanıcı yok","GUILD_PROFILE_INVITE_SPLASH":"Sunucu Davet Arkaplanı","GUILD_PROFILE_VIP_REGIONS":"VIP Bölgeler","GUILD_PROFILE_VANITY_URL":"Özel URL","GUILD_PROFILE_MORE_EMOJI":"Daha Fazla Emoji","GUILD_PROFILE_COMMERCE":"Mağaza Kanalları","GUILD_PROFILE_DISCOVERABLE":"Keşfedilebilir","GUILD_PROFILE_COMMUNITY":"Topluluk","GUILD_PROFILE_FEATURABLE":"Öne Çıkarılabilir","GUILD_PROFILE_NEWS":"Duyuru Kanalları","GUILD_PROFILE_ANIMATED_ICON":"Animasyonlu Sunucu Simgesi","GUILD_PROFILE_BANNER":"Sunucu Afişi","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"Keşfedilebilir Önceden Etkinleştirildi","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"Hoş Geldin Ekranı Etkin","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"Üye Seçimi","GUILD_PROFILE_PREVIEW_ENABLED":"Önizleme Etkin"}');

/***/ }),

/***/ 165:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"服务器名片","GUILD_PROFILE_GUILD_INFO":"服务器信息","GUILD_PROFILE_FRIENDS_IN_GUILD":"好友","GUILD_PROFILE_ROLES_IN_GUILD":"身份组","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"已屏蔽用户","GUILD_PROFILE_LOADING":"加载中","GUILD_PROFILE_CREATED_AT":"创建于","GUILD_PROFILE_JOINED_AT":"加入于","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"服务器助力数量","GUILD_PROFILE_GUILD_PREMIUM_TIER":"服务器助力等级","GUILD_PROFILE_NSFW_LEVEL":"少儿不宜级别","GUILD_PROFILE_NSFW_LEVEL_DEFAULT":"正常","GUILD_PROFILE_NSFW_LEVEL_EXPLICIT":"高","GUILD_PROFILE_NSFW_LEVEL_SAFE":"低","GUILD_PROFILE_NSFW_LEVEL_AGE_RESTRICTED":"年龄限制","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"此服务器中没有您的好友","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"此服务器中没有您屏蔽的用户","GUILD_PROFILE_INVITE_SPLASH":"邀请背景","GUILD_PROFILE_VIP_REGIONS":"主要语言","GUILD_PROFILE_VANITY_URL":"个性化网址","GUILD_PROFILE_MORE_EMOJI":"更多表情符号","GUILD_PROFILE_COMMERCE":"商业服务器","GUILD_PROFILE_DISCOVERABLE":"已登录\\"发现服务器\\"","GUILD_PROFILE_COMMUNITY":"社区服务器","GUILD_PROFILE_FEATURABLE":"特色服务器","GUILD_PROFILE_NEWS":"具有公告频道","GUILD_PROFILE_ANIMATED_ICON":"动画服务器图标","GUILD_PROFILE_BANNER":"服务器横幅","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"此前曾登录\\"发现服务器\\"","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"已启用欢迎界面","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"已启用成员筛选","GUILD_PROFILE_PREVIEW_ENABLED":"已启用预览"}');

/***/ }),

/***/ 930:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"GUILD_PROFILE":"伺服器名片","GUILD_PROFILE_GUILD_INFO":"伺服器資訊","GUILD_PROFILE_FRIENDS_IN_GUILD":"好友","GUILD_PROFILE_ROLES_IN_GUILD":"身份組","GUILD_PROFILE_BLOCKED_USERS_IN_GUILD":"已封鎖用戶","GUILD_PROFILE_LOADING":"載入中","GUILD_PROFILE_CREATED_AT":"建立於","GUILD_PROFILE_JOINED_AT":"加入於","GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT":"伺服器加成數量","GUILD_PROFILE_GUILD_PREMIUM_TIER":"伺服器加成等級","GUILD_PROFILE_NSFW_LEVEL":"NSFW 級別","GUILD_PROFILE_NSFW_LEVEL_DEFAULT":"正常","GUILD_PROFILE_NSFW_LEVEL_EXPLICIT":"高","GUILD_PROFILE_NSFW_LEVEL_SAFE":"低","GUILD_PROFILE_NSFW_LEVEL_AGE_RESTRICTED":"年齡限制","GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD":"伺服器中沒有您的好友","GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD":"伺服器中沒有您已封鎖的用戶","GUILD_PROFILE_INVITE_SPLASH":"邀請背景","GUILD_PROFILE_VIP_REGIONS":"主要語言","GUILD_PROFILE_VANITY_URL":"個性化網址","GUILD_PROFILE_MORE_EMOJI":"更多表情符號","GUILD_PROFILE_COMMERCE":"商業伺服器","GUILD_PROFILE_DISCOVERABLE":"已加入\\"探索伺服器\\"","GUILD_PROFILE_COMMUNITY":"社區伺服器","GUILD_PROFILE_FEATURABLE":"特色伺服器","GUILD_PROFILE_NEWS":"具有公告頻道","GUILD_PROFILE_ANIMATED_ICON":"動畫伺服器圖示","GUILD_PROFILE_BANNER":"伺服器橫幅","GUILD_PROFILE_ENABLED_DISCOVERABLE_BEFORE":"此前曾加入\\"探索伺服器\\"","GUILD_PROFILE_WELCOME_SCREEN_ENABLED":"已啟用歡迎畫面","GUILD_PROFILE_MEMBER_VERIFICATION_GATE_ENABLED":"已啟用會員審查","GUILD_PROFILE_PREVIEW_ENABLED":"已啟用預覽"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ GuildProfile)
});

;// CONCATENATED MODULE: external ["BdApi","React"]
const external_BdApi_React_namespaceObject = global["BdApi"]["React"];
var external_BdApi_React_default = /*#__PURE__*/__webpack_require__.n(external_BdApi_React_namespaceObject);
;// CONCATENATED MODULE: external "BoundedLibrary"
const external_BoundedLibrary_namespaceObject = BoundedLibrary;
;// CONCATENATED MODULE: external "Plugin"
const external_Plugin_namespaceObject = Plugin;
var external_Plugin_default = /*#__PURE__*/__webpack_require__.n(external_Plugin_namespaceObject);
;// CONCATENATED MODULE: ./src/@discord/i18n.js
 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

/* harmony default export */ const i18n = (external_BoundedLibrary_namespaceObject.WebpackModules.find(m => _optionalChain([m, 'optionalAccess', _ => _.Messages, 'optionalAccess', _2 => _2.ACCOUNT])));

;// CONCATENATED MODULE: ./src/@discord/components/Modal.js


const {
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalListContent,
    ModalRoot,
    ModalSize,
    default: Modal
} = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('ModalRoot');



/* harmony default export */ const components_Modal = ((/* unused pure expression or super */ null && (Modal)));

;// CONCATENATED MODULE: ./src/@discord/components/TabBar.js


/* harmony default export */ const TabBar = (external_BoundedLibrary_namespaceObject.WebpackModules.getByDisplayName('TabBar'));

;// CONCATENATED MODULE: ./src/@discord/Flux.js


const {
    Dispatcher,
    Store,
    BatchedStoreListener,
    useStateFromStores,
    useStateFromStoresArray,
    useStateFromStoresObject,
    default: Flux
} = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('Store', 'default');



/* harmony default export */ const _discord_Flux = (Flux);

;// CONCATENATED MODULE: ./src/GuildProfile/stores/MemberCountsStore.js
/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */





const {
    Dispatcher: MemberCountsStore_Dispatcher,
    MemberCountStore,
    DiscordConstants: { ActionTypes }
} = external_BoundedLibrary_namespaceObject.DiscordModules;

const memberCounts = new Map();
const onlineMemberCounts = new Map();

function handleConnectionOpen({ guilds }) {
    for (const guild of guilds) {
        memberCounts.set(guild.id, guild.member_count);
    }
}

function handleGuildCreate({ guild }) {
    memberCounts.set(guild.id, guild.member_count);
}

function handleGuildDelete({ guild }) {
    memberCounts.delete(guild.id);
    onlineMemberCounts.delete(guild.id);
}

function handleGuildMemberListUpdate({ guildId, memberCount, groups }) {
    if (memberCount !== 0) {
        memberCounts.set(guildId, memberCount);
    }

    onlineMemberCounts.set(
        guildId,
        groups.reduce((total, group) => {
            return group.id !== 'offline' ? total + group.count : total;
        }, 0)
    );
}

function handleOnlineGuildMemberCountUpdate({ guildId, count }) {
    onlineMemberCounts.set(guildId, count);
}

class MemberCountsStore extends _discord_Flux.Store {
    initialize() {
        const nativeMemberCounts = MemberCountStore.getMemberCounts();
        for (const guildId in nativeMemberCounts) {
            memberCounts.set(guildId, nativeMemberCounts[guildId]);
        }
    }

    getMemberCounts(guildId) {
        return {
            members: memberCounts.get(guildId),
            membersOnline: onlineMemberCounts.get(guildId)
        };
    }
}

/* harmony default export */ const stores_MemberCountsStore = (new MemberCountsStore(MemberCountsStore_Dispatcher, {
    [ActionTypes.CONNECTION_OPEN]: handleConnectionOpen,
    [ActionTypes.GUILD_CREATE]: handleGuildCreate,
    [ActionTypes.GUILD_DELETE]: handleGuildDelete,
    [ActionTypes.GUILD_MEMBER_LIST_UPDATE]: handleGuildMemberListUpdate,
    [ActionTypes.ONLINE_GUILD_MEMBER_COUNT_UPDATE]: handleOnlineGuildMemberCountUpdate
}));

;// CONCATENATED MODULE: ./src/GuildProfile/components/GuildProfileModal/GuildBanner.jsx
/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */




const {
    ImageResolver,
    DiscordConstants: { Colors }
} = external_BoundedLibrary_namespaceObject.DiscordModules;

const { default: useDominantColor } = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('maybeFetchColor');

function GuildBanner({ guild }) {
    const dominantColor = useDominantColor(guild.getIconURL(), Colors.TRANSPARENT);

    return (
        external_BdApi_React_default().createElement('div', {
            className: `banner-1YaD3N ${
                guild.banner ? 'profileBannerPremium-KD60EB bannerPremium-kkSkPv' : 'profileBanner-1owKI5'
            }`,
            style: {
                backgroundColor: dominantColor,
                backgroundImage: `url(${ImageResolver.getGuildBannerURL({ id: guild.id, banner: guild.banner })})`
            },}
        )
    );
}

;// CONCATENATED MODULE: ./src/@discord/components/Tooltip.js


const {
    TooltipColors,
    TooltipContainer,
    TooltipLayer,
    TooltipPositions,
    default: Tooltip
} = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('TooltipContainer');



/* harmony default export */ const components_Tooltip = ((/* unused pure expression or super */ null && (Tooltip)));

;// CONCATENATED MODULE: ./src/@discord/components/Clickable.js


/* harmony default export */ const Clickable = (external_BoundedLibrary_namespaceObject.WebpackModules.getByDisplayName('Clickable'));

;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/invite-splash.svg
var _path;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



function SvgInviteSplash(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), _path || (_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M8.5 13.5l2.5 3 3.5-4.5 4.5 6H5m16 1V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const invite_splash = (SvgInviteSplash);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/vip-regions.svg
var vip_regions_path;

function vip_regions_extends() { vip_regions_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return vip_regions_extends.apply(this, arguments); }



function SvgVipRegions(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", vip_regions_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), vip_regions_path || (vip_regions_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M12 1L9 9l-8 3 8 3 3 8 3-8 8-3-8-3-3-8z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const vip_regions = (SvgVipRegions);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/vanity-url.svg
var vanity_url_path;

function vanity_url_extends() { vanity_url_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return vanity_url_extends.apply(this, arguments); }



function SvgVanityUrl(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", vanity_url_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), vanity_url_path || (vanity_url_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const vanity_url = (SvgVanityUrl);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/more-emoji.svg
var more_emoji_path;

function more_emoji_extends() { more_emoji_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return more_emoji_extends.apply(this, arguments); }



function SvgMoreEmoji(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", more_emoji_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), more_emoji_path || (more_emoji_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M5.5 2C3.56 2 2 3.56 2 5.5v13C2 20.44 3.56 22 5.5 22H16l6-6V5.5C22 3.56 20.44 2 18.5 2h-13m.25 2h12.5A1.75 1.75 0 0120 5.75V15h-1.5c-1.94 0-3.5 1.56-3.5 3.5V20H5.75A1.75 1.75 0 014 18.25V5.75A1.75 1.75 0 015.75 4m8.69 2.77c-.16 0-.32.02-.47.06-.94.26-1.47 1.22-1.23 2.17.05.15.12.3.21.44l3.23-.88c0-.17-.02-.34-.06-.51-.21-.75-.9-1.28-1.68-1.28M8.17 8.5c-.17 0-.32 0-.47.05-.93.26-1.48 1.22-1.23 2.15.03.16.12.3.21.46l3.23-.88c0-.17-.02-.34-.06-.5A1.72 1.72 0 008.17 8.5m8.55 2.76l-9.13 2.51a5.266 5.266 0 005.36 1.64 5.273 5.273 0 003.77-4.15z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const more_emoji = (SvgMoreEmoji);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/commerce.svg
var commerce_path;

function commerce_extends() { commerce_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return commerce_extends.apply(this, arguments); }



function SvgCommerce(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", commerce_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), commerce_path || (commerce_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M20 4H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16c1.11 0 2-.89 2-2V6a2 2 0 00-2-2m-5 6h-4v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1h-2v-1H9v-2h4v-1h-3c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h1V7h2v1h2v2z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const commerce = (SvgCommerce);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/discoverable.svg
var discoverable_path;

function discoverable_extends() { discoverable_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return discoverable_extends.apply(this, arguments); }



function SvgDiscoverable(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", discoverable_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), discoverable_path || (discoverable_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M9.5 3A6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const discoverable = (SvgDiscoverable);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/community.svg
var community_path;

function community_extends() { community_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return community_extends.apply(this, arguments); }



function SvgCommunity(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", community_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), community_path || (community_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M16 17v2H2v-2s0-4 7-4 7 4 7 4m-3.5-9.5A3.5 3.5 0 109 11a3.5 3.5 0 003.5-3.5m3.44 5.5A5.32 5.32 0 0118 17v2h4v-2s0-3.63-6.06-4M15 4a3.39 3.39 0 00-1.93.59 5 5 0 010 5.82A3.39 3.39 0 0015 11a3.5 3.5 0 000-7z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const community = (SvgCommunity);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/featurable.svg
var featurable_path;

function featurable_extends() { featurable_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return featurable_extends.apply(this, arguments); }



function SvgFeaturable(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", featurable_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), featurable_path || (featurable_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M2 3h8a2 2 0 012-2 2 2 0 012 2h8v2h-1v11h-5.75L17 22h-2l-1.75-6h-2.5L9 22H7l1.75-6H3V5H2V3m3 2v9h14V5H5z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const featurable = (SvgFeaturable);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/news.svg
var news_path, _path2;

function news_extends() { news_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return news_extends.apply(this, arguments); }



function SvgNews(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", news_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), news_path || (news_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M19.875 3H4.125C2.953 3 2 3.897 2 5v14c0 1.103.953 2 2.125 2h15.75C21.047 21 22 20.103 22 19V5c0-1.103-.953-2-2.125-2zm0 16H4.125c-.057 0-.096-.016-.113-.016-.007 0-.011.002-.012.008L3.988 5.046c.007-.01.052-.046.137-.046h15.75c.079.001.122.028.125.008l.012 13.946c-.007.01-.052.046-.137.046z",
    fill: "currentColor"
  })), _path2 || (_path2 = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M6 7h6v6H6zm7 8H6v2h12v-2h-4zm1-4h4v2h-4zm0-4h4v2h-4z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const news = (SvgNews);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/animated-icon.svg
var animated_icon_path;

function animated_icon_extends() { animated_icon_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return animated_icon_extends.apply(this, arguments); }



function SvgAnimatedIcon(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", animated_icon_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), animated_icon_path || (animated_icon_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M11 8h2v8h-2V8M7.67 8H4.33C3.53 8 3 8.67 3 9.33v5.34c0 .66.53 1.33 1.33 1.33h3.34c.8 0 1.33-.67 1.33-1.33V12H7v2H5v-4h4v-.67C9 8.67 8.47 8 7.67 8M21 10V8h-6v8h2v-2h2.5v-2H17v-2h4z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const animated_icon = (SvgAnimatedIcon);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/banner.svg
var banner_path;

function banner_extends() { banner_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return banner_extends.apply(this, arguments); }



function SvgBanner(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", banner_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), banner_path || (banner_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M21 3H3C2 3 1 4 1 5v14a2 2 0 002 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2M5 17l3.5-4.5 2.5 3 3.5-4.5 4.5 6H5z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const banner = (SvgBanner);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/enabled-discoverable-before.svg
var enabled_discoverable_before_path;

function enabled_discoverable_before_extends() { enabled_discoverable_before_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return enabled_discoverable_before_extends.apply(this, arguments); }



function SvgEnabledDiscoverableBefore(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", enabled_discoverable_before_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), enabled_discoverable_before_path || (enabled_discoverable_before_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M15.5 14l5 5-1.5 1.5-5-5v-.79l-.27-.28A6.471 6.471 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3 6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.57 4.23l.28.27h.79m-6 0C12 14 14 12 14 9.5S12 5 9.5 5 5 7 5 9.5 7 14 9.5 14m2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const enabled_discoverable_before = (SvgEnabledDiscoverableBefore);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/welcome-screen-enabled.svg
var welcome_screen_enabled_path;

function welcome_screen_enabled_extends() { welcome_screen_enabled_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return welcome_screen_enabled_extends.apply(this, arguments); }



function SvgWelcomeScreenEnabled(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", welcome_screen_enabled_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), welcome_screen_enabled_path || (welcome_screen_enabled_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M20 4c1.11 0 2 .89 2 2v12c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V6c0-1.11.89-2 2-2h16M8.5 15V9H7.25v3.5L4.75 9H3.5v6h1.25v-3.5L7.3 15h1.2m5-4.74V9h-4v6h4v-1.25H11v-1.11h2.5v-1.26H11v-1.12h2.5m7 3.74V9h-1.25v4.5h-1.12V10h-1.25v3.5h-1.13V9H14.5v5a1 1 0 001 1h4a1 1 0 001-1z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const welcome_screen_enabled = (SvgWelcomeScreenEnabled);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/member-verification-gate-enabled.svg
var member_verification_gate_enabled_path;

function member_verification_gate_enabled_extends() { member_verification_gate_enabled_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return member_verification_gate_enabled_extends.apply(this, arguments); }



function SvgMemberVerificationGateEnabled(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", member_verification_gate_enabled_extends({
    viewBox: "0 0 36 34",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), member_verification_gate_enabled_path || (member_verification_gate_enabled_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M35.452 10.85l-5.216-3.28-1.895-1.197-3.78-2.333-1.884-1.236L18.449.142l-.22-.09a.938.938 0 00-.618 0l-.11.05-4.278 2.702-1.885 1.236L7.56 6.373 5.664 7.57.45 10.85a.936.936 0 00-.449.797v21.416A.997.997 0 00.997 34h34.006a.997.997 0 00.997-.937V11.647a.937.937 0 00-.548-.797zM1.885 32.116v-19.94l3.78-2.383v22.323h-3.78zm5.674 0V8.606l3.78-2.382v25.922l-3.78-.03zm5.664-27.079l3.78-2.382v29.46h-3.78V5.038zm5.724 27.079V2.655l3.73 2.382v27.079h-3.73zm5.665 0V6.194l3.78 2.383v23.539h-3.78zm9.453 0h-3.829V9.793l3.78 2.383.05 19.94z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const member_verification_gate_enabled = (SvgMemberVerificationGateEnabled);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/preview-enabled.svg
var preview_enabled_path;

function preview_enabled_extends() { preview_enabled_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return preview_enabled_extends.apply(this, arguments); }



function SvgPreviewEnabled(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", preview_enabled_extends({
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    width: "1em",
    height: "1em",
    style: {
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)"
    },
    viewBox: "0 0 24 24",
    transform: "rotate(360)"
  }, props), preview_enabled_path || (preview_enabled_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    d: "M12 9a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3m0 8a5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5 5 5 0 01-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const preview_enabled = (SvgPreviewEnabled);
;// CONCATENATED MODULE: ./src/GuildProfile/assets/features/index.js
/*@license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */



















const {
    DiscordConstants: { GuildFeatures }
} = external_BoundedLibrary_namespaceObject.DiscordModules;

/* harmony default export */ const assets_features = ({
    [GuildFeatures.INVITE_SPLASH]: invite_splash,
    [GuildFeatures.VIP_REGIONS]: vip_regions,
    [GuildFeatures.VANITY_URL]: vanity_url,
    [GuildFeatures.MORE_EMOJI]: more_emoji,
    [GuildFeatures.COMMERCE]: commerce,
    [GuildFeatures.DISCOVERABLE]: discoverable,
    [GuildFeatures.COMMUNITY]: community,
    [GuildFeatures.FEATURABLE]: featurable,
    [GuildFeatures.NEWS]: news,
    [GuildFeatures.ANIMATED_ICON]: animated_icon,
    [GuildFeatures.BANNER]: banner,
    [GuildFeatures.ENABLED_DISCOVERABLE_BEFORE]: enabled_discoverable_before,
    [GuildFeatures.WELCOME_SCREEN_ENABLED]: welcome_screen_enabled,
    [GuildFeatures.MEMBER_VERIFICATION_GATE_ENABLED]: member_verification_gate_enabled,
    [GuildFeatures.PREVIEW_ENABLED]: preview_enabled
});

;// CONCATENATED MODULE: ./src/GuildProfile/components/GuildProfileModal/GuildFeatures.jsx
/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */










function GuildFeatures_GuildFeatures({ className, guild }) {
    const features = Array.from(guild.features);

    return (
        external_BdApi_React_default().createElement('div', { className: `${className} container-1gYwHN`,}
            , features.map(feature => {
                const Icon = assets_features[feature];

                if (!Icon) {
                    return null;
                }

                return (
                    external_BdApi_React_default().createElement(TooltipContainer, { key: feature, text: i18n.Messages[`GUILD_PROFILE_${feature}`],}
                        , external_BdApi_React_default().createElement(Clickable, null
                            , external_BdApi_React_default().createElement(Icon, { className: "profileBadge24-sH1efV profileBadge-12r2Nm desaturate-_Twf3u"  ,} )
                        )
                    )
                );
            })
        )
    );
}

;// CONCATENATED MODULE: ./src/GuildProfile/components/GuildProfileModal/GuildTag.jsx
/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */




const GuildBadge = external_BoundedLibrary_namespaceObject.WebpackModules.getByDisplayName('GuildBadge');

function GuildTag({ className, usernameClass, guild }) {
    return (
        external_BdApi_React_default().createElement('div', { className: `${className} nameTag-H6kSJ0 guild-tag`,}
            , external_BdApi_React_default().createElement('div', { className: "guildIconContainer-3QvE6w",}
                , external_BdApi_React_default().createElement(GuildBadge, { className: "guildBadge-3_UK6z", guild: guild, size: 20,} )
            )
            , external_BdApi_React_default().createElement('span', { className: `username-3JLfHz ${usernameClass}`,}, guild.name)
        )
    );
}

;// CONCATENATED MODULE: ./src/GuildProfile/components/GuildProfileModal/GuildProfileModalHeader.jsx
/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */












const InviteButton = external_BoundedLibrary_namespaceObject.WebpackModules.getModule(m => m.displayName === 'InviteButton' && m.Header);
const { default: Avatar } = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('AnimatedAvatar');

function MemberCounts({ guild }) {
    const { members, membersOnline } = useStateFromStores([stores_MemberCountsStore], () =>
        stores_MemberCountsStore.getMemberCounts(guild.id)
    );

    return (
        external_BdApi_React_default().createElement('div', { className: "guildDetail-3EJhW_",}
            , external_BdApi_React_default().createElement(InviteButton.Data, { members: members, membersOnline: membersOnline,} )
        )
    );
}

function GuildProfileModalHeader({ guild }) {
    return (
        external_BdApi_React_default().createElement('header', null
            , external_BdApi_React_default().createElement(GuildBanner, { guild: guild,} )
            , external_BdApi_React_default().createElement('div', { className: "header-S26rhB",}
                , external_BdApi_React_default().createElement(Avatar, { className: "avatar-3QF_VA", src: guild.getIconURL(256, true), size: Avatar.Sizes.SIZE_120,} )
                , external_BdApi_React_default().createElement('div', { className: "headerTop-1PNKck header-top" ,}
                    , guild.features.size > 0 && external_BdApi_React_default().createElement(GuildFeatures_GuildFeatures, { className: "badgeList-2aoHPw", guild: guild,} )
                    , external_BdApi_React_default().createElement(MemberCounts, { guild: guild,} )
                )
            )
            , external_BdApi_React_default().createElement(GuildTag, {
                className: "nameTagNoCustomStatus-3ocqoK nameTag-2Nlmsy" ,
                usernameClass: "username-1g6Iq1",
                guild: guild,}
            )
        )
    );
}

;// CONCATENATED MODULE: ./src/@discord/components/Scroller.js


const { ScrollerAuto, ScrollerThin, default: Scroller } = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('ScrollerAuto');



/* harmony default export */ const components_Scroller = ((/* unused pure expression or super */ null && (Scroller)));

;// CONCATENATED MODULE: ./src/GuildProfile/components/GuildProfileModal/Relationships.jsx
/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */










const {
    RelationshipStore,
    GuildMemberStore,
    UserStore,
    DiscordConstants: { RelationshipTypes }
} = external_BoundedLibrary_namespaceObject.DiscordModules;

const { default: Relationships_Avatar } = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('AnimatedAvatar');
const DiscordTag = external_BoundedLibrary_namespaceObject.WebpackModules.getByDisplayName('DiscordTag');

const UserProfileModalActions = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('openUserProfileModal');

const NoRelationshipsOfTypeMessages = {
    [RelationshipTypes.FRIEND]: 'GUILD_PROFILE_NO_FRIENDS_IN_THIS_GUILD',
    [RelationshipTypes.BLOCKED]: 'GUILD_PROFILE_NO_BLOCKED_USERS_IN_THIS_GUILD'
};

function Relationships({ guild, relationshipType }) {
    const users = useStateFromStores([RelationshipStore, GuildMemberStore, UserStore], () => {
        const users = [];
        const relationships = RelationshipStore.getRelationships();

        for (const userId in relationships) {
            if (relationships[userId] !== relationshipType || !GuildMemberStore.isMember(guild.id, userId)) {
                continue;
            }

            users.push(UserStore.getUser(userId));
        }

        return users;
    });

    function handleSelect(user) {
        UserProfileModalActions.openUserProfileModal({ userId: user.id, guildId: guild.id });
    }

    return (
        external_BdApi_React_default().createElement(ScrollerThin, { className: "listScroller-entkMk", fade: true,}
            , users.length <= 0 ? (
                external_BdApi_React_default().createElement('div', { className: "empty-2zcusz",}
                    , external_BdApi_React_default().createElement('div', { className: "emptyIconFriends-2LNxTX emptyIcon-uKVxYR" ,} )
                    , external_BdApi_React_default().createElement('div', { className: "emptyText-mZZyQk",}
                        , i18n.Messages[NoRelationshipsOfTypeMessages[relationshipType]]
                    )
                )
            ) : (
                users.map(user => (
                    external_BdApi_React_default().createElement(Clickable, {
                        key: user.id,
                        className: "listRow-2nO1T6",
                        onClick: () => handleSelect(user),
                        onSelect: () => handleSelect(user),}
                    
                        , external_BdApi_React_default().createElement(Relationships_Avatar, { className: "listAvatar-2bU5Uh", src: user.getAvatarURL(), size: Relationships_Avatar.Sizes.SIZE_40,} )
                        , external_BdApi_React_default().createElement(DiscordTag, {
                            user: user,
                            className: "listName-PwbeHL",
                            discriminatorClass: "listDiscriminator-1HAKWY",}
                        )
                    )
                ))
            )
        )
    );
}

;// CONCATENATED MODULE: external ["BoundedLibrary","DiscordModules","Moment"]
const external_BoundedLibrary_DiscordModules_Moment_namespaceObject = BoundedLibrary.DiscordModules.Moment;
var external_BoundedLibrary_DiscordModules_Moment_default = /*#__PURE__*/__webpack_require__.n(external_BoundedLibrary_DiscordModules_Moment_namespaceObject);
;// CONCATENATED MODULE: ./src/@discord/stores/StreamerModeStore.js
 function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function StreamerModeStore_optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

/* harmony default export */ const StreamerModeStore = (external_BoundedLibrary_namespaceObject.WebpackModules.find(m =>
    Object.getOwnPropertyDescriptor(_nullishCoalesce(StreamerModeStore_optionalChain([m, 'optionalAccess', _ => _.default, 'optionalAccess', _2 => _2.__proto__]), () => ( {})), 'hidePersonalInformation')
).default);

;// CONCATENATED MODULE: ./src/@discord/components/Form.js


const {
    FormDivider,
    FormItem,
    FormNotice,
    FormNoticeTypes,
    FormNoticeImagePositions,
    FormSection,
    FormText,
    FormTextTypes,
    FormTitle,
    FormTitleTags
} = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('FormSection');



;// CONCATENATED MODULE: ./src/@discord/components/Text.js
 function Text_optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

/* harmony default export */ const Text = (external_BoundedLibrary_namespaceObject.WebpackModules.find(m => Text_optionalChain([m, 'optionalAccess', _ => _.Text, 'optionalAccess', _2 => _2.displayName]) === 'Text').Text);

;// CONCATENATED MODULE: ./src/@discord/components/Flex.js


/* harmony default export */ const Flex = (external_BoundedLibrary_namespaceObject.WebpackModules.getByDisplayName('Flex'));

;// CONCATENATED MODULE: ./src/@discord/components/Anchor.js


/* harmony default export */ const Anchor = (external_BoundedLibrary_namespaceObject.WebpackModules.getByDisplayName('Anchor'));

;// CONCATENATED MODULE: ./src/GuildProfile/components/GuildProfileModal/GuildInfo.jsx
 function GuildInfo_optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */
















const {
    UserStore: GuildInfo_UserStore,
    GuildChannelsStore,
    Timestamps,
    DiscordConstants: { VerificationLevels, GuildExplicitContentFilterTypes, GuildNSFWContentLevel }
} = external_BoundedLibrary_namespaceObject.DiscordModules;

const { UserMention } = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('UserMention');
const UserFetcher = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('getUser', 'fetchCurrentUser');

const GuildExplicitContentFilterTypesMessages = {
    [GuildExplicitContentFilterTypes.DISABLED]: 'EXPLICIT_CONTENT_FILTER_DISABLED',
    [GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES]: 'EXPLICIT_CONTENT_FILTER_MEDIUM',
    [GuildExplicitContentFilterTypes.ALL_MEMBERS]: 'EXPLICIT_CONTENT_FILTER_HIGH'
};

function InfoSection({ title, children }) {
    return (
        external_BdApi_React_default().createElement(FormSection, { className: "marginBottom8-emkd0_ section" , tag: "h5", title: title,}
            , external_BdApi_React_default().createElement(Text, { selectable: true,}, children)
        )
    );
}

function GuildInfo({ guild }) {
    const owner = useStateFromStores([GuildInfo_UserStore], () => GuildInfo_UserStore.getUser(guild.ownerId));
    const hide = useStateFromStores([StreamerModeStore], () => StreamerModeStore.hidePersonalInformation);
    const channel = useStateFromStores([GuildChannelsStore], () => GuildChannelsStore.getDefaultChannel(guild.id));

    (0,external_BdApi_React_namespaceObject.useEffect)(() => {
        if (!owner) {
            UserFetcher.getUser(guild.ownerId);
        }
    }, [guild, owner]);

    return (
        external_BdApi_React_default().createElement(ScrollerThin, { className: "infoScroller-1QMpon guild-info" , fade: true,}
            , hide ? (
                external_BdApi_React_default().createElement('div', { className: "empty-2zcusz",}
                    , external_BdApi_React_default().createElement('div', { className: "emptyIconStreamerMode-3P4I-V emptyIcon-uKVxYR" ,} )
                    , external_BdApi_React_default().createElement('div', { className: "emptyText-mZZyQk",}, i18n.Messages.STREAMER_MODE_ENABLED)
                )
            ) : (
                external_BdApi_React_default().createElement(Flex, { justify: Flex.Justify.START, wrap: Flex.Wrap.WRAP,}
                    , external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.GUILD_OWNER,}
                        , owner ? (
                            external_BdApi_React_default().createElement(UserMention, { className: "mention", userId: owner.id, channelId: GuildInfo_optionalChain([channel, 'optionalAccess', _ => _.id]),} )
                        ) : (
                            `${i18n.Messages.GUILD_PROFILE_LOADING}...`
                        )
                    )
                    , guild.description && (
                        external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.FORM_LABEL_SERVER_DESCRIPTION,}
                            , guild.description
                        )
                    )
                    , guild.vanityURLCode && (
                        external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.VANITY_URL,}
                            , external_BdApi_React_default().createElement(Anchor, { href: `https://discord.gg/${guild.vanityURLCode}`,}, "discord.gg/"
                                , guild.vanityURLCode
                            )
                        )
                    )
                    , external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.GUILD_PROFILE_CREATED_AT,}
                        , external_BoundedLibrary_DiscordModules_Moment_default()(Timestamps.extractTimestamp(guild.id)).format('LLL')
                    )
                    , external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.GUILD_PROFILE_JOINED_AT,}
                        , external_BoundedLibrary_DiscordModules_Moment_default()(guild.joinedAt).format('LLL')
                    )
                    , external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.FORM_LABEL_VERIFICATION_LEVEL,}
                        , i18n.Messages[`VERIFICATION_LEVEL_${VerificationLevels[guild.verificationLevel]}`]
                    )
                    , external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.FORM_LABEL_EXPLICIT_CONTENT_FILTER,}
                        , i18n.Messages[GuildExplicitContentFilterTypesMessages[guild.explicitContentFilter]]
                    )
                    , external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.GUILD_PROFILE_GUILD_PREMIUM_SUBSCRIBER_COUNT,}
                        , guild.premiumSubscriberCount
                    )
                    , external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.GUILD_PROFILE_GUILD_PREMIUM_TIER,}
                        , guild.premiumTier
                    )
                    , external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.FORM_LABEL_SERVER_LANGUAGE,}
                        , i18n.Messages[guild.preferredLocale]
                    )
                    , external_BdApi_React_default().createElement(InfoSection, { title: i18n.Messages.GUILD_PROFILE_NSFW_LEVEL,}
                        , i18n.Messages[`GUILD_PROFILE_NSFW_LEVEL_${GuildNSFWContentLevel[guild.nsfwLevel]}`]
                    )
                )
            )
        )
    );
}

;// CONCATENATED MODULE: ./src/GuildProfile/components/GuildProfileModal/GuildRoles.jsx
 function GuildRoles_optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */











const { MemberRole } = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('MemberRole');

function GuildRoles({ guild }) {
    const hide = useStateFromStores([StreamerModeStore], () => StreamerModeStore.hidePersonalInformation);
    const roles = GuildRoles_optionalChain([Object, 'access', _ => _.values, 'call', _2 => _2(guild.roles), 'optionalAccess', _3 => _3.sort, 'call', _4 => _4((b, a) => a.position - b.position)]);

    if (hide) {
        return (
            external_BdApi_React_default().createElement('div', { className: "empty-2zcusz",}
                , external_BdApi_React_default().createElement('div', { className: "emptyIconStreamerMode-3P4I-V emptyIcon-uKVxYR" ,} )
                , external_BdApi_React_default().createElement('div', { className: "emptyText-mZZyQk",}, i18n.Messages.STREAMER_MODE_ENABLED)
            )
        );
    }

    return (
        external_BdApi_React_default().createElement(ScrollerThin, { className: "infoScroller-1QMpon guild-roles" , fade: true,}
            , external_BdApi_React_default().createElement('div', { className: "root-jbEB5E flex-3BkGQD wrap-7NZuTn"  ,}
                , roles.map(role => (
                    external_BdApi_React_default().createElement(MemberRole, { key: role.id, guildId: guild.id, role: role, canRemove: false,} )
                ))
            )
        )
    );
}

;// CONCATENATED MODULE: ./src/GuildProfile/components/GuildProfileModal/index.jsx
 function GuildProfileModal_nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }/* @license
 * Copyright (c) 2020 NurMarvin (Marvin Witt)
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */












const {
    DiscordConstants: { RelationshipTypes: GuildProfileModal_RelationshipTypes }
} = external_BoundedLibrary_namespaceObject.DiscordModules;

const GuildProfileSections = {
    GUILD_INFO: 'GUILD_INFO',
    GUILD_ROLES: 'GUILD_ROLES',
    FRIENDS: 'FRIENDS',
    BLOCKED_USERS: 'BLOCKED_USERS'
};

class GuildProfileModal extends (external_BdApi_React_default()).PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedSection: GuildProfileModal_nullishCoalesce(props.section, () => ( GuildProfileSections.GUILD_INFO))
        };

        this.handleSectionSelect = this.handleSectionSelect.bind(this);
    }

    render() {
        const { selectedSection } = this.state;
        const { guild } = this.props;

        return (
            external_BdApi_React_default().createElement((external_BdApi_React_default()).Fragment, null
                , external_BdApi_React_default().createElement('div', { className: "topSection-13QKHs",}
                    , external_BdApi_React_default().createElement(GuildProfileModalHeader, { guild: guild,} )
                    , external_BdApi_React_default().createElement('div', { className: "tabBarContainer-sCZC4w",}
                        , external_BdApi_React_default().createElement(TabBar, {
                            className: "tabBar-2hXqzU",
                            type: TabBar.Types.TOP,
                            selectedItem: selectedSection,
                            onItemSelect: this.handleSectionSelect,}
                        
                            , external_BdApi_React_default().createElement(TabBar.Item, { className: "tabBarItem-30Te4-", id: GuildProfileSections.GUILD_INFO,}
                                , i18n.Messages.GUILD_PROFILE_GUILD_INFO
                            )
                            , external_BdApi_React_default().createElement(TabBar.Item, { className: "tabBarItem-30Te4-", id: GuildProfileSections.GUILD_ROLES,}
                                , i18n.Messages.GUILD_PROFILE_ROLES_IN_GUILD
                            )
                            , external_BdApi_React_default().createElement(TabBar.Item, { className: "tabBarItem-30Te4-", id: GuildProfileSections.FRIENDS,}
                                , i18n.Messages.GUILD_PROFILE_FRIENDS_IN_GUILD
                            )
                            , external_BdApi_React_default().createElement(TabBar.Item, { className: "tabBarItem-30Te4-", id: GuildProfileSections.BLOCKED_USERS,}
                                , i18n.Messages.GUILD_PROFILE_BLOCKED_USERS_IN_GUILD
                            )
                        )
                    )
                )
                , external_BdApi_React_default().createElement('div', { className: "body-1Ukv50",}, this.renderSelectedSection())
            )
        );
    }

    renderSelectedSection() {
        const { selectedSection } = this.state;
        const { guild } = this.props;

        switch (selectedSection) {
            case GuildProfileSections.GUILD_ROLES:
                return external_BdApi_React_default().createElement(GuildRoles, { guild: guild,} );
            case GuildProfileSections.FRIENDS:
                return external_BdApi_React_default().createElement(Relationships, { guild: guild, relationshipType: GuildProfileModal_RelationshipTypes.FRIEND,} );
            case GuildProfileSections.BLOCKED_USERS:
                return external_BdApi_React_default().createElement(Relationships, { guild: guild, relationshipType: GuildProfileModal_RelationshipTypes.BLOCKED,} );
            default:
                return external_BdApi_React_default().createElement(GuildInfo, { guild: guild,} );
        }
    }

    handleSectionSelect(section) {
        this.setState({ selectedSection: section });
    }
}

;// CONCATENATED MODULE: ./src/GuildProfile/assets/guild-profile.svg
var guild_profile_path;

function guild_profile_extends() { guild_profile_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return guild_profile_extends.apply(this, arguments); }



function SvgGuildProfile(props) {
  return /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("svg", guild_profile_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, props), guild_profile_path || (guild_profile_path = /*#__PURE__*/external_BdApi_React_namespaceObject.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M21 3H3v18h18V3zm-3.6 3.6H6.6v1.8h10.8V6.6zM6.6 10.2h10.8V12H6.6v-1.8zm7.2 3.6H6.6v1.8h7.2v-1.8z",
    fill: "currentColor"
  })));
}

/* harmony default export */ const guild_profile = (SvgGuildProfile);
;// CONCATENATED MODULE: ./src/GuildProfile/style.scss
/* harmony default export */ const style = (".guild-profile .guildDetail-3EJhW_{flex-shrink:0;align-self:start}.guild-profile .profileBadge-12r2Nm{color:var(--header-secondary)}.guild-profile .guild-tag{display:flex;align-items:center}.guild-profile .guild-info{padding:20px 10px}.guild-profile .guild-info .section{padding:5px 10px}.guild-profile .guild-roles{color:var(--interactive-active);padding:10px 12px}\n");
;// CONCATENATED MODULE: ./src/GuildProfile/locales/index.js
/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

const requireContext = __webpack_require__(277);

const locales = {};

for (const localePath of requireContext.keys()) {
    const locale = localePath.match(/\.\/(.+)\.json/)[1];
    locales[locale] = requireContext(localePath);
}

/* harmony default export */ const GuildProfile_locales = (locales);

;// CONCATENATED MODULE: ./src/GuildProfile/index.jsx
 function GuildProfile_optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/* @license
 * Copyright (c) 2021 jaimeadf (Jaime Filho)
 * Licensed under the Open Software License version 3.0
 */

















const { ModalActions, UserSettingsStore, SelectedGuildStore, GuildStore } = external_BoundedLibrary_namespaceObject.DiscordModules;

const Menu = external_BoundedLibrary_namespaceObject.WebpackModules.getByProps('MenuItem');

class GuildProfile extends (external_Plugin_default()) {
    constructor() {
        super();

        this.defaultSettings = {
            position: 'top'
        };

        this.handleUserSettingsChange = this.handleUserSettingsChange.bind(this);
    }

    onStart() {
        external_BoundedLibrary_namespaceObject.PluginUtilities.addStyle(this.getName(), style);
        UserSettingsStore.addChangeListener(this.handleUserSettingsChange);

        stores_MemberCountsStore.initializeIfNeeded();

        this.loadLocale();
        this.patchMenu();
        this.patchGuildContextMenu();
    }

    onStop() {
        external_BoundedLibrary_namespaceObject.PluginUtilities.removeStyle(this.getName());
        UserSettingsStore.removeChangeListener(this.handleUserSettingsChange);

        external_BoundedLibrary_namespaceObject.Patcher.unpatchAll();
    }

    buildSettingsPanel() {
        return new external_BoundedLibrary_namespaceObject.Settings.SettingPanel(
            this.saveSettings.bind(this),
            new external_BoundedLibrary_namespaceObject.Settings.Dropdown(
                'Context menu position',
                'The position of the guild profile item on the context menu, the one opened when you right-click a guild.',
                this.settings.position,
                [
                    { label: 'Top', value: 'top' },
                    { label: 'Bottom', value: 'bottom' }
                ],
                value => (this.settings.position = value)
            )
        );
    }

    getSettingsPanel() {
        return this.buildSettingsPanel().getElement();
    }

    patchMenu() {
        external_BoundedLibrary_namespaceObject.Patcher.before(Menu, 'default', (thisObject, [props]) => {
            if (!props) {
                return;
            }

            const { navId, children } = props;

            if (
                navId !== 'guild-header-popout' ||
                external_BoundedLibrary_namespaceObject.Utilities.findInReactTree(children, c => GuildProfile_optionalChain([c, 'optionalAccess', _ => _.id]) === 'guild-profile')
            ) {
                return;
            }

            children.unshift(
                external_BdApi_React_default().createElement(Menu.MenuGroup, null
                    , external_BdApi_React_default().createElement(Menu.MenuItem, {
                        id: "guild-profile",
                        label: i18n.Messages.GUILD_PROFILE,
                        icon: guild_profile,
                        action: () => this.openGuildProfileModal(GuildStore.getGuild(SelectedGuildStore.getGuildId())),}
                    )
                )
            );
        });
    }

    async patchGuildContextMenu() {
        const GuildContextMenu = await external_BoundedLibrary_namespaceObject.DCM.getDiscordMenu('GuildContextMenu');

        external_BoundedLibrary_namespaceObject.Patcher.after(GuildContextMenu, 'default', (thisObject, [{ guild }], returnValue) => {
            returnValue.props.children.splice(
                this.settings.position === 'top' ? 1 : 5,
                0,
                external_BdApi_React_default().createElement(Menu.MenuGroup, null
                    , external_BdApi_React_default().createElement(Menu.MenuItem, {
                        id: "guild-profile",
                        key: "guild-profile",
                        label: i18n.Messages.GUILD_PROFILE,
                        action: () => this.openGuildProfileModal(guild),}
                    )
                )
            );
        });
    }

    async handleUserSettingsChange() {
        await i18n.loadPromise;
        this.loadLocale();
    }

    loadLocale() {
        Object.assign(i18n._provider._context.messages, GuildProfile_locales[UserSettingsStore.locale]);
        Object.assign(i18n._provider._context.defaultMessages, GuildProfile_locales["en-US"]);
    }

    openGuildProfileModal(guild) {
        ModalActions.openModal(props => (
            external_BdApi_React_default().createElement(ModalRoot, { className: "root-8LYsGj guild-profile" , ...props,}
                , external_BdApi_React_default().createElement(GuildProfileModal, { guild: guild,} )
            )
        ));
    }
}

})();

plugin = __webpack_exports__["default"];
/******/ })()
;

    return plugin;
}

module.exports = global.ZeresPluginLibrary
    ? buildPlugin()
    : class {
          constructor() {
              this._config = config;
          }

          getName() {
              return config.info.name;
          }

          getAuthor() {
              return config.info.authors.map(a => a.name).join(', ');
          }

          getDescription() {
              return config.info.description;
          }

          getVersion() {
              return config.info.version;
          }

          load() {
              global.BdApi.showConfirmationModal(
                  'Library plugin is needed',
                  `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,
                  {
                      confirmText: 'Download',
                      cancelText: 'Cancel',
                      onConfirm() {
                          request.get(
                              'https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js',
                              (error, response, body) => {
                                  if (error) {
                                      return electron.shell.openExternal(
                                          'https://betterdiscord.app/Download?id=9'
                                      );
                                  }

                                  fs.writeFileSync(
                                      path.join(global.BdApi.Plugins.folder, '0PluginLibrary.plugin.js'),
                                      body
                                  );
                              }
                          );
                      }
                  }
              );
          }

          start() {}

          stop() {}
      };

/*@end@*/
