const http = require('http'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    qs = require('querystring'),
    os = require('os'),
	fetch = require('isomorphic-fetch'),
	fs = require('fs');

let connection_string = 'mongodb://localhost:27017/' + 'node';

let interfaces = os.networkInterfaces();
let addresses = [];
for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        let address = interfaces[k][k2];
        if (address.family == "IPv4" && !address.internal) {
            addresses.push(address.address);
        }
    }
}
let server = http.createServer(function(req, res) {
    let url = req.url;
    switch (url) {
        case "/":
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            return res.end("分支測試阿阿阿阿");
            break;
        case "/handplus":
            var data = '';
            req.on("data", function(datas) {
                return data += datas;
            });
            req.on("end", function() {
                data = qs.parse(data);
            });
            return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err;
                if (data._id == null) { //while null -> insert to collection
                    if (data.uid != null) {
                        db.collection('events').insertOne({
                            "uid": data.uid,
                            "group": data.group,
                            "name": data.name,
                            "url": data.url,
                            "time": data.time,
                            "location": data.location,
                            "target": data.target,
                            "info": data.info,
                            "ad": data.ad,
							"state": data.state,
                        }, function(err, result) {
                            if (err) throw err;
                            db.close();
                            res.writeHead(200, {
                                "Content-Type": "text/plain;charset=utf-8"
                            });
                            return res.end(result.insertedId.toString());
                        });
                    } else {
                        db.close();
                    }
                } else { //while _id exist 
                    let objectId = new ObjectID(data._id);
                    if(data.delete != null){ //delete item
                            db.collection("events").deleteOne({ 
                                "_id": objectId
                            }, function(err, obj) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end("ok");
                            });
                    } else {
                        if (data.update == null) { //read by objectId
                            db.collection('events').find({
                                "_id": objectId
                            }).toArray(function(err, docs) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end(JSON.stringify(docs));
                            });
                        } else { //update
                            db.collection("events").updateOne({
                                "_id": objectId
                            }, {
                                $set: {
                                    "uid": data.uid,
                                    "group": data.group,
                                    "name": data.name,
                                    "url": data.url,
                                    "time": data.time,
                                    "location": data.location,
                                    "target": data.target,
                                    "info": data.info,
                                    "ad": data.ad,
									"state": data.state
                                }
                            }, function(err, docs) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end("ok");
                            });
                        }
                    }
                }
            });
            break;
		case "/handplus_users":
            var data = '';
            req.on("data", function(datas) {
                return data += datas;
            });
            req.on("end", function() {
                data = qs.parse(data);
            });
            return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err;
                if (data._id == null) { //while null -> insert to collection
                    if (data.uid != null) {
                        db.collection('users').insertOne({
                            "uid": data.uid,
							"group": data.group,
                            "friends": data.friends,
                            "name": data.name,
                            "right": data.right,
                            "like_events": data.like_events,
                            "email": data.email,
                            "my_events": data.my_events,
                            "fb_ids": data.fb_ids,
                            "mailbox": data.mailbox,
							"b_notif": data.b_notif,
                        }, function(err, result) {
                            if (err) throw err;
                            db.close();
                            res.writeHead(200, {
                                "Content-Type": "text/plain;charset=utf-8"
                            });
                            return res.end(result.insertedId.toString());
                        });
                    } else {
                        db.close();
                    }
                } else { //while _id exist 
                    let objectId = new ObjectID(data._id);
                    if(data.delete != null){ //delete item
                            db.collection("users").deleteOne({ 
                                "_id": objectId
                            }, function(err, obj) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end("ok");
                            });
                    } else {
                        if (data.update == null) { //read by objectId
                            db.collection('users').find({
                                "_id": objectId
                            }).toArray(function(err, docs) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end(JSON.stringify(docs));
                            });
                        } else { //update
                            db.collection("users").updateOne({
                                "_id": objectId
                            }, {
                                $set: {
 							"uid": data.uid,
							"group": data.group,
                            "friends": data.friends,
                            "name": data.name,
                            "right": data.right,
                            "like_events": data.like_events,
                            "email": data.email,
                            "my_events": data.my_events,
                            "fb_ids": data.fb_ids,
                            "mailbox": data.mailbox,
							"b_notif": data.b_notif,
                                }
                            }, function(err, docs) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end("ok");
                            });
                        }
                    }
                }
            });
            break;
		case "/handplus_groups":
            var data = '';
            req.on("data", function(datas) {
                return data += datas;
            });
            req.on("end", function() {
                data = qs.parse(data);
            });
            return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err;
                if (data._id == null) { //while null -> insert to collection
                    if (data.uid != null) {
                        db.collection('groups').insertOne({
							"uid": data.uid,
                            "admin": data.admin,
                            "info": data.info,
                            "picture": data.picture,
                            "workers": data.workers,
                            "events": data.events,
                            "albums": data.albums,
                            "name": data.name,
                            "generation": data.generation,	
                        }, function(err, result) {
                            if (err) throw err;
                            db.close();
                            res.writeHead(200, {
                                "Content-Type": "text/plain;charset=utf-8"
                            });
                            return res.end(result.insertedId.toString());
                        });
                    } else {
                        db.close();
                    }
                } else { //while _id exist 
                    let objectId = new ObjectID(data._id);
                    if(data.delete != null){ //delete item
                            db.collection("groups").deleteOne({ 
                                "_id": objectId
                            }, function(err, obj) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end("ok");
                            });
                    } else {
                        if (data.update == null) { //read by objectId
                            db.collection('groups').find({
                                "_id": objectId
                            }).toArray(function(err, docs) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end(JSON.stringify(docs));
                            });
                        } else { //update
                            db.collection("groups").updateOne({
                                "_id": objectId
                            }, {
                                $set: {
							"uid": data.uid,
                            "admin": data.admin,
                            "info": data.info,
                            "picture": data.picture,
                            "workers": data.workers,
                            "events": data.events,
                            "albums": data.albums,
                            "name": data.name,
                            "generation": data.generation,	
                                }
                            }, function(err, docs) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end("ok");
                            });
                        }
                    }
                }
            });
            break;
		case "/handplus_album":
            var data = '';
            req.on("data", function(datas) {
                return data += datas;
            });
            req.on("end", function() {
                data = qs.parse(data);
            });
            return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err;
                if (data._id == null) { //while null -> insert to collection
                    if (data.uid != null) {
                        db.collection('album').insertOne({
                            "uid": data.uid,
							"name": data.name,
                            "events": data.events,
                            "cover": data.cover,
                            "information": data.information,
                            "pictures": data.pictures,
                        }, function(err, result) {
                            if (err) throw err;
                            db.close();
                            res.writeHead(200, {
                                "Content-Type": "text/plain;charset=utf-8"
                            });
                            return res.end(result.insertedId.toString());
                        });
                    } else {
                        db.close();
                    }
                } else { //while _id exist 
                    let objectId = new ObjectID(data._id);
                    if(data.delete != null){ //delete item
                            db.collection("album").deleteOne({ 
                                "_id": objectId
                            }, function(err, obj) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end("ok");
                            });
                    } else {
                        if (data.update == null) { //read by objectId
                            db.collection('album').find({
                                "_id": objectId
                            }).toArray(function(err, docs) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end(JSON.stringify(docs));
                            });
                        } else { //update
                            db.collection("album").updateOne({
                                "_id": objectId
                            }, {
                                $set: {
							"uid": data.uid,
							"name": data.name,
                            "events": data.events,
                            "cover": data.cover,
                            "information": data.information,
                            "pictures": data.pictures
                                }
                            }, function(err, docs) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end("ok");
                            });
                        }
                    }
                }
            });
            break;
		case "/handplus_home":
            var data = '';
            req.on("data", function(datas) {
                return data += datas;
            });
            req.on("end", function() {
                data = qs.parse(data);
            });
            return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err;
                db.collection('home').find().toArray(function(err, docs) {
                                if (err) throw err;
                                db.close();
                                res.writeHead(200, {
                                    "Content-Type": "text/plain;charset=utf-8"
                                });
                                return res.end(JSON.stringify(docs));
                            });
            });
            break;
        case "/handplus_homeNew":
            var data = '';
            req.on("data", function(datas) {
                return data += datas;
            });
            req.on("end", function() {
                data = qs.parse(data);
            });
            return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err;
                db.collection('home').find().toArray(function(err, docs) {
                    if (err) throw err;
                    db.collection("home").updateOne({
                    "_id": objectId
                    }, {
                        $set: {
                    "uid": data.uid,
                    "name": data.name,
                    "events": data.events,
                    "cover": data.cover,
                    "information": data.information,
                    "pictures": data.pictures
                        }
                    }, function(err, docs) {
                        if (err) throw err;
                        db.close();
                        res.writeHead(200, {
                            "Content-Type": "text/plain;charset=utf-8"
                        });
                        return res.end("ok");
                    });

                    return res.end(JSON.stringify(docs));
                });
            });
        break;
		case "/court_info":
			var data = '';
			req.on("data", function(datas) {
                return data += datas;
            });
            req.on("end", function() {
                data = qs.parse(data);
            });
			return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err;
				//console.log("connect to mongo");
                db.collection('court_table').find({},{_id:false,id:false}).toArray(function(err,result) {
				//console.log(result);
				if(err) throw err;
					for(var i = 0;i<result[0].sheet.length;i++){
						
						if(result[0].sheet[i].text == data.time){
							var gid = result[0].sheet[i].gid;
							console.log(gid);
							console.log(data.time);
							Download(gid,data.time,res);
						}
						else{
							//console.log("search fail");
						}
					}
					db.close();
				});
            });
		break;
		case "/course_info":
			return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err;
				//console.log("connect to mongo");
                db.collection('course').find({},{_id:false}).toArray(function(err,result) {
				//console.log(result);
				if(err) throw err;
					db.close();
					res.writeHead(200, {
                            "Content-Type": "text/plain;charset=utf-8"
					});
					return res.end(JSON.stringify(result));
				});
            });
		break;
		case "/note_shared":
			var data = '';
			req.on("data", function(datas) {
                return data += datas;
            });
            req.on("end", function() {
                data = qs.parse(data);
                console.log(data);
            });
            return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err
                var method = parseInt(data.method);
                if (method == 1) {
                    db.collection('note').insertOne({
                        "serial": data.serial,
                        "userName" : data.userName,
                        "title": data.title,
                        "content": data.content,
                    }, function(err, result) {
                        if (err) throw err;
                        db.close();
                        res.writeHead(200, {
                            "Content-Type": "text/plain;charset=utf-8"
                        });
                        return res.end("OK");
                    });
                }else if(method == 2){
                    db.collection('note').updateOne({
                        "serial": data.serial,
                        "title": data.org_title,
                        "content": data.org_content,
                        "userName" : data.userName
                    }, {
                        $set: {
                            "title": data.new_title,
                            "content": data.new_content
                        }
                    }, function(err, docs) {
                        if (err) throw err;
                        db.close();
                        res.writeHead(200, {
                            "Content-Type": "text/plain;charset=utf-8"
                        });
                        return res.end("ok");
                    });
                }else if(method == 3){
                    db.collection('note').deleteOne({ 
                        "serial":data.serial,
                        "title": data.title,
                        "content": data.content,
                        "userName" : data.userName
                    }, function(err, obj) {
                        if (err) throw err;
                        db.close();
                        res.writeHead(200, {
                            "Content-Type": "text/plain;charset=utf-8"
                        });
                        return res.end("ok");
                    });
                }else{
                    db.close();
                }
            });
        break;
        case "/get_note_shared":
            var data = '';
            req.on("data", function(datas) {
                return data += datas;
            });
            req.on("end", function() {
                data = qs.parse(data);
                console.log(data);
            });
            return MongoClient.connect(connection_string, function(err, db) {
                if (err) throw err
                db.collection('note').find({"serial" : data.serial}).toArray(function(err, docs) {
                    if (err) throw err;
                    db.close();
                    res.writeHead(200, {
                        "Content-Type": "text/plain;charset=utf-8"
                    });
                    return res.end(JSON.stringify(docs));
                });
            });
        break;
        default:
            res.writeHead(302, {Location: encodeURI('/')});
            return res.end();
    }
});
server.listen(3030, addresses[0], function() {
    console.log('App is running .... at' + addresses[0] + ":3030/80");
});

