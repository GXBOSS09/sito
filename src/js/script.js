/*
Configuration
------------------------
If something doesn't work please contact me on discord (Astronawta#0012).
*/



const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.png", /*This is a file name for logo in /images/ (If you upload new logo with other name, you must change this value)*/
        serverName: "FLAMEMC", /*Server name*/
        serverIp: "flamemc.falix.me", /*Server IP*/
        discordServerID: "1101003701088432158" /*Your server ID (if you want to add online user counter, you must have enabled Discord server widget)*/
    },

    socialLinks: {
        discordInvitationLink: "https://discord.gg/mE3BBZF8AE",
        tiktok: "comingsoon.html",
        instagram: "https://www.instagram.com/hypixelofficial"
    },

    /*Admin-Team
    ------------
    There are 4 groups (Leaders, Developers, Helpers, Builders)
    If you want to add new member to group, you must add to a specific group name and rank:
    All skins for original players are generate automaticaly. If you want to add skins to warez players, yout must add url for skin to skinUrlOrPathToFile
        {
            inGameName: "Astronavta", <--- In-Game name
            rank: "Owner", <-- rank
            skinUrlOrFileName: "" <-- url or file path for skin image for warez players (if you have original minecraft leave it be empty)
        }

    If you want to change skin type replace userSKinTypeInAdminTeam with something you want from array in comments
    */
    userSKinTypeInAdminTeam: "bust", /*[full, bust, head, face, front, frontFull, skin]*/
    adminTeamPage: {
        leaders: [
            {
                inGameName: "MrTanxy_",
                rank: "Owner",
                skinUrlOrPathToFile: ""
            },
            {
                inGameName: "xmathee",
                rank: "Owner",
                skinUrlOrPathToFile: ""
            },
            {
                inGameName: "Andr3x_",
                rank: "Manager",
                skinUrlOrPathToFile: ""
            }
        ],
        developers: [
            {
                inGameName: "Larzolo",
                rank: "Developer",
                skinUrlOrPathToFile: ""
            },
            {
                inGameName: "GabrieleProUNO",
                rank: "Developer",
                skinUrlOrPathToFile: ""
            }
        ],
        helpers: [
            {
                inGameName: "Bla",
                rank: "Moderator",
                skinUrlOrPathToFile: ""
            },
            {
                inGameName: "Bla",
                rank: "Helper++",
                skinUrlOrPathToFile: ""
            },
            {
                inGameName: "Bla",
                rank: "Helper+",
                skinUrlOrPathToFile: ""
            },
            {
                inGameName: "Bla",
                rank: "Helper+",
                skinUrlOrPathToFile: ""
            },
            {
                inGameName: "Bla",
                rank: "Helper",
                skinUrlOrPathToFile: ""
            },
        ],
    },

    /*
    Contact form
    ------------
    To activate, you need to send the first email via the contact form and confirm it in the email.
    Emails are sent via https://formsubmit.co/
    */
    contactPage: {
        email: "astronavta@example.com"
    }
}

/*If you want to change website color go to /css/global.css and in :root {} is a color pallete (don't change names of variables, change only values)*/
















/*If you want everything to work as it should and you don't understand what is written here, don't touch it :D*/


/*Mobile navbar (open, close)*/
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
})

/*FAQs*/
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if(accordionItemHeader.classList.contains("active")) accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        else accordionItemBody.style.maxHeight = "0px";
    });
});

/*Config navbar*/
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");
/*Config header*/
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
/*Config discord*/
const joinDiscordButton = document.querySelector(".discord-link");
/*Config footer*/
const serverNameFooter = document.querySelector(".server-name-footer");
const tiktokLink = document.querySelector(".tiktok-link");
const instagramLink = document.querySelector(".instagram-link");
const discordLink = document.querySelector(".discord-link-footer");
/*Config contact*/
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = config.serverInfo.discordServerID;

        const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if(!data.presence_count) return "None";
        else return (await data.presence_count);
    } catch (e) {
        return "None";
    }
}

