// ==UserScript==
// @name         FlagOverflow (Get flag rank)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Flag Overflow
// @author       Shree: https://stackoverflow.com/users/965146/shree
// @match        *://*.chat.stackoverflow.com/rooms/167908/*
// @match        *://*.chat.stackoverflow.com/rooms/111347/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    readChatMessage();
})();

function sendChatMessage(msg, Room_ID) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://chat.stackoverflow.com/rooms/' + Room_ID,
        onload: function(response) {
            var fkey = response.responseText.match(/hidden" value="([\dabcdef]{32})/)[1];
            GM_xmlhttpRequest({
                method: 'POST',
                url: 'https://chat.stackoverflow.com/chats/' + Room_ID + '/messages/new',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'text=' + encodeURIComponent(msg.replaceAll("&#39;","\'")
                                                   .replaceAll("&quot;","\"")
                                                   .trim()) + "&fkey=" + fkey,
                onload: function(r) {

                }
            });
        }
    });
}
function timeDifference(activeTime){
    var current = new Date();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - activeTime;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
}

function readChatMessage(){


    readcmd();
    async function readcmd(){
        var getquote=[];
        let botName='@sBot';
        let Room_ID = '167908'; // Work Shop
        let rqt = '';
        let quotes = await getquot();

        var rn = 1;
        getquote = quotes.map(a => a.q + ' #@# ' + a.a);

        let cmd = [
            'help, commands  =>  Returns all available commands'
            ,'alive  =>  Return status'
            ,'talk, quote  =>  Return random quote'
            ,'hello , hi , morning, evening   =>  Greetings'
            , 'csm , rank  =>  Return total helpful flag'
            , 'why  => ?'
            , 'shrug  =>  ...'
            , 'tableflip , flip  => ping pong'
            , 'unflip  =>  pong ping'
            ,'welcome <username>  =>  Return welcome message for new user with room information '
            , 'tea , coffee  => ☕'
            , 'RO  =>  Return list of  RO present in the room '
            , 'blame => Blame random person who present in the room'
        ];

        let roomOwners=[
            'Shree','double-beep','Bhargav Rao'
            ,'Floern','Baum mit Augen','Petter Friberg'
            ,'FelixSFD','rene','Bugs'
            ,'Rob','Filnor','NobodyNada',
            'ArtOfCode', 'JAAD', 'Ashish Ahuja'
            ,'Sam', 'Cath', 'Kyll'
            ,'Thaillie', 'JAL', 'Tunaki',
            ,'Drew'
        ];

        let regulars=[
            'Yunnosch','tripleee','sideshowbarker'
            ,'Steve'
        ]


        $("body").on("DOMNodeInserted", function(event) {
            let user='';
            let userURL='';
            let message = '';
            let messageId='';
            let isCommand = false;

            if($(event.target).hasClass("message") && $(event.target).hasClass("neworedit")) {
                let signature = $(event.target).parent().siblings(".signature");
                userURL = signature.attr('href');
                user = signature.children(".username").text().trim();
                message = $(event.target).children(".content").text();
                messageId = $(event.target).attr("id").split("-")[1];
                isCommand = (message.split(' ').length <= 3 ? true : false);


            }

            let msgUser = '@' + user + '  ';

            if(message!='' && message.startsWith(botName) && isCommand){
                let commandCase = message.split(' ')[1].toLowerCase();
                switch (commandCase) {
                    case 'alive':
                        sendChatMessage(msgUser + '  Ahaaa!!! lurking 🏃', Room_ID)
                        break;
                    case 'tea':
                        var tfor = message.split(' ')[2];
                        var teaA = ['Green', 'Oolong', 'Black', 'Darjeeling', 'Iced', 'Blends', 'Pu-erh', 'Matcha', 'Herbal', 'Rooibos'];
                        var rnt = teaA[Math.floor(Math.random() * teaA.length)];
                        if (typeof(tfor) == 'undefined') {
                            sendChatMessage(msgUser + 'brew a ☕ of ' + rnt + ' tea for ' + msgUser, Room_ID);
                        }
                        else{
                            sendChatMessage(msgUser + 'brew a ☕ of ' + rnt + ' tea for ' + '@' + tfor, Room_ID);
                        }
                        break;
                    case 'coffee':
                        var cfor = message.split(' ')[2];
                        var coffeeA = ['Espresso', 'Double Espresso', 'Red Eye', 'Black Eye', 'Americano', 'Long Black', 'Macchiato', 'Cortado', 'Breve', 'Cappuccino', 'Cafe Latte', 'Mocha', 'Vienna', 'Affogato', 'Cafe au Lait', 'Iced Coffee'];
                        var rnc = coffeeA[Math.floor(Math.random() * coffeeA.length)];
                        if (typeof(cfor) == 'undefined') {
                            sendChatMessage(msgUser + 'brew a ☕ of ' + rnc + ' coffee for ' + msgUser, Room_ID);
                        }
                        else{
                            sendChatMessage(msgUser + 'brew a ☕ of ' + rnc + ' coffee for ' + '@' + cfor, Room_ID);
                        }
                        break;
                    case 'quote':
                    case 'talk':
                        var rnd = Math.floor(Math.random() * 50) + 1;
                        rqt = getquote[rnd];
                        rqt = '**❝ '+ rqt.split(' #@# ')[0].trim() +' ❞** *:- ' + rqt.split(' #@# ')[1].trim()+ '*'
                        sendChatMessage(msgUser + rqt , Room_ID)
                        break;
                    case 'hello':
                    case 'hi':
                    case 'morning':
                    case 'evening':
                        sendChatMessage(msgUser + '🙏🏽 ' + message.split(' ')[1], Room_ID)
                        break;
                    case 'help':
                    case 'commands':
                        sendChatMessage(msgUser + ' ### List of commands: ### \n' + cmd.join('\n ') , Room_ID)
                        break;
                    case 'ro':
                        var msg = '';
                        var count = 0;
                        var aro=[];
                        $("#present-users > .present-user").each(function(index) {
                            var uName = $(this).find('.avatar > img').attr('title');
                            var aTime = $(this).find('.last-activity-time').text();
                            aTime = timeDifference(new Date(aTime * 1000));
                            var isRO = roomOwners.includes(uName);
                            if (isRO) {
                                aro.push(uName + ' (last activity: ' + aTime + ')');
                                count++
                            }
                        });
                        sendChatMessage('There are currently ' + count + ' RO in this room. \n' + aro.join('\n') , Room_ID);
                        break;
                    case 'csm':
                    case 'rank':
                        var userId =userURL.split('/')[2];
                        var find = 'Total number of raised flags marked useful';
                        var userRep = async function getrep(){
                            return new Promise(resolve => {
                                GM_xmlhttpRequest({
                                    method: 'GET',
                                    url:'https://stackoverflow.com'+ userURL + '?tab=topactivity',
                                    onload: function(data) {
                                        resolve(data.responseText);
                                    }
                                });
                            });

                        }
                        userRep()
                            .then(function(result) {
                            var $result = $(result).find("div[title='"+ find + "']").text();
                            getRank(msgUser,$result, Room_ID)
                        });

                        break;
                    case "blame":

                        var rndl = Math.floor(Math.random() * $('#present-users > .present-user').length );
                        var rndli = $('#present-users > .present-user').get(rndl);
                        var blame = $(rndli).find('.avatar > img').attr('title');
                        sendChatMessage(msgUser + 'it\'s (☞ ͡ ° ͜ʖ ͡°)☞ ' + blame + ' fault.' , Room_ID);

                        break;
                    case "why":
                        sendChatMessage(msgUser + '[Life The Universe and Everything (42)](https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_(42))', Room_ID);
                        break;
                    case "shrug":
                        sendChatMessage('\u00AF\\ \\_(\u30C4)\\_ /\u00AF', Room_ID);
                        break;
                    case "tableflip":
                    case "flip":
                        sendChatMessage('(\u256F\u00B0\u25A1\u00B0\uFF09\u256F\uFE35 \u253B\u2501\u253B', Room_ID);
                        break;
                    case "unflip":
                        sendChatMessage('\u252C\u2500\u252C \u30CE( \u309C-\u309C\u30CE)', Room_ID);
                        break;
                    case "welcome":
                        var roomModerator =roomOwners.concat(regulars);
                        var wusr = message.split(' ')[2]
                        var cf = roomModerator.includes(user);
                        if (cf){
                            if (typeof(wusr) == 'undefined') {
                                sendChatMessage('Err!!! unable to find new user. \n ### List of commands: ### \n' + cmd.join('\n ') , Room_ID)
                            }
                            else {
                                sendChatMessage('@'+ wusr +' Welcome to SOBotics! This room is dedicated to moderating content on Stack Overflow with the use of bots. If you\'d like to help out with flagging, reporting, or anything else, let us know! We have tons of userscripts to make things easier, and you\'ll always find someone around who will help you to install them and explain how they work.', Room_ID)
                                setTimeout(function(){
                                    sendChatMessage('Also make sure to check out our [GitHub](https://github.com/sobotics), [All bots](https://sobotics.org/all-bots/), [UserScripts](https://sobotics.org/userscripts).',Room_ID)
                                },5000);
                            }
                        }
                        else{
                            sendChatMessage('You are not privileged user to run this command.  cc @Shree', Room_ID);
                        }
                        break;
                    default:
                        sendChatMessage(msgUser + 'Nobody Wins! !! !!! \n ### List of commands: ### \n' + cmd.join('\n '), Room_ID)
                        break;
                }

            }
        });

    }

}
function getRank(msgUser, result, Room_ID){

    let flagRank = [
        [365, 'A flag a day keeps bad posts away', 'One year has 365 days'],
        [811, 'How thare thy?', 'I think you know whose user id that is'],
        [1111, 'No badge needed', 'A number is prettier than a badge anyway!'],
        [1337, 'l337 fl4663r', '[l337 5p34k 15 4w350m3!](https://en.wikipedia.org/wiki/Leet)'],
        [1969, 'Moon landing', 'I flagged the moon!'],
        [2008, 'Flag Overflow', 'Stack Overflow was created in 2008'],
        [2395, 'Flag me up, Scotty', '[We don\'t beam, we flag](https://en.wikipedia.org/wiki/Beam_me_up,_Scotty)'],
        [3456, '<3456', 'You <3 flagging too much'],
        [5566, '[Long Time No Flag](https://en.wikipedia.org/wiki/Long_Time_No_See_(5566_album))', '[Taiwanese boy band, formed under Taiwanese music company, J-Star](https://en.wikipedia.org/wiki/5566)'],
        [10000, 'Elite Squad', '[At one point of time, there were only 16 of us](https://chat.meta.stackexchange.com/transcript/message/6083409#6083409)'],
        [19679, 'Professional Larnsonist', '19679 is Brad Larnson\'s user id'],
        [22656, 'Almost Jon Skeet', '22656 is his (John\'s) user ID'],
        [33333, 'The Mad Flagger', 'Got nothing better to do with your time? ;D'],
        [42195, 'The Marathon', 'Marathon\'s length in meters'],
        [65536, 'The two to the sixteen', ''],
        [101010, "Definitely a robot", "42 in binary code. [Also 42 is the Answer to the Ultimate Question of Life, the Universe, and Everything](https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_(42))"],
        [314159, '\u03C0', 'Who ate all the Pi?'],
        [874188, 'tripleee', 'Wheeereee has theee eee goneee?'],
        [4294967296, 'A `long` journey', '..........']
    ]

    var getRank = [];
    //var $result = '65,422 helpful flags';
    var $result = result;
    var goal = $result.trim().split(' ')[0].replace(/,/g, '');
    $.each(flagRank, function(index, item) {
        getRank.push(flagRank[index][0])
    });

    var closest = null;
    var rankInd = null;

    $.each(getRank, function(index, item) {
        if (closest == null || Math.abs(this - goal) < Math.abs(closest - goal)) {
            closest = this;
            rankInd = index;
        }
    });

    var diff = flagRank[rankInd + 1][0] - flagRank[rankInd][0];

    var msg = 'You currently have ' + $result + '. Your last achieved rank was **' + flagRank[rankInd][1] + '** ' + flagRank[rankInd][2] + '. You need ' + diff + ' more flags for your next rank, **' + flagRank[rankInd + 1][1] + '** .'
    sendChatMessage(msgUser + msg.replace(/\n|\r/g, " "), Room_ID)

}

function getquot() {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://zenquotes.io/api/quotes',
            onload: function(data) {
                resolve(JSON.parse(data.responseText));
            }
        });
    });
}
async function getquotes(){

    let getquote=[];
    let quotes = await getquot();
    getquote = quotes.map(a => a.q + ' #@# ' + a.a);
    return(getquote);
}