function Download(gid,time,ress){
    var sheetId = '1rLXhqXVg9VpOksdeiH9JRsWbBQ3dFzpgVPeSViuyLRA';
    var downloadType = 'tsv';
    var downloadlink = 'https://docs.google.com/spreadsheets/d/'+ sheetId +'/export?format=' + downloadType + '&id=' + sheetId + '&gid=' + gid;
    fetch(downloadlink).then(function(res) {
		console.log("enter fetch");
        var dest = fs.createWriteStream('105學年度-場地借用狀況 - ' + time + '.' + downloadType);
        res.body.pipe(dest);
        console.log("file download OK");
        setTimeout(function(){
            Parse(time,ress);            
        },10);
    });
}

function Parse(time,res){
    if(time != '1061120-1061126')
        var filename = '105學年度-場地借用狀況 - ' + time + '.tsv';
    else
        var filename = '105學年度-場地借用狀況 - ' + time + ' - 改.tsv';
    
    //read tsv
    var read_tsv = fs.readFileSync(filename,'utf8');
    
    var test = [];
    test.push(read_tsv.split(/\t|\r|\n\r/));

    fs.writeFile('tsv.json', JSON.stringify(test) , (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
    Analysis(test,res);
}

function Analysis(test,res){
    var week = []; //一周日期
    var parse_state = [];
    var output = [];
    var multi = [];

    //塞日期
    for(var i = 3;i<10;i++){
        week[i-3] = test[0][i];
    }

    //塞借場資訊
    for(var i = 24;i<31;i++){
        parse_state[i-24] = test[0][i];
    }
    output.push({ //田徑場
        name : test[0][22],
        type : "室外場地",
        multi: false,
        week : week,
        state: parse_state
    });

    parse_state = [];
    //44 65 86 107 128 149
    for(var j = 44;j<150;j = j + 21){ //取場地
        multi = [];
        for(var i = j + 1;i<j+8;i++){//取那個場
            multi[i-j-1] = test[0][i];
        }
        parse_state.push({
            court:test[0][j],
            state:multi
        });
    }
    output.push({ //排球場
        name : test[0][43],
        type : "室外場地",
        multi: true,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //170 191 212 233 254 275 296 317
    for(var j = 170;j<318;j = j + 21){ //取場地
        multi = [];
        for(var i = j + 1;i<j+8;i++){//取那個場
            multi[i-j-1] = test[0][i];
        }
        parse_state.push({
            court:test[0][j],
            state:multi
        });
    }
    output.push({ //籃球場
        name : test[0][169],
        type : "室外場地",
        multi: true,        
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 339;i<346;i++){
        parse_state[i-339] = test[0][i];
    }
    output.push({ //司令台後方廣場
        name : test[0][337],
        type : "室外場地",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 360;i<367;i++){
        parse_state[i-360] = test[0][i];
    }
    output.push({ //棒壘球場
        name : test[0][358],
        type : "室外場地",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //380 401
    for(var j = 380;j<402;j = j + 21){ //取場地
        multi = [];
        for(var i = j + 1;i<j+8;i++){//取那個場
            multi[i-j-1] = test[0][i];
        }
        parse_state.push({
            court:test[0][j],
            state:multi
        });
    }
    output.push({ //網球場
        name : test[0][379],
        type : "室外場地",
        multi: true,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 423;i<430;i++){
        parse_state[i-423] = test[0][i];
    }
    output.push({ //溜冰場
        name : test[0][421],
        type : "室外場地",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //34 55 76
    for(var j = 34;j<77;j = j + 21){ //取場地
        multi = [];
        for(var i = j + 1;i<j+8;i++){//取那個場
            multi[i-j-1] = test[0][i];
        }
        parse_state.push({
            court:test[0][j],
            state:multi
        });
    }
    output.push({ //綜合球場
        name : test[0][33],
        type : "體育館本館",
        multi: true,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //97 118 139
    for(var j = 97;j<140;j = j + 21){ //取場地
        multi = [];
        for(var i = j + 1;i<j+8;i++){//取那個場
            multi[i-j-1] = test[0][i];
        }
        if(j == 97){
            j += 21;
            for(var i = j + 1;i<j+8;i++){//取那個場
                multi[i-j-1] += '   ' + test[0][i];
            }
            test[0][j] = "4F";
        }
        parse_state.push({
            court:test[0][j],
            state:multi
        });
    }
    output.push({ //羽球場
        name : test[0][96],
        type : "體育館本館",
        multi: true,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 161;i<168;i++){
        parse_state[i-161] = test[0][i];
    }
    output.push({ //選手村
        name : test[0][159],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //181 202
    for(var j = 181;j<203;j = j + 21){ //取場地
        multi = [];
        for(var i = j + 1;i<j+8;i++){//取那個場
            multi[i-j-1] = test[0][i];
        }
        if(j == 181){
            j += 21;
            for(var i = j + 1;i<j+8;i++){//取那個場
                multi[i-j-1] += '   ' + test[0][i];
            }
        }
        parse_state.push({
            court:test[0][j],
            state:multi
        });
    }
    output.push({ //桌球教室
        name : test[0][180],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 224;i<231;i++){
        parse_state[i-224] = test[0][i];
    }
    output.push({ //韻律教室
        name : test[0][222],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 245;i<252;i++){
        parse_state[i-245] = test[0][i];
    }
    output.push({ //柔道教室
        name : test[0][243],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 266;i<273;i++){
        parse_state[i-266] = test[0][i];
    }
    output.push({ //B2重訓室
        name : test[0][264],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 287;i<294;i++){
        parse_state[i-287] = test[0][i];
    }
    output.push({ //游泳館
        name : test[0][285],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 308;i<315;i++){
        parse_state[i-308] = test[0][i];
    }
    output.push({ //體適能中心
        name : test[0][306],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //328
    for(var j = 328;j<329;j = j + 21){ //取場地
        multi = [];
        for(var i = j + 1;i<j+8;i++){//取那個場
            multi[i-j-1] = test[0][i];
        }
        parse_state.push({
            court:test[0][j],
            state:multi
        });
    }
    output.push({ //視聽教室
        name : test[0][327],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 350;i<357;i++){
        parse_state[i-350] = test[0][i];
    }
    output.push({ //B1射箭場
        name : test[0][348],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });

    parse_state = [];
    //塞借場資訊
    for(var i = 371;i<378;i++){
        parse_state[i-371] = test[0][i];
    }
    output.push({ //2F撞球桌
        name : test[0][369],
        type : "體育館本館",
        multi: false,
        week : week,
        state:parse_state
    });
	fs.writeFile('output.json', JSON.stringify(output) , (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
	res.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8"
	});
	res.end(JSON.stringify(output));
	
}