const getMinecraftOnlinePlayer = async () => {
    try {
        const serverIp = config.serverInfo.serverIp;

        const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        if(!data.players.online) return "None";
        else return await data.players.online;
    } catch (e) {
        return "None";
    }
}

const getUuidByUsername = async (username) => {
    try {
        const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();

        if(!data.id) return "None";
        else return await data.id;
    } catch (e) {
        return "None";
    }
}

const getSkinByUuid = async (username) => {
    try {
        const skinByUuidApi = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${await getUuidByUsername(username)}`;
        let response = await fetch(skinByUuidApi);

        if(response.status === 400) return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/ec561538f3fd461daff5086b22154bce`;
        else return skinByUuidApi;
    } catch (e) {
        return "None";
    }
}

const copyIp = () => {
    const copyIpButton = document.querySelector(".copy-ip");
    const copyIpAlert = document.querySelector(".ip-copied");

    copyIpButton.addEventListener("click", () => {
        try {
            navigator.clipboard.writeText(config.serverInfo.serverIp);
    
            copyIpAlert.classList.add("active");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
            }, 5000);
        } catch (e) {
            copyIpAlert.innerHTML = "An error has occurred!";
            copyIpAlert.classList.add("active");
            copyIpAlert.classList.add("error");

            setTimeout(() => {
                copyIpAlert.classList.remove("active");
                copyIpAlert.classList.remove("error");
            }, 5000);
        }
    })
}

const setDataFromConfigToHtml = async () => {
    /*Set config data to navbar*/
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `src/images/` + config.serverInfo.serverLogoImageFileName;

    /*Set config data to header*/
    serverIp.innerHTML = config.serverInfo.serverIp;

    /*Set config data to Footer*/
    serverNameFooter.innerHTML = config.serverInfo.serverName;
    tiktokLink.href = config.socialLinks.tiktok;
    instagramLink.href = config.socialLinks.instagram;
    discordLink.href = config.socialLinks.discordInvitationLink;

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("/index.html")) {
        copyIp();
        /*Set config data to header*/
        serverLogoHeader.src = `src/images/` + config.serverInfo.serverLogoImageFileName;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();

        /*Set config data to Discord*/
        joinDiscordButton.href = config.socialLinks.discordInvitationLink;
    } else if(locationPathname.includes("rules.html")) {
        copyIp();
        joinDiscordButton.href = config.socialLinks.discordInvitationLink;
    }
    else if(locationPathname.includes("admin-team.html")) {
        for (let team in config.adminTeamPage) {
            for (let j = 0; j < config.adminTeamPage[team].length; j++) {
                let user = config.adminTeamPage[team][j];
                const group = document.querySelector("." + team + " .users");

                const userDiv = document.createElement("div");
                userDiv.classList.add("user");

                let userSkin = config.adminTeamPage[team][j].skinUrlOrPathToFile;

                if(userSkin == "") userSkin = await getSkinByUuid(user.inGameName);

                const userDivSchema = `
                    <div class="user">
                        <img src="${await (userSkin)}" alt="${user.inGameName}">
                        <h5 class="name">${user.inGameName}</h5>
                        <p class="rank ${team}">${user.rank}</p>
                    </div>    
                `;

                userDiv.innerHTML = userDivSchema;
                group.appendChild(userDiv);
            }
        }
    } else if(locationPathname.includes("contact.html")) {
        contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        joinDiscordButton.href = config.socialLinks.discordInvitationLink;
        inputWithLocationAfterSubmit.value = location.href;
    }
}

setDataFromConfigToHtml();


(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');


    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }

        if($(subject).val().trim() == ''){
            showValidate(subject);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        return check;
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);



// When the user clicks on div, open the popup
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function myFunctionsup() {
    var popup = document.getElementById("myPopupsup");
    popup.classList.toggle("show");
}

function myFunctionhelp() {
    var popup = document.getElementById("myPopuphelp");
    popup.classList.toggle("show");
}
